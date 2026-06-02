import apiClient from './apiClient';

export const getMentorProfile = (mentorId) => {
  return apiClient.get(`/mentors/viewProfile/${mentorId}`);
};

export const updateMentorProfile = (mentorId, formData) => {
  return apiClient.put(`/mentors/modifierProfile/${mentorId}`, formData);
};

export const updateMentorImage = (formData) => {
  return apiClient.post('/mentors/updateImage', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
