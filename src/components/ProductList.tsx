
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { FileText, ShoppingCart } from "lucide-react";
import { useLocation } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  nameEn: string;
  image: string;
  moq: number;
  price: string;
  priceUSD: string;
  description: string;
  descriptionEn: string;
}

interface ProductListProps {
  category: "clothing" | "materials" | "accessories" | "hanbok";
}

const ProductList: React.FC<ProductListProps> = ({ category }) => {
  const location = useLocation();
  const isBuyerView = location.pathname.includes("/buyer");
  
  const products: Product[] = [
    {
      id: 1,
      name: "샘플 제품",
      nameEn: "Sample Product",
      image: "/lovable-uploads/beb7f058-46f6-4d16-9441-38837503b0b5.png",
      moq: 100,
      price: "10,000원",
      priceUSD: "$8.50",
      description: "제품 상세 설명입니다.",
      descriptionEn: "This is the product description."
    },
    // More products can be added here
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <Card key={product.id} className="overflow-hidden">
          <AspectRatio ratio={4/3}>
            <img
              src={product.image}
              alt={product.name}
              className="object-cover w-full h-full"
            />
          </AspectRatio>
          <CardContent className="p-4">
            <Tabs defaultValue="kr" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="kr">한국어</TabsTrigger>
                <TabsTrigger value="en">English</TabsTrigger>
              </TabsList>
              <TabsContent value="kr" className="mt-4">
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-2">최소 주문수량(MOQ): {product.moq}개</p>
                <p className="text-lg font-medium text-fabri-purple mb-2">{product.price}</p>
                <p className="text-sm text-gray-600 mb-4">{product.description}</p>
              </TabsContent>
              <TabsContent value="en" className="mt-4">
                <h3 className="text-lg font-semibold mb-2">{product.nameEn}</h3>
                <p className="text-sm text-gray-600 mb-2">MOQ: {product.moq} units</p>
                <p className="text-lg font-medium text-fabri-purple mb-2">{product.priceUSD}</p>
                <p className="text-sm text-gray-600 mb-4">{product.descriptionEn}</p>
              </TabsContent>
            </Tabs>
            
            {isBuyerView ? (
              <Button className="w-full flex items-center gap-2 bg-fabri-purple hover:bg-fabri-purple/90">
                <FileText className="w-4 h-4" />
                도매 견적 요청
              </Button>
            ) : (
              <Button className="w-full flex items-center gap-2">
                <ShoppingCart className="w-4 h-4" />
                지금 구매하기
              </Button>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProductList;
