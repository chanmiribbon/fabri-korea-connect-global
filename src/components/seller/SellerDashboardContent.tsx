
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Language } from "@/hooks/useLanguageStore";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  ChartBar,
  Settings,
  MessageCircle,
  Bell,
  PlusCircle,
} from "lucide-react";

interface SellerDashboardContentProps {
  language: Language;
}

const SellerDashboardContent = ({ language }: SellerDashboardContentProps) => {
  // Mock data for demonstration
  const recentOrders = [
    { id: "ORD-3821", customer: "Kim MinJun", amount: "₩450,000", status: "pending" },
    { id: "ORD-3820", customer: "John Smith", amount: "₩275,000", status: "shipped" },
    { id: "ORD-3819", customer: "Wang Wei", amount: "₩520,000", status: "delivered" },
  ];
  
  const pendingTasks = [
    { id: 1, type: "order", message: "3 orders pending confirmation" },
    { id: 2, type: "product", message: "Product information update needed" },
    { id: 3, type: "message", message: "2 unread customer messages" },
  ];
  
  const translations = {
    dashboard: {
      KR: "대시보드",
      EN: "Dashboard",
      CN: "仪表盘",
      JP: "ダッシュボード",
    },
    todaySales: {
      KR: "오늘 매출",
      EN: "Today's Sales",
      CN: "今日销售额",
      JP: "本日の売上",
    },
    monthlySales: {
      KR: "이번 달 매출",
      EN: "This Month's Sales",
      CN: "本月销售额",
      JP: "今月の売上",
    },
    pendingOrders: {
      KR: "대기 중인 주문",
      EN: "Pending Orders",
      CN: "待处理订单",
      JP: "保留中の注文",
    },
    totalProducts: {
      KR: "총 상품",
      EN: "Total Products",
      CN: "总产品数",
      JP: "総商品数",
    },
    recentOrders: {
      KR: "최근 주문",
      EN: "Recent Orders",
      CN: "最近订单",
      JP: "最近の注文",
    },
    notifications: {
      KR: "알림",
      EN: "Notifications",
      CN: "通知",
      JP: "通知",
    },
    quickActions: {
      KR: "빠른 작업",
      EN: "Quick Actions",
      CN: "快速操作",
      JP: "クイックアクション",
    },
    addProduct: {
      KR: "새 상품 등록",
      EN: "Add New Product",
      CN: "添加新产品",
      JP: "新商品を追加",
    },
    viewOrders: {
      KR: "주문 보기",
      EN: "View Orders",
      CN: "查看订单",
      JP: "注文を表示",
    },
    editProfile: {
      KR: "프로필 수정",
      EN: "Edit Profile",
      CN: "编辑个人资料",
      JP: "プロフィール編集",
    },
    viewAll: {
      KR: "전체보기",
      EN: "View All",
      CN: "查看全部",
      JP: "すべて表示",
    },
    orderID: {
      KR: "주문 번호",
      EN: "Order ID",
      CN: "订单号",
      JP: "注文番号",
    },
    customer: {
      KR: "고객",
      EN: "Customer",
      CN: "客户",
      JP: "お客様",
    },
    amount: {
      KR: "금액",
      EN: "Amount",
      CN: "金额",
      JP: "金額",
    },
    status: {
      KR: "상태",
      EN: "Status",
      CN: "状态",
      JP: "状態",
    },
    pending: {
      KR: "대기 중",
      EN: "Pending",
      CN: "待处理",
      JP: "保留中",
    },
    shipped: {
      KR: "배송 중",
      EN: "Shipped",
      CN: "已发货",
      JP: "発送済み",
    },
    delivered: {
      KR: "배송 완료",
      EN: "Delivered",
      CN: "已送达",
      JP: "配達済み",
    },
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return translations.pending[language];
      case "shipped":
        return translations.shipped[language];
      case "delivered":
        return translations.delivered[language];
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {translations.todaySales[language]}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₩320,000</div>
            <p className="text-xs text-muted-foreground mt-1">+12% from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {translations.monthlySales[language]}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₩4,520,000</div>
            <p className="text-xs text-muted-foreground mt-1">+8% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {translations.pendingOrders[language]}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground mt-1">Need confirmation</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {translations.totalProducts[language]}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground mt-1">3 need restock</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>{translations.recentOrders[language]}</CardTitle>
            <CardDescription>
              <Link to="/seller/orders" className="text-sm text-fabri-blue hover:underline">
                {translations.viewAll[language]} →
              </Link>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2">{translations.orderID[language]}</th>
                    <th className="text-left py-3 px-2">{translations.customer[language]}</th>
                    <th className="text-left py-3 px-2">{translations.amount[language]}</th>
                    <th className="text-left py-3 px-2">{translations.status[language]}</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b last:border-0 hover:bg-gray-50">
                      <td className="py-3 px-2 font-medium">{order.id}</td>
                      <td className="py-3 px-2">{order.customer}</td>
                      <td className="py-3 px-2">{order.amount}</td>
                      <td className="py-3 px-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusClass(order.status)}`}>
                          {getStatusText(order.status)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Notifications and Quick Actions */}
        <div className="space-y-6">
          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                {translations.notifications[language]}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingTasks.map((task) => (
                  <div key={task.id} className="border-l-4 border-fabri-blue pl-3 py-2">
                    <p className="text-sm">{task.message}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>{translations.quickActions[language]}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-left"
                  asChild
                >
                  <Link to="/seller/products/create">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    {translations.addProduct[language]}
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-left"
                  asChild
                >
                  <Link to="/seller/orders">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    {translations.viewOrders[language]}
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-left"
                  asChild
                >
                  <Link to="/seller/profile">
                    <Settings className="h-4 w-4 mr-2" />
                    {translations.editProfile[language]}
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboardContent;
