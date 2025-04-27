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

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-sm fixed w-full z-50">
      {/* New Seller Center button at the very top */}
      {isSeller && (
        <div className="bg-fabri-blue text-white text-center py-2 text-sm">
          <Link to="/seller/dashboard" className="hover:underline">
            {navLinks.sellerCenter}
          </Link>
        </div>
      )}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-1 flex items-center justify-between">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-[#6EC1E4]">
                Fabri<span className="text-[#333333]">Korea</span>
              </span>
            </Link>

            <div className="hidden sm:flex items-center space-x-6 mx-4">
              <Link 
                to="/" 
                className={`px-4 py-2 text-sm font-medium transition-colors hover:text-[#6EC1E4] ${
                  isActive('/') ? 'text-[#6EC1E4] border-b-2 border-[#6EC1E4] font-semibold' : 'text-[#4A4A4A]'
                }`}
              >
                {navLinks.home}
              </Link>
              <Link 
                to="/products" 
                className={`px-4 py-2 text-sm font-medium transition-colors hover:text-[#6EC1E4] ${
                  isActive('/products') ? 'text-[#6EC1E4] border-b-2 border-[#6EC1E4] font-semibold' : 'text-[#4A4A4A]'
                }`}
              >
                {navLinks.products}
              </Link>
              <Link 
                to="/consumer-products" 
                className={`px-4 py-2 text-sm font-medium transition-colors hover:text-[#6EC1E4] ${
                  isActive('/consumer-products') ? 'text-[#6EC1E4] border-b-2 border-[#6EC1E4] font-semibold' : 'text-[#4A4A4A]'
                }`}
              >
                {navLinks.retailMall}
              </Link>
              <Link 
                to="/buyer-products" 
                className={`px-4 py-2 text-sm font-medium transition-colors hover:text-[#6EC1E4] ${
                  isActive('/buyer-products') ? 'text-[#6EC1E4] border-b-2 border-[#6EC1E4] font-semibold' : 'text-[#4A4A4A]'
                }`}
              >
                {navLinks.wholesaleMall}
              </Link>
              <Link 
                to="/about" 
                className={`px-4 py-2 text-sm font-medium transition-colors hover:text-[#6EC1E4] ${
                  isActive('/about') ? 'text-[#6EC1E4] border-b-2 border-[#6EC1E4] font-semibold' : 'text-[#4A4A4A]'
                }`}
              >
                {navLinks.about}
              </Link>
              <Link 
                to="/contact" 
                className={`px-4 py-2 text-sm font-medium transition-colors hover:text-[#6EC1E4] ${
                  isActive('/contact') ? 'text-[#6EC1E4] border-b-2 border-[#6EC1E4] font-semibold' : 'text-[#4A4A4A]'
                }`}
              >
                {navLinks.contact}
              </Link>
            </div>

            <div className="hidden sm:flex items-center space-x-4">
              <SearchBar />
              <RegisterDialog language={language} />
              <Link to="/login">
                <Button variant="fabri-blue" size="sm" className="text-white flex items-center gap-2">
                  <LogIn className="w-4 h-4" />
                  {navLinks.login}
                </Button>
              </Link>
              <LanguageSelector />
            </div>
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
        <div className="px-4 py-3 space-y-2">
          <SearchBar />
          {[
            { to: "/", label: navLinks.home },
            { to: "/products", label: navLinks.products },
            { to: "/consumer-products", label: navLinks.retailMall },
            { to: "/buyer-products", label: navLinks.wholesaleMall },
            { to: "/about", label: navLinks.about },
            { to: "/contact", label: navLinks.contact },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`block px-4 py-2 text-base font-medium rounded-lg transition-colors ${
                isActive(item.to) 
                  ? 'text-[#6EC1E4] bg-[#F0F9FC] font-semibold' 
                  : 'text-[#4A4A4A] hover:text-[#6EC1E4] hover:bg-gray-50'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="px-4 py-3 border-t border-gray-200 space-y-3">
          <div className="flex items-center justify-between">
            <RegisterDialog language={language} />
            <Link
              to="/login"
              className="block px-4 py-2 text-base font-medium text-[#6EC1E4] hover:bg-[#F0F9FC] rounded-lg transition-colors"
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
