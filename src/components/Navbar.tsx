
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguageStore } from "@/hooks/useLanguageStore";
import { useSellerAuth } from "@/hooks/useSellerAuth";
import NavLinks from "./navigation/NavLinks";
import NavActions from "./navigation/NavActions";
import SellerCenterBanner from "./navigation/SellerCenterBanner";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language } = useLanguageStore();
  const { isSeller } = useSellerAuth();

  return (
    <nav className="bg-white shadow-sm fixed w-full z-50">
      {isSeller && <SellerCenterBanner language={language} />}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-1 flex items-center justify-between">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-[#6EC1E4]">
                Fabri<span className="text-[#333333]">Korea</span>
              </span>
            </Link>

            <NavLinks language={language} />
            <NavActions language={language} />
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
        <SearchBar />
        <NavLinks 
          language={language} 
          isMobile={true} 
          onMobileItemClick={() => setMobileMenuOpen(false)} 
        />
        <NavActions language={language} isMobile={true} />
      </div>
    </nav>
  );
};

export default Navbar;
