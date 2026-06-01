import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useSocket } from '../../context/SocketContext';
import NavBar from '../../compnents/navbar/NavBar';
import Footer from '../../compnents/footer/Footer';
import { MdSend, MdPerson, MdChat } from 'react-icons/md';

const Messages = () => {
  const localUser = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
  const { setOnMessageReceived } = useSocket();
  
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const fetchContacts = async () => {
      if (!localUser?.userId) return;
      try {
        const res = await axios.get(`http://localhost:8082/message/getConversations/${localUser.userId}`, { withCredentials: true });
        setContacts(res.data.contacts);
        if (res.data.contacts.length > 0 && !selectedContact) {
          setSelectedContact(res.data.contacts[0]);
        }
      } catch (error) {
        console.error("Error fetching contacts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchContacts();
  }, [localUser?.userId]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedContact || !localUser?.userId) return;
      try {
        const res = await axios.get(`http://localhost:8082/message/getMessages`, {
          params: { senderId: localUser.userId, receiverId: selectedContact._id },
          withCredentials: true
        });
        setMessages(res.data.messages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    fetchMessages();
  }, [selectedContact, localUser?.userId]);

  useEffect(() => {
    setOnMessageReceived((data) => {
      if (!data || !selectedContact?._id || !localUser?.userId) return;
      
      // If the message belongs to the current conversation, add it
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

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedContact) return;

    try {
      const res = await axios.post(`http://localhost:8082/message/sendMessage`, {
        senderId: localUser.userId,
        receiverId: selectedContact._id,
        message: newMessage
      }, { withCredentials: true });

      setMessages((prev) => [...prev, res.data.newMessage]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="w-12 h-12 border-4 border-[#007749] border-t-transparent rounded-full animate-spin"></div></div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavBar />
      
      <div className="flex-1 max-w-screen-xl mx-auto w-full p-4 md:p-8 flex gap-6 overflow-hidden h-[calc(100vh-140px)]">
        {/* Contacts Sidebar */}
        <div className="w-1/3 bg-white rounded-3xl shadow-xl border border-gray-100 flex flex-col">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <MdChat className="text-[#007749]" />
              Conversations
            </h2>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {contacts.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <MdPerson className="text-4xl mx-auto mb-2 opacity-20" />
                <p className="text-sm">No conversations yet</p>
              </div>
            ) : (
              contacts.map((contact) => (
                <button
                  key={contact._id}
                  onClick={() => setSelectedContact(contact)}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${
                    selectedContact?._id === contact._id 
                    ? 'bg-[#F0F9F1] border border-[#AAD4C1]' 
                    : 'hover:bg-gray-50 border border-transparent'
                  }`}
                >
                  <img 
                    src={contact.image?.url || "https://via.placeholder.com/50"} 
                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                    alt=""
                  />
                  <div className="text-left flex-1 min-w-0">
                    <p className="font-bold text-gray-900 truncate">{contact.firstName} {contact.lastName}</p>
                    <p className="text-xs text-[#007749] font-semibold uppercase tracking-wider">{contact.userRole}</p>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 bg-white rounded-3xl shadow-xl border border-gray-100 flex flex-col overflow-hidden">
          {selectedContact ? (
            <>
              {/* Chat Header */}
              <div className="p-6 border-b border-gray-100 flex items-center gap-4 bg-gray-50/50">
                <img 
                  src={selectedContact.image?.url || "https://via.placeholder.com/50"} 
                  className="w-10 h-10 rounded-full object-cover"
                  alt=""
                />
                <div>
                  <h3 className="font-bold text-gray-900">{selectedContact.firstName} {selectedContact.lastName}</h3>
                  <p className="text-xs text-green-500 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                    Online
                  </p>
                </div>
              </div>

              {/* Messages List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-opacity-5">
                {messages.map((m, idx) => {
                  const isMe = m.sender?._id === localUser.userId || m.sender === localUser.userId;
                  return (
                    <div key={idx} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[70%] p-4 rounded-2xl shadow-sm ${
                        isMe 
                        ? 'bg-[#007749] text-white rounded-br-none' 
                        : 'bg-white border border-gray-100 text-gray-800 rounded-bl-none'
                      }`}>
                        <p className="text-sm leading-relaxed">{m.message}</p>
                        <p className={`text-[10px] mt-2 opacity-60 ${isMe ? 'text-right' : 'text-left'}`}>
                          {new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <form onSubmit={handleSendMessage} className="p-6 border-t border-gray-100 bg-gray-50/50 flex gap-4">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-6 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-[#AAD4C1] focus:border-transparent outline-none transition-all"
                />
                <button
                  type="submit"
                  className="p-4 bg-[#007749] text-white rounded-2xl hover:bg-[#00663d] transition-all shadow-lg shadow-[#007749]/20"
                >
                  <MdSend className="text-xl" />
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
              <MdChat className="text-64px opacity-10 mb-4" size={80} />
              <p>Select a conversation to start chatting</p>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Messages;
