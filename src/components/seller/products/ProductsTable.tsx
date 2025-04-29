
import React from "react";
import { Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Language } from "@/hooks/useLanguageStore";
import { Product } from "@/types/product";

interface ProductsTableProps {
  products: Product[];
  language: Language;
}

const translations = {
  name: {
    KR: "상품명",
    EN: "Name",
    CN: "产品名称",
    JP: "商品名",
  },
  category: {
    KR: "카테고리",
    EN: "Category",
    CN: "类别",
    JP: "カテゴリー",
  },
  price: {
    KR: "가격",
    EN: "Price",
    CN: "价格",
    JP: "価格",
  },
  stock: {
    KR: "재고",
    EN: "Stock",
    CN: "库存",
    JP: "在庫",
  },
  status: {
    KR: "상태",
    EN: "Status",
    CN: "状态",
    JP: "状態",
  },
  distribution: {
    KR: "판매 채널",
    EN: "Distribution",
    CN: "销售渠道",
    JP: "販売チャネル",
  },
  edit: {
    KR: "수정",
    EN: "Edit",
    CN: "编辑",
    JP: "編集",
  },
  retail: {
    KR: "소매",
    EN: "Retail",
    CN: "零售",
    JP: "小売",
  },
  wholesale: {
    KR: "도매",
    EN: "Wholesale",
    CN: "批发",
    JP: "卸売",
  },
  both: {
    KR: "소매/도매",
    EN: "Both",
    CN: "零售/批发",
    JP: "小売/卸売",
  },
  noProducts: {
    KR: "등록된 상품이 없습니다.",
    EN: "No products registered.",
    CN: "没有注册产品。",
    JP: "登録された商品はありません。",
  },
};

const ProductsTable: React.FC<ProductsTableProps> = ({ products, language }) => {
  const navigate = useNavigate();

  const getLocalizedName = (product: Product) => {
    switch (language) {
      case "KR":
        return product.nameKr || product.name;
      case "CN":
        return product.nameCn || product.name;
      case "JP":
        return product.nameJp || product.name;
      default:
        return product.name;
    }
  };
  
  const getDistributionChannel = (product: Product) => {
    if (product.isRetail && product.isWholesale) {
      return translations.both[language];
    } else if (product.isRetail) {
      return translations.retail[language];
    } else if (product.isWholesale) {
      return translations.wholesale[language];
    }
    return translations.retail[language];
  };

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{translations.name[language]}</TableHead>
            <TableHead>{translations.category[language]}</TableHead>
            <TableHead>{translations.price[language]}</TableHead>
            <TableHead>{translations.stock[language]}</TableHead>
            <TableHead>{translations.distribution[language]}</TableHead>
            <TableHead className="text-right">{translations.edit[language]}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.length > 0 ? (
            products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{getLocalizedName(product)}</TableCell>
                <TableCell>{product.subcategory}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>
                  {getDistributionChannel(product)}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate(`/seller/products/${product.id}/edit`)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                {translations.noProducts[language]}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductsTable;
