const API_URL = 'http://localhost:5000/api';

export const authService = {
  login: async (email, password) => {
    try {
      // Validation basique
      if (!email || !password) {
        throw new Error('Veuillez remplir tous les champs');
      }

      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Email ou mot de passe incorrect');
        } else if (response.status === 404) {
          throw new Error('Utilisateur non trouvé');
        } else if (data.message) {
          throw new Error(data.message);
        } else {
          throw new Error('Erreur lors de la connexion');
        }
      }
      
      // Simple authentication flag
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('email', data.user.email);
      
      return data;
    } catch (error) {
      if (error.message === 'Failed to fetch') {
        throw new Error('Impossible de se connecter au serveur. Veuillez vérifier votre connexion.');
      }
      throw error;
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

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 409) {
          throw new Error('Cet email est déjà utilisé');
        } else if (data.message) {
          throw new Error(data.message);
        } else {
          throw new Error('Erreur lors de l\'inscription');
        }
      }
      
      // Automatically log in after successful registration
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('email', data.user.email);
      
      return data;
    } catch (error) {
      if (error.message === 'Failed to fetch') {
        throw new Error('Impossible de se connecter au serveur. Veuillez vérifier votre connexion.');
      }
      throw error;
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