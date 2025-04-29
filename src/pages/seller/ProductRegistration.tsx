
import React from "react";
import { useNavigate } from "react-router-dom";
import SellerLayout from "@/components/seller/SellerLayout";
import ProductRegistrationForm from "@/components/ProductRegistrationForm";
import { useLanguageStore } from "@/hooks/useLanguageStore";
import { toast } from "sonner";
import { useProducts, convertFormDataToProduct } from "@/hooks/useProducts";

const SellerProductRegistration = () => {
  const { language } = useLanguageStore();
  const navigate = useNavigate();
  const { addProduct } = useProducts(undefined, null);
  
  const handleProductSubmit = (formData: any) => {
    // Convert form data to product
    const newProduct = convertFormDataToProduct(formData);
    
    // Add product to the store
    const product = addProduct(newProduct);
    
    // Show success message
    toast.success(
      language === "KR" ? "상품이 등록되었습니다." :
      language === "CN" ? "产品已注册。" :
      language === "JP" ? "製品が登録されました。" :
      "Product has been registered."
    );
    
    navigate("/seller/products");
  };
  
  return (
    <SellerLayout currentPage="products">
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold">
          {language === "KR" ? "상품 등록" :
           language === "CN" ? "添加产品" :
           language === "JP" ? "商品追加" :
           "Add Product"}
        </h1>
        
        <ProductRegistrationForm onSubmitSuccess={handleProductSubmit} />
      </div>
    </SellerLayout>
  );
};

export default SellerProductRegistration;
