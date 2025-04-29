
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import { Language } from "@/hooks/useLanguageStore";

interface Order {
  id: string;
  customer: string;
  product: string;
  quantity: number;
  total: string;
  status: string;
  date: string;
  // Additional fields for printing
  recipient?: string;
  address?: string;
  phone?: string;
  notes?: string;
}

interface PrintOrdersDialogProps {
  open: boolean;
  onClose: () => void;
  selectedOrders: Order[];
  language: Language;
}

const translations = {
  printOrders: {
    KR: "주문서 출력",
    EN: "Print Orders",
    CN: "打印订单",
    JP: "注文書の印刷",
  },
  orderNumber: {
    KR: "주문번호",
    EN: "Order #",
    CN: "订单号",
    JP: "注文番号",
  },
  customer: {
    KR: "주문자",
    EN: "Customer",
    CN: "订购者",
    JP: "注文者",
  },
  recipient: {
    KR: "수령자",
    EN: "Recipient",
    CN: "收件人",
    JP: "受取人",
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
    KR: "금액",
    EN: "Total",
    CN: "金额",
    JP: "金額",
  },
  address: {
    KR: "주소",
    EN: "Address",
    CN: "地址",
    JP: "住所",
  },
  phone: {
    KR: "연락처",
    EN: "Phone",
    CN: "电话",
    JP: "電話番号",
  },
  notes: {
    KR: "요청사항",
    EN: "Notes",
    CN: "备注",
    JP: "備考",
  },
  print: {
    KR: "인쇄하기",
    EN: "Print",
    CN: "打印",
    JP: "印刷",
  },
  close: {
    KR: "닫기",
    EN: "Close",
    CN: "关闭",
    JP: "閉じる",
  },
};

const PrintOrdersDialog: React.FC<PrintOrdersDialogProps> = ({ open, onClose, selectedOrders, language }) => {
  const handlePrint = () => {
    window.print();
  };
  
  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl print:shadow-none print:border-none">
        <DialogHeader>
          <DialogTitle className="print:text-center">
            {translations.printOrders[language]}
          </DialogTitle>
        </DialogHeader>
        
        <div className="print:p-0">
          {selectedOrders.map((order) => (
            <div key={order.id} className="mb-8 border-b pb-6 print:mb-4">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <h3 className="font-bold">{translations.orderNumber[language]}</h3>
                  <p>{order.id}</p>
                </div>
                <div>
                  <h3 className="font-bold">{translations.customer[language]}</h3>
                  <p>{order.customer}</p>
                </div>
                {order.recipient && (
                  <div>
                    <h3 className="font-bold">{translations.recipient[language]}</h3>
                    <p>{order.recipient}</p>
                  </div>
                )}
                {order.address && (
                  <div>
                    <h3 className="font-bold">{translations.address[language]}</h3>
                    <p>{order.address}</p>
                  </div>
                )}
                {order.phone && (
                  <div>
                    <h3 className="font-bold">{translations.phone[language]}</h3>
                    <p>{order.phone}</p>
                  </div>
                )}
              </div>
              
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-y">
                    <th className="py-2 px-4 text-left">{translations.product[language]}</th>
                    <th className="py-2 px-4 text-right">{translations.quantity[language]}</th>
                    <th className="py-2 px-4 text-right">{translations.total[language]}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-4">{order.product}</td>
                    <td className="py-3 px-4 text-right">{order.quantity}</td>
                    <td className="py-3 px-4 text-right">{order.total}</td>
                  </tr>
                </tbody>
              </table>
              
              {order.notes && (
                <div className="mt-4">
                  <h3 className="font-bold">{translations.notes[language]}</h3>
                  <p className="bg-gray-50 p-3 rounded">{order.notes}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="flex justify-between mt-4 print:hidden">
          <Button variant="outline" onClick={onClose}>
            {translations.close[language]}
          </Button>
          <Button onClick={handlePrint}>
            <Printer className="mr-2 h-4 w-4" />
            {translations.print[language]}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PrintOrdersDialog;
