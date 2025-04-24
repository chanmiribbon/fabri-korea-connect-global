
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface Category {
  id: number;
  name: string;
  nameKr: string;
  image: string;
}

interface CategorySectionProps {
  language: string;
}

const CategorySection: React.FC<CategorySectionProps> = ({ language }) => {
  const categories: Category[] = [
    {
      id: 1,
      name: "Fabrics",
      nameKr: "원단",
      image: "bg-gradient-to-r from-purple-500 to-pink-500"
    },
    {
      id: 2,
      name: "Accessories",
      nameKr: "부자재",
      image: "bg-gradient-to-r from-blue-500 to-teal-500"
    },
    {
      id: 3,
      name: "Materials",
      nameKr: "자재",
      image: "bg-gradient-to-r from-green-500 to-yellow-500"
    },
    {
      id: 4,
      name: "Custom Order",
      nameKr: "맞춤 주문",
      image: "bg-gradient-to-r from-orange-500 to-red-500"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-fabri-darkPurple sm:text-4xl">
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
              className="overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer transform hover:-translate-y-1 transition-transform duration-300"
            >
              <div
                className={`h-40 ${category.image} flex items-center justify-center`}
              >
                <h3 className="text-2xl font-bold text-white">
                  {language === "KR" ? category.nameKr : category.name}
                </h3>
              </div>
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
