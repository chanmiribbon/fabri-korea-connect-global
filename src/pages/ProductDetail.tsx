
import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, FileText, CreditCard, ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguageStore } from "@/hooks/useLanguageStore";
import { useProducts } from "@/hooks/useProducts";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

type Language = "KR" | "EN" | "CN" | "JP";

const ProductDetail = () => {
  const { productId } = useParams();
  const location = useLocation();
  const { language } = useLanguageStore();
  const isBuyerView = location.pathname.includes("/buyer");
  const [mainImage, setMainImage] = useState<string | null>(null);
  
  // Get all products to find the one with the matching ID
  const { getDistributionProducts } = useProducts(undefined, null);
  
  // Convert productId from string to number
  const productIdNum = productId ? parseInt(productId) : 0;
  
  // Get products for the appropriate distribution channel
  const allProducts = isBuyerView 
    ? getDistributionProducts(false).filter(p => p.isWholesale)
    : getDistributionProducts(true).filter(p => p.isRetail);
  
  // Find the specific product
  const product = allProducts.find(p => p.id === productIdNum);
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 pt-16 container mx-auto">
          <div className="py-10 text-center text-gray-500">
            Product not found.
          </div>
        </div>
        <Footer language={language} />
      </div>
    );
  }

  // Set main image to product image if not set
  if (!mainImage) {
    setMainImage(product.image);
  }

  const getLocalizedName = (lang: Language): string => {
    switch (lang) {
      case "KR": return product.nameKr || product.name;
      case "CN": return product.nameCn || product.name;
      case "JP": return product.nameJp || product.name;
      default: return product.name;
    }
  };

  const getLocalizedDescription = (lang: Language): string => {
    switch (lang) {
      case "KR": return product.descriptionKr || product.description;
      case "CN": return product.descriptionCn || product.description;
      case "JP": return product.descriptionJp || product.description;
      default: return product.description;
    }
  };

  const getButtonText = (lang: Language) => {
    if (isBuyerView) {
      switch (lang) {
        case "KR": return "도매 견적 요청";
        case "CN": return "批发询价";
        case "JP": return "卸売見積依頼";
        default: return "Request Wholesale Quote";
      }
    } else {
      switch (lang) {
        case "KR": return "지금 구매하기";
        case "CN": return "立即购买";
        case "JP": return "今すぐ購入";
        default: return "Buy Now";
      }
    }
  };

  // Get the appropriate price based on the view
  const getProductPrice = (lang: Language = "KR"): string => {
    if (isBuyerView) {
      return lang === "EN" ? product.priceUsd : product.wholesalePrice || product.price;
    } else {
      return lang === "EN" ? product.priceUsd : product.retailPrice || product.price;
    }
  };

  // Get the appropriate MOQ based on the view
  const getProductMOQ = (): number => {
    return isBuyerView ? 
      (product.wholesaleMOQ || product.moq || 10) : 
      (product.retailMOQ || product.moq || 1);
  };

  // Combine main image and detail images into one array for the gallery
  const allImages = [product.image, ...(product.detailImages || [])];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 pt-16 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Images Section */}
          <div className="space-y-4">
            <div className="aspect-square w-full overflow-hidden rounded-lg border">
              <img 
                src={mainImage || product.image} 
                alt={product.name}
                className="h-full w-full object-cover object-center" 
              />
            </div>
            
            {/* Scrollable thumbnail gallery */}
            <div className="relative">
              <Carousel className="w-full">
                <CarouselContent className="-ml-1">
                  {allImages.map((img, i) => (
                    <CarouselItem key={i} className="pl-1 basis-1/5 md:basis-1/5">
                      <div 
                        className={`aspect-square overflow-hidden rounded-lg border cursor-pointer ${mainImage === img ? 'ring-2 ring-primary' : ''}`}
                        onClick={() => setMainImage(img)}
                      >
                        <img 
                          src={img} 
                          alt={`${product.name} image ${i+1}`}
                          className="h-full w-full object-cover object-center" 
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                {allImages.length > 5 && (
                  <>
                    <CarouselPrevious className="left-0" />
                    <CarouselNext className="right-0" />
                  </>
                )}
              </Carousel>
            </div>
          </div>

          {/* Product Info Section */}
          <Card>
            <CardContent className="p-6">
              <Tabs defaultValue="kr" className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-4">
                  <TabsTrigger value="kr" className="text-sm py-3">한국어</TabsTrigger>
                  <TabsTrigger value="en" className="text-sm py-3">ENG</TabsTrigger>
                  <TabsTrigger value="cn" className="text-sm py-3">中文</TabsTrigger>
                  <TabsTrigger value="jp" className="text-sm py-3">日本語</TabsTrigger>
                </TabsList>
                
                <TabsContent value="kr" className="mt-4 space-y-6">
                  <h1 className="text-2xl font-bold text-[#333333]">{getLocalizedName("KR")}</h1>
                  <div className="space-y-2">
                    <p className="text-xl font-medium text-fabri-blue">{getProductPrice("KR")}</p>
                    <p className="text-sm text-[#4A4A4A]">최소 주문수량(MOQ): {getProductMOQ()}개</p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold">제품 설명</h3>
                    <p className="text-[#4A4A4A]">{getLocalizedDescription("KR")}</p>
                  </div>
                  {product.specifications && (
                    <div className="space-y-2">
                      <h3 className="font-semibold">제품 스펙</h3>
                      <ul className="space-y-1 text-[#4A4A4A]">
                        {product.specifications.size && <li>크기: {product.specifications.size}</li>}
                        {product.specifications.material && <li>소재: {product.specifications.material}</li>}
                        {product.specifications.weight && <li>무게: {product.specifications.weight}</li>}
                        {product.specifications.width && <li>폭: {product.specifications.width}</li>}
                      </ul>
                    </div>
                  )}
                  <div className="pt-4">
                    {isBuyerView ? (
                      <Button className="w-full flex items-center justify-center gap-2 bg-fabri-blue hover:bg-fabri-blue/90 py-6 text-lg text-white">
                        <FileText className="w-5 h-5" />
                        {getButtonText("KR")}
                      </Button>
                    ) : (
                      <div className="space-y-3">
                        <Button className="w-full flex items-center justify-center gap-2 py-6 text-lg bg-fabri-pink hover:bg-fabri-pink/90 text-white">
                          <ShoppingCart className="w-5 h-5" />
                          {getButtonText("KR")}
                        </Button>
                        <div className="flex items-center justify-center gap-2 text-sm text-[#4A4A4A]">
                          <CreditCard className="w-4 h-4" />
                          PayPal / Credit Card Available
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="en" className="mt-4 space-y-6">
                  <h1 className="text-2xl font-bold text-[#333333]">{getLocalizedName("EN")}</h1>
                  <div className="space-y-2">
                    <p className="text-xl font-medium text-fabri-blue">{getProductPrice("EN")}</p>
                    <p className="text-sm text-[#4A4A4A]">MOQ: {getProductMOQ()} units</p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold">Product Description</h3>
                    <p className="text-[#4A4A4A]">{getLocalizedDescription("EN")}</p>
                  </div>
                  {product.specifications && (
                    <div className="space-y-2">
                      <h3 className="font-semibold">Specifications</h3>
                      <ul className="space-y-1 text-[#4A4A4A]">
                        {product.specifications.size && <li>Size: {product.specifications.size}</li>}
                        {product.specifications.material && <li>Material: {product.specifications.material}</li>}
                        {product.specifications.weight && <li>Weight: {product.specifications.weight}</li>}
                        {product.specifications.width && <li>Width: {product.specifications.width}</li>}
                      </ul>
                    </div>
                  )}
                </TabsContent>
                
                {/* Similar structure for Chinese and Japanese tabs */}
                <TabsContent value="cn" className="mt-4 space-y-6">
                  <h1 className="text-2xl font-bold text-[#333333]">{getLocalizedName("CN")}</h1>
                  <div className="space-y-2">
                    <p className="text-xl font-medium text-fabri-blue">{getProductPrice("CN")}</p>
                    <p className="text-sm text-[#4A4A4A]">最小订购量: {getProductMOQ()}件</p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold">产品描述</h3>
                    <p className="text-[#4A4A4A]">{getLocalizedDescription("CN")}</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="jp" className="mt-4 space-y-6">
                  <h1 className="text-2xl font-bold text-[#333333]">{getLocalizedName("JP")}</h1>
                  <div className="space-y-2">
                    <p className="text-xl font-medium text-fabri-blue">{getProductPrice("JP")}</p>
                    <p className="text-sm text-[#4A4A4A]">最小注文数量: {getProductMOQ()}個</p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold">製品説明</h3>
                    <p className="text-[#4A4A4A]">{getLocalizedDescription("JP")}</p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer language={language} />
    </div>
  );
};

export default ProductDetail;
