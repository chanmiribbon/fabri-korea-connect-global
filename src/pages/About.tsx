
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguageStore } from "@/hooks/useLanguageStore";

const About = () => {
  const { language } = useLanguageStore();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow pt-16">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-fabri-darkPurple mb-6">
            {language === "KR" ? "회사 소개" : "About Us"}
          </h1>
          <p className="text-lg text-gray-700">
            {language === "KR" 
              ? "FabriKorea는 동대문과 남대문 시장의 고품질 원단과 자재를 글로벌 바이어와 연결하는 프리미엄 B2B/B2C 플랫폼입니다."
              : "FabriKorea is a premium B2B/B2C platform connecting global buyers with high-quality Korean fabrics and materials from Dongdaemun and Namdaemun markets."
            }
          </p>
        </div>
      </div>
      <Footer language={language} />
    </div>
  );
};

export default About;
