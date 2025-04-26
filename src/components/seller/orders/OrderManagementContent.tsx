
import React from "react";
import { Language } from "@/hooks/useLanguageStore";
import OrdersTable from "./OrdersTable";
import OrdersFilter from "./OrdersFilter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";

interface OrderManagementContentProps {
  language: Language;
}

const translations = {
  orderManagement: {
    KR: "주문 관리",
    EN: "Order Management",
    CN: "订单管理",
    JP: "注文管理",
  },
};

const OrderManagementContent: React.FC<OrderManagementContentProps> = ({ language }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-medium">
            {translations.orderManagement[language]}
          </CardTitle>
          <ShoppingCart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <OrdersFilter language={language} />
          <OrdersTable language={language} />
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderManagementContent;
