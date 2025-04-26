import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe, Menu, ShoppingCart, User, X, Search } from "lucide-react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

export type Language = "KR" | "EN" | "CN" | "JP";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<Language>("KR");

  const getMenuLabel = (lang: Language) => {
    switch (lang) {
      case "KR": return "한국어";
      case "EN": return "English";
      case "CN": return "中文";
      case "JP": return "日本語";
    }
  };

  const getNavLinks = (lang: Language) => {
    switch (lang) {
      case "KR":
        return { home: "홈", products: "제품", about: "회사 소개", contact: "연락처" };
      case "CN":
        return { home: "首页", products: "产品", about: "公司简介", contact: "联系我们" };
      case "JP":
        return { home: "ホーム", products: "製品", about: "会社紹介", contact: "お問い合わせ" };
      default:
        return { home: "Home", products: "Products", about: "About Us", contact: "Contact" };
    }
  };

  const navLinks = getNavLinks(currentLanguage);

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
              <Link to="/" className="border-transparent text-gray-700 hover:text-fabri-purple px-1 pt-1 border-b-2 text-sm font-medium">
                {navLinks.home}
              </Link>
              <Link to="/products" className="border-transparent text-gray-700 hover:text-fabri-purple px-1 pt-1 border-b-2 text-sm font-medium">
                {navLinks.products}
              </Link>
              <Link to="/about" className="border-transparent text-gray-700 hover:text-fabri-purple px-1 pt-1 border-b-2 text-sm font-medium">
                {navLinks.about}
              </Link>
              <Link to="/contact" className="border-transparent text-gray-700 hover:text-fabri-purple px-1 pt-1 border-b-2 text-sm font-medium">
                {navLinks.contact}
              </Link>
            </div>
          </div>

          <div className="flex-1 max-w-sm mx-4 hidden sm:flex items-center justify-center">
            <SearchBar />
          </div>

          <div className="hidden sm:flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="mr-2">
                  <Globe className="h-5 w-5" />
                  <span className="ml-1">{currentLanguage}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setCurrentLanguage("KR")}>
                  한국어 (KR)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCurrentLanguage("EN")}>
                  English (EN)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCurrentLanguage("CN")}>
                  中文 (CN)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCurrentLanguage("JP")}>
                  日本語 (JP)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
            className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-700 hover:bg-gray-50 hover:border-fabri-purple hover:text-fabri-purple"
            onClick={() => setMobileMenuOpen(false)}
          >
            {navLinks.home}
          </Link>
          <Link
            to="/products"
            className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-700 hover:bg-gray-50 hover:border-fabri-purple hover:text-fabri-purple"
            onClick={() => setMobileMenuOpen(false)}
          >
            {navLinks.products}
          </Link>
          <Link
            to="/about"
            className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-700 hover:bg-gray-50 hover:border-fabri-purple hover:text-fabri-purple"
            onClick={() => setMobileMenuOpen(false)}
          >
            {navLinks.about}
          </Link>
          <Link
            to="/contact"
            className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-700 hover:bg-gray-50 hover:border-fabri-purple hover:text-fabri-purple"
            onClick={() => setMobileMenuOpen(false)}
          >
            {navLinks.contact}
          </Link>
        </div>
        <div className="border-t border-gray-200 pt-4 pb-3">
          <div className="flex items-center justify-around px-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="flex items-center">
                  <Globe className="h-5 w-5 mr-1" />
                  <span>{currentLanguage}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setCurrentLanguage("KR")}>
                  한국어 (KR)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCurrentLanguage("EN")}>
                  English (EN)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCurrentLanguage("CN")}>
                  中文 (CN)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCurrentLanguage("JP")}>
                  日本語 (JP)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
