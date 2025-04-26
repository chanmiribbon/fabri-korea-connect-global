
import React from "react";
import { Language } from "@/hooks/useLanguageStore";
import DashboardStats from "./dashboard/DashboardStats";

interface SellerDashboardContentProps {
  language: Language;
}

const SellerDashboardContent: React.FC<SellerDashboardContentProps> = ({ language }) => {
  return (
    <div className="space-y-8">
      <DashboardStats language={language} />
    </div>
  );
};

export default SellerDashboardContent;
