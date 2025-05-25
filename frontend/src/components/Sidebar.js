import React from 'react';
import { Box, List, ListItem, ListItemText, Divider, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ onLogout, dashboardData, setDashboardData }) => {
    const navigate = useNavigate();

    return (
        <Box
        sx={{
          width: '100%',
          height: '100vh',
          bgcolor: '#677E88',
          color: 'white',
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
      >
        <div>
          <List>
            <ListItem button selected onClick={() => navigate('/dashboard')}>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button onClick={() => setDashboardData(null)}>
              <ListItemText primary="New File" />
            </ListItem>
          </List>
          <Divider sx={{ bgcolor: 'rgba(255,255,255,0.2)' }} />
        </div>
        <Button variant="contained" color="red" onClick={onLogout} sx={{ mt: 2 }}>
          Logout
        </Button>
      </Box>
    )
 
};

export default Sidebar;