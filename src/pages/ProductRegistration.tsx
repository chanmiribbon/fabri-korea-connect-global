
import React from "react";
import { useNavigate } from "react-router-dom";
import ProductRegistrationForm from "@/components/ProductRegistrationForm";

const ProductRegistration = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">상품 등록</h1>
      <ProductRegistrationForm />
    </div>
  );
};

export default ProductRegistration;
