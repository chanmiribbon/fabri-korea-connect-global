
import React, { useState, useEffect } from 'react';
import ChatButton from './ChatButton';
import ChatWidget from './ChatWidget';
import { useLanguageStore } from '@/hooks/useLanguageStore';

const ChatSupport = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language } = useLanguageStore();
  
  // Close chat widget on route change
  useEffect(() => {
    const handleRouteChange = () => {
      // Don't close the chat when navigating between pages
      // so the conversation can continue
    };
    
    window.addEventListener('popstate', handleRouteChange);
    
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  return (
    <>
      {!isOpen && <ChatButton onClick={() => setIsOpen(true)} />}
      {isOpen && <ChatWidget onClose={() => setIsOpen(false)} />}
    </>
  );
};

export default ChatSupport;
