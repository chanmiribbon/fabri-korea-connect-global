
import React from "react";
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

  const buttonContent = isMobile ? (
    <div className="flex items-center gap-2">
      <Globe className="h-5 w-5" />
      <span>언어 설정</span>
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
            onClick={() => changeLanguage(option.code)}
            className="flex items-center gap-2 py-3 px-4 hover:bg-[#F0F9FC] rounded-lg text-[#333333] font-medium"
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
