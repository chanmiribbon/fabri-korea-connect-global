
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
  edit: {
    KR: "수정",
    EN: "Edit",
    CN: "编辑",
    JP: "編集",
  },
};

const ProductsTable: React.FC<ProductsTableProps> = ({ products, language }) => {
  const navigate = useNavigate();

  const getLocalizedName = (product: Product) => {
    switch (language) {
      case "KR":
        return product.nameKr;
      case "CN":
        return product.nameCn;
      case "JP":
        return product.nameJp;
      default:
        return product.name;
    }
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
            <TableHead className="text-right">{translations.edit[language]}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">{getLocalizedName(product)}</TableCell>
              <TableCell>{product.subcategory}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.stock}</TableCell>
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
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductsTable;
