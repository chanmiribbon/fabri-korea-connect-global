
import React, { useState, useEffect } from "react";
import { 
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useLanguageStore } from "@/hooks/useLanguageStore";

// Sample suggestions data - in a real app, this would come from your backend
const suggestions = [
  { id: 1, text: "귀걸이 파츠", category: "accessories" },
  { id: 2, text: "귀걸이 침", category: "materials" },
  { id: 3, text: "진주 귀걸이", category: "accessories" },
  { id: 4, text: "귀걸이 도구", category: "materials" },
  { id: 5, text: "귀걸이 부자재", category: "materials" },
];

// Translations for the search interface
const translations = {
  KR: {
    placeholder: "상품 검색...",
    emptyResult: "검색 결과가 없습니다",
    recommendationHeading: "추천 검색어",
    searchButton: "검색",
    imageSearch: "이미지 검색"
  },
  EN: {
    placeholder: "Search products...",
    emptyResult: "No results found",
    recommendationHeading: "Recommended keywords",
    searchButton: "Search",
    imageSearch: "Image Search"
  },
  CN: {
    placeholder: "搜索产品...",
    emptyResult: "没有找到结果",
    recommendationHeading: "推荐关键词",
    searchButton: "搜索",
    imageSearch: "图片搜索"
  },
  JP: {
    placeholder: "商品を検索...",
    emptyResult: "検索結果がありません",
    recommendationHeading: "おすすめのキーワード",
    searchButton: "検索",
    imageSearch: "画像検索"
  }
};

const SearchBar = () => {
  const [open, setOpen] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { language } = useLanguageStore();
  
  const text = translations[language];
  
  const handleSearch = (term = searchTerm) => {
    if (term.trim()) {
      // Navigate to search results page with the search term as a query parameter
      navigate(`/search?q=${encodeURIComponent(term.trim())}`);
      setOpen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Here you would implement the image search logic
      console.log("Image uploaded:", file);
      // For now, let's navigate to a generic search page
      navigate("/search?type=image");
      setShowImageUpload(false);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setOpen(false);
    };
    
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  return (
    <div className="relative w-full max-w-sm mx-auto">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <div className="relative rounded-lg border shadow-md">
            <div className="flex items-center border-b px-3">
              <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => setOpen(true)}
                className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground"
                placeholder={text.placeholder}
              />
              <Button 
                variant="ghost" 
                size="sm" 
                className="ml-2"
                onClick={() => handleSearch()}
              >
                {text.searchButton}
              </Button>
            </div>
            {open && (
              <div className="absolute w-full bg-white rounded-b-lg border-t z-50 max-h-[300px] overflow-y-auto">
                {suggestions.length === 0 && searchTerm ? (
                  <div className="py-6 text-center text-sm">
                    {text.emptyResult}
                  </div>
                ) : (
                  <div className="overflow-hidden p-1 text-foreground">
                    <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                      {text.recommendationHeading}
                    </div>
                    {suggestions.map((item) => (
                      <div 
                        key={item.id}
                        className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground"
                        onClick={() => {
                          setSearchTerm(item.text);
                          handleSearch(item.text);
                        }}
                      >
                        <Search className="mr-2 h-4 w-4" />
                        {item.text}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <Button
          variant="outline"
          size="icon"
          className="shrink-0"
          onClick={() => setShowImageUpload(!showImageUpload)}
        >
          <Search className="h-4 w-4" />
        </Button>
      </div>

      {showImageUpload && (
        <div className="absolute right-0 mt-2 p-4 bg-white rounded-lg border shadow-lg z-40">
          <p className="mb-2 text-sm">{text.imageSearch}</p>
          <Input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full"
          />
        </div>
      )}
    </div>
  );
};

export default SearchBar;
