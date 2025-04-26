
import React from "react";
import { Link } from "react-router-dom";
import { useLanguageStore } from "@/hooks/useLanguageStore";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  ChartBar,
  Settings,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupContent,
} from "@/components/ui/sidebar";

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
    }
  ];

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <Link to="/" className="flex-shrink-0 flex items-center">
          <span className="text-2xl font-bold text-[#6EC1E4]">
            Fabri<span className="text-[#333333]">Korea</span>
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    tooltip={item.translations[language]}
                    isActive={currentPage === item.id}
                    asChild
                  >
                    <Link to={item.path} className="flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
                      <span>{item.translations[language]}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default SellerSidebar;
