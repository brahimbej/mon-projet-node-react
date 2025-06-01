import React, { useState, useEffect } from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { Box } from '@mui/material';
import Sidebar from './components/Sidebar';
import HistoryPage from './pages/HistoryPage';

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

const Layout = ({ children, dashboardData, setDashboardData, handleLogout }) => {
  const location = useLocation();
  const hideSidebar = location.pathname === '/login' || location.pathname === '/register';

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        height: '100vh',
        width: '100vw',
        overflow: 'hidden' 
      }}
    >
      {!hideSidebar && (
        <Box 
          sx={{ 
            width: 240,
            flexShrink: 0 
          }}
        >
          <Sidebar 
            onLogout={handleLogout}
            dashboardData={dashboardData}
            setDashboardData={setDashboardData} 
          />
        </Box>
      )}

      <Box 
        sx={{ 
          flexGrow: 1, 
          overflow: 'auto', 
          p: 2 
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

function App() {
  const [dashboardData, setDashboardData] = useState(() => {
    // Initialize state from localStorage if available
    const cachedData = localStorage.getItem('dashboardData');
    return cachedData ? JSON.parse(cachedData) : null;
  });

  const handleSetDashboardData = (data) => {
    setDashboardData(data);
    // Cache the data in localStorage
    localStorage.setItem('dashboardData', JSON.stringify(data));
  };

  const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return !!token;
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    // Load cached data on component mount
    const cachedData = localStorage.getItem('dashboardData');
    if (cachedData) {
      setDashboardData(JSON.parse(cachedData));
    }
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
    localStorage.removeItem('dashboardData'); // Clear cached data on logout
    setDashboardData(null);
    window.location.href = '/';
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout 
          dashboardData={dashboardData} 
          setDashboardData={handleSetDashboardData} 
          handleLogout={handleLogout}
        >
          <Routes>
            <Route 
              path="/history" 
              element={
                isAuthenticated() ? (
                  <HistoryPage />
                ) : (
                  <Navigate to="/login" />
                )
              } 
            />
            <Route path="/*" element={
              <AppRoutes 
                isAuthenticated={isAuthenticated}
                handleLoginSuccess={handleLoginSuccess}
                dashboardData={dashboardData}
                setDashboardData={handleSetDashboardData}
              />
            } />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
