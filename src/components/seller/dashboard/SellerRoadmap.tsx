
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Language } from "@/hooks/useLanguageStore";
import {
  BarChart3,
  FileSpreadsheet,
  MessageSquare,
  Package2,
  Percent,
  Languages,
  AlertCircle,
  Calendar
} from "lucide-react";

interface SellerRoadmapProps {
  language: Language;
}

const SellerRoadmap: React.FC<SellerRoadmapProps> = ({ language }) => {
  const getTranslations = () => {
    switch (language) {
      case "KR":
        return {
          title: "판매자 센터 예정 기능",
          subtitle: "판매자를 위한 고급 기능이 곧 출시됩니다",
          promotions: {
            title: "프로모션 관리",
            description: "할인, 묶음 상품 등 프로모션을 생성하고 관리하세요"
          },
          bulkUpload: {
            title: "대량 상품 등록",
            description: "CSV/엑셀 파일을 통해 여러 상품을 한 번에 업로드하세요"
          },
          settlement: {
            title: "정산 대시보드",
            description: "총 매출, 미지급금, 결제 기록 등을 실시간으로 확인하세요"
          },
          reviews: {
            title: "리뷰 관리",
            description: "고객 리뷰를 확인하고 답변할 수 있습니다"
          },
          inventory: {
            title: "재고 알림",
            description: "재고가 부족할 때 알림을 받아 적시에 재고를 보충하세요"
          },
          analytics: {
            title: "성과 분석",
            description: "방문자 수, 전환율, 판매 추세 등 상세 분석을 확인하세요"
          },
          multilanguage: {
            title: "다국어 상품 등록",
            description: "한국어, 영어, 일본어, 중국어로 직접 상품 정보를 입력하세요"
          },
          comingSoon: "출시 예정",
        };
      case "CN":
        return {
          title: "卖家中心即将推出的功能",
          subtitle: "即将推出针对卖家的高级功能",
          promotions: {
            title: "促销管理",
            description: "创建和管理产品促销（折扣、捆绑交易）"
          },
          bulkUpload: {
            title: "批量产品上传",
            description: "通过CSV/Excel文件导入一次上传多个产品"
          },
          settlement: {
            title: "结算仪表板",
            description: "实时查看总销售额、待付款项和付款历史记录"
          },
          reviews: {
            title: "客户评论管理",
            description: "查看、回复或管理您产品的客户评论"
          },
          inventory: {
            title: "库存提醒",
            description: "产品库存不足时收到通知，及时补货"
          },
          analytics: {
            title: "绩效分析",
            description: "详细分析：访问量、转化率、销售趋势、热销产品"
          },
          multilanguage: {
            title: "多语言产品上传",
            description: "直接用多种语言（韩语、英语、日语、中文）输入产品信息"
          },
          comingSoon: "即将推出",
        };
      case "JP":
        return {
          title: "販売者センター今後の機能",
          subtitle: "販売者向けの高度な機能がまもなく登場します",
          promotions: {
            title: "プロモーション管理",
            description: "割引やバンドル取引などのプロモーションを作成・管理"
          },
          bulkUpload: {
            title: "一括商品アップロード",
            description: "CSV/Excelファイルによる複数商品の一括アップロード"
          },
          settlement: {
            title: "決済ダッシュボード",
            description: "総売上、保留中の支払い、支払い履歴などをリアルタイム表示"
          },
          reviews: {
            title: "レビュー管理",
            description: "商品のカスタマーレビューを閲覧、返信、管理"
          },
          inventory: {
            title: "在庫アラート",
            description: "商品在庫が少なくなった際に通知し、タイムリーな補充を促進"
          },
          analytics: {
            title: "パフォーマンス分析",
            description: "訪問者数、コンバージョン率、売上動向、人気商品の詳細分析"
          },
          multilanguage: {
            title: "多言語商品登録",
            description: "韓国語、英語、日本語、中国語で直接商品情報を入力"
          },
          comingSoon: "近日公開",
        };
      default:
        return {
          title: "Seller Center Upcoming Features",
          subtitle: "Advanced seller tools coming soon to your dashboard",
          promotions: {
            title: "Promotions Management",
            description: "Create and manage product promotions (discounts, bundle deals)"
          },
          bulkUpload: {
            title: "Bulk Product Upload",
            description: "Upload multiple products at once via CSV/Excel file import"
          },
          settlement: {
            title: "Settlement Dashboard",
            description: "View total sales, pending payouts, and payment history in real-time"
          },
          reviews: {
            title: "Review Management",
            description: "View, respond to, or manage customer reviews for your products"
          },
          inventory: {
            title: "Inventory Alerts",
            description: "Get notified when product stock is low for timely restocking"
          },
          analytics: {
            title: "Performance Analytics",
            description: "Detailed analytics: visitor counts, conversion rates, sales trends"
          },
          multilanguage: {
            title: "Multi-language Product Upload",
            description: "Input product information directly in multiple languages"
          },
          comingSoon: "Coming Soon",
        };
    }
  };

  const t = getTranslations();
  
  const features = [
    { icon: Percent, title: t.promotions.title, description: t.promotions.description },
    { icon: FileSpreadsheet, title: t.bulkUpload.title, description: t.bulkUpload.description },
    { icon: Calendar, title: t.settlement.title, description: t.settlement.description },
    { icon: MessageSquare, title: t.reviews.title, description: t.reviews.description },
    { icon: AlertCircle, title: t.inventory.title, description: t.inventory.description },
    { icon: BarChart3, title: t.analytics.title, description: t.analytics.description },
    { icon: Languages, title: t.multilanguage.title, description: t.multilanguage.description },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.title}</CardTitle>
        <CardDescription>{t.subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center mb-3">
                <feature.icon className="h-5 w-5 mr-2 text-fabri-blue" />
                <h3 className="font-medium">{feature.title}</h3>
              </div>
              <p className="text-sm text-gray-600 flex-1">{feature.description}</p>
              <Badge variant="outline" className="self-start mt-3 bg-gray-100">{t.comingSoon}</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SellerRoadmap;
