
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Globe, Package, Truck, Languages } from "lucide-react";

interface FeaturesProps {
  language: string;
}

const FeaturesSection: React.FC<FeaturesProps> = ({ language }) => {
  const features = [
    {
      icon: <Globe className="h-10 w-10 text-fabri-purple" />,
      title: language === "KR" ? "글로벌 비즈니스" : "Global Business",
      description:
        language === "KR"
          ? "전 세계 고객에게 한국 원단과 부자재를 제공합니다"
          : "Providing Korean fabrics and materials to customers worldwide"
    },
    {
      icon: <Languages className="h-10 w-10 text-fabri-purple" />,
      title: language === "KR" ? "AI 자동 번역" : "AI Translation",
      description:
        language === "KR"
          ? "실시간 다국어 지원으로 언어 장벽 없는 쇼핑 경험"
          : "Real-time multilingual support for barrier-free shopping experience"
    },
    {
      icon: <Package className="h-10 w-10 text-fabri-purple" />,
      title: language === "KR" ? "프리미엄 품질" : "Premium Quality",
      description:
        language === "KR"
          ? "동대문과 남대문 시장의 엄선된 최상급 제품만을 제공"
          : "Carefully selected top-tier products from Dongdaemun and Namdaemun markets"
    },
    {
      icon: <Truck className="h-10 w-10 text-fabri-purple" />,
      title: language === "KR" ? "글로벌 배송" : "Global Shipping",
      description:
        language === "KR"
          ? "신속하고 안전한 전 세계 배송 서비스 제공"
          : "Fast and secure worldwide shipping services"
    }
  ];

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-fabri-darkPurple sm:text-4xl">
            {language === "KR" ? "비즈니스 강점" : "Our Business Advantages"}
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            {language === "KR"
              ? "FabriKorea와 함께하는 글로벌 비즈니스의 장점"
              : "The benefits of global business with FabriKorea"}
          </p>
        </div>

        <div className="mt-12 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-fabri-darkPurple mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
