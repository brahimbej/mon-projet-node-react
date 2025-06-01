import React, { useRef, useState } from 'react';
import { Box, List, ListItem, ListItemText, Divider, Button, IconButton, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DeleteIcon from '@mui/icons-material/Delete';
import HistoryIcon from '@mui/icons-material/History';

const Sidebar = ({ onLogout, dashboardData, setDashboardData }) => {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleFileUpload = async (event) => {
        const file = event.target.files?.[0];
        if (!file) return;

        try {
            setLoading(true);
            setError(null);
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch('http://localhost:5000/api/upload', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                },
                mode: 'cors',
                credentials: 'include'
            });

            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(errorData || `Error: ${response.status}`);
            }

            const data = await response.json();
            setDashboardData(data);
            navigate('/dashboard');
        } catch (error) {
            console.error('Upload error:', error);
            setError(error.message);
        } finally {
            setLoading(false);
            // Reset the file input
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const handleNewFile = () => {
        setDashboardData(null);
        localStorage.removeItem('dashboardData');
    };

    return (
        <Box
            sx={{
                width: '100%',
                height: '100vh',
                bgcolor: '#2f2f2f',
                color: 'white',
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
            }}
        >
            <div>
                <List>
                    <ListItem>
                        <input
                            type="file"
                            accept=".xlsx,.xls"
                            style={{ display: 'none' }}
                            ref={fileInputRef}
                            onChange={handleFileUpload}
                        />
                        <Button
                            fullWidth
                            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <UploadFileIcon />}
                            onClick={() => fileInputRef.current.click()}
                            disabled={loading}
                            sx={{
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                },
                            }}
                        >
                            {loading ? 'Uploading...' : 'Upload File'}
                        </Button>
                    </ListItem>

                    {error && (
                        <ListItem>
                            <Box 
                                sx={{ 
                                    color: '#ff6b6b',
                                    fontSize: '0.875rem',
                                    width: '100%',
                                    p: 1,
                                    borderRadius: 1,
                                    bgcolor: 'rgba(255, 107, 107, 0.1)',
                                }}
                            >
                                {error}
                            </Box>
                        </ListItem>
                    )}

                    {dashboardData && (
                        <ListItem>
                            <Button
                                fullWidth
                                startIcon={<DeleteIcon />}
                                onClick={handleNewFile}
                                sx={{
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    },
                                }}
                            >
                                Clear Data
                            </Button>
                        </ListItem>
                    )}

                    <ListItem>
                        <Button
                            fullWidth
                            startIcon={<HistoryIcon />}
                            onClick={() => navigate('/history')}
                            sx={{
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                },
                            }}
                        >
                            Historique
                        </Button>
                    </ListItem>

                </List>
                <Divider sx={{ bgcolor: 'rgba(255,255,255,0.2)' }} />
            </div>
            <Button 
                variant="contained" 
                onClick={onLogout} 
                sx={{ 
                    mt: 2,
                    bgcolor: '#dc2626',
                    '&:hover': {
                        bgcolor: '#b91c1c',
                    },
                }}
            >
                Logout
            </Button>
        </Box>
    );
};

export default Sidebar;