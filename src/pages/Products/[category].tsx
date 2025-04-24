
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
  subcategory: string;
}

const CategoryProducts = () => {
  const { category } = useParams();
  
  const getCategoryProducts = (slug: string): Product[] => {
    switch (slug) {
      case 'dongdaemun-accessories':
        return [
          {
            id: 1,
            name: "Hair Accessories",
            nameKr: "헤어 액세서리",
            image: "/lovable-uploads/beb7f058-46f6-4d16-9441-38837503b0b5.png",
            price: "12,000원",
            subcategory: "hair"
          },
          {
            id: 2,
            name: "Jewelry",
            nameKr: "주얼리",
            image: "/lovable-uploads/beb7f058-46f6-4d16-9441-38837503b0b5.png",
            price: "15,000원",
            subcategory: "jewelry"
          },
          {
            id: 3,
            name: "Bags",
            nameKr: "가방",
            image: "/lovable-uploads/beb7f058-46f6-4d16-9441-38837503b0b5.png",
            price: "25,000원",
            subcategory: "bags"
          }
        ];
      case 'namdaemun-accessories':
        return [
          {
            id: 1,
            name: "Hair Accessories",
            nameKr: "헤어 액세서리",
            image: "/lovable-uploads/beb7f058-46f6-4d16-9441-38837503b0b5.png",
            price: "10,000원",
            subcategory: "hair"
          },
          {
            id: 2,
            name: "Fashion Accessories",
            nameKr: "패션 액세서리",
            image: "/lovable-uploads/beb7f058-46f6-4d16-9441-38837503b0b5.png",
            price: "18,000원",
            subcategory: "fashion"
          }
        ];
      default:
        return [];
    }
  };

  const products = getCategoryProducts(category || '');
  const marketName = category?.includes('dongdaemun') ? '동대문 시장' : '남대문 시장';

  return (
    <div className="pt-20 px-4 min-h-screen bg-gradient-to-b from-white to-pink-50">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-fabri-purple mb-2">
          {marketName}
        </h1>
        <h2 className="text-2xl text-gray-600 mb-8">액세서리 카테고리</h2>
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
                <p className="text-gray-600 text-sm mb-2">카테고리: {product.subcategory}</p>
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
