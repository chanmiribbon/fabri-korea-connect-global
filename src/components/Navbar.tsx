
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, ShoppingCart, User, Search, LogIn, Store } from "lucide-react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useLanguageStore, Language } from "@/hooks/useLanguageStore";
import LanguageSelector from "./LanguageSelector";
import RegisterDialog from "./auth/RegisterDialog";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language } = useLanguageStore();
  const [isSeller, setIsSeller] = useState(false);

  useEffect(() => {
    // Check if user is a business seller
    const userType = localStorage.getItem("userType");
    setIsSeller(userType === "business");
  }, []);

  const getNavLinks = (lang: Language) => {
    switch (lang) {
      case "KR":
        return { 
          home: "홈", 
          products: "제품", 
          about: "회사 소개", 
          contact: "연락처", 
          login: "로그인",
          sellerCenter: "판매자 센터" 
        };
      case "CN":
        return { 
          home: "首页", 
          products: "产品", 
          about: "公司简介", 
          contact: "联系我们", 
          login: "登录",
          sellerCenter: "卖家中心" 
        };
      case "JP":
        return { 
          home: "ホーム", 
          products: "製品", 
          about: "会社紹介", 
          contact: "お問い合わせ", 
          login: "ログイン",
          sellerCenter: "販売者センター" 
        };
      default:
        return { 
          home: "Home", 
          products: "Products", 
          about: "About Us", 
          contact: "Contact", 
          login: "Login",
          sellerCenter: "Seller Center" 
        };
    }
  };

  const navLinks = getNavLinks(language);

  // Set document title based on language
  React.useEffect(() => {
    document.documentElement.lang = language.toLowerCase();
    document.title = language === "KR" ? "FabriKorea - 전통시장을 세계로" : 
                     language === "EN" ? "FabriKorea - Traditional Markets to the World" :
                     language === "CN" ? "FabriKorea - 传统市场走向世界" : 
                     "FabriKorea - 伝統市場を世界へ";
  }, [language]);

  return (
    <nav className="bg-white shadow-sm fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-[#6EC1E4]">
                Fabri<span className="text-[#333333]">Korea</span>
              </span>
            </Link>
            <div className="hidden sm:ml-10 sm:flex sm:space-x-8">
              <Link to="/" className="border-transparent text-[#4A4A4A] hover:text-[#6EC1E4] px-1 pt-1 border-b-2 text-sm font-medium">
                {navLinks.home}
              </Link>
              <Link to="/products" className="border-transparent text-[#4A4A4A] hover:text-[#6EC1E4] px-1 pt-1 border-b-2 text-sm font-medium">
                {navLinks.products}
              </Link>
              <Link to="/about" className="border-transparent text-[#4A4A4A] hover:text-[#6EC1E4] px-1 pt-1 border-b-2 text-sm font-medium">
                {navLinks.about}
              </Link>
              <Link to="/contact" className="border-transparent text-[#4A4A4A] hover:text-[#6EC1E4] px-1 pt-1 border-b-2 text-sm font-medium">
                {navLinks.contact}
              </Link>
              {isSeller && (
                <Link to="/seller/dashboard" className="border-transparent text-[#4A4A4A] hover:text-[#6EC1E4] px-1 pt-1 border-b-2 text-sm font-medium">
                  {navLinks.sellerCenter}
                </Link>
              )}
            </div>
          </div>

          <div className="flex-1 max-w-sm mx-4 hidden sm:flex items-center justify-center">
            <SearchBar />
          </div>

          <div className="hidden sm:flex items-center space-x-4">
            <RegisterDialog language={language} />
            <Link to="/login">
              <Button variant="fabri-blue" size="sm" className="text-white flex items-center gap-2">
                <LogIn className="w-4 h-4" />
                {navLinks.login}
              </Button>
            </Link>
            {isSeller && (
              <Link to="/seller/dashboard">
                <Button variant="outline" size="sm" className="flex items-center gap-2 border-fabri-blue text-fabri-blue">
                  <Store className="w-4 h-4" />
                  {navLinks.sellerCenter}
                </Button>
              </Link>
            )}
            <LanguageSelector />
            <Button variant="ghost" size="icon" className="hover:bg-[#F0F9FC] text-[#6EC1E4]">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-[#F0F9FC] text-[#6EC1E4]">
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex items-center sm:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-[#6EC1E4]"
            >
              <Menu className="block h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      <div
        className={`${
          mobileMenuOpen ? "block" : "hidden"
        } sm:hidden bg-white shadow-lg`}
      >
        <div className="p-4">
          <SearchBar />
        </div>
        <div className="pt-2 pb-3 space-y-1">
          <Link
            to="/"
            className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-[#4A4A4A] hover:bg-[#F0F9FC] hover:border-[#6EC1E4] hover:text-[#6EC1E4]"
            onClick={() => setMobileMenuOpen(false)}
          >
            {navLinks.home}
          </Link>
          <Link
            to="/products"
            className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-[#4A4A4A] hover:bg-[#F0F9FC] hover:border-[#6EC1E4] hover:text-[#6EC1E4]"
            onClick={() => setMobileMenuOpen(false)}
          >
            {navLinks.products}
          </Link>
          <Link
            to="/about"
            className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-[#4A4A4A] hover:bg-[#F0F9FC] hover:border-[#6EC1E4] hover:text-[#6EC1E4]"
            onClick={() => setMobileMenuOpen(false)}
          >
            {navLinks.about}
          </Link>
          <Link
            to="/contact"
            className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-[#4A4A4A] hover:bg-[#F0F9FC] hover:border-[#6EC1E4] hover:text-[#6EC1E4]"
            onClick={() => setMobileMenuOpen(false)}
          >
            {navLinks.contact}
          </Link>
          {isSeller && (
            <Link
              to="/seller/dashboard"
              className="block pl-3 pr-4 py-2 border-l-4 border-[#6EC1E4] bg-[#F0F9FC] text-base font-medium text-[#6EC1E4]"
              onClick={() => setMobileMenuOpen(false)}
            >
              {navLinks.sellerCenter}
            </Link>
          )}
          <Link
            to="/login"
            className="block pl-3 pr-4 py-2 border-l-4 border-[#6EC1E4] bg-[#F0F9FC] text-base font-medium text-[#6EC1E4]"
            onClick={() => setMobileMenuOpen(false)}
          >
            {navLinks.login}
          </Link>
          <div className="px-3">
            <LanguageSelector isMobile={true} />
          </div>
        </div>
        <div className="border-t border-gray-200 pt-4 pb-3">
          <div className="flex items-center justify-around px-4">
            <Button variant="ghost" size="icon" className="text-[#6EC1E4]">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-[#6EC1E4]">
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
