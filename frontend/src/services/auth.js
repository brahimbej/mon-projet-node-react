const API_URL = 'http://localhost:5000/api';

export const authService = {
  login: async (email, password) => {
    try {
      // Validation basique
      if (!email || !password) {
        throw new Error('Identifiants invalides');
      }

      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erreur de connexion');
      }

      const data = await response.json();
      
      // Simple authentication flag
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('email', data.user.email);
      
      return data;
    } catch (error) {
      throw new Error('Erreur de connexion au serveur');
    }
  },

  register: async (email, password) => {
    try {
      // Validation basique
      if (!email || !password) {
        throw new Error('Tous les champs sont requis');
      }

      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        const error = await response.json();
        console.error('Erreur d\'inscription:', error);
        throw new Error(error.message || 'Erreur lors de l\'inscription');
      }

      const data = await response.json();
      
      // Automatically log in after successful registration
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('email', data.user.email);
      
      return data;
    } catch (error) {
      console.error('Erreur détaillée:', error);
      throw new Error(error.message || 'Erreur lors de l\'inscription');
    }
  },

  logout: () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('email');
  },

  isAuthenticated: () => {
    return localStorage.getItem('isAuthenticated') === 'true';
  }
};