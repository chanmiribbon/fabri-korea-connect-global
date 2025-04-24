
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useNavigate } from "react-router-dom";

interface Category {
  id: number;
  name: string;
  nameKr: string;
  image: string;
  slug: string;
}

interface CategorySectionProps {
  language: string;
}

const CategorySection: React.FC<CategorySectionProps> = ({ language }) => {
  const navigate = useNavigate();
  
  const categories: Category[] = [
    {
      id: 1,
      name: "Fabrics",
      nameKr: "원단",
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
      slug: "fabrics"
    },
    {
      id: 2,
      name: "Accessories",
      nameKr: "부자재",
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
      slug: "accessories"
    },
    {
      id: 3,
      name: "Parts & Buttons",
      nameKr: "파츠/단추",
      image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
      slug: "parts"
    },
    {
      id: 4,
      name: "Custom Order",
      nameKr: "맞춤 주문",
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
      slug: "custom"
    }
  ];

  const handleCategoryClick = (slug: string) => {
    navigate(`/products/${slug}`);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-fabri-purple sm:text-4xl">
            {language === "KR" ? "제품 카테고리" : "Product Categories"}
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            {language === "KR"
              ? "동대문과 남대문 시장의 최고 품질 제품을 만나보세요"
              : "Explore top quality products from Dongdaemun and Namdaemun markets"}
          </p>
        </div>

        <div className="mt-12 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Card
              key={category.id}
              className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 bg-white/80 backdrop-blur-sm border border-pink-100/40"
              onClick={() => handleCategoryClick(category.slug)}
            >
              <AspectRatio ratio={16 / 9} className="bg-muted">
                <img
                  src={category.image}
                  alt={language === "KR" ? category.nameKr : category.name}
                  className="object-cover w-full h-full brightness-95 hover:brightness-90 transition-all duration-300"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/40 to-transparent">
                  <h3 className="text-2xl font-bold text-white drop-shadow-lg">
                    {language === "KR" ? category.nameKr : category.name}
                  </h3>
                </div>
              </AspectRatio>
              <CardContent className="p-4">
                <p className="text-gray-600">
                  {language === "KR"
                    ? "최고 품질의 제품을 살펴보세요"
                    : "Browse our high-quality selection"}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
