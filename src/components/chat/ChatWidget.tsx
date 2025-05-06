
import React, { useState, useEffect, useRef } from 'react';
import { X, Send, User, ArrowRight, Globe, Loader2, Mail, Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useLanguageStore, Language } from '@/hooks/useLanguageStore';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from '@/hooks/use-toast';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'agent';
  timestamp: Date;
  originalText?: string;
  language?: Language; // Add language property to track message language
};

type QuickReply = {
  id: string;
  text: Record<Language, string>;
  icon?: React.ReactNode;
};

const ChatWidget = ({ onClose }: { onClose: () => void }) => {
  const { language, changeLanguage } = useLanguageStore();
  const [detectedLanguage, setDetectedLanguage] = useState<Language | null>(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [email, setEmail] = useState('');
  const [showEmailInput, setShowEmailInput] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  // Simple questions and answers for immediate response
  const simpleQAs = {
    KR: {
      "안녕": "안녕하세요! 무엇을 도와드릴까요?",
      "안녕하세요": "안녕하세요! 패브리 코리아입니다. 어떻게 도와드릴까요?",
      "고객센터": "고객센터는 평일 오전 9시부터 오후 6시까지 운영됩니다. 전화번호: 02-123-4567",
      "배송": "배송은 주문 확인 후 1-2일 내에 시작되며, 국내 배송은 2-3일, 해외 배송은 7-14일 정도 소요됩니다.",
      "환불": "환불은 상품 수령 후 7일 이내에 가능합니다. 고객센터로 연락해 주세요.",
      "영업시간": "영업시간은 평일 오전 9시부터 오후 6시까지입니다."
    },
    EN: {
      "hi": "Hello! How can I help you?",
      "hello": "Hello! This is Fabri Korea. How may I assist you?",
      "customer service": "Our customer service is available on weekdays from 9 AM to 6 PM. Phone: 02-123-4567",
      "shipping": "Shipping starts within 1-2 days after order confirmation. Domestic shipping takes 2-3 days, international shipping takes 7-14 days.",
      "refund": "Refunds are available within 7 days of receiving the product. Please contact our customer service.",
      "business hours": "Our business hours are from 9 AM to 6 PM on weekdays."
    },
    CN: {
      "你好": "你好！我能帮您什么忙？",
      "您好": "您好！这里是Fabri Korea。我能帮您什么忙？",
      "客服": "我们的客服时间为工作日上午9点至下午6点。电话：02-123-4567",
      "配送": "订单确认后1-2天内开始配送。国内配送需要2-3天，国际配送需要7-14天。",
      "退款": "收到商品后7天内可以退款。请联系我们的客服。",
      "营业时间": "我们的营业时间是工作日上午9点至下午6点。"
    },
    JP: {
      "こんにちは": "こんにちは！どのようにお手伝いできますか？",
      "はじめまして": "こんにちは！Fabri Koreaです。どうぞよろしくお願いいたします。",
      "カスタマーサービス": "カスタマーサービスは平日の午前9時から午後6時まで営業しています。電話番号：02-123-4567",
      "配送": "配送は注文確認後1〜2日以内に開始され、国内配送は2〜3日、海外配送は7〜14日ほどかかります。",
      "返金": "返金は商品受領後7日以内に可能です。カスタマーサービスにご連絡ください。",
      "営業時間": "営業時間は平日の午前9時から午後6時までです。"
    }
  };
  
  const translations = {
    KR: {
      title: "Fabri Global Assistant",
      subtitle: "문의사항을 입력해주세요",
      placeholder: "메시지 입력...",
      send: "전송",
      offlineMessage: "상담원이 현재 오프라인입니다. 메시지를 남겨주시면 영업시간에 답변드리겠습니다.",
      agentTyping: "상담원이 입력중...",
      translating: "메시지 번역중...",
      welcomeMessage: "안녕하세요! Fabri Global Assistant입니다. 무엇을 도와드릴까요?",
      emailChat: "대화 내용 이메일로 받기",
      emailPlaceholder: "이메일 주소를 입력하세요",
      sendEmail: "보내기",
      cancelEmail: "취소",
      humanAgent: "상담원 연결하기",
      changeLanguage: "언어 변경",
      languageSwitched: "언어가 변경되었습니다",
      emailSent: "이메일이 성공적으로 전송되었습니다",
      invalidEmail: "유효한 이메일 주소를 입력해주세요"
    },
    EN: {
      title: "Fabri Global Assistant",
      subtitle: "How can we help you today?",
      placeholder: "Type a message...",
      send: "Send",
      offlineMessage: "Our agents are currently offline. Leave a message and we'll get back to you during business hours.",
      agentTyping: "Agent is typing...",
      translating: "Translating message...",
      welcomeMessage: "Hello! I'm Fabri Global Assistant. How can I help you today?",
      emailChat: "Email chat history",
      emailPlaceholder: "Enter your email address",
      sendEmail: "Send",
      cancelEmail: "Cancel",
      humanAgent: "Connect to human agent",
      changeLanguage: "Change language",
      languageSwitched: "Language has been changed",
      emailSent: "Email sent successfully",
      invalidEmail: "Please enter a valid email address"
    },
    CN: {
      title: "Fabri Global Assistant",
      subtitle: "我们如何帮助您？",
      placeholder: "输入消息...",
      send: "发送",
      offlineMessage: "我们的客服人员当前不在线。请留言，我们会在工作时间回复您。",
      agentTyping: "客服正在输入...",
      translating: "正在翻译消息...",
      welcomeMessage: "您好！我是Fabri Global Assistant。今天我能为您做些什么？",
      emailChat: "通过电子邮件接收聊天记录",
      emailPlaceholder: "输入您的电子邮件地址",
      sendEmail: "发送",
      cancelEmail: "取消",
      humanAgent: "连接到人工客服",
      changeLanguage: "更改语言",
      languageSwitched: "语言已更改",
      emailSent: "电子邮件发送成功",
      invalidEmail: "请输入有效的电子邮件地址"
    },
    JP: {
      title: "Fabri Global Assistant",
      subtitle: "どのようにお手伝いできますか？",
      placeholder: "メッセージを入力...",
      send: "送信",
      offlineMessage: "現在、担当者はオフラインです。メッセージを残していただければ、営業時間内にご返信いたします。",
      agentTyping: "担当者が入力中...",
      translating: "メッセージを翻訳中...",
      welcomeMessage: "こんにちは！Fabri Global Assistantです。本日はどのようにお手伝いできますか？",
      emailChat: "チャット履歴をメールで受け取る",
      emailPlaceholder: "メールアドレスを入力してください",
      sendEmail: "送信",
      cancelEmail: "キャンセル",
      humanAgent: "人間のエージェントに接続",
      changeLanguage: "言語を変更",
      languageSwitched: "言語が変更されました",
      emailSent: "メールが正常に送信されました",
      invalidEmail: "有効なメールアドレスを入力してください"
    }
  };

  const languageOptions = [
    { code: "KR", name: "한국어", flag: "🇰🇷" },
    { code: "EN", name: "English", flag: "🇺🇸" },
    { code: "CN", name: "中文", flag: "🇨🇳" },
    { code: "JP", name: "日本語", flag: "🇯🇵" },
  ];

  const quickReplies: QuickReply[] = [
    {
      id: '1',
      text: {
        KR: "📦 배송 문의",
        EN: "📦 Shipping Inquiry",
        CN: "📦 配送查询",
        JP: "📦 配送に関するお問い合わせ"
      }
    },
    {
      id: '2',
      text: {
        KR: "🎁 제품 재고 문의",
        EN: "🎁 Product Stock Inquiry",
        CN: "🎁 产品库存查询",
        JP: "🎁 製品在庫に関するお問い合わせ"
      }
    },
    {
      id: '3',
      text: {
        KR: "🛒 주문/결제 문의",
        EN: "🛒 Order/Payment Inquiry",
        CN: "🛒 订单/付款查询",
        JP: "🛒 注文/支払いに関するお問い合わせ"
      }
    },
    {
      id: '4',
      text: {
        KR: "🛠 맞춤 견적 요청",
        EN: "🛠 Custom Quote Request",
        CN: "🛠 定制报价请求",
        JP: "🛠 カスタム見積もりリクエスト"
      }
    }
  ];

  useEffect(() => {
    // Add welcome message when chat widget is opened
    const welcomeMessage = {
      id: Date.now().toString(),
      text: translations[language].welcomeMessage,
      sender: 'agent' as const,
      timestamp: new Date(),
      language: language // Set the language of the welcome message
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
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isTyping, isTranslating]);

  // Function to detect language from text input
  const detectMessageLanguage = (text: string): Language => {
    // A very basic language detection logic
    // In a real implementation, this would use a proper language detection API
    const koreanChars = /[\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F\uA960-\uA97F\uD7B0-\uD7FF]/;
    const chineseChars = /[\u4E00-\u9FFF\u3400-\u4DBF\uF900-\uFAFF]/;
    const japaneseChars = /[\u3040-\u309F\u30A0-\u30FF\uFF00-\uFFEF\u4E00-\u9FAF]/;
    
    if (koreanChars.test(text)) return "KR";
    if (chineseChars.test(text)) return "CN";
    if (japaneseChars.test(text)) return "JP";
    return "EN"; // Default to English if no specific characters detected
  };

  // Check if the message is a simple question that can be answered immediately
  const checkForSimpleQuestion = (text: string, lang: Language): string | null => {
    const qaDict = simpleQAs[lang] || simpleQAs.EN;
    const lowerText = text.toLowerCase();
    
    // Check for exact matches first
    if (qaDict[text]) return qaDict[text];
    
    // Check for partial matches (if the question contains the key)
    for (const [key, answer] of Object.entries(qaDict)) {
      if (lowerText.includes(key.toLowerCase())) {
        return answer;
      }
    }
    
    return null; // No simple answer found
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // Detect language from user's message
    const userMessageLanguage = detectMessageLanguage(message);
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: 'user',
      timestamp: new Date(),
      language: userMessageLanguage
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setMessage('');
    
    // Update detected language if it's the first message
    if (!detectedLanguage && messages.length <= 1) {
      setDetectedLanguage(userMessageLanguage);
    }
    
    // Check if this is a simple question that can be answered immediately
    const simpleAnswer = checkForSimpleQuestion(message, userMessageLanguage);
    
    if (simpleAnswer) {
      // Provide immediate response for simple questions
      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: simpleAnswer,
        sender: 'agent',
        timestamp: new Date(),
        language: userMessageLanguage
      };
      
      setMessages(prevMessages => [...prevMessages, agentMessage]);
    } else {
      // Simulate translation loading
      setIsTranslating(true);
      
      setTimeout(() => {
        setIsTranslating(false);
        
        // Simulate agent typing after translation
        setIsTyping(true);
        
        // Use the user's language for the response
        const responseLanguage = userMessageLanguage;
        
        // Simulate agent response (would be replaced with actual API call)
        setTimeout(() => {
          setIsTyping(false);
          
          // Generate response in the same language as the user's message
          const responseText = getResponseInLanguage(responseLanguage);
          
          const agentMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: responseText,
            sender: 'agent',
            timestamp: new Date(),
            language: responseLanguage
          };
          
          setMessages(prevMessages => [...prevMessages, agentMessage]);
        }, 1500);
      }, 1000);
    }
  };

  // Get appropriate response based on detected language
  const getResponseInLanguage = (lang: Language): string => {
    const responses = {
      KR: "감사합니다. 문의하신 내용에 대해 확인해보겠습니다. 잠시만 기다려주세요.",
      EN: "Thank you. I'll check the details of your inquiry. Please wait a moment.",
      CN: "谢谢。我将检查您询问的详细信息。请稍等。",
      JP: "ありがとうございます。お問い合わせの詳細を確認いたします。少々お待ちください。"
    };
    
    return responses[lang];
  };

  const handleQuickReply = (replyText: string) => {
    // Detect language from the quick reply text
    const replyLanguage = detectMessageLanguage(replyText);
    
    const userMessage: Message = {
      id: Date.now().toString(),
      text: replyText,
      sender: 'user',
      timestamp: new Date(),
      language: replyLanguage
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    
    // Simulate translation loading
    setIsTranslating(true);
    
    setTimeout(() => {
      setIsTranslating(false);
      
      // Simulate agent typing
      setIsTyping(true);
      
      // Simulate agent response
      setTimeout(() => {
        setIsTyping(false);
        
        // Generate response in the same language as the quick reply
        const responseText = {
          KR: "해당 문의에 대해 도와드리겠습니다. 더 자세한 내용을 알려주시겠어요?",
          EN: "I'll help you with this inquiry. Could you provide more details?",
          CN: "我将帮助您解决这个问题。您能提供更多详细信息吗？",
          JP: "このお問い合わせについてお手伝いいたします。もう少し詳しく教えていただけますか？"
        }[replyLanguage];
        
        const agentMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: responseText,
          sender: 'agent',
          timestamp: new Date(),
          language: replyLanguage
        };
        
        setMessages(prevMessages => [...prevMessages, agentMessage]);
      }, 1500);
    }, 1000);
  };

  const handleLanguageChange = (newLanguage: Language) => {
    changeLanguage(newLanguage);
    toast({
      title: translations[newLanguage].languageSwitched,
      duration: 3000,
    });
  };

  const handleSendEmail = () => {
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: translations[language].invalidEmail,
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    // Mock email sending (would be replaced with actual API call)
    toast({
      title: translations[language].emailSent,
      duration: 3000,
    });
    
    // Reset email input
    setEmail('');
    setShowEmailInput(false);
  };

  const handleHumanAgent = () => {
    // Use the last user message's language or fall back to UI language
    const lastUserMessage = [...messages].reverse().find(msg => msg.sender === 'user');
    const responseLanguage = lastUserMessage?.language || language;
    
    const responseText = {
      KR: "상담원 연결 요청이 접수되었습니다. 잠시만 기다려주세요.",
      EN: "Your request to connect with a human agent has been received. Please wait a moment.",
      CN: "您与人工客服连接的请求已收到。请稍等。",
      JP: "人間のエージェントとの接続リクエストを受け付けました。少々お待ちください。"
    }[responseLanguage];
    
    const systemMessage: Message = {
      id: Date.now().toString(),
      text: responseText,
      sender: 'agent',
      timestamp: new Date(),
      language: responseLanguage
    };
    
    setMessages(prevMessages => [...prevMessages, systemMessage]);
  };
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <div className="fixed bottom-24 right-6 w-80 sm:w-96 bg-white rounded-xl shadow-xl z-50 flex flex-col overflow-hidden border border-gray-200">
      {/* Chat Header */}
      <div className="bg-fabri-cherry text-gray-700 p-4 flex flex-col">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-semibold">{translations[language].title}</h3>
            <p className="text-xs opacity-80">{translations[language].subtitle}</p>
          </div>
          <Button 
            variant="cherry" 
            size="icon" 
            onClick={onClose} 
            className="text-gray-700 hover:bg-fabri-cherry/90"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        {/* Language Selector */}
        <div className="mt-2 flex items-center">
          <Globe className="h-4 w-4 mr-1 text-gray-700/80" />
          <Select defaultValue={language} onValueChange={(value: Language) => handleLanguageChange(value)}>
            <SelectTrigger className="h-7 w-40 bg-white/40 border-white/20 text-gray-700 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {languageOptions.map((option) => (
                <SelectItem key={option.code} value={option.code} className="text-sm">
                  <span className="mr-2">{option.flag}</span>
                  {option.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
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
          
          {isTranslating && (
            <div className="flex justify-start">
              <div className="bg-gray-100 text-gray-500 rounded-lg p-3 text-sm flex items-center gap-2">
                <Loader2 className="h-3 w-3 animate-spin" />
                {translations[language].translating}
              </div>
            </div>
          )}
          
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
          <div className="grid grid-cols-2 gap-2">
            {quickReplies.map((reply) => (
              <Button 
                key={reply.id}
                variant="outline" 
                size="sm" 
                className="text-xs hover:bg-gray-100 whitespace-normal h-auto py-2 text-left flex justify-start"
                onClick={() => handleQuickReply(reply.text[language])}
              >
                {reply.text[language]}
              </Button>
            ))}
          </div>
        </div>
      )}
      
      {/* Human Agent Button */}
      {messages.length > 2 && (
        <div className="p-2 bg-gray-50 flex justify-center">
          <Button
            variant="secondary"
            size="sm"
            className="text-xs flex items-center gap-1"
            onClick={handleHumanAgent}
          >
            <User className="h-3 w-3" />
            <span>{translations[language].humanAgent}</span>
          </Button>
        </div>
      )}
      
      <Separator />
      
      {/* Email Input for Chat History */}
      {showEmailInput ? (
        <div className="p-3 flex items-center gap-2">
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={translations[language].emailPlaceholder}
            type="email"
            className="flex-1"
          />
          <Button
            onClick={handleSendEmail}
            size="sm"
            className="bg-fabri-blue hover:bg-fabri-blue/90"
          >
            <Send className="h-4 w-4" />
          </Button>
          <Button
            onClick={() => setShowEmailInput(false)}
            size="sm"
            variant="ghost"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <>
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
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs flex items-center gap-1 text-gray-500"
              onClick={() => setShowEmailInput(true)}
            >
              <Mail className="h-3 w-3" />
              <span>{translations[language].emailChat}</span>
              <ArrowRight className="h-3 w-3" />
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatWidget;
