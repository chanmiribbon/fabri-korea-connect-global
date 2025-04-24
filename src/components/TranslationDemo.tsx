
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Translate } from "lucide-react";

interface TranslationDemoProps {
  language: string;
}

const TranslationDemo: React.FC<TranslationDemoProps> = ({ language }) => {
  const [translated, setTranslated] = useState(false);

  const translations = {
    title: {
      original: "AI 자동 번역 서비스",
      translated: "AI Automatic Translation Service"
    },
    description: {
      original:
        "당사의 AI 번역 기술은 귀하의 비즈니스에 언어 장벽 없는 글로벌 커뮤니케이션을 제공합니다. 전 세계 어디서나 원활한 의사소통으로 비즈니스를 확장하세요.",
      translated:
        "Our AI translation technology provides your business with barrier-free global communication. Expand your business with seamless communication anywhere in the world."
    },
    buttonText: {
      original: "번역 데모",
      translated: "Translation Demo"
    }
  };

  return (
    <section className="py-16 bg-gradient-to-r from-fabri-purple/10 to-fabri-lightPurple/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Translate className="h-12 w-12 text-fabri-purple mx-auto mb-4" />
          <h2 className="text-3xl font-extrabold text-fabri-darkPurple sm:text-4xl">
            {language === "KR" ? "AI 자동 번역" : "AI Translation"}
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            {language === "KR"
              ? "언어 장벽 없는 글로벌 비즈니스를 경험하세요"
              : "Experience global business without language barriers"}
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
                  onClick={() => setTranslated(!translated)}
                  className="mt-4 bg-fabri-purple hover:bg-fabri-purple/90 text-white"
                >
                  <Translate className="mr-2 h-4 w-4" />
                  {translated
                    ? translations.buttonText.translated
                    : translations.buttonText.original}
                </Button>
              </div>

              <div className="bg-gray-100 rounded-lg p-6">
                <h4 className="text-lg font-medium text-fabri-darkPurple mb-4">
                  {language === "KR" ? "지원 언어" : "Supported Languages"}:
                </h4>
                <ul className="grid grid-cols-2 gap-2">
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
                  <li className="flex items-center">
                    <span className="w-8 h-8 flex items-center justify-center rounded-full bg-fabri-purple text-white font-bold mr-2">
                      ES
                    </span>
                    {language === "KR" ? "스페인어" : "Spanish"}
                  </li>
                  <li className="flex items-center">
                    <span className="w-8 h-8 flex items-center justify-center rounded-full bg-fabri-purple text-white font-bold mr-2">
                      FR
                    </span>
                    {language === "KR" ? "프랑스어" : "French"}
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
