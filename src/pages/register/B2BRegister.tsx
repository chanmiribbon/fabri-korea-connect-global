
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import B2BRegistrationForm from "@/components/auth/B2BRegistrationForm";
import { useLanguageStore } from "@/hooks/useLanguageStore";

const B2BRegister = () => {
  const { language } = useLanguageStore();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex-1 pt-24">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-2">B2B 회원가입</h1>
          <p className="text-center text-muted-foreground mb-8">
            Fabri Korea Connect Global의 B2B 회원이 되어 도매 전용 가격과 견적 요청 서비스를 이용하세요.
          </p>
          <B2BRegistrationForm />
        </div>
      </div>
      <Footer language={language} />
    </div>
  );
};

export default B2BRegister;
