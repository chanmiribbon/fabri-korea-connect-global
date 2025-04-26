
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import B2CRegistrationForm from "@/components/auth/B2CRegistrationForm";
import { useLanguageStore } from "@/hooks/useLanguageStore";

const B2CRegister = () => {
  const { language } = useLanguageStore();
  
  const pageTitle = {
    KR: "개인 회원가입",
    EN: "Individual Registration",
    CN: "个人注册",
    JP: "個人会員登録"
  };
  
  const pageDescription = {
    KR: "Fabri Korea Connect Global의 개인 회원이 되어 쇼핑과 리뷰 작성 서비스를 이용하세요.",
    EN: "Join Fabri Korea Connect Global as an individual member to use shopping and review services.",
    CN: "成为Fabri Korea Connect Global的个人会员，使用购物和评价服务。",
    JP: "Fabri Korea Connect Globalの個人会員になって、ショッピングとレビュー作成サービスをご利用ください。"
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-2">{pageTitle[language]}</h1>
          <p className="text-center text-muted-foreground mb-8">
            {pageDescription[language]}
          </p>
          <B2CRegistrationForm />
        </div>
      </div>
      <Footer language={language} />
    </div>
  );
};

export default B2CRegister;
