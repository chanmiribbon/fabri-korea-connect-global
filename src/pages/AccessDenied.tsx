
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguageStore } from "@/hooks/useLanguageStore";
import { ShieldAlert } from "lucide-react";

const AccessDenied = () => {
  const navigate = useNavigate();
  const { language } = useLanguageStore();
  
  const translations = {
    accessDenied: {
      KR: "접근 권한이 없습니다",
      EN: "Access Denied",
      CN: "拒绝访问",
      JP: "アクセス拒否",
    },
    sellerAccess: {
      KR: "판매자 계정만 이용할 수 있는 기능입니다.",
      EN: "This area is reserved for seller accounts only.",
      CN: "此区域仅供卖家账户使用。",
      JP: "この領域は販売者アカウントのみ利用できます。",
    },
    registerAsSeller: {
      KR: "판매자로 가입하기",
      EN: "Register as a Seller",
      CN: "注册成为卖家",
      JP: "販売者として登録",
    },
    goHome: {
      KR: "홈으로 가기",
      EN: "Go to Homepage",
      CN: "回到主页",
      JP: "ホームページへ",
    },
    loginAsSeller: {
      KR: "판매자로 로그인",
      EN: "Login as a Seller",
      CN: "以卖家身份登录",
      JP: "販売者としてログイン",
    },
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-md text-center p-8">
          <div className="mb-6 flex justify-center">
            <ShieldAlert className="h-24 w-24 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold mb-4">
            {translations.accessDenied[language]}
          </h1>
          <p className="mb-8 text-gray-600">
            {translations.sellerAccess[language]}
          </p>
          <div className="space-y-4">
            <Button 
              onClick={() => navigate("/register/b2b")}
              className="w-full"
              variant="fabri-blue"
            >
              {translations.registerAsSeller[language]}
            </Button>
            <Button 
              onClick={() => navigate("/login")}
              variant="outline"
              className="w-full"
            >
              {translations.loginAsSeller[language]}
            </Button>
            <Button 
              onClick={() => navigate("/")}
              variant="ghost"
              className="w-full"
            >
              {translations.goHome[language]}
            </Button>
          </div>
        </div>
      </div>
      <Footer language={language} />
    </div>
  );
};

export default AccessDenied;
