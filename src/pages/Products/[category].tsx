
import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface Product {
  id: number;
  name: string;
  nameKr: string;
  nameCn: string;
  nameJp: string;
  image: string;
  price: string;
  priceUsd: string;
  subcategory: string;
  description: string;
  descriptionKr: string;
  descriptionCn: string;
  descriptionJp: string;
  stock: number;
  specifications: {
    size?: string;
    material?: string;
    colors?: string[];
  };
}

const CategoryProducts = () => {
  const { category } = useParams();
  
  const getCategoryProducts = (slug: string): Product[] => {
    switch (slug) {
      case 'dongdaemun-accessories':
        return [
          {
            id: 1,
            name: "Crystal Flower Hair Pin",
            nameKr: "크리스탈 플라워 머리핀",
            nameCn: "水晶花朵发夹",
            nameJp: "クリスタルフラワーヘアピン",
            image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
            price: "15,000원",
            priceUsd: "$12.99",
            subcategory: "hair",
            description: "Elegant crystal flower hair pin with pearl accents",
            descriptionKr: "진주 장식이 있는 우아한 크리스탈 플라워 머리핀",
            descriptionCn: "优雅的水晶花朵发夹，珍珠装饰",
            descriptionJp: "パール装飾付きエレガントクリスタルフラワーヘアピン",
            stock: 150,
            specifications: {
              size: "8cm x 3cm",
              material: "Crystal, Pearl, Alloy",
              colors: ["Silver", "Gold", "Rose Gold"]
            }
          },
          {
            id: 2,
            name: "Vintage Style Necklace",
            nameKr: "빈티지 스타일 목걸이",
            nameCn: "复古风格项链",
            nameJp: "ヴィンテージスタイルネックレス",
            image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
            price: "25,000원",
            priceUsd: "$21.99",
            subcategory: "jewelry",
            description: "Vintage-inspired pendant necklace with antique finish",
            descriptionKr: "앤틱 마감 처리된 빈티지 스타일의 펜던트 목걸이",
            descriptionCn: "复古风格吊坠项链，古董式处理",
            descriptionJp: "アンティーク仕上げのヴィンテージ風ペンダントネックレス",
            stock: 100,
            specifications: {
              size: "Chain length: 45cm",
              material: "Brass with antique finish",
              colors: ["Antique Gold", "Antique Silver"]
            }
          },
          {
            id: 3,
            name: "Pearl Drop Earrings",
            nameKr: "진주 드롭 귀걸이",
            nameCn: "珍珠水滴耳环",
            nameJp: "パールドロップピアス",
            image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
            price: "18,000원",
            priceUsd: "$15.99",
            subcategory: "jewelry",
            description: "Elegant pearl drop earrings with crystal accents",
            descriptionKr: "크리스탈 장식이 있는 우아한 진주 드롭 귀걸이",
            descriptionCn: "优雅的珍珠水滴耳环，水晶装饰",
            descriptionJp: "クリスタル装飾付きエレガントパールドロップピアス",
            stock: 200,
            specifications: {
              size: "3.5cm length",
              material: "Fresh water pearl, Crystal, 925 Sterling Silver",
              colors: ["White Pearl", "Pink Pearl"]
            }
          }
        ];
      case 'namdaemun-accessories':
        return [
          {
            id: 1,
            name: "Fashion Statement Ring",
            nameKr: "패션 스테이트먼트 반지",
            nameCn: "时尚宣言戒指",
            nameJp: "ファッションステートメントリング",
            image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
            price: "12,000원",
            priceUsd: "$9.99",
            subcategory: "jewelry",
            description: "Bold statement ring with geometric design",
            descriptionKr: "기하학적 디자인의 볼드한 스테이트먼트 반지",
            descriptionCn: "大胆的几何设计宣言戒指",
            descriptionJp: "幾何学デザインのボールドなステートメントリング",
            stock: 300,
            specifications: {
              size: "Adjustable (US size 6-9)",
              material: "Brass with 18K Gold plating",
              colors: ["Gold", "Silver", "Rose Gold"]
            }
          },
          {
            id: 2,
            name: "Mini Cross Body Bag",
            nameKr: "미니 크로스 백",
            nameCn: "迷你斜挎包",
            nameJp: "ミニクロスボディバッグ",
            image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
            price: "35,000원",
            priceUsd: "$29.99",
            subcategory: "bags",
            description: "Compact crossbody bag with adjustable strap",
            descriptionKr: "조절 가능한 스트랩이 있는 콤팩트한 크로스백",
            descriptionCn: "带可调节肩带的小巧斜挎包",
            descriptionJp: "調節可能なストラップ付きコンパクトクロスボディバッグ",
            stock: 80,
            specifications: {
              size: "18cm x 12cm x 6cm",
              material: "Premium PU Leather",
              colors: ["Black", "Brown", "Beige"]
            }
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
                <p className="text-gray-600 text-sm mb-2">{product.descriptionKr}</p>
                <p className="text-gray-500 text-sm mb-2">
                  {product.specifications.size && `크기: ${product.specifications.size}`}
                </p>
                <p className="text-fabri-purple font-medium">{product.price}</p>
                <p className="text-gray-400 text-sm">USD {product.priceUsd}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryProducts;
