
import React, { useState, useEffect } from "react";
import { useLanguageStore } from "@/hooks/useLanguageStore";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { Image, Upload } from "lucide-react";
import { toast } from "sonner";

interface ProductRegistrationFormProps {
  onSubmitSuccess: (formData: any) => void;
}

const ProductRegistrationForm: React.FC<ProductRegistrationFormProps> = ({ 
  onSubmitSuccess 
}) => {
  const { language } = useLanguageStore();
  const [isTranslating, setIsTranslating] = useState(false);
  
  const form = useForm({
    defaultValues: {
      name: "",
      nameKr: "",
      nameCn: "",
      nameJp: "",
      price: "",
      priceUsd: "",
      retailPrice: "",
      wholesalePrice: "",
      description: "",
      descriptionKr: "",
      descriptionCn: "",
      descriptionJp: "",
      subcategory: "accessories",
      stock: 100,
      specifications: {
        size: "",
        material: "",
        colors: [],
        weight: "",
        width: ""
      },
      isRetail: true,
      isWholesale: false,
      moq: 1,
      retailMOQ: 1,
      wholesaleMOQ: 10,
      retailShippingMethod: "domestic",
      wholesaleShippingMethod: "both",
      thumbnailImage: null,
      detailImages: null
    }
  });

  // Mock translation function (in a real app, you would use a translation API)
  const translateText = async (text: string, targetLanguage: string) => {
    // This is a mock function - in a real implementation, you would call a translation API
    // For demo purposes, we'll generate "translations" based on the original text
    if (!text) return "";
    
    // Simple mock translations (in production, use a real translation API)
    switch(targetLanguage) {
      case 'EN':
        return `${text} (EN)`;
      case 'CN':
        return `${text} (CN)`;
      case 'JP':
        return `${text} (JP)`;
      default:
        return text;
    }
  };

  // Handle Korean text input and automatically translate
  const handleKoreanTextChange = async (field: 'name' | 'description', value: string) => {
    if (!value) {
      // If the Korean field is empty, clear all translations
      if (field === 'name') {
        form.setValue("name", "");
        form.setValue("nameKr", "");
        form.setValue("nameCn", "");
        form.setValue("nameJp", "");
      } else if (field === 'description') {
        form.setValue("description", "");
        form.setValue("descriptionKr", "");
        form.setValue("descriptionCn", "");
        form.setValue("descriptionJp", "");
      }
      return;
    }

    // Set the Korean value
    if (field === 'name') {
      form.setValue("nameKr", value);
    } else if (field === 'description') {
      form.setValue("descriptionKr", value);
    }
    
    // Show translating toast
    setIsTranslating(true);
    toast.info("번역 중...");

    try {
      // Translate to other languages (these would be API calls in a real app)
      const [enTranslation, cnTranslation, jpTranslation] = await Promise.all([
        translateText(value, 'EN'),
        translateText(value, 'CN'),
        translateText(value, 'JP')
      ]);

      // Set the translated values
      if (field === 'name') {
        form.setValue("name", enTranslation);
        form.setValue("nameCn", cnTranslation);
        form.setValue("nameJp", jpTranslation);
      } else if (field === 'description') {
        form.setValue("description", enTranslation);
        form.setValue("descriptionCn", cnTranslation);
        form.setValue("descriptionJp", jpTranslation);
      }
      
      // Show success toast
      toast.success("번역 완료");
    } catch (error) {
      console.error("Translation error:", error);
      toast.error("번역 중 오류가 발생했습니다.");
    } finally {
      setIsTranslating(false);
    }
  };

  const onSubmit = (data: any) => {
    console.info("Form submitted:", data);
    onSubmitSuccess(data);
  };

  const translationLabels = {
    title: {
      KR: "상품 등록",
      CN: "添加产品",
      JP: "商品追加",
      EN: "Add Product"
    },
    productName: {
      KR: "상품명",
      CN: "产品名称",
      JP: "商品名",
      EN: "Product Name"
    },
    price: {
      KR: "가격",
      CN: "价格",
      JP: "価格",
      EN: "Price"
    },
    description: {
      KR: "상품 설명",
      CN: "产品描述",
      JP: "商品説明",
      EN: "Product Description"
    },
    category: {
      KR: "카테고리",
      CN: "类别",
      JP: "カテゴリー",
      EN: "Category"
    },
    specifications: {
      KR: "제품 사양",
      CN: "产品规格",
      JP: "製品仕様",
      EN: "Product Specifications"
    },
    isRetail: {
      KR: "소매 판매",
      CN: "零售销售",
      JP: "小売販売",
      EN: "Retail Sales"
    },
    isWholesale: {
      KR: "도매 판매",
      CN: "批发销售",
      JP: "卸売販売",
      EN: "Wholesale Sales"
    },
    moq: {
      KR: "최소 주문 수량",
      CN: "最小订单数量",
      JP: "最小注文数量",
      EN: "Minimum Order Quantity"
    },
    retailMOQ: {
      KR: "소매 최소 주문 수량",
      CN: "零售最小订单数量",
      JP: "小売最小注文数量",
      EN: "Retail Minimum Order Quantity"
    },
    wholesaleMOQ: {
      KR: "도매 최소 주문 수량",
      CN: "批发最小订单数量",
      JP: "卸売最小注文数量",
      EN: "Wholesale Minimum Order Quantity"
    },
    shippingMethod: {
      KR: "배송 방법",
      CN: "配送方式",
      JP: "配送方法",
      EN: "Shipping Method"
    },
    thumbnailImage: {
      KR: "썸네일 이미지",
      CN: "缩略图",
      JP: "サムネイル画像",
      EN: "Thumbnail Image"
    },
    detailImages: {
      KR: "상세 이미지",
      CN: "详细图片",
      JP: "詳細画像",
      EN: "Detail Images"
    },
    submit: {
      KR: "상품 등록",
      CN: "提交产品",
      JP: "商品を追加",
      EN: "Submit Product"
    },
    generalInfo: {
      KR: "기본 정보",
      CN: "基本信息",
      JP: "基本情報",
      EN: "General Information"
    },
    pricing: {
      KR: "가격 정책",
      CN: "价格政策",
      JP: "価格設定",
      EN: "Pricing"
    },
    images: {
      KR: "이미지",
      CN: "图片",
      JP: "画像",
      EN: "Images"
    },
    details: {
      KR: "상세 정보",
      CN: "详细信息",
      JP: "詳細情報",
      EN: "Details"
    }
  };

  const getTranslation = (key: string) => {
    return translationLabels[key as keyof typeof translationLabels][language as keyof typeof translationLabels[keyof typeof translationLabels]] || translationLabels[key as keyof typeof translationLabels].EN;
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* General Information Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold border-b pb-2">{getTranslation("generalInfo")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Name Fields - Modified for auto-translation */}
            <FormField
              control={form.control}
              name="nameKr"
              render={({ field }) => (
                <FormItem className="col-span-1 md:col-span-2">
                  <FormLabel>{getTranslation("productName")} (Korean)</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="상품명 (한국어)" 
                      {...field} 
                      onChange={(e) => {
                        field.onChange(e);
                        handleKoreanTextChange('name', e.target.value);
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{getTranslation("productName")} (English)</FormLabel>
                  <FormControl>
                    <Input placeholder="Product name in English" {...field} disabled={isTranslating} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="nameCn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{getTranslation("productName")} (Chinese)</FormLabel>
                  <FormControl>
                    <Input placeholder="产品名称 (中文)" {...field} disabled={isTranslating} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="nameJp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{getTranslation("productName")} (Japanese)</FormLabel>
                  <FormControl>
                    <Input placeholder="商品名 (日本語)" {...field} disabled={isTranslating} />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Category Field */}
            <FormField
              control={form.control}
              name="subcategory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{getTranslation("category")}</FormLabel>
                  <FormControl>
                    <select 
                      className="w-full p-2 border rounded" 
                      {...field}
                    >
                      <option value="accessories">Accessories</option>
                      <option value="hair">Hair Accessories</option>
                      <option value="jewelry">Jewelry</option>
                      <option value="bags">Bags</option>
                      <option value="necklaces">Necklaces</option>
                      <option value="rings">Rings</option>
                      <option value="brooches">Brooches</option>
                      <option value="earrings">Earrings</option>
                      <option value="buttons">Buttons</option>
                      <option value="zippers">Zippers</option>
                    </select>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock Quantity</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value) || 0)} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Pricing Section */}
        <div className="space-y-6 pt-6 border-t">
          <h2 className="text-2xl font-semibold border-b pb-2">{getTranslation("pricing")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Base Price Fields */}
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{getTranslation("price")} (KRW)</FormLabel>
                  <FormControl>
                    <Input placeholder="Price in KRW" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="priceUsd"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{getTranslation("price")} (USD)</FormLabel>
                  <FormControl>
                    <Input placeholder="Price in USD" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Distribution Channel Cards */}
            <Card className="p-4 col-span-2">
              <h3 className="text-lg font-medium mb-4">Distribution Channels</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Retail Section */}
                <div className="border rounded p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium">{getTranslation("isRetail")}</h4>
                    <FormField
                      control={form.control}
                      name="isRetail"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Switch 
                              checked={field.value} 
                              onCheckedChange={field.onChange} 
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  {form.watch("isRetail") && (
                    <>
                      <FormField
                        control={form.control}
                        name="retailPrice"
                        render={({ field }) => (
                          <FormItem className="mb-4">
                            <FormLabel>Retail Price (KRW)</FormLabel>
                            <FormControl>
                              <Input placeholder="Retail price" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="retailMOQ"
                        render={({ field }) => (
                          <FormItem className="mb-4">
                            <FormLabel>{getTranslation("retailMOQ")}</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                {...field} 
                                onChange={e => field.onChange(parseInt(e.target.value) || 1)} 
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="retailShippingMethod"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{getTranslation("shippingMethod")}</FormLabel>
                            <FormControl>
                              <select 
                                className="w-full p-2 border rounded" 
                                {...field}
                              >
                                <option value="domestic">Domestic Only</option>
                                <option value="international">International Only</option>
                                <option value="both">Both Domestic & International</option>
                              </select>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </>
                  )}
                </div>

                {/* Wholesale Section */}
                <div className="border rounded p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium">{getTranslation("isWholesale")}</h4>
                    <FormField
                      control={form.control}
                      name="isWholesale"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Switch 
                              checked={field.value} 
                              onCheckedChange={field.onChange} 
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  {form.watch("isWholesale") && (
                    <>
                      <FormField
                        control={form.control}
                        name="wholesalePrice"
                        render={({ field }) => (
                          <FormItem className="mb-4">
                            <FormLabel>Wholesale Price (KRW)</FormLabel>
                            <FormControl>
                              <Input placeholder="Wholesale price" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="wholesaleMOQ"
                        render={({ field }) => (
                          <FormItem className="mb-4">
                            <FormLabel>{getTranslation("wholesaleMOQ")}</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                {...field} 
                                onChange={e => field.onChange(parseInt(e.target.value) || 10)} 
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="wholesaleShippingMethod"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{getTranslation("shippingMethod")}</FormLabel>
                            <FormControl>
                              <select 
                                className="w-full p-2 border rounded" 
                                {...field}
                              >
                                <option value="domestic">Domestic Only</option>
                                <option value="international">International Only</option>
                                <option value="both">Both Domestic & International</option>
                              </select>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </>
                  )}
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Images Section */}
        <div className="space-y-6 pt-6 border-t">
          <h2 className="text-2xl font-semibold border-b pb-2">{getTranslation("images")}</h2>
          <div className="grid grid-cols-1 gap-6">
            {/* Thumbnail Image Upload */}
            <FormField
              control={form.control}
              name="thumbnailImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{getTranslation("thumbnailImage")}</FormLabel>
                  <FormControl>
                    <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                      {field.value ? (
                        <div className="relative w-full h-48">
                          <img 
                            src={URL.createObjectURL(field.value as Blob)} 
                            alt="Thumbnail preview" 
                            className="w-full h-full object-contain"
                          />
                          <button 
                            type="button"
                            onClick={() => field.onChange(null)}
                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                          >
                            ✕
                          </button>
                        </div>
                      ) : (
                        <>
                          <Image className="h-12 w-12 text-gray-400 mb-2" />
                          <div className="text-center">
                            <label htmlFor="thumbnail-upload" className="cursor-pointer text-blue-600 hover:text-blue-800">
                              Upload Thumbnail
                              <input
                                id="thumbnail-upload"
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={(e) => {
                                  const file = e.target.files?.[0] || null;
                                  field.onChange(file);
                                }}
                              />
                            </label>
                            <p className="text-xs text-gray-500 mt-1">PNG, JPG, JPEG up to 5MB</p>
                          </div>
                        </>
                      )}
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Detail Images Upload */}
            <FormField
              control={form.control}
              name="detailImages"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{getTranslation("detailImages")}</FormLabel>
                  <FormControl>
                    <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                      {field.value && field.value.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
                          {Array.from(field.value).map((file, index) => (
                            <div key={index} className="relative">
                              <img 
                                src={URL.createObjectURL(file as Blob)} 
                                alt={`Detail image ${index+1}`} 
                                className="w-full h-32 object-cover rounded"
                              />
                            </div>
                          ))}
                          <button 
                            type="button"
                            onClick={() => field.onChange(null)}
                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                          >
                            Clear All
                          </button>
                        </div>
                      ) : (
                        <>
                          <Upload className="h-12 w-12 text-gray-400 mb-2" />
                          <div className="text-center">
                            <label htmlFor="detail-upload" className="cursor-pointer text-blue-600 hover:text-blue-800">
                              Upload Detail Images
                              <input
                                id="detail-upload"
                                type="file"
                                className="hidden"
                                accept="image/*"
                                multiple
                                onChange={(e) => {
                                  field.onChange(e.target.files);
                                }}
                              />
                            </label>
                            <p className="text-xs text-gray-500 mt-1">Upload multiple images for product details</p>
                          </div>
                        </>
                      )}
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Details Section */}
        <div className="space-y-6 pt-6 border-t">
          <h2 className="text-2xl font-semibold border-b pb-2">{getTranslation("details")}</h2>
          <div className="grid grid-cols-1 gap-6">
            {/* Product Description Fields - Modified for auto-translation */}
            <FormField
              control={form.control}
              name="descriptionKr"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{getTranslation("description")} (Korean)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="상품 상세 설명 (한국어)" 
                      className="min-h-[150px]"
                      {...field} 
                      onChange={(e) => {
                        field.onChange(e);
                        handleKoreanTextChange('description', e.target.value);
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{getTranslation("description")} (English)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Detailed product description in English" 
                      className="min-h-[150px]"
                      {...field} 
                      disabled={isTranslating}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="descriptionCn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{getTranslation("description")} (Chinese)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="产品详细描述 (中文)" 
                      className="min-h-[150px]"
                      {...field} 
                      disabled={isTranslating}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="descriptionJp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{getTranslation("description")} (Japanese)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="商品の詳細説明 (日本語)" 
                      className="min-h-[150px]"
                      {...field} 
                      disabled={isTranslating}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Product Specifications */}
            <div className="border rounded p-4">
              <h3 className="text-lg font-medium mb-4">{getTranslation("specifications")}</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="specifications.size"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Size</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 10cm x 5cm" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="specifications.material"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Material</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Cotton, Polyester" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="specifications.weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Weight</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 100g" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="specifications.width"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Width/Dimensions</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 5cm width" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              {/* Colors (This could be enhanced with a proper color picker) */}
              <div className="mt-4">
                <FormLabel>Available Colors</FormLabel>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                  {["Black", "White", "Red", "Blue", "Green", "Yellow", "Brown", "Pink", "Purple", "Gray"].map((color) => (
                    <div key={color} className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        id={`color-${color}`}
                        checked={form.watch("specifications.colors")?.includes(color) || false}
                        onChange={(e) => {
                          const currentColors = form.watch("specifications.colors") || [];
                          if (e.target.checked) {
                            form.setValue("specifications.colors", [...currentColors, color]);
                          } else {
                            form.setValue("specifications.colors", 
                              currentColors.filter((c: string) => c !== color)
                            );
                          }
                        }}
                        className="rounded"
                      />
                      <label htmlFor={`color-${color}`}>{color}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-6">
          <Button type="submit" className="w-full md:w-auto">
            {getTranslation("submit")}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProductRegistrationForm;
