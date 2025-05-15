const express = require('express');
const router = express.Router();
const multer = require('multer');
const xlsx = require('xlsx');
const fs = require('fs');

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// Upload route
router.post('/', upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      throw new Error('No file uploaded');
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

      // Loop through the machine columns starting from index 2
      for (let j = 2; j < row.length; j += 2) {
        const reference = row[j];
        const output = row[j + 1];
        if (reference !== undefined && output !== undefined) {
          machines.push({ reference, output });
        }
      }

      result.push({ hour, effectif, machines });
    }

    // Optionally remove the uploaded file
    fs.unlinkSync(req.file.path);
    console.log({result});
    for (let i = 0; i < result.length; i++) {
      const row = result[i];
      const hour = row.hour;
      const effectif = row.effectif;
      const machines = row.machines;

      console.log(`Hour: ${hour}, Effectif: ${effectif}`);
      console.log('Machines:');
      for (let j = 0; j < machines.length; j++) {
        const machine = machines[j];
        const reference = machine.reference;
        const output = machine.output;
        console.log(`  Reference: ${reference}, Output: ${output}`);
      }
    }

    
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
