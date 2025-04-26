
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";
import { useLanguageStore, Language } from "@/hooks/useLanguageStore";

interface LanguageOption {
  code: Language;
  flag: string;
  label: string;
}

const languageOptions: LanguageOption[] = [
  { code: "KR", flag: "🇰🇷", label: "한국어" },
  { code: "EN", flag: "🇺🇸", label: "English" },
  { code: "CN", flag: "🇨🇳", label: "中文" },
  { code: "JP", flag: "🇯🇵", label: "日本語" },
];

const LanguageSelector = ({ isMobile = false }: { isMobile?: boolean }) => {
  const { language, changeLanguage } = useLanguageStore();

  const currentLanguage = languageOptions.find((opt) => opt.code === language);

  useEffect(() => {
    // Ensure the stored language is used on component mount
    const storedLanguage = localStorage.getItem('preferredLanguage') as Language;
    if (storedLanguage && storedLanguage !== language && 
        ["KR", "EN", "CN", "JP"].includes(storedLanguage)) {
      changeLanguage(storedLanguage);
    }
  }, []);

  const handleLanguageChange = (lang: Language) => {
    changeLanguage(lang);
    // Force page update to ensure all components reflect the new language
    setTimeout(() => {
      // This small timeout helps ensure state propagation
    }, 50);
  };

  const buttonContent = isMobile ? (
    <div className="flex items-center gap-2">
      <Globe className="h-5 w-5" />
      <span>
        {language === "KR" ? "언어 설정" : 
         language === "EN" ? "Language" : 
         language === "CN" ? "语言设置" : 
         "言語設定"}
      </span>
    </div>
  ) : (
    <div className="flex items-center gap-2">
      <Globe className="h-5 w-5" />
      <span>{currentLanguage?.code}</span>
    </div>
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size={isMobile ? "default" : "icon"}
          className={`${isMobile ? "w-full justify-start" : ""} text-[#6EC1E4] hover:bg-[#F0F9FC]`}
        >
          {buttonContent}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px] bg-white border border-[#E5E7EB] rounded-xl shadow-lg">
        {languageOptions.map((option) => (
          <DropdownMenuItem
            key={option.code}
            onClick={() => handleLanguageChange(option.code)}
            className={`flex items-center gap-2 py-3 px-4 hover:bg-[#F0F9FC] rounded-lg text-[#333333] font-medium ${
              language === option.code ? "bg-[#F0F9FC] font-semibold" : ""
            }`}
          >
            <span className="text-lg">{option.flag}</span>
            <span>{option.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
