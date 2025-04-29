
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Language } from "@/hooks/useLanguageStore";
import { getNavLinks } from "./navLinksData";
import { useIsMobile } from "@/hooks/use-mobile";

interface NavLinksProps {
  language: Language;
  isMobile?: boolean;
  onMobileItemClick?: () => void;
}

const NavLinks = ({ language, isMobile = false, onMobileItemClick }: NavLinksProps) => {
  const location = useLocation();
  const navLinks = getNavLinks(language);
  
  const isActive = (path: string) => location.pathname === path;
  
  const links = [
    { to: "/", label: navLinks.home },
    { to: "/products", label: navLinks.products },
    { to: "/consumer-products", label: navLinks.retailMall },
    { to: "/buyer-products", label: navLinks.wholesaleMall },
    { to: "/about", label: navLinks.about },
    { to: "/contact", label: navLinks.contact },
  ];

  if (isMobile) {
    return (
      <div className="px-4 py-3 space-y-2">
        {links.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`block px-4 py-2 text-base font-medium rounded-lg transition-colors ${
              isActive(item.to) 
                ? 'text-[#6EC1E4] bg-[#F0F9FC] font-semibold' 
                : 'text-[#4A4A4A] hover:text-[#6EC1E4] hover:bg-gray-50'
            }`}
            onClick={onMobileItemClick}
          >
            {item.label}
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div className="hidden sm:flex items-center gap-1 lg:gap-4 mx-auto">
      {links.map((item) => (
        <Link 
          key={item.to}
          to={item.to} 
          className={`px-2 lg:px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors hover:text-[#6EC1E4] ${
            isActive(item.to) ? 'text-[#6EC1E4] border-b-2 border-[#6EC1E4] font-semibold' : 'text-[#4A4A4A]'
          }`}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
};

export default NavLinks;
