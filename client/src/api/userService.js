import apiClient from './apiClient';

export const logout = () => {
  return apiClient.get('/users/logout');
};

export const login = (credentials) => {
  return apiClient.post('/users/login', credentials);
};

export const signUp = (userData) => {
  return apiClient.post('/users/register', userData);
};
