
import React from "react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Language } from "@/hooks/useLanguageStore";
import ProductsTable from "./ProductsTable";
import ProductsFilter from "./ProductsFilter";
import { useProducts } from "@/hooks/useProducts";

interface ProductManagementContentProps {
  language: Language;
}

const translations = {
  productManagement: {
    KR: "상품 관리",
    EN: "Product Management",
    CN: "产品管理",
    JP: "商品管理",
  },
  addProduct: {
    KR: "상품 등록",
    EN: "Add Product",
    CN: "添加产品",
    JP: "商品追加",
  },
};

const ProductManagementContent: React.FC<ProductManagementContentProps> = ({ language }) => {
  const navigate = useNavigate();
  const { products } = useProducts("accessories", null);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">
          {translations.productManagement[language]}
        </h1>
        <Button onClick={() => navigate("/seller/products/new")}>
          <Plus className="mr-2 h-4 w-4" />
          {translations.addProduct[language]}
        </Button>
      </div>
      
      <ProductsFilter language={language} />
      <ProductsTable products={products} language={language} />
    </div>
  );
};

export default ProductManagementContent;
