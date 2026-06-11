import React, { useState, useRef, useEffect } from 'react';
import { MdSend, MdChat, MdInfo, MdMoreVert, MdImage, MdEmojiEmotions, MdDelete } from 'react-icons/md';

const ChatWindow = ({ selectedContact, messages, onSendMessage, onDeleteMessage, currentUserId, typingStatus, onTyping }) => {
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);
  const isTyping = typingStatus[selectedContact?._id];

  const scrollToBottom = (behavior = "smooth") => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  useEffect(() => {
    scrollToBottom("auto");
  }, [selectedContact?._id]);

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    const isMe = (lastMessage?.sender?._id || lastMessage?.sender) === currentUserId;
    if (isMe) {
      scrollToBottom("smooth");
    } else {
      scrollToBottom("smooth");
    }
  }, [messages.length, isTyping]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    onSendMessage(newMessage);
    setNewMessage("");
  };

  const handleChange = (e) => {
    setNewMessage(e.target.value);
    if (onTyping) onTyping();
  };

  if (!selectedContact) {
    return (
      <div className="flex-1 bg-white md:rounded-3xl shadow-xl border border-gray-100 flex flex-col items-center justify-center text-gray-400 p-8 text-center h-full">
        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
          <MdChat className="text-[#007749] opacity-20" size={48} />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Your Messages</h3>
        <p className="max-w-xs">Select a contact from the left to start a conversation or continue where you left off.</p>
      </div>
    );
  }

  const groupedMessages = messages.reduce((acc, m, idx) => {
    const date = new Date(m.createdAt).toLocaleDateString();
    if (!acc[date]) acc[date] = [];

    const lastGroup = acc[date][acc[date].length - 1];
    const isMe = (m.sender?._id || m.sender) === currentUserId;

    if (lastGroup && lastGroup.isMe === isMe) {
      lastGroup.messages.push(m);
    } else {
      acc[date].push({
        isMe,
        messages: [m],
        time: new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
    }
    return acc;
  }, {});

  return (
    <div className="flex-1 bg-white md:rounded-3xl shadow-xl border border-gray-100 flex flex-col overflow-hidden h-full">
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-white z-10 shrink-0">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={selectedContact.image?.url || "https://via.placeholder.com/50"}
              className="w-10 h-10 rounded-full object-cover border border-gray-100"
              alt=""
            />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 leading-tight">
              {selectedContact.firstName} {selectedContact.lastName}
            </h3>
            <p className={`text-[10px] font-bold uppercase tracking-wider ${isTyping ? 'text-[#007749]' : 'text-gray-400'}`}>
              {isTyping ? "Typing..." : selectedContact.userRole}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-50 rounded-full text-gray-400 transition-colors">
            <MdInfo size={24} />
          </button>
          <button className="p-2 hover:bg-gray-50 rounded-full text-gray-400 transition-colors">
            <MdMoreVert size={24} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-8 bg-gray-50/30">
        {Object.entries(groupedMessages).map(([date, groups]) => (
          <div key={date} className="space-y-6">
            <div className="flex justify-center">
              <span className="text-[10px] font-bold text-gray-400 bg-white px-3 py-1 rounded-full shadow-sm uppercase tracking-widest">
                {date === new Date().toLocaleDateString() ? "Today" : date}
              </span>
            </div>

            {groups.map((group, gIdx) => (
              <div key={gIdx} className={`flex gap-3 ${group.isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                {!group.isMe && (
                  <img
                    src={selectedContact.image?.url || "https://via.placeholder.com/50"}
                    className="w-8 h-8 rounded-full object-cover mt-auto shadow-sm"
                    alt=""
                  />
                )}
                <div className={`flex flex-col gap-1 ${group.isMe ? 'items-end' : 'items-start'} max-w-[85%] md:max-w-[70%]`}>
                  {group.messages.map((m, mIdx) => (
                    <div
                      key={mIdx}
                      className="group relative flex items-center"
                    >
                      {group.isMe && (
                        <button
                          onClick={() => onDeleteMessage(m._id)}
                          className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-red-500 transition-all"
                          title="Delete message"
                        >
                          <MdDelete size={16} />
                        </button>
                      )}

                      <div
                        className={`px-4 py-2.5 rounded-2xl text-sm shadow-sm transition-all hover:shadow-md ${group.isMe
                            ? 'bg-[#007749] text-white rounded-br-none'
                            : 'bg-white border border-gray-100 text-gray-800 rounded-bl-none'
                          }`}
                        title={new Date(m.createdAt).toLocaleTimeString()}
                      >
                        <p className="leading-relaxed whitespace-pre-wrap">{m.message}</p>
                      </div>

                      {!group.isMe && (
                        <span className="w-8"></span> // Spacer for alignment
                      )}
                    </div>
                  ))}
                  <span className="text-[9px] font-medium text-gray-400 mt-1 px-1">
                    {group.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ))}
        {isTyping && (
          <div className="flex gap-3 items-end">
            <img
              src={selectedContact.image?.url || "https://via.placeholder.com/50"}
              className="w-8 h-8 rounded-full object-cover shadow-sm"
              alt=""
            />
            <div className="bg-gray-200 px-4 py-3 rounded-2xl rounded-bl-none flex gap-1 items-center">
              <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-gray-100 bg-white shrink-0">
        <form onSubmit={handleSubmit} className="flex items-end gap-2 max-w-4xl mx-auto">
          <div className="hidden sm:flex items-center gap-1 mb-1">
            <button type="button" className="p-2 hover:bg-gray-50 rounded-full text-gray-400 transition-colors">
              <MdImage size={24} />
            </button>
            <button type="button" className="p-2 hover:bg-gray-50 rounded-full text-gray-400 transition-colors">
              <MdEmojiEmotions size={24} />
            </button>
          </div>

          <div className="flex-1 relative">
            <textarea
              rows="1"
              value={newMessage}
              onChange={handleChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              placeholder="Type a message..."
              className="w-full px-5 py-3 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#AAD4C1] outline-none transition-all text-sm resize-none max-h-32"
            />
          </div>

          <button
            type="submit"
            disabled={!newMessage.trim()}
            className={`p-3.5 rounded-2xl transition-all shadow-lg flex items-center justify-center ${newMessage.trim()
                ? 'bg-[#007749] text-white shadow-[#007749]/20 hover:scale-105 active:scale-95'
                : 'bg-gray-100 text-gray-300 shadow-none cursor-not-allowed'
              }`}
          >
            <MdSend className="text-xl" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;
