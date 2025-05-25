import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Alert } from '@mui/material';
import { authService } from '../../services/auth';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    
    try {
      // Validation basique
      if (!email || !password) {
        setError('Veuillez remplir tous les champs');
        return;
      }
      
      const data = await authService.login(email, password);
      onLoginSuccess(data);
    } catch (err) {
      // Use the error message directly from the auth service
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
      {/* Section gauche avec l'illustration */}
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
          alt="Login"
          sx={{
            maxWidth: '80%',
            height: 'auto',
            borderRadius: '12px',
          }}
        />
      </Box>

      {/* Section droite avec le formulaire */}
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
          Login
        </Typography>

        <Typography 
          variant="body1" 
          sx={{ 
            color: '#888',
            mb: 4
          }}
        >
          Welcome Back! Enter Your Details Below
        </Typography>

        {error && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              p: 2,
              mb: 3,
              borderRadius: 1,
              bgcolor: 'rgba(211, 47, 47, 0.1)',
              border: '1px solid rgba(211, 47, 47, 0.3)',
            }}
          >
            <ErrorOutlineIcon sx={{ color: '#ff1744' }} />
            <Typography sx={{ color: '#ff1744', fontSize: '0.9rem' }}>
              {error}
            </Typography>
          </Box>
        )}

        <TextField
          fullWidth
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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

        <TextField
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
          Login
        </Button>

        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography 
            variant="body2" 
            sx={{ 
              color: '#888',
              display: 'inline'
            }}
          >
            Don't have an account?{' '}
          </Typography>
          <Button
            onClick={() => window.location.href = '/register'}
            sx={{
              color: '#8b5cf6',
              textTransform: 'none',
              '&:hover': {
                bgcolor: 'transparent',
                color: '#7c3aed',
              },
            }}
          >
            Register here
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;