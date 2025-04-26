
import React from "react";
import { Navigate } from "react-router-dom";
import { useLanguageStore } from "@/hooks/useLanguageStore";
import SellerLayout from "@/components/seller/SellerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSellerAuth } from "@/hooks/useSellerAuth";
import { Package } from "lucide-react";

const SellerProducts = () => {
  const { language } = useLanguageStore();
  const { isSeller, isLoading } = useSellerAuth();
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-fabri-blue"></div>
      </div>
    );
  }
  
  if (!isSeller) {
    return <Navigate to="/access-denied" />;
  }
  
  const translations = {
    productManagement: {
      KR: "상품 관리",
      EN: "Product Management",
      CN: "产品管理",
      JP: "商品管理",
    },
    comingSoon: {
      KR: "준비 중입니다",
      EN: "Coming Soon",
      CN: "即将推出",
      JP: "近日公開",
    }
  };

  return (
    <SellerLayout currentPage="products">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-medium">
            {translations.productManagement[language]}
          </CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center h-60 flex-col">
            <p className="text-xl font-semibold text-fabri-blue">
              {translations.comingSoon[language]}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              {language === "KR" && "상품 관리 기능은 현재 개발 중입니다."}
              {language === "EN" && "Product management features are currently in development."}
              {language === "CN" && "产品管理功能目前正在开发中。"}
              {language === "JP" && "商品管理機能は現在開発中です。"}
            </p>
          </div>
        </CardContent>
      </Card>
    </SellerLayout>
  );
};

export default SellerProducts;
