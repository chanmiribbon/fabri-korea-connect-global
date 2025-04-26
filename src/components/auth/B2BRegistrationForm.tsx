
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Building, Upload, User, Mail, Lock, Phone, MapPin } from "lucide-react";
import { COUNTRIES } from "@/lib/countries";
import { validateBusinessNumber } from "@/lib/validation";

const B2BRegistrationSchema = z.object({
  companyName: z.string().min(2, { message: "회사명을 입력해주세요" }),
  businessNumber: z.string().min(1, { message: "사업자등록번호를 입력해주세요" }),
  country: z.string().min(1, { message: "국가를 선택해주세요" }),
  representativeName: z.string().min(2, { message: "대표자명을 입력해주세요" }),
  email: z.string().email({ message: "유효한 이메일을 입력해주세요" }),
  password: z
    .string()
    .min(8, { message: "비밀번호는 최소 8자 이상이어야 합니다" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
      message: "비밀번호는 영문 대소문자, 숫자, 특수문자를 포함해야 합니다",
    }),
  confirmPassword: z.string(),
  companyPhone: z.string().min(1, { message: "회사 전화번호를 입력해주세요" }),
  companyAddress: z.string().min(1, { message: "회사 주소를 입력해주세요" }),
  shippingAddress: z.string().min(1, { message: "배송지 주소를 입력해주세요" }),
  businessLicense: z.any().optional(),
  termsAgreed: z.literal(true, {
    errorMap: () => ({ message: "이용약관에 동의해주세요" }),
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "비밀번호가 일치하지 않습니다",
  path: ["confirmPassword"],
}).refine((data) => validateBusinessNumber(data.country, data.businessNumber), {
  message: "사업자등록번호 형식이 올바르지 않습니다",
  path: ["businessNumber"],
});

type B2BRegistrationFormData = z.infer<typeof B2BRegistrationSchema>;

const B2BRegistrationForm = () => {
  const form = useForm<B2BRegistrationFormData>({
    resolver: zodResolver(B2BRegistrationSchema),
    defaultValues: {
      companyName: "",
      businessNumber: "",
      country: "",
      representativeName: "",
      email: "",
      password: "",
      confirmPassword: "",
      companyPhone: "",
      companyAddress: "",
      shippingAddress: "",
      termsAgreed: false,
    },
  });

  const onSubmit = async (data: B2BRegistrationFormData) => {
    console.log("B2B Form Data:", data);
    
    // Handle file upload if available
    const formData = new FormData();
    if (data.businessLicense && data.businessLicense[0]) {
      formData.append("businessLicense", data.businessLicense[0]);
    }

    // Here you would typically make an API call to register the B2B user
    // For now, we'll just simulate a successful registration
    
    toast.success("회원가입이 완료되었습니다. 관리자 승인 후 서비스 이용이 가능합니다.", {
      duration: 5000,
    });
  };

  const { watch } = form;
  const selectedCountry = watch("country");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-2xl mx-auto">
        <div className="bg-blue-50 p-4 rounded-xl mb-6">
          <h2 className="text-lg font-semibold text-fabri-blue mb-2">B2B 회원 안내</h2>
          <p className="text-sm text-gray-700">
            B2B 회원은 관리자 승인 후 도매 전용 가격 및 견적 요청 기능을 사용하실 수 있습니다.
            국가별 필수 서류를 정확히 제출해 주시기 바랍니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>회사명</FormLabel>
                <FormControl>
                  <div className="flex">
                    <div className="bg-muted p-2 flex items-center rounded-l-md border border-r-0">
                      <Building className="h-5 w-5 text-gray-500" />
                    </div>
                    <Input className="rounded-l-none" placeholder="회사명을 입력하세요" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>국가</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="국가를 선택하세요" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {COUNTRIES.map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        {country.flag} {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="businessNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>사업자등록번호</FormLabel>
                <FormControl>
                  <Input placeholder={
                    selectedCountry === "KR" ? "123-45-67890 형식으로 입력" : 
                    selectedCountry === "US" ? "EIN 12-3456789 형식으로 입력" : 
                    "사업자등록번호 입력"
                  } {...field} />
                </FormControl>
                <FormMessage />
                {selectedCountry && (
                  <p className="text-xs text-muted-foreground">
                    {selectedCountry === "KR" && "한국 사업자등록번호는 123-45-67890 형식으로 입력하세요"}
                    {selectedCountry === "US" && "미국 EIN은 12-3456789 형식으로 입력하세요"}
                    {selectedCountry === "CN" && "중국 사업자등록번호를 입력하세요"}
                    {selectedCountry === "JP" && "일본 법인번호를 입력하세요"}
                  </p>
                )}
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="representativeName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>대표자명</FormLabel>
                <FormControl>
                  <div className="flex">
                    <div className="bg-muted p-2 flex items-center rounded-l-md border border-r-0">
                      <User className="h-5 w-5 text-gray-500" />
                    </div>
                    <Input className="rounded-l-none" placeholder="대표자명을 입력하세요" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>이메일</FormLabel>
                <FormControl>
                  <div className="flex">
                    <div className="bg-muted p-2 flex items-center rounded-l-md border border-r-0">
                      <Mail className="h-5 w-5 text-gray-500" />
                    </div>
                    <Input className="rounded-l-none" type="email" placeholder="이메일을 입력하세요" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>비밀번호</FormLabel>
                <FormControl>
                  <div className="flex">
                    <div className="bg-muted p-2 flex items-center rounded-l-md border border-r-0">
                      <Lock className="h-5 w-5 text-gray-500" />
                    </div>
                    <Input className="rounded-l-none" type="password" placeholder="비밀번호를 입력하세요" {...field} />
                  </div>
                </FormControl>
                <p className="text-xs text-muted-foreground mt-1">
                  영문 대소문자, 숫자, 특수문자를 포함한 8자 이상
                </p>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>비밀번호 확인</FormLabel>
                <FormControl>
                  <div className="flex">
                    <div className="bg-muted p-2 flex items-center rounded-l-md border border-r-0">
                      <Lock className="h-5 w-5 text-gray-500" />
                    </div>
                    <Input className="rounded-l-none" type="password" placeholder="비밀번호를 다시 입력하세요" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="companyPhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>회사 전화번호</FormLabel>
                <FormControl>
                  <div className="flex">
                    <div className="bg-muted p-2 flex items-center rounded-l-md border border-r-0">
                      <Phone className="h-5 w-5 text-gray-500" />
                    </div>
                    <Input className="rounded-l-none" placeholder="회사 전화번호를 입력하세요" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="companyAddress"
            render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-2">
                <FormLabel>회사 주소</FormLabel>
                <FormControl>
                  <div className="flex">
                    <div className="bg-muted p-2 flex items-center rounded-l-md border border-r-0">
                      <MapPin className="h-5 w-5 text-gray-500" />
                    </div>
                    <Input className="rounded-l-none" placeholder="회사 주소를 입력하세요" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="shippingAddress"
            render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-2">
                <FormLabel>배송지 주소</FormLabel>
                <FormControl>
                  <div className="flex">
                    <div className="bg-muted p-2 flex items-center rounded-l-md border border-r-0">
                      <MapPin className="h-5 w-5 text-gray-500" />
                    </div>
                    <Input className="rounded-l-none" placeholder="배송지 주소를 입력하세요" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="businessLicense"
            render={({ field: { value, onChange, ...field } }) => (
              <FormItem className="col-span-1 md:col-span-2">
                <FormLabel>사업자등록증 업로드 (선택)</FormLabel>
                <FormControl>
                  <div className="flex items-center">
                    <Input
                      type="file"
                      accept="image/*,.pdf"
                      className="file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-fabri-blue file:text-white hover:file:bg-blue-600"
                      onChange={(e) => onChange(e.target.files)}
                      {...field}
                    />
                    <Upload className="h-5 w-5 text-gray-500 ml-2" />
                  </div>
                </FormControl>
                <p className="text-xs text-muted-foreground mt-1">
                  JPG, PNG 또는 PDF 형식의 파일만 업로드 가능합니다 (최대 5MB)
                </p>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="termsAgreed"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 col-span-1 md:col-span-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    이용약관 및 개인정보 처리방침에 동의합니다
                  </FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-center pt-4">
          <Button type="submit" className="bg-fabri-blue hover:bg-blue-600 w-full md:w-1/2">
            회원가입 신청
          </Button>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          이미 계정이 있으신가요? <a href="/login" className="text-fabri-blue hover:underline">로그인</a>
        </div>
      </form>
    </Form>
  );
};

export default B2BRegistrationForm;
