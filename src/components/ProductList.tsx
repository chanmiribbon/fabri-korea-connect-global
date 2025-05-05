import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { FileText, ShoppingCart, Download, CreditCard } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import { Product } from "@/types/product";

type Language = "KR" | "EN" | "CN" | "JP";

interface ProductListProps {
  category: "clothing" | "materials" | "accessories" | "hanbok";
}

const ProductList: React.FC<ProductListProps> = ({ category }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isBuyerView = location.pathname.includes("/buyer");
  const { products, getDistributionProducts } = useProducts(category, null);
  
  // Get products for the appropriate distribution channel
  const displayProducts = isBuyerView 
    ? getDistributionProducts(false).filter(p => p.isWholesale)
    : getDistributionProducts(true).filter(p => p.isRetail);
  
  const handleDownloadCatalog = (format: 'pdf' | 'csv') => {
    console.log(`Downloading catalog in ${format} format`);
    // Here you would implement the actual download logic
  };

  const handleProductClick = (productId: number) => {
    const path = isBuyerView
      ? `/buyer-products/${productId}`
      : `/consumer-products/${productId}`;
    navigate(path);
  };

  const handlePurchaseClick = (productId: number) => {
    const purchasePath = isBuyerView
      ? `/buyer-products/${productId}/purchase`
      : `/consumer-products/${productId}/purchase`;
    navigate(purchasePath);
  };

  const handleQuoteRequest = (productId: number) => {
    // For wholesale, navigate to the quote request page
    navigate(`/buyer-products/${productId}/quote`);
  };

  const getLocalizedName = (product: Product, lang: Language): string => {
    switch (lang) {
      case "KR": return product.nameKr || product.name;
      case "CN": return product.nameCn || product.name;
      case "JP": return product.nameJp || product.name;
      default: return product.name;
    }
  };

  const getLocalizedDescription = (product: Product, lang: Language): string => {
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
  const getProductPrice = (product: Product, isWholesale: boolean, lang: Language = "KR"): string => {
    if (isWholesale) {
      return lang === "EN" ? product.priceUsd : product.wholesalePrice || product.price;
    } else {
      return lang === "EN" ? product.priceUsd : product.retailPrice || product.price;
    }
  };

  // Get the appropriate MOQ based on the view
  const getProductMOQ = (product: Product, isWholesale: boolean): number => {
    return isWholesale ? 
      (product.wholesaleMOQ || product.moq || 10) : 
      (product.retailMOQ || product.moq || 1);
  };

  return (
    <>
      {isBuyerView && (
        <div className="flex flex-col sm:flex-row gap-4 mb-8 px-4">
          <Button
            onClick={() => handleDownloadCatalog('pdf')}
            variant="outline"
            className="flex items-center justify-center gap-2 w-full sm:w-auto py-6 sm:py-2 text-[#333333]"
          >
            <Download className="w-5 h-5" />
            Download PDF Catalog
          </Button>
          <Button
            onClick={() => handleDownloadCatalog('csv')}
            variant="outline"
            className="flex items-center justify-center gap-2 w-full sm:w-auto py-6 sm:py-2 text-[#333333]"
          >
            <FileText className="w-5 h-5" />
            Download CSV Catalog
          </Button>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 pb-20">
        {displayProducts.length > 0 ? (
          displayProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <AspectRatio ratio={4/3}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="object-cover w-full h-full"
                  />
                </AspectRatio>
                {product.isNewArrival && (
                  <span className="absolute top-2 right-2 bg-fabri-pink text-white px-2 py-1 text-xs rounded-md">
                    New
                  </span>
                )}
              </div>
              <CardContent className="p-4">
                <Tabs defaultValue="kr" className="w-full">
                  <TabsList className="grid w-full grid-cols-4 mb-4">
                    <TabsTrigger value="kr" className="text-sm py-3">한국어</TabsTrigger>
                    <TabsTrigger value="en" className="text-sm py-3">ENG</TabsTrigger>
                    <TabsTrigger value="cn" className="text-sm py-3">中文</TabsTrigger>
                    <TabsTrigger value="jp" className="text-sm py-3">日本語</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="kr" className="mt-4">
                    <h3 
                      className="text-lg font-semibold mb-2 text-[#333333] cursor-pointer hover:text-fabri-blue hover:underline"
                      onClick={() => handleProductClick(product.id)}
                    >
                      {getLocalizedName(product, "KR")}
                    </h3>
                    <p className="text-sm text-[#4A4A4A] mb-2">
                      최소 주문수량(MOQ): {getProductMOQ(product, isBuyerView)}개
                    </p>
                    <p className="text-lg font-medium text-fabri-blue mb-2">
                      {getProductPrice(product, isBuyerView, "KR")}
                    </p>
                    <p className="text-sm text-[#4A4A4A] mb-4">{getLocalizedDescription(product, "KR")}</p>
                  </TabsContent>
                  
                  <TabsContent value="en" className="mt-4">
                    <h3 
                      className="text-lg font-semibold mb-2 text-[#333333] cursor-pointer hover:text-fabri-blue hover:underline"
                      onClick={() => handleProductClick(product.id)}
                    >
                      {getLocalizedName(product, "EN")}
                    </h3>
                    <p className="text-sm text-[#4A4A4A] mb-2">
                      MOQ: {getProductMOQ(product, isBuyerView)} units
                    </p>
                    <p className="text-lg font-medium text-fabri-blue mb-2">
                      {getProductPrice(product, isBuyerView, "EN")}
                    </p>
                    <p className="text-sm text-[#4A4A4A] mb-4">{getLocalizedDescription(product, "EN")}</p>
                  </TabsContent>
                  
                  <TabsContent value="cn" className="mt-4">
                    <h3 
                      className="text-lg font-semibold mb-2 text-[#333333] cursor-pointer hover:text-fabri-blue hover:underline"
                      onClick={() => handleProductClick(product.id)}
                    >
                      {getLocalizedName(product, "CN")}
                    </h3>
                    <p className="text-sm text-[#4A4A4A] mb-2">
                      最小订购量: {getProductMOQ(product, isBuyerView)}件
                    </p>
                    <p className="text-lg font-medium text-fabri-blue mb-2">
                      {getProductPrice(product, isBuyerView, "CN")}
                    </p>
                    <p className="text-sm text-[#4A4A4A] mb-4">{getLocalizedDescription(product, "CN")}</p>
                  </TabsContent>
                  
                  <TabsContent value="jp" className="mt-4">
                    <h3 
                      className="text-lg font-semibold mb-2 text-[#333333] cursor-pointer hover:text-fabri-blue hover:underline"
                      onClick={() => handleProductClick(product.id)}
                    >
                      {getLocalizedName(product, "JP")}
                    </h3>
                    <p className="text-sm text-[#4A4A4A] mb-2">
                      最小注文数量: {getProductMOQ(product, isBuyerView)}個
                    </p>
                    <p className="text-lg font-medium text-fabri-blue mb-2">
                      {getProductPrice(product, isBuyerView, "JP")}
                    </p>
                    <p className="text-sm text-[#4A4A4A] mb-4">{getLocalizedDescription(product, "JP")}</p>
                  </TabsContent>
                </Tabs>
                
                <div className="flex flex-col gap-3 mt-6">
                  {isBuyerView ? (
                    <Button 
                      className="w-full flex items-center justify-center gap-2 bg-fabri-blue hover:bg-fabri-blue/90 py-6 text-lg text-white"
                      onClick={() => handleQuoteRequest(product.id)}
                    >
                      <FileText className="w-5 h-5" />
                      {getButtonText("KR")}
                    </Button>
                  ) : (
                    <div className="space-y-3">
                      <Button 
                        className="w-full flex items-center justify-center gap-2 py-6 text-lg bg-fabri-pink hover:bg-fabri-pink/90 text-white"
                        onClick={() => handlePurchaseClick(product.id)}
                      >
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
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full py-10 text-center text-gray-500">
            {isBuyerView ? "No wholesale products available yet." : "No retail products available yet."}
          </div>
        )}
      </div>
    </>
  );
};

export default ProductList;
