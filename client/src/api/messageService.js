import apiClient from './apiClient';

export const getConversations = (userId) => {
  return apiClient.get(`/message/getConversations/${userId}`);
};

export const getMessages = (senderId, receiverId) => {
  return apiClient.get('/message/getMessages', {
    params: { senderId, receiverId },
  });
};

export const sendMessage = (data) => {
  return apiClient.post('/message/sendMessage', data);
};
