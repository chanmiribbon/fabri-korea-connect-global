
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SellerSidebar from "@/components/seller/SellerSidebar";
import { useLanguageStore } from "@/hooks/useLanguageStore";

interface SellerLayoutProps {
  children: React.ReactNode;
  currentPage: string;
}

const SellerLayout = ({ children, currentPage }: SellerLayoutProps) => {
  const { language } = useLanguageStore();
  
  const getSellerCenterTitle = () => {
    switch (language) {
      case "KR": return "판매자 센터";
      case "CN": return "卖家中心";
      case "JP": return "販売者センター";
      default: return "Seller Center";
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 pt-16">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold my-6">{getSellerCenterTitle()}</h1>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-64 shrink-0">
              <SellerSidebar currentPage={currentPage} />
            </div>
            <div className="flex-1">
              {children}
            </div>
          </div>
        </div>
      </div>
      <Footer language={language} />
    </div>
  );
};

export default SellerLayout;
