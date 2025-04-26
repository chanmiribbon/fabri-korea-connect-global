
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
    KR: "채팅 상담",
    EN: "Chat Support",
    CN: "聊天支持",
    JP: "チャットサポート"
  };

  return (
    <Button
      onClick={onClick}
      className="rounded-full w-14 h-14 fixed bottom-20 right-6 shadow-lg bg-fabri-blue hover:bg-fabri-blue/90 z-40"
      aria-label={tooltipText[language]}
      title={tooltipText[language]}
    >
      <MessageCircle className="w-6 h-6 text-white" />
    </Button>
  );
};

export default ChatButton;
