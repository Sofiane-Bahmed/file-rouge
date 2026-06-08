import apiClient from './apiClient';

export const getAprenantProfile = (aprenantId) => {
  return apiClient.get(`/aprenants/viewAprenantProfile/${aprenantId}`);
};

export const getAvailableMentors = () => {
  return apiClient.get('/aprenants/getAvailableMentors');
};

export const updateAprenantProfile = (aprenantId, formData) => {
  return apiClient.put(`/aprenants/updateApprenantProfile/${aprenantId}`, formData);
};

export const updateAprenantImage = (aprenantId, formData) => {
  return apiClient.put(`/aprenants/updateApprenantProfileImage/${aprenantId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
