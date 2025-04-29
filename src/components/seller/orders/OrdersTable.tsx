
import React, { useState } from "react";
import { Language } from "@/hooks/useLanguageStore";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Package, Printer, Truck } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import PrintOrdersDialog from "./PrintOrdersDialog";

interface OrdersTableProps {
  language: Language;
}

const translations = {
  orderNumber: {
    KR: "주문번호",
    EN: "Order #",
    CN: "订单号",
    JP: "注文番号",
  },
  customer: {
    KR: "고객명",
    EN: "Customer",
    CN: "客户",
    JP: "顧客名",
  },
  product: {
    KR: "상품",
    EN: "Product",
    CN: "产品",
    JP: "商品",
  },
  quantity: {
    KR: "수량",
    EN: "Quantity",
    CN: "数量",
    JP: "数量",
  },
  total: {
    KR: "총액",
    EN: "Total",
    CN: "总额",
    JP: "合計",
  },
  status: {
    KR: "상태",
    EN: "Status",
    CN: "状态",
    JP: "状態",
  },
  date: {
    KR: "날짜",
    EN: "Date",
    CN: "日期",
    JP: "日付",
  },
  actions: {
    KR: "관리",
    EN: "Actions",
    CN: "操作",
    JP: "操作",
  },
  view: {
    KR: "상세보기",
    EN: "View",
    CN: "查看",
    JP: "詳細",
  },
  markShipped: {
    KR: "배송처리",
    EN: "Mark Shipped",
    CN: "标记发货",
    JP: "発送済み",
  },
  markCompleted: {
    KR: "완료처리",
    EN: "Mark Completed",
    CN: "标记完成",
    JP: "完了",
  },
  // Add specific status translations
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
  printOrders: {
    KR: "주문서 출력",
    EN: "Print Orders",
    CN: "打印订单",
    JP: "注文書の印刷",
  },
  selectAll: {
    KR: "전체 선택",
    EN: "Select All",
    CN: "全选",
    JP: "すべて選択",
  },
};

const getStatusBadge = (status: string) => {
  const statusColors = {
    new: "bg-blue-100 text-blue-800",
    shipped: "bg-yellow-100 text-yellow-800",
    completed: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };
  return statusColors[status as keyof typeof statusColors] || "";
};

interface Order {
  id: string;
  customer: string;
  product: string;
  quantity: number;
  total: string;
  status: string;
  date: string;
  // Additional fields for mock data
  recipient?: string;
  address?: string;
  phone?: string;
  notes?: string;
}

const OrdersTable: React.FC<OrdersTableProps> = ({ language }) => {
  // Sample data - would be replaced with real data from an API
  const sampleOrders: Order[] = [
    {
      id: "ORD-001",
      customer: "John Doe",
      product: "Premium Fabric",
      quantity: 2,
      total: "$199.98",
      status: "new",
      date: "2025-04-26",
      recipient: "John Doe",
      address: "123 Main St, Anytown, USA",
      phone: "+1 555-123-4567",
      notes: "Please leave package at the door",
    },
    {
      id: "ORD-002",
      customer: "Jane Smith",
      product: "Luxury Textile",
      quantity: 1,
      total: "$299.99",
      status: "shipped",
      date: "2025-04-25",
      recipient: "Jane Smith",
      address: "456 Park Ave, Somewhere, USA",
      phone: "+1 555-987-6543",
      notes: "Call before delivery",
    },
  ];
  
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [isPrintDialogOpen, setIsPrintDialogOpen] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  
  const handleSelectOrder = (orderId: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedOrders([...selectedOrders, orderId]);
    } else {
      setSelectedOrders(selectedOrders.filter(id => id !== orderId));
    }
  };
  
  const handleSelectAll = (isChecked: boolean) => {
    setSelectAll(isChecked);
    if (isChecked) {
      setSelectedOrders(sampleOrders.map(order => order.id));
    } else {
      setSelectedOrders([]);
    }
  };
  
  const handlePrintClick = () => {
    if (selectedOrders.length > 0) {
      setIsPrintDialogOpen(true);
    }
  };
  
  const selectedOrdersData = sampleOrders.filter(order => selectedOrders.includes(order.id));

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Checkbox 
            id="select-all" 
            checked={selectAll}
            onCheckedChange={(isChecked) => handleSelectAll(!!isChecked)} 
          />
          <label htmlFor="select-all" className="text-sm">
            {translations.selectAll[language]}
          </label>
        </div>
        <Button 
          onClick={handlePrintClick} 
          disabled={selectedOrders.length === 0}
          variant="outline"
          size="sm"
        >
          <Printer className="mr-2 h-4 w-4" />
          {translations.printOrders[language]}
        </Button>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px]"></TableHead>
              <TableHead>{translations.orderNumber[language]}</TableHead>
              <TableHead>{translations.customer[language]}</TableHead>
              <TableHead>{translations.product[language]}</TableHead>
              <TableHead>{translations.quantity[language]}</TableHead>
              <TableHead>{translations.total[language]}</TableHead>
              <TableHead>{translations.status[language]}</TableHead>
              <TableHead>{translations.date[language]}</TableHead>
              <TableHead>{translations.actions[language]}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sampleOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  <Checkbox 
                    checked={selectedOrders.includes(order.id)}
                    onCheckedChange={(isChecked) => handleSelectOrder(order.id, !!isChecked)}
                  />
                </TableCell>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.product}</TableCell>
                <TableCell>{order.quantity}</TableCell>
                <TableCell>{order.total}</TableCell>
                <TableCell>
                  <Badge className={getStatusBadge(order.status)}>
                    {translations[order.status as keyof typeof translations][language]}
                  </Badge>
                </TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      {translations.view[language]}
                    </Button>
                    {order.status === "new" && (
                      <Button variant="outline" size="sm">
                        <Truck className="mr-1 h-4 w-4" />
                        {translations.markShipped[language]}
                      </Button>
                    )}
                    {order.status === "shipped" && (
                      <Button variant="outline" size="sm">
                        <Package className="mr-1 h-4 w-4" />
                        {translations.markCompleted[language]}
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <PrintOrdersDialog 
        open={isPrintDialogOpen}
        onClose={() => setIsPrintDialogOpen(false)}
        selectedOrders={selectedOrdersData}
        language={language}
      />
    </>
  );
};

export default OrdersTable;
