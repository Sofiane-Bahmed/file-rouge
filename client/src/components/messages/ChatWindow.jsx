import React, { useState, useRef, useEffect } from 'react';
import { MdSend, MdChat } from 'react-icons/md';

const ChatWindow = ({ selectedContact, messages, onSendMessage, currentUserId }) => {
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    onSendMessage(newMessage);
    setNewMessage("");
  };

  if (!selectedContact) {
    return (
      <div className="flex-1 bg-white rounded-3xl shadow-xl border border-gray-100 flex flex-col items-center justify-center text-gray-400">
        <MdChat className="text-64px opacity-10 mb-4" size={80} />
        <p>Select a conversation to start chatting</p>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-white rounded-3xl shadow-xl border border-gray-100 flex flex-col overflow-hidden">
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
          const isMe = m.sender?._id === currentUserId || m.sender === currentUserId;
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
      <form onSubmit={handleSubmit} className="p-6 border-t border-gray-100 bg-gray-50/50 flex gap-4">
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
    </div>
  );
};

export default ChatWindow;
