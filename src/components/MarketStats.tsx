
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Globe, Building2, TrendingUp } from "lucide-react";

const MarketStats = () => {
  const stats = [
    {
      icon: <Users className="w-8 h-8 text-fabri-purple" />,
      value: "700,000+",
      label: "연간 바이어",
      description: "Annual Buyers"
    },
    {
      icon: <Globe className="w-8 h-8 text-fabri-purple" />,
      value: "65%",
      label: "외국인 비율",
      description: "International Visitors"
    },
    {
      icon: <Building2 className="w-8 h-8 text-fabri-purple" />,
      value: "20,000+",
      label: "매장 수",
      description: "Retail Shops"
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-fabri-purple" />,
      value: "$10B+",
      label: "연간 거래액",
      description: "Annual Trade Volume"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-fabri-purple">
          시장 현황 통계
          <span className="block text-lg font-normal text-gray-600 mt-2">
            Market Statistics
          </span>
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="flex flex-col items-center p-6 text-center">
                {stat.icon}
                <div className="mt-4">
                  <div className="text-3xl font-bold text-fabri-purple">{stat.value}</div>
                  <div className="text-sm font-medium text-gray-900 mt-1">{stat.label}</div>
                  <div className="text-xs text-gray-500">{stat.description}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarketStats;
