import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useMessages } from '../../hooks/useMessages';
import NavBar from '../../components/navbar/NavBar';
import Footer from '../../components/footer/Footer';
import ContactList from '../../components/messages/ContactList';
import ChatWindow from '../../components/messages/ChatWindow';

const Messages = () => {
  const { user: localUser } = useAuth();
  const {
    contacts,
    selectedContact,
    setSelectedContact,
    messages,
    loading,
    sendMessage
  } = useMessages(localUser);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-12 h-12 border-4 border-[#007749] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavBar />
      
      <div className="flex-1 max-w-screen-xl mx-auto w-full p-4 md:p-8 flex gap-6 overflow-hidden h-[calc(100vh-140px)]">
        <ContactList 
          contacts={contacts} 
          selectedContact={selectedContact} 
          onSelectContact={setSelectedContact} 
        />

        <ChatWindow 
          selectedContact={selectedContact} 
          messages={messages} 
          onSendMessage={sendMessage} 
          currentUserId={localUser?.userId}
        />
      </div>
      
      <Footer />
    </div>
  );
};

export default Messages;
