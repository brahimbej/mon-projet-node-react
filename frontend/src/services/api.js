const API_URL = 'http://localhost:5000/api';

export const uploadExcelFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await fetch(`${API_URL}/upload`, {
    method: 'POST',
    body: formData
  });
  
  if (!response.ok) {
    throw new Error('Erreur lors du téléchargement');
  }
  
  return response.json();
};

export const getDashboardData = async () => {
  const response = await fetch(`${API_URL}/data`);
  
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des données');
  }
  
  return response.json();
};