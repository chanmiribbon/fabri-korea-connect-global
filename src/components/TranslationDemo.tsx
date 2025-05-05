
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Languages } from "lucide-react";

interface TranslationDemoProps {
  language: string;
}

const TranslationDemo: React.FC<TranslationDemoProps> = ({ language }) => {
  const [translated, setTranslated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const translations = {
    title: {
      original: "실시간 AI 자동 번역 서비스",
      translated: "Real-time AI Translation Service"
    },
    description: {
      original:
        "패브리 코리아의 AI 번역 기술은 귀하의 비즈니스에 언어 장벽 없는 글로벌 커뮤니케이션을 제공합니다. 한국어, 영어, 일본어, 중국어 등 다양한 언어로 실시간 번역이 가능합니다.",
      translated:
        "Fabri Korea's AI translation technology provides barrier-free global communication for your business. Real-time translation is available in various languages including Korean, English, Japanese, and Chinese."
    },
    buttonText: {
      original: "번역 데모 보기",
      translated: "View Translation Demo"
    }
  };

  const handleTranslation = async () => {
    setIsLoading(true);
    // Simulate translation delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500));
    setTranslated(!translated);
    setIsLoading(false);
  };

  return (
    <section className="py-16 bg-gradient-to-r from-fabri-purple/10 to-fabri-lightPurple/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Languages className="h-12 w-12 text-fabri-purple mx-auto mb-4" />
          <h2 className="text-3xl font-extrabold text-fabri-darkPurple sm:text-4xl">
            {language === "KR" ? "AI 자동 번역" : "AI Translation"}
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            {language === "KR"
              ? "실시간 다국어 번역으로 글로벌 비즈니스를 시작하세요"
              : "Start your global business with real-time multilingual translation"}
          </p>
        </div>

        <Card className="overflow-hidden border-none shadow-xl">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-fabri-purple">
                  {translated
                    ? translations.title.translated
                    : translations.title.original}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {translated
                    ? translations.description.translated
                    : translations.description.original}
                </p>
                <Button
                  onClick={handleTranslation}
                  disabled={isLoading}
                  className="mt-4 bg-fabri-purple hover:bg-fabri-purple/90 text-white"
                >
                  <Languages className="mr-2 h-4 w-4" />
                  {isLoading ? (
                    language === "KR" ? "번역 중..." : "Translating..."
                  ) : (
                    translated
                      ? translations.buttonText.translated
                      : translations.buttonText.original
                  )}
                </Button>
              </div>

              <div className="bg-gray-100 rounded-lg p-6">
                <h4 className="text-lg font-medium text-fabri-darkPurple mb-4">
                  {language === "KR" ? "지원 언어" : "Supported Languages"}:
                </h4>
                <ul className="grid grid-cols-2 gap-4">
                  <li className="flex items-center">
                    <span className="w-8 h-8 flex items-center justify-center rounded-full bg-fabri-purple text-white font-bold mr-2">
                      KR
                    </span>
                    {language === "KR" ? "한국어" : "Korean"}
                  </li>
                  <li className="flex items-center">
                    <span className="w-8 h-8 flex items-center justify-center rounded-full bg-fabri-purple text-white font-bold mr-2">
                      EN
                    </span>
                    {language === "KR" ? "영어" : "English"}
                  </li>
                  <li className="flex items-center">
                    <span className="w-8 h-8 flex items-center justify-center rounded-full bg-fabri-purple text-white font-bold mr-2">
                      JP
                    </span>
                    {language === "KR" ? "일본어" : "Japanese"}
                  </li>
                  <li className="flex items-center">
                    <span className="w-8 h-8 flex items-center justify-center rounded-full bg-fabri-purple text-white font-bold mr-2">
                      CN
                    </span>
                    {language === "KR" ? "중국어" : "Chinese"}
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default TranslationDemo;
