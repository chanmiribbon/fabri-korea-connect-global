
import React, { useState, useEffect, useRef } from 'react';
import { X, Send, User, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useLanguageStore, Language } from '@/hooks/useLanguageStore';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'agent';
  timestamp: Date;
  originalText?: string;
};

type QuickReply = {
  id: string;
  text: Record<Language, string>;
};

const ChatWidget = ({ onClose }: { onClose: () => void }) => {
  const { language } = useLanguageStore();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const translations = {
    KR: {
      title: "고객 상담",
      subtitle: "문의사항을 입력해주세요",
      placeholder: "메시지 입력...",
      send: "전송",
      offlineMessage: "상담원이 현재 오프라인입니다. 메시지를 남겨주시면 영업시간에 답변드리겠습니다.",
      agentTyping: "상담원이 입력중...",
      welcomeMessage: "안녕하세요! Fabri Korea Connect Global에 오신 것을 환영합니다. 무엇을 도와드릴까요?",
      emailChat: "대화 내용 이메일로 받기"
    },
    EN: {
      title: "Customer Support",
      subtitle: "How can we help you today?",
      placeholder: "Type a message...",
      send: "Send",
      offlineMessage: "Our agents are currently offline. Leave a message and we'll get back to you during business hours.",
      agentTyping: "Agent is typing...",
      welcomeMessage: "Hello! Welcome to Fabri Korea Connect Global. How can I help you today?",
      emailChat: "Email chat history"
    },
    CN: {
      title: "客户支持",
      subtitle: "我们如何帮助您？",
      placeholder: "输入消息...",
      send: "发送",
      offlineMessage: "我们的客服人员当前不在线。请留言，我们会在工作时间回复您。",
      agentTyping: "客服正在输入...",
      welcomeMessage: "您好！欢迎访问 Fabri Korea Connect Global。我今天能为您做些什么？",
      emailChat: "通过电子邮件接收聊天记录"
    },
    JP: {
      title: "カスタマーサポート",
      subtitle: "どのようにお手伝いできますか？",
      placeholder: "メッセージを入力...",
      send: "送信",
      offlineMessage: "現在、担当者はオフラインです。メッセージを残していただければ、営業時間内にご返信いたします。",
      agentTyping: "担当者が入力中...",
      welcomeMessage: "こんにちは！Fabri Korea Connect Globalへようこそ。本日はどのようにお手伝いできますか？",
      emailChat: "チャット履歴をメールで受け取る"
    }
  };

  const quickReplies: QuickReply[] = [
    {
      id: '1',
      text: {
        KR: "제품 문의",
        EN: "Product Inquiry",
        CN: "产品咨询",
        JP: "製品に関するお問い合わせ"
      }
    },
    {
      id: '2',
      text: {
        KR: "배송 문의",
        EN: "Shipping Question",
        CN: "配送问题",
        JP: "配送に関するご質問"
      }
    },
    {
      id: '3',
      text: {
        KR: "계정 지원",
        EN: "Account Support",
        CN: "账户支持",
        JP: "アカウントサポート"
      }
    }
  ];

  useEffect(() => {
    // Add welcome message when chat widget is opened
    const welcomeMessage = {
      id: Date.now().toString(),
      text: translations[language].welcomeMessage,
      sender: 'agent' as const,
      timestamp: new Date()
    };
    
    setMessages([welcomeMessage]);
    
    // Focus the input field when the chat is opened
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [language]);

  useEffect(() => {
    // Scroll to bottom when new messages are added
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setMessage('');
    
    // Simulate agent typing
    setIsTyping(true);
    
    // Simulate agent response (would be replaced with actual API call)
    setTimeout(() => {
      setIsTyping(false);
      
      // Simulate translation (would be replaced with actual translation API)
      const translatedResponse = mockTranslateToUserLanguage(
        "감사합니다. 문의하신 내용에 대해 확인해보겠습니다.", 
        language
      );
      
      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: translatedResponse,
        sender: 'agent',
        timestamp: new Date(),
        originalText: "감사합니다. 문의하신 내용에 대해 확인해보겠습니다."
      };
      
      setMessages(prevMessages => [...prevMessages, agentMessage]);
    }, 1500);
  };

  const handleQuickReply = (replyText: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: replyText,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    
    // Simulate agent typing
    setIsTyping(true);
    
    // Simulate agent response
    setTimeout(() => {
      setIsTyping(false);
      
      // Simulate translation (would be replaced with actual translation API)
      const translatedResponse = mockTranslateToUserLanguage(
        "해당 문의에 대해 도와드리겠습니다. 더 자세한 내용을 알려주시겠어요?", 
        language
      );
      
      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: translatedResponse,
        sender: 'agent',
        timestamp: new Date(),
        originalText: "해당 문의에 대해 도와드리겠습니다. 더 자세한 내용을 알려주시겠어요?"
      };
      
      setMessages(prevMessages => [...prevMessages, agentMessage]);
    }, 1500);
  };

  // Mock translation function (would be replaced with actual API)
  const mockTranslateToUserLanguage = (text: string, targetLang: Language): string => {
    // This would be replaced with actual translation API
    if (targetLang === "KR") return text;
    
    const mockTranslations: Record<string, Record<Language, string>> = {
      "감사합니다. 문의하신 내용에 대해 확인해보겠습니다.": {
        KR: "감사합니다. 문의하신 내용에 대해 확인해보겠습니다.",
        EN: "Thank you. I'll check the details of your inquiry.",
        CN: "谢谢。我将查看您询问的详细信息。",
        JP: "ありがとうございます。お問い合わせの詳細を確認いたします。"
      },
      "해당 문의에 대해 도와드리겠습니다. 더 자세한 내용을 알려주시겠어요?": {
        KR: "해당 문의에 대해 도와드리겠습니다. 더 자세한 내용을 알려주시겠어요?",
        EN: "I'll help you with this inquiry. Could you provide more details?",
        CN: "我将帮助您解决这个问题。您能提供更多详细信息吗？",
        JP: "このお問い合わせについてお手伝いいたします。もう少し詳しく教えていただけますか？"
      }
    };
    
    return mockTranslations[text]?.[targetLang] || text;
  };
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <div className="fixed bottom-24 right-6 w-80 sm:w-96 bg-white rounded-xl shadow-xl z-50 flex flex-col overflow-hidden border border-gray-200">
      {/* Chat Header */}
      <div className="bg-fabri-blue text-white p-4 flex justify-between items-center">
        <div>
          <h3 className="font-semibold">{translations[language].title}</h3>
          <p className="text-xs opacity-80">{translations[language].subtitle}</p>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-fabri-blue/90">
          <X className="h-5 w-5" />
        </Button>
      </div>
      
      {/* Chat Messages */}
      <ScrollArea className="flex-1 p-4 h-80" ref={scrollRef}>
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  msg.sender === 'user'
                    ? 'bg-fabri-blue text-white rounded-br-none'
                    : 'bg-gray-100 text-gray-800 rounded-bl-none'
                }`}
              >
                {msg.sender === 'agent' && (
                  <div className="flex items-center mb-1 text-xs text-gray-500">
                    <User className="h-3 w-3 mr-1" />
                    <span>Support</span>
                  </div>
                )}
                <p className="text-sm">{msg.text}</p>
                <span className="text-xs opacity-70 block text-right mt-1">
                  {formatTime(msg.timestamp)}
                </span>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 text-gray-500 rounded-lg p-3 text-sm italic">
                {translations[language].agentTyping}
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      
      {/* Quick Replies */}
      {messages.length <= 2 && (
        <div className="p-2 bg-gray-50">
          <div className="flex flex-wrap gap-2">
            {quickReplies.map((reply) => (
              <Button 
                key={reply.id}
                variant="outline" 
                size="sm" 
                className="text-xs hover:bg-gray-100"
                onClick={() => handleQuickReply(reply.text[language])}
              >
                {reply.text[language]}
              </Button>
            ))}
          </div>
        </div>
      )}
      
      <Separator />
      
      {/* Chat Input */}
      <div className="p-3 flex items-center gap-2">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={translations[language].placeholder}
          className="flex-1"
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          ref={inputRef}
        />
        <Button 
          onClick={handleSendMessage} 
          disabled={!message.trim()} 
          size="icon"
          className="bg-fabri-blue hover:bg-fabri-blue/90"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Email Chat History Option */}
      <div className="bg-gray-50 p-2 flex justify-end">
        <Button variant="ghost" size="sm" className="text-xs flex items-center gap-1 text-gray-500">
          <span>{translations[language].emailChat}</span>
          <ArrowRight className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
};

export default ChatWidget;
