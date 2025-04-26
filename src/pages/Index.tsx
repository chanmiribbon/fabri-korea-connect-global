
import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CategorySection from "@/components/CategorySection";
import FeaturesSection from "@/components/FeaturesSection";
import TranslationDemo from "@/components/TranslationDemo";
import BusinessInfo from "@/components/BusinessInfo";
import Footer from "@/components/Footer";
import MarketStats from "@/components/MarketStats";
import GlobalInfluenceGallery from "@/components/GlobalInfluenceGallery";
import BottomNav from "@/components/BottomNav";
import ComingSoonFeatures from "@/components/ComingSoonFeatures";
import { useLanguageStore } from "@/hooks/useLanguageStore";

const Index = () => {
  const { language } = useLanguageStore();
  
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
        <ComingSoonFeatures />
        <BusinessInfo language={language} />
        <Footer language={language} />
      </div>
      <BottomNav />
    </div>
  );
};

export default Index;
