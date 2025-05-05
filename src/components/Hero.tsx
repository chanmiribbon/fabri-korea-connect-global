
import React from "react";
import { Button } from "@/components/ui/button";
import { Globe, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguageStore, Language } from "@/hooks/useLanguageStore";
import RegisterDialog from "./auth/RegisterDialog";

const translations = {
  KR: {
    slogan: "한국의 품질, 세계의 선택",
    mainTitle: "K-부자재로 세계와 연결하세요!",
    subTitle: "한국 패션 부자재 B2B·B2C 플랫폼",
    description: "동대문과 남대문 시장의 우수한 부자재를 전세계 바이어와 소비자에게 소개합니다",
    buyerButton: "해외 바이어로 둘러보기",
    consumerButton: "일반 소비자로 둘러보기",
    registerButton: "지금 회원가입하고 혜택 받기"
  },
  EN: {
    slogan: "Korean Quality, Global Choice",
    mainTitle: "Connect Globally with K-Materials!",
    subTitle: "Korea's Fashion Materials B2B·B2C Platform",
    description: "Introducing excellent materials from Dongdaemun and Namdaemun markets to global buyers and consumers",
    buyerButton: "Browse as a Global Buyer",
    consumerButton: "Browse as a Consumer",
    registerButton: "Register Now for Benefits"
  },
  CN: {
    slogan: "韩国品质，全球之选",
    mainTitle: "用韩国辅料连接全球!",
    subTitle: "韩国时尚辅料 B2B·B2C 平台",
    description: "向全球买家和消费者介绍东大门和南大门市场的优质辅料",
    buyerButton: "以国际买家身份浏览",
    consumerButton: "以消费者身份浏览",
    registerButton: "立即注册并获取优惠"
  },
  JP: {
    slogan: "韓国の品質、世界の選択",
    mainTitle: "K-副資材で世界とつながろう!",
    subTitle: "韓国ファッション副資材 B2B·B2C プラットフォーム",
    description: "東大門と南大門市場の優れた副資材を世界中のバイヤーと消費者に紹介します",
    buyerButton: "海外バイヤーとして閲覧",
    consumerButton: "一般消費者として閲覧",
    registerButton: "今すぐ登録して特典を受け取る"
  }
};

const Hero = () => {
  const navigate = useNavigate();
  const { language } = useLanguageStore();
  const text = translations[language];

  return (
    <div className="relative min-h-[600px] bg-fabri-darkPurple text-white">
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
            <div className="animate-fade-in">
              <h2 className="text-2xl sm:text-3xl mb-6 font-semibold tracking-wide text-white">
                {text.slogan}
              </h2>
            </div>
            
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
              <RegisterDialog language={language} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
