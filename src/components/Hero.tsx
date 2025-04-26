
import React from "react";
import { Button } from "@/components/ui/button";
import { Globe, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguageStore, Language } from "@/hooks/useLanguageStore";

// Define translations for all text content
const translations = {
  KR: {
    mainTitle: "전통시장을 세계로!",
    subTitle: "한국 B2B·B2C 연결 플랫폼",
    description: "동대문과 남대문 시장의 우수한 제품을 전세계 바이어와 소비자에게 소개합니다",
    buyerButton: "해외 바이어로 둘러보기",
    consumerButton: "일반 소비자로 둘러보기"
  },
  EN: {
    mainTitle: "Traditional Markets to the World!",
    subTitle: "Korea's B2B·B2C Connection Platform",
    description: "Introducing excellent products from Dongdaemun and Namdaemun markets to global buyers and consumers",
    buyerButton: "Browse as a Global Buyer",
    consumerButton: "Browse as a Consumer"
  },
  CN: {
    mainTitle: "传统市场走向世界!",
    subTitle: "韩国 B2B·B2C 连接平台",
    description: "向全球买家和消费者介绍东大门和南大门市场的优质产品",
    buyerButton: "以国际买家身份浏览",
    consumerButton: "以消费者身份浏览"
  },
  JP: {
    mainTitle: "伝統市場を世界へ!",
    subTitle: "韓国 B2B·B2C 接続プラットフォーム",
    description: "東大門と南大門市場の優れた製品を世界中のバイヤーと消費者に紹介します",
    buyerButton: "海外バイヤーとして閲覧",
    consumerButton: "一般消費者として閲覧"
  }
};

const Hero = () => {
  const navigate = useNavigate();
  const { language } = useLanguageStore();
  
  // Get the correct translations based on selected language
  const text = translations[language];

  return (
    <div className="relative min-h-[600px] bg-fabri-darkPurple text-white">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/lovable-uploads/44558176-9e68-4d94-9670-9fd2eb4808fe.png')`,
        }}
      >
        <div className="absolute inset-0 bg-fabri-darkPurple/70 backdrop-blur-sm"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-20 pb-16 sm:pt-24 sm:pb-20 lg:pt-32 lg:pb-28 xl:pt-36 xl:pb-32">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
              {text.mainTitle}
              <span className="block text-fabri-purple mt-2">
                {text.subTitle}
              </span>
            </h1>
            
            <p className="mt-6 text-xl text-gray-300 max-w-2xl mx-auto">
              {text.description}
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => navigate('/buyer-products')}
                className="group bg-fabri-blue hover:bg-fabri-blue/90 text-white px-8 py-3 text-lg flex items-center gap-2 transition-all duration-300"
              >
                <Globe className="w-5 h-5" />
                {text.buyerButton}
              </Button>
              <Button
                onClick={() => navigate('/consumer-products')}
                variant="outline"
                className="group bg-white/10 hover:bg-white/20 text-white border-white/30 px-8 py-3 text-lg flex items-center gap-2 transition-all duration-300"
              >
                <Users className="w-5 h-5" />
                {text.consumerButton}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
