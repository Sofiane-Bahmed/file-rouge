import { useState, useEffect, useCallback } from 'react';
import { getConversations, getMessages, sendMessage as apiSendMessage } from '../api/messageService';
import { useSocket } from '../context/SocketContext';

export const useMessages = (localUser) => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setOnMessageReceived } = useSocket();

  const fetchContacts = useCallback(async () => {
    if (!localUser?.userId) return;
    try {
      const res = await getConversations(localUser.userId);
      setContacts(res.data.contacts);
      if (res.data.contacts.length > 0 && !selectedContact) {
        setSelectedContact(res.data.contacts[0]);
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setLoading(false);
    }
  }, [localUser?.userId, selectedContact]);

  const fetchMessages = useCallback(async () => {
    if (!selectedContact || !localUser?.userId) return;
    try {
      const res = await getMessages(localUser.userId, selectedContact._id);
      setMessages(res.data.messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  }, [selectedContact, localUser?.userId]);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  useEffect(() => {
    setOnMessageReceived((data) => {
      if (!data || !selectedContact?._id || !localUser?.userId) return;
      
      const conversationId = [localUser.userId, selectedContact._id].sort().join("_");
      if (data.conversationId === conversationId) {
        setMessages((prev) => [...prev, {
          sender: data.senderId,
          message: data.message,
          createdAt: data.createdAt
        }]);
      }
    });
    return () => setOnMessageReceived(null);
  }, [selectedContact?._id, localUser?.userId, setOnMessageReceived]);

  const sendMessage = async (messageText) => {
    if (!messageText.trim() || !selectedContact) return;
    try {
      const res = await apiSendMessage({
        senderId: localUser.userId,
        receiverId: selectedContact._id,
        message: messageText
      });
      setMessages((prev) => [...prev, res.data.newMessage]);
      return res.data.newMessage;
    } catch (error) {
      console.error("Error sending message:", error);
      throw error;
    }
  };

  return {
    contacts,
    selectedContact,
    setSelectedContact,
    messages,
    loading,
    sendMessage
  };
};
