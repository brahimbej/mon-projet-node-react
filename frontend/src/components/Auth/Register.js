import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Alert } from '@mui/material';
import { authService } from '../../services/auth';

const Register = ({ onRegisterSuccess }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Basic validation
      if (!formData.email || !formData.password || !formData.confirmPassword) {
        setError('Please fill in all fields');
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setError('Please enter a valid email address');
        return;
      }

      // Password validation
      if (formData.password.length < 8) {
        setError('Password must be at least 8 characters long');
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }

      const data = await authService.register(formData.email, formData.password);
      onRegisterSuccess(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        minHeight: '100vh',
        bgcolor: '#1a1a1a'
      }}
    >
      {/* Left section with illustration */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 4
        }}
      >
        <Box
          component="img"
          src="/Leoni-Tunisie.jpg"
          alt="Register"
          sx={{
            maxWidth: '80%',
            height: 'auto',
            borderRadius: '12px',
          }}
        />
      </Box>

      {/* Right section with form */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          p: 6,
          maxWidth: '500px'
        }}
      >
        <Typography 
          variant="h4" 
          gutterBottom 
          sx={{ 
            color: 'white',
            mb: 1,
            fontWeight: 500
          }}
        >
          Register
        </Typography>

        <Typography 
          variant="body1" 
          sx={{ 
            color: '#888',
            mb: 4
          }}
        >
          Create your account to get started
        </Typography>

        {error && (
          <Alert 
            severity="error" 
            sx={{ 
              mb: 2,
              bgcolor: 'rgba(211, 47, 47, 0.1)',
              color: '#ff1744'
            }}
          >
            {error}
          </Alert>
        )}



        <TextField
          fullWidth
          name="email"
          type="email"
          label="Email"
          value={formData.email}
          onChange={handleChange}
          margin="normal"
          required
          sx={{
            mb: 2,
            '& .MuiOutlinedInput-root': {
              color: 'white',
              bgcolor: 'rgba(255, 255, 255, 0.05)',
              '& fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.1)',
              },
              '&:hover fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.2)',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#8b5cf6',
              },
            },
            '& .MuiInputLabel-root': {
              color: '#888',
            },
          }}
        />

        <TextField
          fullWidth
          name="password"
          type="password"
          label="Password"
          value={formData.password}
          onChange={handleChange}
          margin="normal"
          required
          sx={{
            mb: 2,
            '& .MuiOutlinedInput-root': {
              color: 'white',
              bgcolor: 'rgba(255, 255, 255, 0.05)',
              '& fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.1)',
              },
              '&:hover fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.2)',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#8b5cf6',
              },
            },
            '& .MuiInputLabel-root': {
              color: '#888',
            },
          }}
        />

        <TextField
          fullWidth
          name="confirmPassword"
          type="password"
          label="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          margin="normal"
          required
          sx={{
            mb: 3,
            '& .MuiOutlinedInput-root': {
              color: 'white',
              bgcolor: 'rgba(255, 255, 255, 0.05)',
              '& fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.1)',
              },
              '&:hover fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.2)',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#8b5cf6',
              },
            },
            '& .MuiInputLabel-root': {
              color: '#888',
            },
          }}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            mt: 2,
            py: 1.5,
            bgcolor: '#8b5cf6',
            '&:hover': {
              bgcolor: '#7c3aed',
            },
            borderRadius: '8px',
            textTransform: 'none',
            fontSize: '1rem'
          }}
        >
          Create Account
        </Button>
      </Box>
    </Box>
  );
};

export default Register;