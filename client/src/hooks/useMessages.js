import { useState, useEffect, useCallback, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { getConversations, getMessages, sendMessage as apiSendMessage, markAsRead as apiMarkAsRead, deleteMessage as apiDeleteMessage } from '../api/messageService';
import { useSocket } from '../context/SocketContext';

export const useMessages = (localUser) => {
  const [conversations, setConversations] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const selectedContactRef = useRef(null); 
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setOnMessageReceived, socket, notifications } = useSocket();
  const [typingStatus, setTypingStatus] = useState({}); 
  const typingTimeoutRef = useRef(null);
  const location = useLocation();

  // Sync ref with state
  useEffect(() => {
    selectedContactRef.current = selectedContact;
  }, [selectedContact]);

  const fetchConversations = useCallback(async (isInitial = false) => {
    if (!localUser?.userId) {
      setLoading(false);
      return;
    }
    try {
      const res = await getConversations(localUser.userId);
      let convs = res.data.conversations;
      
      if (isInitial) {
        const incomingContact = location.state?.contact;
        if (incomingContact) {
          const existingConv = convs.find(c => c.contact._id === incomingContact._id);
          if (existingConv) {
            setSelectedContact(existingConv.contact);
          } else {
            const newConv = {
              contact: incomingContact,
              lastMessage: null,
              unreadCount: 0,
              isPlaceholder: true
            };
            convs = [newConv, ...convs];
            setSelectedContact(incomingContact);
          }
        } else if (convs.length > 0 && !selectedContactRef.current) {
          setSelectedContact(convs[0].contact);
        }
      }
      
      setConversations(convs);
    } catch (error) {
      console.error("Error fetching conversations:", error);
    } finally {
      setLoading(false);
    }
  }, [localUser?.userId, location.state]);

  // Initial fetch - Only run once on mount or when user changes
  useEffect(() => {
    fetchConversations(true);
  }, [localUser?.userId]); 

  // Fetch messages when selectedContact changes
  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedContact?._id || !localUser?.userId) return;
      
      const currentConv = conversations.find(c => c.contact._id === selectedContact._id);
      if (currentConv?.isPlaceholder) {
        setMessages([]);
        return;
      }

      try {
        const res = await getMessages(localUser.userId, selectedContact._id);
        setMessages(res.data.messages);
        await apiMarkAsRead(localUser.userId, selectedContact._id);
        
        setConversations(prev => prev.map(conv => 
          conv.contact._id === selectedContact._id ? { ...conv, unreadCount: 0 } : conv
        ));
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [selectedContact?._id, localUser?.userId]);

  // Real-time message listener
  useEffect(() => {
    if (!localUser?.userId) return;

    setOnMessageReceived((data) => {
      const isFromSelectedContact = selectedContactRef.current?._id === data.senderId;

      if (isFromSelectedContact) {
        setMessages((prev) => {
          if (prev.find(m => m._id === data._id)) return prev;
          return [...prev, {
            _id: data._id,
            sender: data.senderId,
            message: data.message,
            createdAt: data.createdAt
          }];
        });
        
        apiMarkAsRead(localUser.userId, data.senderId);
        setTypingStatus(prev => ({ ...prev, [data.senderId]: false }));
      }

      setConversations(prev => {
        const existingConvIndex = prev.findIndex(c => c.contact._id === data.senderId);
        if (existingConvIndex > -1) {
          const existingConv = prev[existingConvIndex];
          const updatedConv = {
            ...existingConv,
            isPlaceholder: false,
            lastMessage: {
              message: data.message,
              createdAt: data.createdAt,
              sender: data.senderId
            },
            unreadCount: isFromSelectedContact ? 0 : (existingConv.unreadCount + 1)
          };
          const newConversations = [...prev];
          newConversations.splice(existingConvIndex, 1);
          return [updatedConv, ...newConversations];
        } else {
          fetchConversations();
          return prev;
        }
      });
    });

    return () => setOnMessageReceived(null);
  }, [localUser?.userId, setOnMessageReceived, fetchConversations]);

  // Real-time notifications (Typing, Deletion)
  useEffect(() => {
    const lastNotification = notifications[0];
    if (!lastNotification) return;

    if (lastNotification.type === 'TYPING_STATUS') {
      const { senderId, isTyping } = lastNotification.data;
      setTypingStatus(prev => ({ ...prev, [senderId]: isTyping }));
    } else if (lastNotification.type === 'DELETE_MESSAGE') {
      const { messageId } = lastNotification.data;
      setMessages(prev => prev.filter(m => m._id !== messageId));
      
      setConversations(prev => {
        if (prev.some(c => c.lastMessage?._id === messageId)) {
          fetchConversations();
        }
        return prev;
      });
    }
  }, [notifications, fetchConversations]);

  const sendMessage = async (messageText) => {
    if (!messageText.trim() || !selectedContact) return;
    try {
      sendTypingStatus(false);
      const res = await apiSendMessage({
        senderId: localUser.userId,
        receiverId: selectedContact._id,
        message: messageText
      });
      const newMessage = res.data.newMessage;
      
      setMessages((prev) => [...prev, newMessage]);
      
      setConversations(prev => {
        const existingConvIndex = prev.findIndex(c => c.contact._id === selectedContact._id);
        if (existingConvIndex > -1) {
          const existingConv = prev[existingConvIndex];
          const updatedConv = {
            ...existingConv,
            isPlaceholder: false,
            lastMessage: {
              message: newMessage.message,
              createdAt: newMessage.createdAt,
              sender: localUser.userId
            }
          };
          const newConversations = [...prev];
          newConversations.splice(existingConvIndex, 1);
          return [updatedConv, ...newConversations];
        }
        return prev;
      });

      return newMessage;
    } catch (error) {
      console.error("Error sending message:", error);
      throw error;
    }
  };

  const deleteMessage = async (messageId) => {
    try {
      await apiDeleteMessage(messageId, localUser.userId);
      setMessages(prev => prev.filter(m => m._id !== messageId));
      
      if (conversations.some(c => c.lastMessage?._id === messageId)) {
        fetchConversations();
      }
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  const sendTypingStatus = (isTyping) => {
    if (socket && socket.readyState === WebSocket.OPEN && selectedContact) {
      socket.send(JSON.stringify({
        type: 'TYPING',
        receiverId: selectedContact._id,
        isTyping
      }));
    }
  };

  const handleTyping = () => {
    sendTypingStatus(true);
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      sendTypingStatus(false);
    }, 3000);
  };

  return {
    conversations,
    selectedContact,
    setSelectedContact,
    messages,
    loading,
    sendMessage,
    deleteMessage,
    typingStatus,
    handleTyping
  };
};
