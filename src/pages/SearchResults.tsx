
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductList from "@/components/ProductList";
import { useLanguageStore } from "@/hooks/useLanguageStore";

// Translations for the search results page
const translations = {
  KR: {
    title: "검색 결과",
    subtitle: "다음 검색어에 대한 결과입니다:",
    noResults: "검색 결과가 없습니다. 다른 검색어로 시도해보세요.",
    imageSearchTitle: "이미지 검색 결과",
    imageSearchSubtitle: "업로드한 이미지와 유사한 제품입니다"
  },
  EN: {
    title: "Search Results",
    subtitle: "Results for:",
    noResults: "No results found. Please try a different search term.",
    imageSearchTitle: "Image Search Results",
    imageSearchSubtitle: "Products similar to your uploaded image"
  },
  CN: {
    title: "搜索结果",
    subtitle: "搜索词的结果：",
    noResults: "没有找到结果。请尝试不同的搜索词。",
    imageSearchTitle: "图片搜索结果",
    imageSearchSubtitle: "与您上传的图片相似的产品"
  },
  JP: {
    title: "検索結果",
    subtitle: "次の検索キーワードの結果：",
    noResults: "検索結果がありません。別のキーワードで試してください。",
    imageSearchTitle: "画像検索結果",
    imageSearchSubtitle: "アップロードした画像に似ている製品"
  }
};

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const searchType = searchParams.get('type');
  const { language } = useLanguageStore();
  const [hasResults, setHasResults] = useState(true);
  
  const text = translations[language];
  
  // In a real app, you would fetch search results from API
  // For now, we're just simulating based on the mock data
  useEffect(() => {
    // Simulate search results check
    // In a real app, this would be determined by your API response
    setHasResults(query !== "noresults" && query !== "");
  }, [query]);

  return (
    <div className="min-h-screen flex flex-col animate-fade-in">
      <Navbar />
      <div className="flex-grow pt-16">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-[#333333] mb-4">
            {searchType === 'image' ? text.imageSearchTitle : text.title}
          </h1>
          
          {query && !searchType && (
            <p className="text-lg text-[#4A4A4A] mb-8">
              {text.subtitle} <span className="font-semibold">"{query}"</span>
            </p>
          )}
          
          {searchType === 'image' && (
            <p className="text-lg text-[#4A4A4A] mb-8">
              {text.imageSearchSubtitle}
            </p>
          )}
          
          {hasResults ? (
            <ProductList category="accessories" />
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-[#4A4A4A]">{text.noResults}</p>
            </div>
          )}
        </div>
      </div>
      <Footer language={language} />
    </div>
  );
};

export default SearchResults;
