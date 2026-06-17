import apiClient from './apiClient';

export const getMentorshipRequests = (userId) => {
  return apiClient.get(`/requests/getMentorship/${userId}`);
};

export const getMentorshipRequestsAprenant = (aprenantId) => {
  return apiClient.get(`/requests/getMentorshipAprenant/${aprenantId}`);
};

export const getMentorshipRequestById = (requestId) => {
  return apiClient.get(`/requests/getRequest/${requestId}`);
};

export const createMentorshipRequest = (data) => {
  return apiClient.post('/requests/createMentorship', data);
};

export const acceptMentorship = (data) => {
  return apiClient.post('/requests/acceptMentorship', data);
};

export const rejectMentorship = (data) => {
  return apiClient.put('/requests/rejectMentorship', data);
};
