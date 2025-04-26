
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductList from "@/components/ProductList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shirt, Scissors, Gem, DraftingCompass } from "lucide-react";
import { useLanguageStore } from "@/hooks/useLanguageStore";

const ConsumerProducts = () => {
  const { language } = useLanguageStore();
  
  return (
    <div className="min-h-screen flex flex-col animate-fade-in">
      <Navbar />
      <div className="flex-grow pt-16">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-[#333333] mb-4">인기 상품</h1>
          <p className="text-lg text-[#4A4A4A] mb-8">
            동대문과 남대문 시장의 인기 상품을 확인하세요. 소량 구매도 가능합니다.
          </p>
          
          <Tabs defaultValue="popular" className="w-full">
            <TabsList className="grid grid-cols-3 w-full max-w-3xl mb-8">
              <TabsTrigger value="popular" className="flex items-center gap-2">
                인기 상품
              </TabsTrigger>
              <TabsTrigger value="new" className="flex items-center gap-2">
                신상품
              </TabsTrigger>
              <TabsTrigger value="sale" className="flex items-center gap-2">
                특가 상품
              </TabsTrigger>
            </TabsList>

            <TabsContent value="popular">
              <ProductList category="clothing" />
            </TabsContent>
            <TabsContent value="new">
              <ProductList category="accessories" />
            </TabsContent>
            <TabsContent value="sale">
              <ProductList category="hanbok" />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer language={language} />
    </div>
  );
};

export default ConsumerProducts;
