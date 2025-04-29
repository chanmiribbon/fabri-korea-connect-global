import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Package, Image, Truck, ImagePlus } from "lucide-react";
import { useLanguageStore } from "@/hooks/useLanguageStore";

interface ProductFormData {
  name: {
    kr: string;
    en: string;
    cn: string;
    jp: string;
  };
  category: string;
  images: any;
  thumbnailImage: any;
  detailImages: any;
  price: {
    kr: string;
    en: string;
    cn: string;
    jp: string;
  };
  moq: number;
  description: {
    kr: string;
    en: string;
    cn: string;
    jp: string;
  };
  shippingMethod: string;
  quantityLimit: number;
  isRetail: boolean;
  isWholesale: boolean;
  specifications: {
    size?: string;
    material?: string;
    colors?: string[];
    weight?: string;
    width?: string;
  };
}

interface ProductRegistrationFormProps {
  onSubmitSuccess?: (formData: any) => void; // Update this type to match the handler
}

const ProductRegistrationForm: React.FC<ProductRegistrationFormProps> = ({ onSubmitSuccess }) => {
  const { language } = useLanguageStore();
  // Create separate states for storing the selected files
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [detailFiles, setDetailFiles] = useState<FileList | null>(null);
  const [detailPreviews, setDetailPreviews] = useState<string[]>([]);
  
  const form = useForm<ProductFormData>({
    defaultValues: {
      isRetail: true,
      isWholesale: true,
      shippingMethod: "domestic",
    }
  });

  const onSubmit = (data: ProductFormData) => {
    // Combine the form data with the selected files
    const formData = {
      ...data,
      thumbnailImage: thumbnailFile,
      detailImages: detailFiles
    };
    console.log('Form submitted:', formData);
    
    // Call the success callback if provided
    if (onSubmitSuccess) {
      onSubmitSuccess(formData);
    }
  };

  // Handle thumbnail file selection
  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setThumbnailFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Handle detail images selection
  const handleDetailImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setDetailFiles(e.target.files);
      
      // Create previews
      const previews: string[] = [];
      Array.from(e.target.files).forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          previews.push(reader.result as string);
          setDetailPreviews([...previews]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  // Translations
  const getTranslation = () => {
    switch (language) {
      case "KR":
        return {
          productInfo: "상품 정보",
          images: "이미지",
          pricing: "가격 정책",
          shipping: "배송 정책",
          distribution: "판매 채널",
          complete: "등록 완료",
          productName: "상품명",
          category: "카테고리",
          selectCategory: "카테고리 선택",
          thumbnailImage: "썸네일 이미지",
          detailImages: "상세 이미지",
          price: "가격 (KRW)",
          moq: "최소 주문 수량 (MOQ)",
          description: "상품 설명",
          shippingMethod: "배송 방식",
          selectShipping: "배송 방식 선택",
          domestic: "국내 배송",
          international: "해외 배송",
          both: "국내/해외 배송",
          quantityLimit: "수량 제한",
          retailSale: "소매 판매",
          wholesaleSale: "도매 판매",
          translateNotice: "상품 설명은 자동 번역되어 각 언어로 표시됩니다.",
          specifications: "상품 사양",
          size: "사이즈",
          material: "소재",
          weight: "무게",
          width: "너비",
          retailInfo: "소매 판매 시 소비자 쇼핑몰에 노출됩니다.",
          wholesaleInfo: "도매 판매 시 바이어 쇼핑몰에 노출됩니다."
        };
      case "CN":
        return {
          productInfo: "产品信息",
          images: "图片",
          pricing: "价格政策",
          shipping: "物流政策",
          distribution: "销售渠道",
          complete: "完成注册",
          productName: "产品名称",
          category: "类别",
          selectCategory: "选择类别",
          thumbnailImage: "缩略图",
          detailImages: "详细图片",
          price: "价格 (KRW)",
          moq: "最小订购量 (MOQ)",
          description: "产品描述",
          shippingMethod: "配送方式",
          selectShipping: "选择配送方式",
          domestic: "国内配送",
          international: "国际配送",
          both: "国内/国际配送",
          quantityLimit: "数量限制",
          retailSale: "零售销售",
          wholesaleSale: "批发销售",
          translateNotice: "产品描述将自动翻译并以各种语言显示。",
          specifications: "产品规格",
          size: "尺寸",
          material: "材料",
          weight: "重量",
          width: "宽度",
          retailInfo: "零售销售时将在消费者商城展示。",
          wholesaleInfo: "批发销售时将在买家商城展示。"
        };
      case "JP":
        return {
          productInfo: "商品情報",
          images: "イメージ",
          pricing: "価格設定",
          shipping: "配送ポリシー",
          distribution: "販売チャネル",
          complete: "登録完了",
          productName: "商品名",
          category: "カテゴリー",
          selectCategory: "カテゴリーを選択",
          thumbnailImage: "サムネイル画像",
          detailImages: "詳細画像",
          price: "価格 (KRW)",
          moq: "最小注文数量 (MOQ)",
          description: "商品説明",
          shippingMethod: "配送方法",
          selectShipping: "配送方法を選択",
          domestic: "国内配送",
          international: "海外配送",
          both: "国内/海外配送",
          quantityLimit: "数量制限",
          retailSale: "小売販売",
          wholesaleSale: "卸売販売",
          translateNotice: "商品説明は自動翻訳され、各言語で表示されます。",
          specifications: "商品仕様",
          size: "サイズ",
          material: "素材",
          weight: "重量",
          width: "幅",
          retailInfo: "小売販売時は消費者ショッピングモールに表示されます。",
          wholesaleInfo: "卸売販売時はバイヤーショッピングモールに表示されます。"
        };
      default:
        return {
          productInfo: "Product Information",
          images: "Images",
          pricing: "Pricing Policy",
          shipping: "Shipping Policy",
          distribution: "Distribution Channels",
          complete: "Complete Registration",
          productName: "Product Name",
          category: "Category",
          selectCategory: "Select Category",
          thumbnailImage: "Thumbnail Image",
          detailImages: "Detail Images",
          price: "Price (KRW)",
          moq: "Minimum Order Quantity (MOQ)",
          description: "Product Description",
          shippingMethod: "Shipping Method",
          selectShipping: "Select Shipping Method",
          domestic: "Domestic Shipping",
          international: "International Shipping",
          both: "Domestic/International Shipping",
          quantityLimit: "Quantity Limit",
          retailSale: "Retail Sale",
          wholesaleSale: "Wholesale Sale",
          translateNotice: "Product descriptions are automatically translated and displayed in each language.",
          specifications: "Product Specifications",
          size: "Size",
          material: "Material",
          weight: "Weight",
          width: "Width",
          retailInfo: "When sold retail, the product will be shown in the consumer shopping mall.",
          wholesaleInfo: "When sold wholesale, the product will be shown in the buyer shopping mall."
        };
    }
  };
  
  const t = getTranslation();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-10">
          {/* Section 1: Product Information */}
          <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-fabri-purple text-white w-10 h-10 rounded-full flex items-center justify-center">
                <Package className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-semibold">{t.productInfo}</h2>
            </div>
            
            <div className="space-y-6">
              <Tabs defaultValue="kr">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="kr">한국어</TabsTrigger>
                  <TabsTrigger value="en">English</TabsTrigger>
                  <TabsTrigger value="cn">中文</TabsTrigger>
                  <TabsTrigger value="jp">日本語</TabsTrigger>
                </TabsList>
                <TabsContent value="kr">
                  <FormField
                    control={form.control}
                    name="name.kr"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.productName}</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>
                <TabsContent value="en">
                  <FormField
                    control={form.control}
                    name="name.en"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>
                <TabsContent value="cn">
                  <FormField
                    control={form.control}
                    name="name.cn"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>产品名称</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>
                <TabsContent value="jp">
                  <FormField
                    control={form.control}
                    name="name.jp"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>製品名</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>
              </Tabs>

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.category}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t.selectCategory} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="clothing">의류</SelectItem>
                        <SelectItem value="materials">원단</SelectItem>
                        <SelectItem value="accessories">부자재</SelectItem>
                        <SelectItem value="hanbok">한복</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Product specifications */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">{t.specifications}</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="specifications.size"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.size}</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="specifications.material"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.material}</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="specifications.weight"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.weight}</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="specifications.width"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.width}</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Images */}
          <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-fabri-purple text-white w-10 h-10 rounded-full flex items-center justify-center">
                <Image className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-semibold">{t.images}</h2>
            </div>
            
            <div className="space-y-6">
              {/* Thumbnail Image */}
              <FormItem>
                <FormLabel>{t.thumbnailImage}</FormLabel>
                <FormDescription>상품의 대표 이미지를 업로드해주세요</FormDescription>
                <div className="mt-2">
                  <div className="flex items-center justify-center w-full">
                    <label 
                      className="flex flex-col items-center justify-center w-64 h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                    >
                      {thumbnailPreview ? (
                        <div className="w-full h-full flex items-center justify-center overflow-hidden">
                          <img 
                            src={thumbnailPreview} 
                            alt="Thumbnail preview" 
                            className="object-cover h-full w-full"
                          />
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <ImagePlus className="w-10 h-10 mb-3 text-gray-400" />
                          <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">클릭하여 이미지 업로드</span>
                          </p>
                          <p className="text-xs text-gray-500">PNG, JPG 파일</p>
                        </div>
                      )}
                      <input 
                        type="file"
                        accept="image/*" 
                        className="hidden"
                        onChange={handleThumbnailChange}
                      />
                    </label>
                  </div>
                </div>
              </FormItem>
              
              {/* Detail Images */}
              <FormItem>
                <FormLabel>{t.detailImages}</FormLabel>
                <FormDescription>상품 상세 페이지에 표시될 이미지를 업로드해주세요 (최대 5장)</FormDescription>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleDetailImagesChange}
                  />
                </FormControl>
                <FormMessage />
                
                {/* Preview for detail images */}
                {detailPreviews.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                    {detailPreviews.map((preview, index) => (
                      <div key={index} className="aspect-square overflow-hidden rounded-md border">
                        <img 
                          src={preview} 
                          alt={`Detail preview ${index + 1}`} 
                          className="object-cover w-full h-full" 
                        />
                      </div>
                    ))}
                  </div>
                )}
              </FormItem>
            </div>
          </div>

          {/* Section 3: Pricing */}
          <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-fabri-purple text-white w-10 h-10 rounded-full flex items-center justify-center">
                <Truck className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-semibold">{t.pricing}</h2>
            </div>
            
            <div className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-md mb-4">
                <p className="text-sm text-blue-600">
                  {t.translateNotice}
                </p>
              </div>
              
              <FormField
                control={form.control}
                name="price.kr"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.price}</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="moq"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.moq}</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description.kr"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.description}</FormLabel>
                    <FormControl>
                      <Textarea rows={6} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Section 4: Shipping & Distribution */}
          <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-fabri-purple text-white w-10 h-10 rounded-full flex items-center justify-center">
                <Package className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-semibold">{t.shipping}</h2>
            </div>
            
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="shippingMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.shippingMethod}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t.selectShipping} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="domestic">{t.domestic}</SelectItem>
                        <SelectItem value="international">{t.international}</SelectItem>
                        <SelectItem value="both">{t.both}</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="quantityLimit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.quantityLimit}</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="space-y-4 pt-4">
                <h3 className="text-lg font-medium">{t.distribution}</h3>
                
                <FormField
                  control={form.control}
                  name="isRetail"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-base">{t.retailSale}</FormLabel>
                        <FormDescription>
                          {t.retailInfo}
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="isWholesale"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-base">{t.wholesaleSale}</FormLabel>
                        <FormDescription>
                          {t.wholesaleInfo}
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 pb-10">
          <Button type="submit" className="w-full py-6 text-lg">
            {t.complete}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProductRegistrationForm;
