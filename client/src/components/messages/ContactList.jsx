import React from 'react';
import { MdChat, MdPerson } from 'react-icons/md';

const ContactList = ({ contacts, selectedContact, onSelectContact }) => {
  return (
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
              onClick={() => onSelectContact(contact)}
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
  );
};

export default ContactList;
