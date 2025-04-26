
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductList from "@/components/ProductList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shirt, Scissors, Gem, DraftingCompass } from "lucide-react";
import { useLanguageStore } from "@/hooks/useLanguageStore";

const BuyerProducts = () => {
  const { language } = useLanguageStore();
  
  return (
    <div className="min-h-screen flex flex-col animate-fade-in">
      <Navbar />
      <div className="flex-grow pt-16">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-[#333333] mb-4">B2B Products</h1>
          <p className="text-lg text-[#4A4A4A] mb-8">
            도매 구매를 위한 제품 카탈로그를 확인하세요. 대량 주문 시 특별 할인이 적용됩니다.
          </p>
          
          <Tabs defaultValue="clothing" className="w-full">
            <TabsList className="grid grid-cols-4 w-full max-w-3xl mb-8">
              <TabsTrigger value="clothing" className="flex items-center gap-2">
                <Shirt className="w-4 h-4" />
                의류
              </TabsTrigger>
              <TabsTrigger value="materials" className="flex items-center gap-2">
                <Scissors className="w-4 h-4" />
                부자재
              </TabsTrigger>
              <TabsTrigger value="accessories" className="flex items-center gap-2">
                <Gem className="w-4 h-4" />
                악세서리
              </TabsTrigger>
              <TabsTrigger value="hanbok" className="flex items-center gap-2">
                <DraftingCompass className="w-4 h-4" />
                한복소품
              </TabsTrigger>
            </TabsList>

            <TabsContent value="clothing">
              <ProductList category="clothing" />
            </TabsContent>
            <TabsContent value="materials">
              <ProductList category="materials" />
            </TabsContent>
            <TabsContent value="accessories">
              <ProductList category="accessories" />
            </TabsContent>
            <TabsContent value="hanbok">
              <ProductList category="hanbok" />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer language={language} />
    </div>
  );
};

export default BuyerProducts;
