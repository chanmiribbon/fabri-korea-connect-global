
import React from "react";
import { Link } from "react-router-dom";
import { useLanguageStore } from "@/hooks/useLanguageStore";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  ChartBar,
  Settings,
  MessageCircle,
} from "lucide-react";

interface SellerSidebarProps {
  currentPage: string;
}

interface NavItem {
  id: string;
  path: string;
  icon: React.ElementType;
  translations: {
    KR: string;
    EN: string;
    CN: string;
    JP: string;
  };
}

const SellerSidebar = ({ currentPage }: SellerSidebarProps) => {
  const { language } = useLanguageStore();

  const navItems: NavItem[] = [
    {
      id: "dashboard",
      path: "/seller/dashboard",
      icon: LayoutDashboard,
      translations: {
        KR: "대시보드",
        EN: "Dashboard",
        CN: "仪表盘",
        JP: "ダッシュボード",
      },
    },
    {
      id: "products",
      path: "/seller/products",
      icon: Package,
      translations: {
        KR: "상품 관리",
        EN: "Products",
        CN: "产品管理",
        JP: "商品管理",
      },
    },
    {
      id: "orders",
      path: "/seller/orders",
      icon: ShoppingCart,
      translations: {
        KR: "주문 관리",
        EN: "Orders",
        CN: "订单管理",
        JP: "注文管理",
      },
    },
    {
      id: "reports",
      path: "/seller/reports",
      icon: ChartBar,
      translations: {
        KR: "매출 리포트",
        EN: "Sales Reports",
        CN: "销售报告",
        JP: "売上レポート",
      },
    },
    {
      id: "profile",
      path: "/seller/profile",
      icon: Settings,
      translations: {
        KR: "프로필 설정",
        EN: "Profile Settings",
        CN: "个人资料设置",
        JP: "プロフィール設定",
      },
    },
    {
      id: "messages",
      path: "/seller/messages",
      icon: MessageCircle,
      translations: {
        KR: "고객 문의",
        EN: "Customer Messages",
        CN: "客户留言",
        JP: "お客様からのメッセージ",
      },
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.id}
            to={item.path}
            className={`flex items-center px-3 py-2 rounded-md text-sm ${
              currentPage === item.id
                ? "bg-fabri-blue text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <item.icon className="mr-2 h-5 w-5" />
            <span>{item.translations[language]}</span>
            {item.id === "messages" && (
              <span className="ml-auto bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                3
              </span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SellerSidebar;
