
import React from "react";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductList from "@/components/ProductList";
import { useLanguageStore } from "@/hooks/useLanguageStore";
import { useAccessControl } from "@/hooks/useAccessControl";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Store, AlertCircle } from "lucide-react";

const BuyerProducts = () => {
  const { language } = useLanguageStore();
  const { canAccessWholesale, isLoading } = useAccessControl();

  // Translations for access denied message
  const getAccessDeniedText = () => {
    switch (language) {
      case "KR":
        return {
          title: "도매 접근 제한",
          message: "도매 섹션은 인증된 비즈니스 회원만 이용할 수 있습니다.",
          register: "비즈니스 회원으로 가입하기",
          goToRetail: "소매 쇼핑몰로 이동"
        };
      case "CN":
        return {
          title: "批发访问受限",
          message: "批发部分仅适用于已验证的企业会员。",
          register: "注册成为企业会员",
          goToRetail: "前往零售商城"
        };
      case "JP":
        return {
          title: "卸売アクセス制限",
          message: "卸売セクションは認証されたビジネスメンバーのみが利用できます。",
          register: "ビジネスメンバーとして登録する",
          goToRetail: "小売モールに移動"
        };
      default:
        return {
          title: "Wholesale Access Restricted",
          message: "The wholesale section is available only for verified business members.",
          register: "Register as a Business Member",
          goToRetail: "Go to Retail Mall"
        };
    }
  };

  const accessText = getAccessDeniedText();

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

  // If user cannot access wholesale, show access denied message
  if (!canAccessWholesale()) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center pt-16 px-4">
          <Card className="max-w-md w-full">
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <AlertCircle className="text-orange-500 h-12 w-12 mb-4" />
              <h2 className="text-xl font-bold mb-2">{accessText.title}</h2>
              <p className="text-gray-600 mb-6">{accessText.message}</p>
              
              <div className="space-y-3 w-full">
                <Button 
                  variant="fabri-blue" 
                  className="w-full"
                  onClick={() => window.location.href = "/register/b2b"}
                >
                  <Store className="mr-2 h-5 w-5" />
                  {accessText.register}
                </Button>
                
                <Button 
                  variant="outline"
                  className="w-full"
                  onClick={() => window.location.href = "/consumer-products"}
                >
                  {accessText.goToRetail}
                </Button>
              </div>
            </CardContent>
          </Card>
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
          {language === "KR" ? "도매 제품" : 
           language === "CN" ? "批发产品" : 
           language === "JP" ? "卸売製品" : 
           "Wholesale Products"}
        </h1>
        <ProductList category="materials" />
      </div>
      <Footer language={language} />
    </div>
  );
};

export default BuyerProducts;
