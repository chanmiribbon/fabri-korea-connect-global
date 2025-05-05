
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguageStore } from "@/hooks/useLanguageStore";
import { useProducts } from "@/hooks/useProducts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ShoppingCart, ArrowLeft, CreditCard } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ProductPurchaseProps {
  isWholesale?: boolean;
}

const ProductPurchase: React.FC<ProductPurchaseProps> = ({ isWholesale = false }) => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguageStore();
  const { getDistributionProducts } = useProducts(undefined, null);
  
  // Convert productId to number
  const productIdNum = productId ? parseInt(productId) : 0;
  
  // Get products for the appropriate distribution channel
  const allProducts = isWholesale
    ? getDistributionProducts(false).filter(p => p.isWholesale)
    : getDistributionProducts(true).filter(p => p.isRetail);
  
  // Find the specific product
  const product = allProducts.find(p => p.id === productIdNum);
  
  const handleBack = () => {
    navigate(-1);
  };
  
  const handlePurchase = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(
      language === "KR" ? "주문이 완료되었습니다!" : 
      language === "CN" ? "订单已完成!" : 
      language === "JP" ? "注文が完了しました!" : 
      "Order completed successfully!"
    );
    setTimeout(() => {
      navigate(isWholesale ? "/buyer-products" : "/consumer-products");
    }, 1500);
  };
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 pt-16 container mx-auto">
          <div className="py-10 text-center text-gray-500">
            Product not found.
          </div>
        </div>
        <Footer language={language} />
      </div>
    );
  }

  const getTitle = () => {
    if (isWholesale) {
      switch (language) {
        case "KR": return "도매 제품 구매";
        case "CN": return "批发产品购买";
        case "JP": return "卸売製品購入";
        default: return "Purchase Wholesale Product";
      }
    } else {
      switch (language) {
        case "KR": return "소매 제품 구매";
        case "CN": return "零售产品购买";
        case "JP": return "小売製品購入";
        default: return "Purchase Retail Product";
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 pt-20 container mx-auto px-4 pb-8">
        <Button
          variant="ghost"
          onClick={handleBack}
          className="mb-6 text-[#333333]"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {language === "KR" ? "돌아가기" : 
           language === "CN" ? "返回" : 
           language === "JP" ? "戻る" : 
           "Back"}
        </Button>

        <Card className="max-w-4xl mx-auto">
          <CardHeader className="border-b">
            <CardTitle className="text-2xl">{getTitle()}</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="rounded-md w-full h-auto object-cover max-h-[300px]"
                />
                <div className="mt-4 space-y-2">
                  <h2 className="text-lg font-semibold">{product.name}</h2>
                  <p className="text-fabri-blue font-medium">{isWholesale ? product.wholesalePrice || product.price : product.retailPrice || product.price}</p>
                  <p className="text-sm text-gray-600">
                    {language === "KR" ? `최소 주문수량: ${isWholesale ? (product.wholesaleMOQ || product.moq || 10) : (product.retailMOQ || product.moq || 1)}개` : 
                     language === "CN" ? `最小订购量: ${isWholesale ? (product.wholesaleMOQ || product.moq || 10) : (product.retailMOQ || product.moq || 1)}件` :
                     language === "JP" ? `最小注文数量: ${isWholesale ? (product.wholesaleMOQ || product.moq || 10) : (product.retailMOQ || product.moq || 1)}個` :
                     `MOQ: ${isWholesale ? (product.wholesaleMOQ || product.moq || 10) : (product.retailMOQ || product.moq || 1)} units`}
                  </p>
                </div>
              </div>
              
              <form onSubmit={handlePurchase} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="quantity">
                      {language === "KR" ? "수량" : 
                       language === "CN" ? "数量" : 
                       language === "JP" ? "数量" : 
                       "Quantity"}
                    </Label>
                    <Input 
                      id="quantity" 
                      type="number" 
                      min={isWholesale ? (product.wholesaleMOQ || product.moq || 10) : (product.retailMOQ || product.moq || 1)} 
                      defaultValue={isWholesale ? (product.wholesaleMOQ || product.moq || 10) : (product.retailMOQ || product.moq || 1)}
                      className="mt-1" 
                      required
                    />
                  </div>
                  
                  {product.specifications?.colors && product.specifications.colors.length > 0 && (
                    <div>
                      <Label htmlFor="color">
                        {language === "KR" ? "색상" : 
                         language === "CN" ? "颜色" : 
                         language === "JP" ? "色" : 
                         "Color"}
                      </Label>
                      <Select required>
                        <SelectTrigger id="color" className="mt-1">
                          <SelectValue placeholder={
                            language === "KR" ? "색상 선택" : 
                            language === "CN" ? "选择颜色" : 
                            language === "JP" ? "色を選択" : 
                            "Select color"
                          } />
                        </SelectTrigger>
                        <SelectContent>
                          {product.specifications.colors.map((color, index) => (
                            <SelectItem key={index} value={color}>{color}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  
                  <div>
                    <Label htmlFor="shipping">
                      {language === "KR" ? "배송 방법" : 
                       language === "CN" ? "配送方式" : 
                       language === "JP" ? "配送方法" : 
                       "Shipping Method"}
                    </Label>
                    <Select required defaultValue="standard">
                      <SelectTrigger id="shipping" className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">
                          {language === "KR" ? "표준 배송 (3-5일)" : 
                           language === "CN" ? "标准配送 (3-5天)" : 
                           language === "JP" ? "標準配送 (3-5日)" : 
                           "Standard Shipping (3-5 days)"}
                        </SelectItem>
                        <SelectItem value="express">
                          {language === "KR" ? "특급 배송 (1-2일)" : 
                           language === "CN" ? "快速配送 (1-2天)" : 
                           language === "JP" ? "特急配送 (1-2日)" : 
                           "Express Shipping (1-2 days)"}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="paymentMethod">
                      {language === "KR" ? "결제 방법" : 
                       language === "CN" ? "支付方式" : 
                       language === "JP" ? "支払方法" : 
                       "Payment Method"}
                    </Label>
                    <Select required defaultValue="creditCard">
                      <SelectTrigger id="paymentMethod" className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="creditCard">
                          {language === "KR" ? "신용카드" : 
                           language === "CN" ? "信用卡" : 
                           language === "JP" ? "クレジットカード" : 
                           "Credit Card"}
                        </SelectItem>
                        <SelectItem value="paypal">PayPal</SelectItem>
                        {isWholesale && (
                          <SelectItem value="bankTransfer">
                            {language === "KR" ? "계좌이체" : 
                             language === "CN" ? "银行转账" : 
                             language === "JP" ? "銀行振込" : 
                             "Bank Transfer"}
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full py-6 text-lg"
                  variant={isWholesale ? "fabri-blue" : "fabri-pink"}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  {language === "KR" ? "결제하기" : 
                   language === "CN" ? "支付" : 
                   language === "JP" ? "支払う" : 
                   "Complete Purchase"}
                </Button>
                
                <div className="text-center text-sm text-gray-500 flex items-center justify-center gap-1">
                  <CreditCard className="h-4 w-4" />
                  {language === "KR" ? "안전한 결제" : 
                   language === "CN" ? "安全支付" : 
                   language === "JP" ? "安全な支払い" : 
                   "Secure Payment"}
                </div>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer language={language} />
    </div>
  );
};

export default ProductPurchase;
