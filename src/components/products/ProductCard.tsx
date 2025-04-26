
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  language: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, language }) => {
  const getProductName = (product: Product) => {
    switch (language) {
      case 'KR': return product.nameKr;
      case 'CN': return product.nameCn;
      case 'JP': return product.nameJp;
      default: return product.name;
    }
  };

  const getProductDescription = (product: Product) => {
    switch (language) {
      case 'KR': return product.descriptionKr;
      case 'CN': return product.descriptionCn;
      case 'JP': return product.descriptionJp;
      default: return product.description;
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
      <AspectRatio ratio={1}>
        <img
          src={product.image}
          alt={getProductName(product)}
          className="object-cover w-full h-full"
        />
        <div className="absolute top-2 right-2 flex flex-col gap-2">
          {product.isBestSeller && (
            <Badge className="bg-amber-500 hover:bg-amber-600">
              {language === 'KR' ? '베스트셀러' : 'Best Seller'}
            </Badge>
          )}
          {product.isNewArrival && (
            <Badge className="bg-emerald-500 hover:bg-emerald-600">
              {language === 'KR' ? '신상품' : 'New Arrival'}
            </Badge>
          )}
        </div>
      </AspectRatio>
      <CardContent className="p-4">
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="details">
              {language === 'KR' ? '상세정보' : 'Details'}
            </TabsTrigger>
            <TabsTrigger value="specs">
              {language === 'KR' ? '제품사양' : 'Specs'}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="mt-2">
            <h3 className="font-semibold text-lg mb-1">{getProductName(product)}</h3>
            <p className="text-gray-600 text-sm mb-2">{getProductDescription(product)}</p>
            <div className="flex items-center justify-between mt-3">
              <p className="text-fabri-purple font-medium">{product.price}</p>
              <p className="text-gray-400 text-sm">{product.priceUsd}</p>
            </div>
            <p className="text-gray-500 text-xs mt-1">
              {language === 'KR' ? `재고: ${product.stock}개` : `Stock: ${product.stock} units`}
            </p>
          </TabsContent>
          
          <TabsContent value="specs" className="mt-2">
            {product.specifications.size && (
              <p className="text-gray-700 text-sm mb-1">
                <span className="font-medium">{language === 'KR' ? '크기' : 'Size'}:</span> {product.specifications.size}
              </p>
            )}
            {product.specifications.material && (
              <p className="text-gray-700 text-sm mb-1">
                <span className="font-medium">{language === 'KR' ? '소재' : 'Material'}:</span> {product.specifications.material}
              </p>
            )}
            {product.specifications.colors && product.specifications.colors.length > 0 && (
              <div className="mb-1">
                <p className="text-gray-700 text-sm font-medium mb-1">
                  {language === 'KR' ? '색상' : 'Colors'}:
                </p>
                <div className="flex flex-wrap gap-1">
                  {product.specifications.colors.map((color, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs">
                      {color}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {product.specifications.weight && (
              <p className="text-gray-700 text-sm mb-1">
                <span className="font-medium">{language === 'KR' ? '무게' : 'Weight'}:</span> {product.specifications.weight}
              </p>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
