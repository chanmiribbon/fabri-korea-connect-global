
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
import { Textarea } from "@/components/ui/textarea";
import { FileText, ArrowLeft, Briefcase } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ProductQuote = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguageStore();
  const { getDistributionProducts } = useProducts(undefined, null);
  
  // Convert productId to number
  const productIdNum = productId ? parseInt(productId) : 0;
  
  // Get wholesale products
  const allProducts = getDistributionProducts(false).filter(p => p.isWholesale);
  
  // Find the specific product
  const product = allProducts.find(p => p.id === productIdNum);
  
  const handleBack = () => {
    navigate(-1);
  };
  
  const handleSubmitQuote = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(
      language === "KR" ? "견적 요청이 완료되었습니다. 곧 연락드리겠습니다." : 
      language === "CN" ? "报价请求已完成。我们会尽快与您联系。" : 
      language === "JP" ? "見積依頼が完了しました。すぐにご連絡いたします。" : 
      "Quote request submitted successfully. We'll contact you soon."
    );
    setTimeout(() => {
      navigate("/buyer-products");
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
    switch (language) {
      case "KR": return "도매 제품 견적 요청";
      case "CN": return "批发产品报价请求";
      case "JP": return "卸売製品見積依頼";
      default: return "Wholesale Product Quote Request";
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
                  <p className="text-fabri-blue font-medium">{product.wholesalePrice || product.price}</p>
                  <p className="text-sm text-gray-600">
                    {language === "KR" ? `최소 주문수량: ${product.wholesaleMOQ || product.moq || 10}개` : 
                     language === "CN" ? `最小订购量: ${product.wholesaleMOQ || product.moq || 10}件` :
                     language === "JP" ? `最小注文数量: ${product.wholesaleMOQ || product.moq || 10}個` :
                     `MOQ: ${product.wholesaleMOQ || product.moq || 10} units`}
                  </p>
                </div>
              </div>
              
              <form onSubmit={handleSubmitQuote} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="companyName">
                      {language === "KR" ? "회사명" : 
                       language === "CN" ? "公司名称" : 
                       language === "JP" ? "会社名" : 
                       "Company Name"}
                    </Label>
                    <Input 
                      id="companyName" 
                      className="mt-1" 
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">
                      {language === "KR" ? "이메일" : 
                       language === "CN" ? "电子邮件" : 
                       language === "JP" ? "メールアドレス" : 
                       "Email"}
                    </Label>
                    <Input 
                      id="email" 
                      type="email" 
                      className="mt-1" 
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="quantity">
                      {language === "KR" ? "요청 수량" : 
                       language === "CN" ? "请求数量" : 
                       language === "JP" ? "希望数量" : 
                       "Requested Quantity"}
                    </Label>
                    <Input 
                      id="quantity" 
                      type="number" 
                      min={product.wholesaleMOQ || product.moq || 10} 
                      defaultValue={product.wholesaleMOQ || product.moq || 10}
                      className="mt-1" 
                      required
                    />
                  </div>
                  
                  {product.specifications?.colors && product.specifications.colors.length > 0 && (
                    <div>
                      <Label htmlFor="color">
                        {language === "KR" ? "색상 옵션" : 
                         language === "CN" ? "颜色选项" : 
                         language === "JP" ? "色のオプション" : 
                         "Color Options"}
                      </Label>
                      <Select>
                        <SelectTrigger id="color" className="mt-1">
                          <SelectValue placeholder={
                            language === "KR" ? "색상 선택 (선택 사항)" : 
                            language === "CN" ? "选择颜色（可选）" : 
                            language === "JP" ? "色を選択 (任意)" : 
                            "Select color (optional)"
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
                    <Label htmlFor="additionalInfo">
                      {language === "KR" ? "추가 요구 사항" : 
                       language === "CN" ? "其他要求" : 
                       language === "JP" ? "追加要件" : 
                       "Additional Requirements"}
                    </Label>
                    <Textarea 
                      id="additionalInfo" 
                      className="mt-1" 
                      rows={4}
                      placeholder={
                        language === "KR" ? "특별한 요청 사항이나 문의 사항을 입력하세요" : 
                        language === "CN" ? "请输入特殊要求或查询" : 
                        language === "JP" ? "特別なリクエストやお問い合わせを入力してください" : 
                        "Enter any special requests or inquiries"
                      }
                    />
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full py-6 text-lg"
                  variant="fabri-blue"
                >
                  <FileText className="mr-2 h-5 w-5" />
                  {language === "KR" ? "견적 요청하기" : 
                   language === "CN" ? "请求报价" : 
                   language === "JP" ? "見積依頼する" : 
                   "Request Quote"}
                </Button>
                
                <div className="text-center text-sm text-gray-500 flex items-center justify-center gap-1">
                  <Briefcase className="h-4 w-4" />
                  {language === "KR" ? "비즈니스 정보는 안전하게 보호됩니다" : 
                   language === "CN" ? "您的业务信息将得到安全保护" : 
                   language === "JP" ? "ビジネス情報は安全に保護されます" : 
                   "Your business information is securely protected"}
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

export default ProductQuote;
