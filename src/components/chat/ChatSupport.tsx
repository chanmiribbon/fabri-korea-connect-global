
import React, { useState, useEffect } from 'react';
import ChatButton from './ChatButton';
import ChatWidget from './ChatWidget';
import { useLanguageStore } from '@/hooks/useLanguageStore';

const ChatSupport = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language } = useLanguageStore();
  
  // Preserve chat state when navigating between pages
  useEffect(() => {
    // Get chat state from localStorage on first render
    const savedChatState = localStorage.getItem('fabriChatOpen');
    if (savedChatState === 'true') {
      setIsOpen(true);
    }
    
    // Save chat state to localStorage when it changes
    localStorage.setItem('fabriChatOpen', isOpen.toString());
    
    // Close chat on beforeunload (browser/tab close)
    const handleBeforeUnload = () => {
      localStorage.setItem('fabriChatOpen', 'false');
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isOpen]);

  // Handle opening and closing the chat widget
  const handleOpenChat = () => {
    setIsOpen(true);
  };

  const handleCloseChat = () => {
    setIsOpen(false);
  };

  return (
    <>
      {!isOpen && <ChatButton onClick={handleOpenChat} />}
      {isOpen && <ChatWidget onClose={handleCloseChat} />}
    </>
  );
};

export default ChatSupport;
