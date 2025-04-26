
import React from "react";
import { useNavigate } from "react-router-dom";
import { useLanguageStore } from "@/hooks/useLanguageStore";
import SellerLayout from "@/components/seller/SellerLayout";
import ProductManagementContent from "@/components/seller/products/ProductManagementContent";

const SellerProducts = () => {
  const { language } = useLanguageStore();
  
  return (
    <SellerLayout currentPage="products">
      <ProductManagementContent language={language} />
    </SellerLayout>
  );
};

export default SellerProducts;
