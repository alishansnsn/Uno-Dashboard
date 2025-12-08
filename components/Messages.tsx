import React, { useState } from 'react';
import { MessageSquareIcon, PlusIcon, SearchIcon, XIcon } from './Icons';
import { MESSAGES as INITIAL_MESSAGES } from '../constants';
import { Message } from '../types';

const Messages: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRecipient, setNewRecipient] = useState('');
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
      e.preventDefault();
      if(newRecipient && newMessage) {
          const newMsg: Message = {
              id: Date.now().toString(),
              name: newRecipient,
              avatar: `https://picsum.photos/seed/${newRecipient.replace(/\s/g,'')}/100/100`,
              message: newMessage,
              time: 'Just now',
              isOnline: true
          };
          setMessages([newMsg, ...messages]);
          setNewRecipient('');
          setNewMessage('');
          setIsModalOpen(false);
      }
  }

  return (
    <div className="bg-dark-card rounded-[32px] p-6 h-full flex flex-col relative">
       <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-3">
            <div className="p-2 bg-dark-bg rounded-full border border-white/5">
                <MessageSquareIcon className="text-gray-400" />
            </div>
            <h3 className="text-gray-200 font-medium">Messages</h3>
        </div>
        <button 
            onClick={() => setIsModalOpen(true)}
            className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center hover:bg-gray-200 transition-colors"
        >
            <PlusIcon />
        </button>
      </div>

      <div className="relative mb-6">
        <input 
            type="text" 
            placeholder="Search message" 
            className="w-full bg-dark-bg border border-white/5 rounded-full py-3 pl-10 pr-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-white/20"
        />
        <SearchIcon className="absolute left-3.5 top-3.5 text-gray-600 w-4 h-4" />
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide space-y-4">
        {messages.map((msg) => (
            <div key={msg.id} className="flex items-center space-x-3 group cursor-pointer p-2 rounded-2xl hover:bg-white/5 transition-colors">
                <div className="relative">
                    <img src={msg.avatar} alt={msg.name} className="w-10 h-10 rounded-full object-cover" />
                    {msg.isOnline && (
                        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-neon-lime rounded-full border-2 border-dark-card"></div>
                    )}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline mb-0.5">
                        <h4 className="text-sm font-medium text-white truncate">{msg.name}</h4>
                        <span className="text-[10px] text-gray-500">{msg.time}</span>
                    </div>
                    <p className="text-xs text-gray-400 truncate group-hover:text-gray-300">{msg.message}</p>
                </div>
            </div>
        ))}

        {/* Visual filler for "More" */}
         <div className="flex items-center space-x-3 p-2 opacity-50">
             <div className="w-10 h-10 rounded-full bg-yellow-600/20 border border-yellow-500/30 flex items-center justify-center">
                 <img src="https://picsum.photos/seed/another/100/100" className="w-full h-full rounded-full opacity-50" />
             </div>
             <div className="flex-1">
                 <div className="h-2 w-20 bg-gray-700 rounded mb-2"></div>
                 <div className="h-2 w-32 bg-gray-800 rounded"></div>
             </div>
         </div>
      </div>

      {/* New Message Modal */}
      {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
              <div className="bg-[#18181B] border border-white/10 rounded-3xl w-full max-w-sm p-6 relative shadow-2xl z-10">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-white">New Message</h3>
                    <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
                        <XIcon />
                    </button>
                  </div>
                  <form onSubmit={handleSendMessage} className="space-y-4">
                      <div>
                          <label className="block text-xs font-medium text-gray-400 mb-1">Recipient</label>
                          <input 
                            type="text" 
                            value={newRecipient}
                            onChange={(e) => setNewRecipient(e.target.value)}
                            className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-neon-lime/50"
                            placeholder="Type name..."
                            required
                          />
                      </div>
                      <div>
                          <label className="block text-xs font-medium text-gray-400 mb-1">Message</label>
                          <textarea 
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-neon-lime/50 resize-none h-24"
                            placeholder="Type your message..."
                            required
                          />
                      </div>
                      <button 
                        type="submit" 
                        className="w-full bg-neon-lime text-black font-semibold py-3 rounded-xl hover:bg-neon-lime/90 transition-colors"
                      >
                          Send Message
                      </button>
                  </form>
              </div>
          </div>
      )}
    </div>
  );
};

export default Messages;