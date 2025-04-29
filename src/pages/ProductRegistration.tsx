
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductRegistrationForm from "@/components/ProductRegistrationForm";

const ProductRegistration = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to the seller product registration page
    navigate("/seller/products/new");
  }, [navigate]);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">상품 등록</h1>
      <p>리디렉션 중...</p>
    </div>
  );
};

export default ProductRegistration;
