import apiClient from './apiClient';

export const launchSession = async (sessionData) => {
  const response = await apiClient.post('/sessions/launchSession', sessionData);
  return response.data;
};

export const getSessionHistory = async (userId, role, page = 1, limit = 10) => {
  const response = await apiClient.get(`/sessions/history/${userId}`, {
    params: { role, page, limit }
  });
  return response.data;
};
