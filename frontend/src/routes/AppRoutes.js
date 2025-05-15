import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Container } from '@mui/material';
import Login from '../components/Auth/Login';
import Register from '../components/Auth/Register';
import FileUpload from '../components/FileUpload';
import Dashboard from '../components/Dashboard';

const AppRoutes = ({ isAuthenticated, handleLoginSuccess, dashboardData, setDashboardData }) => {
  return (
    <Routes>
      <Route 
        path="/" 
        element={<Navigate to="/login" replace />} 
      />
      <Route 
        path="/login" 
        element={<Login onLoginSuccess={handleLoginSuccess} />} 
      />
      <Route 
        path="/register" 
        element={<Register onRegisterSuccess={handleLoginSuccess} />} 
      />
      <Route 
        path="/dashboard" 
        element={
          isAuthenticated ? (
            <Container sx={{ mt: 4 }} >
              <FileUpload onUploadSuccess={setDashboardData} />
              {dashboardData && <Dashboard data={dashboardData} />}
            </Container>
          ) : (
            <Navigate to="/login" />
          )
        } 
      />
    </Routes>
  );
};

export default AppRoutes;