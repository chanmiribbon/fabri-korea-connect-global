
import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Language } from "@/hooks/useLanguageStore";

interface ProductsFilterProps {
  language: Language;
}

const translations = {
  search: {
    KR: "상품명 검색",
    EN: "Search products",
    CN: "搜索产品",
    JP: "商品検索",
  },
  category: {
    KR: "카테고리",
    EN: "Category",
    CN: "类别",
    JP: "カテゴリー",
  },
  status: {
    KR: "상태",
    EN: "Status",
    CN: "状态",
    JP: "状態",
  },
  all: {
    KR: "전체",
    EN: "All",
    CN: "全部",
    JP: "全て",
  },
  active: {
    KR: "판매 중",
    EN: "Active",
    CN: "销售中",
    JP: "販売中",
  },
  inactive: {
    KR: "판매 중지",
    EN: "Inactive",
    CN: "已停售",
    JP: "販売停止",
  },
};

const ProductsFilter: React.FC<ProductsFilterProps> = ({ language }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          placeholder={translations.search[language]}
          className="pl-10"
        />
      </div>
      <Select defaultValue="all">
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={translations.category[language]} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{translations.all[language]}</SelectItem>
          <SelectItem value="accessories">Accessories</SelectItem>
          <SelectItem value="clothing">Clothing</SelectItem>
        </SelectContent>
      </Select>
      <Select defaultValue="all">
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={translations.status[language]} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{translations.all[language]}</SelectItem>
          <SelectItem value="active">{translations.active[language]}</SelectItem>
          <SelectItem value="inactive">{translations.inactive[language]}</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ProductsFilter;
