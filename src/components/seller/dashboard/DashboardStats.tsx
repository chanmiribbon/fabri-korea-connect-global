import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingBag, Package, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Language } from "@/hooks/useLanguageStore";
import SalesChart from "./SalesChart";
import ExportButton from "./ExportButton";

interface StatsWidgetProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  change?: string;
}

interface DashboardStatsProps {
  language: Language;
}

const StatsWidget = ({ icon, title, value, change }: StatsWidgetProps) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">
        {title}
      </CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      {change && (
        <p className="text-xs text-muted-foreground mt-1">
          {change}
        </p>
      )}
    </CardContent>
  </Card>
);

const translations = {
  todaySales: {
    KR: "오늘 매출",
    EN: "Today's Sales",
    CN: "今日销售",
    JP: "本日の売上",
  },
  monthSales: {
    KR: "이번 달 매출",
    EN: "This Month's Sales",
    CN: "本月销售",
    JP: "今月の売上",
  },
  pendingOrders: {
    KR: "대기 중인 주문",
    EN: "Pending Orders",
    CN: "待处理订单",
    JP: "保留中の注文",
  },
  quickActions: {
    KR: "빠른 작업",
    EN: "Quick Actions",
    CN: "快速操作",
    JP: "クイックアクション",
  },
  addProduct: {
    KR: "상품 등록",
    EN: "Add Product",
    CN: "添加产品",
    JP: "商品追加",
  },
  viewOrders: {
    KR: "주문 보기",
    EN: "View Orders",
    CN: "查看订单",
    JP: "注文確認",
  },
  editProfile: {
    KR: "프로필 수정",
    EN: "Edit Profile",
    CN: "编辑资料",
    JP: "プロフィール編集",
  },
  bestSeller: {
    KR: "베스트셀러",
    EN: "Best Seller",
    CN: "最畅销",
    JP: "ベストセラー",
  },
};

const DashboardStats: React.FC<DashboardStatsProps> = ({ language }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">{translations.todaySales[language]}</h2>
        <ExportButton language={language} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsWidget
          icon={<ShoppingBag className="h-4 w-4 text-muted-foreground" />}
          title={translations.monthSales[language]}
          value="₩42,350,000"
          change="+8% from last month"
        />
        <StatsWidget
          icon={<Package className="h-4 w-4 text-muted-foreground" />}
          title={translations.pendingOrders[language]}
          value="12"
          change="Needs attention"
        />
        <StatsWidget
          icon={<Award className="h-4 w-4 text-muted-foreground" />}
          title={translations.bestSeller[language]}
          value="Premium Fabric"
          change="32 units this month"
        />
      </div>

      <SalesChart language={language} />

      <Card>
        <CardHeader>
          <CardTitle>{translations.quickActions[language]}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild className="flex-1">
              <Link to="/seller/products/new">
                <PlusCircle className="mr-2 h-4 w-4" />
                {translations.addProduct[language]}
              </Link>
            </Button>
            <Button asChild variant="outline" className="flex-1">
              <Link to="/seller/orders">
                <Eye className="mr-2 h-4 w-4" />
                {translations.viewOrders[language]}
              </Link>
            </Button>
            <Button asChild variant="outline" className="flex-1">
              <Link to="/seller/profile">
                <Settings className="mr-2 h-4 w-4" />
                {translations.editProfile[language]}
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardStats;
