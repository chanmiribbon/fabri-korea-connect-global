
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Globe, Menu, ShoppingCart, Search, User, X } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("KR");

  const toggleLanguage = () => {
    setCurrentLanguage(currentLanguage === "KR" ? "EN" : "KR");
  };

  return (
    <nav className="bg-white shadow-sm fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-fabri-purple">
                Fabri<span className="text-fabri-darkPurple">Korea</span>
              </span>
            </Link>
            <div className="hidden sm:ml-10 sm:flex sm:space-x-8">
              <Link
                to="/"
                className="border-transparent text-gray-700 hover:text-fabri-purple px-1 pt-1 border-b-2 text-sm font-medium"
              >
                {currentLanguage === "KR" ? "홈" : "Home"}
              </Link>
              <Link
                to="/products"
                className="border-transparent text-gray-700 hover:text-fabri-purple px-1 pt-1 border-b-2 text-sm font-medium"
              >
                {currentLanguage === "KR" ? "제품" : "Products"}
              </Link>
              <Link
                to="/about"
                className="border-transparent text-gray-700 hover:text-fabri-purple px-1 pt-1 border-b-2 text-sm font-medium"
              >
                {currentLanguage === "KR" ? "회사 소개" : "About Us"}
              </Link>
              <Link
                to="/contact"
                className="border-transparent text-gray-700 hover:text-fabri-purple px-1 pt-1 border-b-2 text-sm font-medium"
              >
                {currentLanguage === "KR" ? "연락처" : "Contact"}
              </Link>
            </div>
          </div>
          <div className="hidden sm:flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLanguage}
              className="mr-2"
            >
              <Globe className="h-5 w-5" />
              <span className="ml-1">{currentLanguage}</span>
            </Button>
            <Button variant="ghost" size="icon" className="mr-2">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="mr-2">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex items-center sm:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`${
          mobileMenuOpen ? "block" : "hidden"
        } sm:hidden bg-white shadow-lg`}
      >
        <div className="pt-2 pb-3 space-y-1">
          <Link
            to="/"
            className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-700 hover:bg-gray-50 hover:border-fabri-purple hover:text-fabri-purple"
            onClick={() => setMobileMenuOpen(false)}
          >
            {currentLanguage === "KR" ? "홈" : "Home"}
          </Link>
          <Link
            to="/products"
            className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-700 hover:bg-gray-50 hover:border-fabri-purple hover:text-fabri-purple"
            onClick={() => setMobileMenuOpen(false)}
          >
            {currentLanguage === "KR" ? "제품" : "Products"}
          </Link>
          <Link
            to="/about"
            className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-700 hover:bg-gray-50 hover:border-fabri-purple hover:text-fabri-purple"
            onClick={() => setMobileMenuOpen(false)}
          >
            {currentLanguage === "KR" ? "회사 소개" : "About Us"}
          </Link>
          <Link
            to="/contact"
            className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-700 hover:bg-gray-50 hover:border-fabri-purple hover:text-fabri-purple"
            onClick={() => setMobileMenuOpen(false)}
          >
            {currentLanguage === "KR" ? "연락처" : "Contact"}
          </Link>
        </div>
        <div className="border-t border-gray-200 pt-4 pb-3">
          <div className="flex items-center justify-around px-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLanguage}
              className="flex items-center"
            >
              <Globe className="h-5 w-5 mr-1" />
              <span>{currentLanguage}</span>
            </Button>
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
