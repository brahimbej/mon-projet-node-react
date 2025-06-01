const express = require('express');
const router = express.Router();
const multer = require('multer');
const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');
const FileUpload = require('../models/FileUpload');
const DashboardData = require('../models/DashboardData');

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Générer un nom de fichier unique
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: function(req, file, cb) {
    // Vérifier le type de fichier
    if (file.mimetype === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || 
        file.mimetype === "application/vnd.ms-excel") {
      cb(null, true);
    } else {
      cb(new Error("Seuls les fichiers Excel sont autorisés!"), false);
    }
  }
});

// Upload route
router.post('/', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      throw new Error('Aucun fichier uploadé');
    }

    const workbook = xlsx.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const rows = xlsx.utils.sheet_to_json(sheet, { header: 1 });

    const result = [];

    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      const hour = row[0];
      const effectif = row[1];
      const machines = [];

      for (let j = 2; j < row.length; j += 2) {
        const reference = row[j];
        const output = row[j + 1];
        if (reference !== undefined && output !== undefined) {
          machines.push({ reference, output });
        }
      }

      result.push({ hour, effectif, machines });
    }

    // Sauvegarder les informations du fichier dans la base de données
    const fileUpload = new FileUpload({
      originalName: req.file.originalname,
      fileName: req.file.filename,
      filePath: req.file.path,
      fileSize: req.file.size,
      processedData: result,
      status: 'success'
    });

    console.log({result});

    // Filter out any invalid entries (like the header row with undefined hour)
    const validEntries = result.filter(entry => entry.hour && entry.hour !== 'Effectif');

    const dashboardData = new DashboardData({
      filename: req.file.filename,      // The stored filename on the server
      originalName: req.file.originalname, // The original filename from the user
      entries: validEntries,
      uploadedAt: new Date(),
      status: 'success'
    });

    await dashboardData.save();
    console.log('Dashboard data saved successfully with filename:', req.file.filename);

    await fileUpload.save();
    
    res.json({
      data: result,
      fileInfo: {
        id: fileUpload._id,
        originalName: fileUpload.originalName,
        uploadDate: fileUpload.uploadDate,
        fileName: fileUpload.fileName
      }
    });
  } catch (error) {
    // En cas d'erreur, sauvegarder quand même l'information avec le statut d'erreur
    if (req.file) {
      try {
        const fileUpload = new FileUpload({
          originalName: req.file.originalname,
          fileName: req.file.filename,
          filePath: req.file.path,
          fileSize: req.file.size,
          processedData: {},
          status: 'error'
        });
        await fileUpload.save();
      } catch (dbError) {
        console.error('Error saving file information:', dbError);
      }
    }
    res.status(500).json({ error: error.message });
  }
});

// Route pour récupérer l'historique des fichiers
router.get('/history', async (req, res) => {
  try {
    // const files = await FileUpload.find()
    //   .select('-processedData') // Exclure les données traitées pour alléger la réponse
    //   .sort({ uploadDate: -1 }); // Trier par date d'upload décroissante

      //get the dashboard data
      const dashboardData = await DashboardData.find()
      // .sort({ uploadedAt: -1 });

      console.log({dashboardData});
    res.json(dashboardData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific history item by ID
router.get('/history/:id', async (req, res) => {
  try {
    const item = await DashboardData.findById(req.params.id);
    
    if (!item) {
      return res.status(404).json({ message: 'History item not found' });
    }
    
    res.json(item);
  } catch (error) {
    console.error('Error fetching history item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route pour télécharger un fichier
router.get('/download/:filename', (req, res) => {
  const filePath = path.join(__dirname, '../uploads', req.params.filename);
  res.download(filePath, (err) => {
    if (err) {
      res.status(404).json({ error: 'Fichier non trouvé' });
    }
  });
});

module.exports = router;
