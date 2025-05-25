import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Container } from '@mui/material';
import Login from '../components/Auth/Login';
import Register from '../components/Auth/Register';
import FileUpload from '../components/FileUpload';
import Dashboard from '../components/Dashboard';
import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Box } from '@mui/material';

const AppRoutes = ({ isAuthenticated, handleLoginSuccess, dashboardData, setDashboardData }) => {
  const handleLogout = () => {
    // Add your logout logic here (e.g., clear tokens, reset state, redirect, etc.)
    window.location.href = '/login';
  };

  const handleRegisterSuccess =() => {
    window.location.href = '/login';
  }

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
        element={<Register onRegisterSuccess={handleRegisterSuccess} />} 
      />
      
      <Route 
        path="/dashboard" 
        element={
          isAuthenticated ? (

              <Box sx={{  }}>
                {!dashboardData && (
                  <FileUpload onUploadSuccess={setDashboardData} />
                )}
                {dashboardData && (
                  <Dashboard data={dashboardData} />
                )}
              </Box>
          ) : (
            <Navigate to="/login" />
          )
        } 
      />
      <Route
        path="/new-file"
        element={
          isAuthenticated ? (
            // <div>New Page</div>
            <Box sx={{ flex:1, justifyContent :"center", alignItems :"center" }}>

              <FileUpload onUploadSuccess={setDashboardData} />
            </Box>

          ) : (
            <Navigate to="/login" />
          )
        }
        />
    </Routes>
  );
};

export default AppRoutes;