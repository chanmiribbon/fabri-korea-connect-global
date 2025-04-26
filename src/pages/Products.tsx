
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductList from "@/components/ProductList";
import { Shirt, Scissors, Gem, DraftingCompass } from "lucide-react";

const Products = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow pt-16">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-fabri-darkPurple mb-8">Products</h1>
          
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
      <Footer language="EN" />
    </div>
  );
};

export default Products;
