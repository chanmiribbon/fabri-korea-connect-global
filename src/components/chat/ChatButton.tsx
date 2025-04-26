
import React from 'react';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguageStore } from '@/hooks/useLanguageStore';

interface ChatButtonProps {
  onClick: () => void;
}

const ChatButton = ({ onClick }: ChatButtonProps) => {
  const { language } = useLanguageStore();
  
  const tooltipText = {
    KR: "Fabri Global Assistant",
    EN: "Fabri Global Assistant",
    CN: "Fabri Global Assistant",
    JP: "Fabri Global Assistant"
  };

  return (
    <Button
      onClick={onClick}
      className="rounded-full w-16 h-16 fixed bottom-20 right-6 shadow-lg bg-fabri-blue hover:bg-fabri-blue/90 z-40 flex flex-col items-center justify-center transition-all duration-300 hover:scale-110"
      aria-label={tooltipText[language]}
      title={tooltipText[language]}
    >
      <MessageCircle className="w-7 h-7 text-white" />
      <span className="text-[9px] text-white font-medium mt-0.5">Chat</span>
    </Button>
  );
};

export default ChatButton;
