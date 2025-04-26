
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, Truck, Globe } from "lucide-react";

const ComingSoonFeatures = () => {
  const features = [
    {
      icon: <MessageCircle className="h-12 w-12 text-fabri-purple" />,
      title: "실시간 채팅 상담",
      description: "곧 여러분을 위한 실시간 상담 서비스가 시작됩니다",
    },
    {
      icon: <Truck className="h-12 w-12 text-fabri-purple" />,
      title: "배송 추적 기능",
      description: "실시간으로 주문하신 상품의 배송 현황을 확인하실 수 있습니다",
    },
    {
      icon: <Globe className="h-12 w-12 text-fabri-purple" />,
      title: "국가별 특화관",
      description: "미국관, 동남아관 등 국가별 맞춤 상품관이 준비중입니다",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-fabri-darkPurple">
          추후 오픈 예정 기능
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="flex flex-col items-center text-center p-6">
                <div className="mb-4 p-3 rounded-full bg-fabri-lightPurple/20">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-fabri-darkPurple">
                  {feature.title}
                </h3>
                <p className="text-fabri-gray">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComingSoonFeatures;
