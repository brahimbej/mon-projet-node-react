import React, { useState, useEffect } from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { authService } from './services/auth';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#8b5cf6'
    },
    background: {
      default: '#1a1a1a',
      paper: '#1a1a1a'
    }
  }
});

function App() {
  const [dashboardData, setDashboardData] = useState(null);



  const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return !!token;
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
  }, []);

  const handleLoginSuccess = (data) => {
    if (data.token) {
      localStorage.setItem('token', data.token);
      window.location.href = '/dashboard';
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    setDashboardData(null);
    window.location.href = '/';
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppRoutes 
          isAuthenticated={isAuthenticated}
          handleLoginSuccess={handleLoginSuccess}
          dashboardData={dashboardData}
          setDashboardData={setDashboardData}
        />
      </Router>
    </ThemeProvider>
  );
}

export default App;