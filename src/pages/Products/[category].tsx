
import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface Product {
  id: number;
  name: string;
  nameKr: string;
  image: string;
  price: string;
}

const CategoryProducts = () => {
  const { category } = useParams();
  
  const getCategoryProducts = (slug: string): Product[] => {
    switch (slug) {
      case 'accessories':
        return [
          {
            id: 1,
            name: "Flower Hair Pin (White)",
            nameKr: "꽃 머리핀 (화이트)",
            image: "/lovable-uploads/beb7f058-46f6-4d16-9441-38837503b0b5.png",
            price: "12,000원"
          },
          {
            id: 2,
            name: "Flower Hair Pin (Pink)",
            nameKr: "꽃 머리핀 (핑크)",
            image: "/lovable-uploads/beb7f058-46f6-4d16-9441-38837503b0b5.png",
            price: "12,000원"
          }
        ];
      case 'parts':
        return [
          {
            id: 1,
            name: "Gold Clip Set",
            nameKr: "골드 클립 세트",
            image: "/lovable-uploads/5df0021b-e8b9-4d7c-80d8-362fd0717043.png",
            price: "15,000원"
          }
        ];
      default:
        return [];
    }
  };

  const products = getCategoryProducts(category || '');

  return (
    <div className="pt-20 px-4 min-h-screen bg-gradient-to-b from-white to-pink-50">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-fabri-purple mb-8">
          {category === 'fabrics' && '원단'}
          {category === 'accessories' && '부자재'}
          {category === 'parts' && '파츠/단추'}
          {category === 'custom' && '주문제작'}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-xl transition-all duration-300">
              <AspectRatio ratio={1}>
                <img
                  src={product.image}
                  alt={product.nameKr}
                  className="object-cover w-full h-full"
                />
              </AspectRatio>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-1">{product.nameKr}</h3>
                <p className="text-fabri-purple font-medium">{product.price}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryProducts;
