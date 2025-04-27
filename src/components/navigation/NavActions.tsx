
import React from "react";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar";
import { Language } from "@/hooks/useLanguageStore";
import LanguageSelector from "../LanguageSelector";
import RegisterDialog from "../auth/RegisterDialog";
import { getNavLinks } from "./navLinksData";

interface NavActionsProps {
  language: Language;
  isMobile?: boolean;
}

const NavActions = ({ language, isMobile = false }: NavActionsProps) => {
  const navLinks = getNavLinks(language);

  if (isMobile) {
    return (
      <div className="px-4 py-3 border-t border-gray-200 space-y-3">
        <div className="flex items-center justify-between">
          <RegisterDialog language={language} />
          <Link
            to="/login"
            className="block px-4 py-2 text-base font-medium text-[#6EC1E4] hover:bg-[#F0F9FC] rounded-lg transition-colors"
          >
            {navLinks.login}
          </Link>
        </div>
        <div className="mt-3">
          <LanguageSelector isMobile={true} />
        </div>
      </div>
    );
  }

  return (
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
  );
};

export default NavActions;
