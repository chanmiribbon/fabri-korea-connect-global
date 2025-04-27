
import React from "react";
import { Link } from "react-router-dom";
import { Language } from "@/hooks/useLanguageStore";
import { getNavLinks } from "./navLinksData";

interface SellerCenterBannerProps {
  language: Language;
}

const SellerCenterBanner = ({ language }: SellerCenterBannerProps) => {
  const navLinks = getNavLinks(language);
  
  return (
    <div className="bg-fabri-blue text-white text-center py-2 text-sm">
      <Link to="/seller/dashboard" className="hover:underline">
        {navLinks.sellerCenter}
      </Link>
    </div>
  );
};

export default SellerCenterBanner;
