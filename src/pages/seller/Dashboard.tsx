
import React from "react";
import { Navigate } from "react-router-dom";
import { useLanguageStore } from "@/hooks/useLanguageStore";
import SellerLayout from "@/components/seller/SellerLayout";
import SellerDashboardContent from "@/components/seller/SellerDashboardContent";
import { useSellerAuth } from "@/hooks/useSellerAuth";

const SellerDashboard = () => {
  const { language } = useLanguageStore();
  const { isSeller, isLoading } = useSellerAuth();
  
  // Show loading state while checking seller status
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-fabri-blue"></div>
      </div>
    );
  }
  
  // Redirect non-sellers to the home page
  if (!isSeller) {
    return <Navigate to="/access-denied" />;
  }

  return (
    <SellerLayout currentPage="dashboard">
      <SellerDashboardContent language={language} />
    </SellerLayout>
  );
};

export default SellerDashboard;
