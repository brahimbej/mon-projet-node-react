import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, CircularProgress, Button } from '@mui/material';
import Dashboard from '../components/Dashboard';

const HistoryDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistoryData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/upload/history/${id}`, {
          credentials: 'include'
        });

        console.log({response});
        
        if (!response.ok) {
          throw new Error('Failed to fetch history data');
        }
        
        const result = await response.json();
        setData(result.entries);
      } catch (err) {
        console.error('Error fetching history data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHistoryData();
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={3}>
        <Typography color="error" variant="h6">
          Error loading history data: {error}
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => navigate(-1)}
          sx={{ mt: 2 }}
        >
          Back to History
        </Button>
      </Box>
    );
  }

  if (!data) {
    return (
      <Box p={3}>
        <Typography variant="h6">No data found for this history item</Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => navigate(-1)}
          sx={{ mt: 2 }}
        >
          Back to History
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Button 
        variant="outlined" 
        onClick={() => navigate(-1)}
        sx={{ mb: 2 }}
      >
        &larr; Back to History
      </Button>
      <Dashboard data={data} />
    </Box>
  );
};

export default HistoryDetailPage;
