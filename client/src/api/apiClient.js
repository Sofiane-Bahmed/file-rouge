import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8082';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('user');
      if (window.location.pathname !== '/logIn') {
        window.location.href = '/logIn';
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
