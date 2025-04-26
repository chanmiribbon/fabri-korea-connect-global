
import React from "react";
import { Navigate } from "react-router-dom";
import { useLanguageStore } from "@/hooks/useLanguageStore";
import SellerLayout from "@/components/seller/SellerLayout";
import { useSellerAuth } from "@/hooks/useSellerAuth";
import OrderManagementContent from "@/components/seller/orders/OrderManagementContent";

const SellerOrders = () => {
  const { language } = useLanguageStore();
  const { isSeller, isLoading } = useSellerAuth();
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-fabri-blue"></div>
      </div>
    );
  }
  
  if (!isSeller) {
    return <Navigate to="/access-denied" />;
  }

  return (
    <SellerLayout currentPage="orders">
      <OrderManagementContent language={language} />
    </SellerLayout>
  );
};

export default SellerOrders;
