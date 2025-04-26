
import React from "react";
import { Language } from "@/hooks/useLanguageStore";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface OrdersFilterProps {
  language: Language;
}

const translations = {
  searchOrder: {
    KR: "주문 검색",
    EN: "Search orders",
    CN: "搜索订单",
    JP: "注文を検索",
  },
  status: {
    KR: "주문 상태",
    EN: "Order Status",
    CN: "订单状态",
    JP: "注文状態",
  },
  all: {
    KR: "전체",
    EN: "All",
    CN: "全部",
    JP: "すべて",
  },
  new: {
    KR: "신규",
    EN: "New",
    CN: "新订单",
    JP: "新規",
  },
  shipped: {
    KR: "배송중",
    EN: "Shipped",
    CN: "已发货",
    JP: "発送済み",
  },
  completed: {
    KR: "완료",
    EN: "Completed",
    CN: "已完成",
    JP: "完了",
  },
  cancelled: {
    KR: "취소",
    EN: "Cancelled",
    CN: "已取消",
    JP: "キャンセル",
  },
};

const OrdersFilter: React.FC<OrdersFilterProps> = ({ language }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <Input 
        placeholder={translations.searchOrder[language]} 
        className="max-w-sm"
      />
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={translations.status[language]} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{translations.all[language]}</SelectItem>
          <SelectItem value="new">{translations.new[language]}</SelectItem>
          <SelectItem value="shipped">{translations.shipped[language]}</SelectItem>
          <SelectItem value="completed">{translations.completed[language]}</SelectItem>
          <SelectItem value="cancelled">{translations.cancelled[language]}</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default OrdersFilter;
