
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductList from "@/components/ProductList";
import { useLanguageStore } from "@/hooks/useLanguageStore";
import { useAccessControl } from "@/hooks/useAccessControl";

const ConsumerProducts = () => {
  const { language } = useLanguageStore();
  const { canAccessRetail, isLoading } = useAccessControl();

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center pt-16">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-fabri-blue"></div>
        </div>
        <Footer language={language} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 pt-16 container mx-auto">
        <h1 className="text-3xl font-bold py-8 px-4">
          {language === "KR" ? "소매 제품" : 
           language === "CN" ? "零售产品" : 
           language === "JP" ? "小売製品" : 
           "Retail Products"}
        </h1>
        <ProductList category="clothing" />
      </div>
      <Footer language={language} />
    </div>
  );
};

export default ConsumerProducts;
