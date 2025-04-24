
import React from 'react';
import { useParams } from 'react-router-dom';

const CategoryProducts = () => {
  const { category } = useParams();
  
  const getCategoryTitle = (slug: string) => {
    switch (slug) {
      case 'fabrics':
        return '원단';
      case 'accessories':
        return '부자재';
      case 'parts':
        return '파츠/단추';
      case 'custom':
        return '맞춤 주문';
      default:
        return '';
    }
  };

  return (
    <div className="pt-20 px-4 min-h-screen bg-gradient-to-b from-white to-pink-50">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-fabri-purple mb-8">
          {getCategoryTitle(category || '')}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Product items will be added here in the next iteration */}
          <div className="h-64 bg-white rounded-lg shadow-md animate-pulse" />
          <div className="h-64 bg-white rounded-lg shadow-md animate-pulse" />
          <div className="h-64 bg-white rounded-lg shadow-md animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default CategoryProducts;
