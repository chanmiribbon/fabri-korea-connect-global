
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Package, Image, Truck } from "lucide-react";

interface ProductFormData {
  name: {
    kr: string;
    en: string;
    cn: string;
    jp: string;
  };
  category: string;
  // Change this type from FileList to any so we can handle the file input separately
  images: any;
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
}

const ProductRegistrationForm = () => {
  const [step, setStep] = useState(1);
  // Create a separate state for storing the selected files
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const form = useForm<ProductFormData>();

  const handleNextStep = () => {
    setStep(prev => Math.min(prev + 1, 3));
  };

  const handlePrevStep = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  const onSubmit = (data: ProductFormData) => {
    // Combine the form data with the selected files
    const formData = {
      ...data,
      images: selectedFiles
    };
    console.log('Form submitted:', formData);
    // Here you would typically send the data to your backend
  };

  // Handle file selection separately from form
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFiles(e.target.files);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-fabri-purple text-white' : 'bg-gray-200'}`}>
              <Package className="w-5 h-5" />
            </div>
            <div className="h-1 w-16 bg-gray-200 mx-2" />
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-fabri-purple text-white' : 'bg-gray-200'}`}>
              <Image className="w-5 h-5" />
            </div>
            <div className="h-1 w-16 bg-gray-200 mx-2" />
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-fabri-purple text-white' : 'bg-gray-200'}`}>
              <Truck className="w-5 h-5" />
            </div>
          </div>
          <span className="text-sm text-gray-500">단계 {step}/3</span>
        </div>

        {step === 1 && (
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
                      <FormLabel>상품명</FormLabel>
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
              {/* ... Similar TabsContent for CN and JP */}
            </Tabs>

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>카테고리</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="카테고리 선택" />
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

            {/* Modified file input to not use value prop */}
            <FormItem>
              <FormLabel>상품 이미지</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  // Don't set a value prop for file inputs
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-md mb-4">
              <p className="text-sm text-blue-600">
                📢 상품 설명은 자동 번역되어 각 언어로 표시됩니다.
              </p>
            </div>
            
            <FormField
              control={form.control}
              name="price.kr"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>가격 (KRW)</FormLabel>
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
                  <FormLabel>최소 주문 수량 (MOQ)</FormLabel>
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
                  <FormLabel>상품 설명</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="shippingMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>배송 방식</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="배송 방식 선택" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="domestic">국내 배송</SelectItem>
                      <SelectItem value="international">해외 배송</SelectItem>
                      <SelectItem value="both">국내/해외 배송</SelectItem>
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
                  <FormLabel>수량 제한</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        <div className="flex justify-between pt-6">
          {step > 1 && (
            <Button type="button" variant="outline" onClick={handlePrevStep}>
              이전
            </Button>
          )}
          {step < 3 ? (
            <Button type="button" onClick={handleNextStep}>
              다음
            </Button>
          ) : (
            <Button type="submit">등록 완료</Button>
          )}
        </div>
      </form>
    </Form>
  );
};

export default ProductRegistrationForm;
