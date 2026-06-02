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

export const updateAprenantImage = (formData) => {
  return apiClient.post('/aprenants/updateImage', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
