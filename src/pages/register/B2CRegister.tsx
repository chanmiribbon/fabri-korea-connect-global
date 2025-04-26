
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import B2CRegistrationForm from "@/components/auth/B2CRegistrationForm";

const B2CRegister = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-2">B2C 회원가입</h1>
          <p className="text-center text-muted-foreground mb-8">
            Fabri Korea Connect Global의 B2C 회원이 되어 쇼핑과 리뷰 작성 서비스를 이용하세요.
          </p>
          <B2CRegistrationForm />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default B2CRegister;
