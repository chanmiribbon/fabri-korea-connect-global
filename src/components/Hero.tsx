
import React from "react";
import { Button } from "@/components/ui/button";
import { Globe, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

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
              전통시장을 세계로!
              <span className="block text-fabri-purple mt-2">
                한국 B2B·B2C 연결 플랫폼
              </span>
            </h1>
            
            <p className="mt-6 text-xl text-gray-300 max-w-2xl mx-auto">
              동대문과 남대문 시장의 우수한 제품을 전세계 바이어와 소비자에게 소개합니다
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => navigate('/buyer')}
                className="group bg-fabri-purple hover:bg-fabri-purple/90 text-white px-8 py-3 text-lg flex items-center gap-2"
              >
                <Globe className="w-5 h-5" />
                해외 바이어로 둘러보기
              </Button>
              <Button
                onClick={() => navigate('/consumer')}
                variant="outline"
                className="group bg-white/10 hover:bg-white/20 text-white border-white/30 px-8 py-3 text-lg flex items-center gap-2"
              >
                <Users className="w-5 h-5" />
                일반 소비자로 둘러보기
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
