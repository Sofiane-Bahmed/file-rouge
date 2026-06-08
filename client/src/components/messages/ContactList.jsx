import React, { useState } from 'react';
import { MdChat, MdPerson, MdSearch } from 'react-icons/md';

const ContactList = ({ conversations, selectedContact, onSelectContact }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredConversations = conversations.filter(conv => 
    `${conv.contact.firstName} ${conv.contact.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatTime = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (days < 7) {
      return date.toLocaleDateString([], { weekday: 'short' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  return (
    <div className="w-full bg-white md:rounded-3xl shadow-xl border border-gray-100 flex flex-col overflow-hidden h-full">
      <div className="p-4 md:p-6 border-b border-gray-100 space-y-4 shrink-0">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <MdChat className="text-[#007749]" />
          Conversations
        </h2>
        <div className="relative">
          <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
          <input 
            type="text" 
            placeholder="Search messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#AAD4C1] outline-none transition-all text-sm"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2 md:p-4 space-y-1 md:space-y-2">
        {filteredConversations.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <MdPerson className="text-4xl mx-auto mb-2 opacity-20" />
            <p className="text-sm">No conversations found</p>
          </div>
        ) : (
          filteredConversations.map((conv) => {
            const { contact, lastMessage, unreadCount } = conv;
            const isSelected = selectedContact?._id === contact._id;
            
            return (
              <button
                key={contact._id}
                onClick={() => onSelectContact(contact)}
                className={`w-full flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-2xl transition-all relative group ${
                  isSelected 
                  ? 'bg-[#F0F9F1] border border-[#AAD4C1]' 
                  : 'hover:bg-gray-50 border border-transparent'
                }`}
              >
                <div className="relative shrink-0">
                  <img 
                    src={contact.image?.url || "https://via.placeholder.com/50"} 
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border-2 border-white shadow-sm"
                    alt=""
                  />
                  {/* Online indicator could go here if implemented */}
                </div>

                <div className="text-left flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <p className="font-bold text-gray-900 truncate text-sm md:text-base">
                      {contact.firstName} {contact.lastName}
                    </p>
                    {lastMessage && (
                      <span className="text-[10px] text-gray-400 font-medium shrink-0 ml-2">
                        {formatTime(lastMessage.createdAt)}
                      </span>
                    )}
                  </div>
                  <div className="flex justify-between items-center gap-2">
                    <p className={`text-xs truncate ${unreadCount > 0 ? 'text-gray-900 font-bold' : 'text-gray-500'}`}>
                      {lastMessage ? (
                        <>
                          {lastMessage.sender === contact._id ? "" : "You: "}
                          {lastMessage.message}
                        </>
                      ) : (
                        <span className="italic text-gray-400">New conversation</span>
                      )}
                    </p>
                    {unreadCount > 0 && (
                      <span className="bg-[#007749] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center shrink-0">
                        {unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ContactList;
