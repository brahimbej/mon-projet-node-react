import React, { useState } from 'react';
import { Box, Button, Typography, CircularProgress } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const FileUpload = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      // Vérifier le type de fichier
      const validTypes = [
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-excel'
      ];
      if (!validTypes.includes(selectedFile.type)) {
        setError('Seuls les fichiers Excel (.xlsx, .xls) sont acceptés');
        return;
      }
      setFile(selectedFile);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    try {
      setLoading(true);
      setError(null);
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('http://localhost:4000/api/upload', {
        method: 'POST',
        body: formData,
        credentials: 'include'
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || `Erreur HTTP: ${response.status}`);
      }

      const responseData = await response.json();
      
      // Vérification et transformation des données si nécessaire
      if (responseData && Array.isArray(responseData.data)) {
        onUploadSuccess(responseData.data);
      } else if (responseData && Array.isArray(responseData)) {
        onUploadSuccess(responseData);
      } else {
        throw new Error('Format de données invalide');
      }
      
      setFile(null);
    } catch (err) {
      console.error('Erreur détaillée:', err);
      setError(`Erreur de téléchargement: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{
      p: 4,
      borderRadius: 2,
      bgcolor: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      textAlign: 'center',
      color: 'white'
    }}>
      <input
        type="file"
        accept=".xlsx,.xls"
        onChange={handleFileChange}
        style={{ display: 'none' }}
        id="excel-upload"
      />
      <label htmlFor="excel-upload">
        <Button
          component="span"
          variant="contained"
          startIcon={<CloudUploadIcon />}
          sx={{
            mb: 2,
            bgcolor: '#677E88',
            '&:hover': {
              bgcolor: 'primary.dark',
              transform: 'translateY(-2px)',
              transition: 'all 0.3s ease'
            }
          }}
        >
          SÉLECTIONNER UN FICHIER EXCEL
        </Button>
      </label>
      
      {file && (
        <Box sx={{ mt: 2 }}>
          <Typography sx={{ color: 'white' }}>{file.name}</Typography>
          <Button
            variant="contained"
            onClick={handleUpload}
            disabled={loading}
            sx={{
              mt: 2,
              bgcolor: 'success.main',
              '&:hover': {
                bgcolor: 'success.dark',
                transform: 'translateY(-2px)',
                transition: 'all 0.3s ease'
              }
            }}
          >
            {loading ? <CircularProgress size={24} /> : 'TÉLÉCHARGER'}
          </Button>
        </Box>
      )}

      {error && (
        <Typography 
          color="error" 
          sx={{ 
            mt: 2,
            p: 1,
            borderRadius: 1,
            bgcolor: 'rgba(244, 67, 54, 0.1)',
            border: '1px solid #f44336'
          }}
        >
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default FileUpload;