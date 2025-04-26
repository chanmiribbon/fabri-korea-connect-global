
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CategorySection from "@/components/CategorySection";
import FeaturesSection from "@/components/FeaturesSection";
import TranslationDemo from "@/components/TranslationDemo";
import BusinessInfo from "@/components/BusinessInfo";
import Footer from "@/components/Footer";
import MarketStats from "@/components/MarketStats";
import GlobalInfluenceGallery from "@/components/GlobalInfluenceGallery";

const Index = () => {
  const [language, setLanguage] = useState("KR");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="pt-16">
        <Hero />
        <MarketStats />
        <GlobalInfluenceGallery />
        <CategorySection language={language} />
        <FeaturesSection language={language} />
        <TranslationDemo language={language} />
        <BusinessInfo language={language} />
        <Footer language={language} />
      </div>
    </div>
  );
};

export default Index;
