import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, ShoppingCart, User, Search, LogIn, Store } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useLanguageStore, Language } from "@/hooks/useLanguageStore";
import LanguageSelector from "./LanguageSelector";
import RegisterDialog from "./auth/RegisterDialog";
import { useSellerAuth } from "@/hooks/useSellerAuth";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language } = useLanguageStore();
  const location = useLocation();
  const { isSeller, isLoading } = useSellerAuth();

  const getNavLinks = (lang: Language) => {
    switch (lang) {
      case "KR":
        return { 
          home: "홈", 
          products: "제품", 
          about: "회사 소개", 
          contact: "연락처", 
          login: "로그인",
          sellerCenter: "판매자 센터",
          retailMall: "소매 쇼핑몰",
          wholesaleMall: "도매 쇼핑몰" 
        };
      case "CN":
        return { 
          home: "首页", 
          products: "产品", 
          about: "公司简介", 
          contact: "联系我们", 
          login: "登录",
          sellerCenter: "卖家中心",
          retailMall: "零售商城",
          wholesaleMall: "批发商城"
        };
      case "JP":
        return { 
          home: "ホーム", 
          products: "製品", 
          about: "会社紹介", 
          contact: "お問い合わせ", 
          login: "ログイン",
          sellerCenter: "販売者センター",
          retailMall: "小売モール",
          wholesaleMall: "卸売モール"
        };
      default:
        return { 
          home: "Home", 
          products: "Products", 
          about: "About Us", 
          contact: "Contact", 
          login: "Login",
          sellerCenter: "Seller Center",
          retailMall: "Retail Mall",
          wholesaleMall: "Wholesale Mall"
        };
    }
  };

  const navLinks = getNavLinks(language);

  return (
    <nav className="bg-white shadow-sm fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {isSeller && (
          <div className="py-2 border-b border-gray-100 flex justify-end">
            <Link to="/seller/dashboard">
              <Button 
                variant={location.pathname.includes("/seller") ? "fabri-blue" : "outline"} 
                size="sm" 
                className={`flex items-center gap-2 ${location.pathname.includes("/seller") ? 'text-white' : 'border-fabri-blue text-fabri-blue'}`}
              >
                <Store className="w-4 h-4" />
                {navLinks.sellerCenter}
              </Button>
            </Link>
          </div>
        )}
        
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-[#6EC1E4]">
                Fabri<span className="text-[#333333]">Korea</span>
              </span>
            </Link>
            <div className="hidden sm:ml-10 sm:flex sm:items-center sm:space-x-6">
              <Link to="/" className="text-[#4A4A4A] hover:text-[#6EC1E4] px-3 py-2 text-sm font-medium transition-colors hover:border-b-2 hover:border-[#6EC1E4]">
                {navLinks.home}
              </Link>
              <Link to="/products" className="text-[#4A4A4A] hover:text-[#6EC1E4] px-3 py-2 text-sm font-medium transition-colors hover:border-b-2 hover:border-[#6EC1E4]">
                {navLinks.products}
              </Link>
              <Link to="/consumer-products" className="text-[#4A4A4A] hover:text-[#6EC1E4] px-3 py-2 text-sm font-medium transition-colors hover:border-b-2 hover:border-[#6EC1E4]">
                {navLinks.retailMall}
              </Link>
              <Link to="/buyer-products" className="text-[#4A4A4A] hover:text-[#6EC1E4] px-3 py-2 text-sm font-medium transition-colors hover:border-b-2 hover:border-[#6EC1E4]">
                {navLinks.wholesaleMall}
              </Link>
              <Link to="/about" className="text-[#4A4A4A] hover:text-[#6EC1E4] px-3 py-2 text-sm font-medium transition-colors hover:border-b-2 hover:border-[#6EC1E4]">
                {navLinks.about}
              </Link>
              <Link to="/contact" className="text-[#4A4A4A] hover:text-[#6EC1E4] px-3 py-2 text-sm font-medium transition-colors hover:border-b-2 hover:border-[#6EC1E4]">
                {navLinks.contact}
              </Link>
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
            <LanguageSelector />
          </div>

          <div className="flex items-center sm:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-[#6EC1E4]"
              aria-label="Toggle menu"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      <div className={`${mobileMenuOpen ? "block" : "hidden"} sm:hidden bg-white border-t border-gray-200`}>
        <div className="px-4 py-3">
          <SearchBar />
        </div>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            to="/"
            className="block px-3 py-2 rounded-md text-base font-medium text-[#4A4A4A] hover:text-[#6EC1E4] hover:bg-gray-50"
            onClick={() => setMobileMenuOpen(false)}
          >
            {navLinks.home}
          </Link>
          <Link
            to="/products"
            className="block px-3 py-2 rounded-md text-base font-medium text-[#4A4A4A] hover:text-[#6EC1E4] hover:bg-gray-50"
            onClick={() => setMobileMenuOpen(false)}
          >
            {navLinks.products}
          </Link>
          <Link
            to="/consumer-products"
            className="block px-3 py-2 rounded-md text-base font-medium text-[#4A4A4A] hover:text-[#6EC1E4] hover:bg-gray-50"
            onClick={() => setMobileMenuOpen(false)}
          >
            {navLinks.retailMall}
          </Link>
          <Link
            to="/buyer-products"
            className="block px-3 py-2 rounded-md text-base font-medium text-[#4A4A4A] hover:text-[#6EC1E4] hover:bg-gray-50"
            onClick={() => setMobileMenuOpen(false)}
          >
            {navLinks.wholesaleMall}
          </Link>
          <Link
            to="/about"
            className="block px-3 py-2 rounded-md text-base font-medium text-[#4A4A4A] hover:text-[#6EC1E4] hover:bg-gray-50"
            onClick={() => setMobileMenuOpen(false)}
          >
            {navLinks.about}
          </Link>
          <Link
            to="/contact"
            className="block px-3 py-2 rounded-md text-base font-medium text-[#4A4A4A] hover:text-[#6EC1E4] hover:bg-gray-50"
            onClick={() => setMobileMenuOpen(false)}
          >
            {navLinks.contact}
          </Link>
          {isSeller && (
            <Link
              to="/seller/dashboard"
              className="block px-3 py-2 rounded-md text-base font-medium text-[#6EC1E4] hover:bg-gray-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              {navLinks.sellerCenter}
            </Link>
          )}
        </div>
        <div className="px-4 py-3 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <RegisterDialog language={language} />
            <Link
              to="/login"
              className="block px-3 py-2 rounded-md text-base font-medium text-[#6EC1E4]"
              onClick={() => setMobileMenuOpen(false)}
            >
              {navLinks.login}
            </Link>
          </div>
          <div className="mt-3">
            <LanguageSelector isMobile={true} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
