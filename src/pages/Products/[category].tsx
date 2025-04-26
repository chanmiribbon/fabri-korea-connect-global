
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguageStore } from "@/hooks/useLanguageStore";
import { useProducts } from "@/hooks/useProducts";
import { getSubcategories, getCategoryName } from "@/utils/categoryUtils";
import ProductCard from "@/components/products/ProductCard";
import { Subcategory } from "@/types/product";

const CategoryProducts = () => {
  const { category } = useParams();
  const { language } = useLanguageStore();
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null);
  
  const subcategories = getSubcategories(category);
  const { products } = useProducts(category, activeSubcategory);
  const categoryInfo = getCategoryName(category);
  const categoryName = language === 'KR' ? categoryInfo.nameKr : categoryInfo.name;
  
  const handleSubcategoryClick = (subcategoryId: string) => {
    if (activeSubcategory === subcategoryId) {
      setActiveSubcategory(null); // Toggle off if already selected
    } else {
      setActiveSubcategory(subcategoryId);
    }
  };
  
  const getSubcategoryName = (subcategory: Subcategory) => {
    switch (language) {
      case 'KR': return subcategory.nameKr;
      case 'CN': return subcategory.nameCn;
      case 'JP': return subcategory.nameJp;
      default: return subcategory.name;
    }
  };

  return (
    <div className="pt-20 px-4 min-h-screen bg-gradient-to-b from-white to-pink-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center justify-between mb-4">
          <div>
            <h1 className="text-4xl font-bold text-fabri-purple mb-2">
              {categoryName}
            </h1>
            {activeSubcategory && subcategories.find(sub => sub.id === activeSubcategory) && (
              <p className="text-lg text-gray-600">
                {getSubcategoryName(subcategories.find(sub => sub.id === activeSubcategory)!)}
              </p>
            )}
          </div>
          <Link to="/products" className="text-fabri-blue hover:text-fabri-purple">
            &larr; {language === 'KR' ? '모든 카테고리' : 'All Categories'}
          </Link>
        </div>
        
        {subcategories.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-medium mb-4">
              {language === 'KR' ? '하위 카테고리' : 'Subcategories'}
            </h2>
            <div className="flex flex-wrap gap-2">
              {subcategories.map((subcategory) => (
                <button
                  key={subcategory.id}
                  onClick={() => handleSubcategoryClick(subcategory.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                    activeSubcategory === subcategory.id
                      ? 'bg-fabri-purple text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  {subcategory.icon}
                  {getSubcategoryName(subcategory)}
                </button>
              ))}
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} product={product} language={language} />
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <p className="text-gray-500 text-lg">
                {language === 'KR' 
                  ? '이 카테고리에 제품이 없습니다.' 
                  : 'No products found in this category.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryProducts;
