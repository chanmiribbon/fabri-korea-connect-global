
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, FileText } from "lucide-react";

const SupplierDashboard = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">관리자 대시보드</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">총 주문</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              전월 대비 +12%
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">이번 달 매출</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₩2,345,000</div>
            <p className="text-xs text-muted-foreground">
              전월 대비 +8%
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="orders" className="space-y-4">
        <TabsList>
          <TabsTrigger value="orders">주문 현황</TabsTrigger>
          <TabsTrigger value="settlement">정산 현황</TabsTrigger>
        </TabsList>
        <TabsContent value="orders" className="space-y-4">
          <div className="bg-white rounded-lg shadow">
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-4">최근 주문</h2>
              <div className="divide-y">
                {/* Sample order data */}
                <div className="py-3 flex justify-between items-center">
                  <div>
                    <p className="font-medium">주문번호 #12345</p>
                    <p className="text-sm text-gray-500">2024.04.26</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₩450,000</p>
                    <p className="text-sm text-green-600">배송 완료</p>
                  </div>
                </div>
                {/* Add more order items here */}
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="settlement" className="space-y-4">
          <div className="bg-white rounded-lg shadow">
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-4">정산 내역</h2>
              <div className="divide-y">
                {/* Sample settlement data */}
                <div className="py-3 flex justify-between items-center">
                  <div>
                    <p className="font-medium">3월 정산</p>
                    <p className="text-sm text-gray-500">2024.04.01</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₩1,234,000</p>
                    <p className="text-sm text-blue-600">정산 완료</p>
                  </div>
                </div>
                {/* Add more settlement items here */}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SupplierDashboard;
