
import React from "react";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguageStore } from "@/hooks/useLanguageStore";
import { SidebarProvider } from "@/components/ui/sidebar";
import SellerSidebar from "@/components/seller/SellerSidebar";

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
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <SellerSidebar currentPage={currentPage} />
        <div className="flex-1">
          <header className="bg-white border-b border-gray-200 px-4 h-16 flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-800">
              {getSellerCenterTitle()}
            </h1>
            <Button variant="ghost" size="sm" className="text-gray-600 flex items-center gap-2">
              <LogOut className="h-4 w-4" />
              {language === "KR" ? "로그아웃" : 
               language === "CN" ? "登出" : 
               language === "JP" ? "ログアウト" : 
               "Log Out"}
            </Button>
          </header>
          <main className="p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default SellerLayout;
