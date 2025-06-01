import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Paper, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemButton,
  Chip,
  IconButton,
  TextField,
  InputAdornment,
  InputProps,
  CircularProgress
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import DeleteIcon from '@mui/icons-material/Delete';

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const navigate = useNavigate();

  const fetchHistory = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/upload/history', {
        credentials: 'include'
      });
      if (!response.ok) {
        throw new Error('Erreur lors du chargement de l\'historique');
      }
      const data = await response.json();
      setHistory(data);
      setLoading(false);
    } catch (error) {
      console.error("Erreur lors du chargement de l'historique:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  // Fonction pour formater la date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return date.toLocaleDateString('fr-FR', options);
  };

  // Obtenir la couleur du statut
  const getStatusColor = (status) => {
    switch (status) {
      case 'success':
        return '#4caf50';
      case 'error':
        return '#f44336';
      case 'processing':
        return '#ff9800';
      default:
        return '#757575';
    }
  };

  // Obtenir le libellé du statut en français
  const getStatusLabel = (status) => {
    switch (status) {
      case 'success':
        return 'Succès';
      case 'error':
        return 'Erreur';
      case 'processing':
        return 'En cours';
      default:
        return status;
    }
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation(); // Prevent triggering the row click
    try {
      setDeleteLoading(id);
      const response = await fetch(`http://localhost:4000/api/upload/history/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la suppression');
      }

      // Remove the deleted item from the state
      setHistory(prev => prev.filter(item => item._id !== id));
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      alert('Une erreur est survenue lors de la suppression');
    } finally {
      setDeleteLoading(null);
    }
  };

  // Filtrer les éléments en fonction de la recherche
  const filteredHistory = history.filter(item =>
    item.originalName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <Box sx={{ p: 3, display: 'flex', justifyContent: 'center' }}>
        <Typography>Chargement...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, maxWidth: 800, margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom>
        Historique des Fichiers
      </Typography>

      <TextField
        fullWidth
        variant="outlined"
        placeholder="Rechercher un fichier..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 3 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      <List>
        {filteredHistory.map((item) => (
          <Paper
            key={item._id}
            elevation={1}
            sx={{
              mb: 2,
              '&:hover': {
                boxShadow: 3,
                transition: 'box-shadow 0.3s ease-in-out'
              }
            }}
          >
            <ListItem 
              button
              onClick={() => navigate(`/history/${item._id}`)}
              sx={{
                '&:hover': {
                  backgroundColor: 'action.hover',
                  cursor: 'pointer'
                }
              }}
            >
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }} >
                    <Typography variant="h6">
                      {item.originalName}
                    </Typography>
                    <Chip
                      label={getStatusLabel(item.status)}
                      size="small"
                      sx={{
                        backgroundColor: getStatusColor(item.status),
                        color: 'white'
                      }}
                    />
                  </Box>
                }
                secondary={
                  <Box sx={{ mt: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      Taille: {(item.fileSize / 1024).toFixed(2)} KB
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Uploadé le {formatDate(item.uploadDate)}
                    </Typography>
                  </Box>
                }
              />
              <Box>
                <IconButton 
                  edge="end" 
                  aria-label="download"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle download
                  }}
                >
                  <FileDownloadIcon />
                </IconButton>
                <IconButton 
                  edge="end" 
                  aria-label="delete"
                  onClick={(e) => handleDelete(item._id, e)}
                  disabled={deleteLoading === item._id}
                >
                  {deleteLoading === item._id ? (
                    <CircularProgress size={24} />
                  ) : (
                    <DeleteIcon />
                  )}
                </IconButton>
              </Box>
            </ListItem>
          </Paper>
        ))}
      </List>

      {filteredHistory.length === 0 && (
        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Typography color="text.secondary">
            Aucun fichier trouvé
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default HistoryPage;