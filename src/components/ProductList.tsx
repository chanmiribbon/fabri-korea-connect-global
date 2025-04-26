import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { FileText, ShoppingCart, Download, CreditCard } from "lucide-react";
import { useLocation } from "react-router-dom";
import type { Language } from "@/components/Navbar";

interface Product {
  id: number;
  name: {
    kr: string;
    en: string;
    cn: string;
    jp: string;
  };
  image: string;
  moq: number;
  price: {
    kr: string;
    en: string;
    cn: string;
    jp: string;
  };
  description: {
    kr: string;
    en: string;
    cn: string;
    jp: string;
  };
}

interface ProductListProps {
  category: "clothing" | "materials" | "accessories" | "hanbok";
}

const ProductList: React.FC<ProductListProps> = ({ category }) => {
  const location = useLocation();
  const isBuyerView = location.pathname.includes("/buyer");
  
  const handleDownloadCatalog = (format: 'pdf' | 'csv') => {
    console.log(`Downloading catalog in ${format} format`);
    // Here you would implement the actual download logic
  };

  const products: Product[] = [
    {
      id: 1,
      name: {
        kr: "샘플 제품",
        en: "Sample Product",
        cn: "样品产品",
        jp: "サンプル製品"
      },
      image: "/lovable-uploads/beb7f058-46f6-4d16-9441-38837503b0b5.png",
      moq: 100,
      price: {
        kr: "10,000원",
        en: "$8.50",
        cn: "¥58.50",
        jp: "¥950"
      },
      description: {
        kr: "제품 상세 설명입니다.",
        en: "This is the product description.",
        cn: "这是产品描述。",
        jp: "製品の詳細説明です。"
      }
    },
    // More products can be added here
  ];

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

  return (
    <>
      {isBuyerView && (
        <div className="flex gap-4 mb-8">
          <Button
            onClick={() => handleDownloadCatalog('pdf')}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download PDF Catalog
          </Button>
          <Button
            onClick={() => handleDownloadCatalog('csv')}
            variant="outline"
            className="flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            Download CSV Catalog
          </Button>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <AspectRatio ratio={4/3}>
              <img
                src={product.image}
                alt={product.name.en}
                className="object-cover w-full h-full"
              />
            </AspectRatio>
            <CardContent className="p-4">
              <Tabs defaultValue="kr" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="kr">한국어</TabsTrigger>
                  <TabsTrigger value="en">English</TabsTrigger>
                  <TabsTrigger value="cn">中文</TabsTrigger>
                  <TabsTrigger value="jp">日本語</TabsTrigger>
                </TabsList>
                <TabsContent value="kr" className="mt-4">
                  <h3 className="text-lg font-semibold mb-2">{product.name.kr}</h3>
                  <p className="text-sm text-gray-600 mb-2">최소 주문수량(MOQ): {product.moq}개</p>
                  <p className="text-lg font-medium text-fabri-purple mb-2">{product.price.kr}</p>
                  <p className="text-sm text-gray-600 mb-4">{product.description.kr}</p>
                </TabsContent>
                <TabsContent value="en" className="mt-4">
                  <h3 className="text-lg font-semibold mb-2">{product.name.en}</h3>
                  <p className="text-sm text-gray-600 mb-2">MOQ: {product.moq} units</p>
                  <p className="text-lg font-medium text-fabri-purple mb-2">{product.price.en}</p>
                  <p className="text-sm text-gray-600 mb-4">{product.description.en}</p>
                </TabsContent>
                <TabsContent value="cn" className="mt-4">
                  <h3 className="text-lg font-semibold mb-2">{product.name.cn}</h3>
                  <p className="text-sm text-gray-600 mb-2">最小订购量: {product.moq}件</p>
                  <p className="text-lg font-medium text-fabri-purple mb-2">{product.price.cn}</p>
                  <p className="text-sm text-gray-600 mb-4">{product.description.cn}</p>
                </TabsContent>
                <TabsContent value="jp" className="mt-4">
                  <h3 className="text-lg font-semibold mb-2">{product.name.jp}</h3>
                  <p className="text-sm text-gray-600 mb-2">最小注文数量: {product.moq}個</p>
                  <p className="text-lg font-medium text-fabri-purple mb-2">{product.price.jp}</p>
                  <p className="text-sm text-gray-600 mb-4">{product.description.jp}</p>
                </TabsContent>
              </Tabs>
              
              <div className="flex flex-col gap-2 mt-4">
                {isBuyerView ? (
                  <Button className="w-full flex items-center gap-2 bg-fabri-purple hover:bg-fabri-purple/90">
                    <FileText className="w-4 h-4" />
                    {getButtonText("KR")}
                  </Button>
                ) : (
                  <div className="space-y-2">
                    <Button className="w-full flex items-center gap-2">
                      <ShoppingCart className="w-4 h-4" />
                      {getButtonText("KR")}
                    </Button>
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                      <CreditCard className="w-4 h-4" />
                      PayPal / Credit Card Available
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

export default ProductList;
