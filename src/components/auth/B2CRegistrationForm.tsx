
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Google, User, Mail, Lock, Phone, MapPin } from "lucide-react";

const B2CRegistrationSchema = z.object({
  name: z.string().min(2, { message: "이름을 입력해주세요" }),
  email: z.string().email({ message: "유효한 이메일을 입력해주세요" }),
  password: z
    .string()
    .min(8, { message: "비밀번호는 최소 8자 이상이어야 합니다" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
      message: "비밀번호는 영문 대소문자, 숫자, 특수문자를 포함해야 합니다",
    }),
  confirmPassword: z.string(),
  phone: z.string().min(1, { message: "휴대폰 번호를 입력해주세요" }),
  address: z.string().min(1, { message: "배송지 주소를 입력해주세요" }),
  termsAgreed: z.literal(true, {
    errorMap: () => ({ message: "이용약관에 동의해주세요" }),
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "비밀번호가 일치하지 않습니다",
  path: ["confirmPassword"],
});

type B2CRegistrationFormData = z.infer<typeof B2CRegistrationSchema>;

const B2CRegistrationForm = () => {
  const form = useForm<B2CRegistrationFormData>({
    resolver: zodResolver(B2CRegistrationSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      address: "",
      termsAgreed: false,
    },
  });

  const onSubmit = async (data: B2CRegistrationFormData) => {
    console.log("B2C Form Data:", data);
    
    // Here you would typically make an API call to register the B2C user
    // For now, we'll just simulate a successful registration
    
    toast.success("회원가입이 완료되었습니다.", {
      duration: 3000,
    });
  };

  const handleGoogleSignup = () => {
    // Here you would implement Google OAuth login
    console.log("Google signup clicked");
    
    toast.info("구글 계정으로 회원가입 진행 중...");
    // Simulate a successful login after a delay
    setTimeout(() => {
      toast.success("구글 계정으로 회원가입이 완료되었습니다.");
    }, 2000);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-md mx-auto">
        <div className="bg-pink-50 p-4 rounded-xl mb-6">
          <h2 className="text-lg font-semibold text-fabri-pink mb-2">B2C 회원 안내</h2>
          <p className="text-sm text-gray-700">
            일반 소비자 회원으로 가입하시면 장바구니, 소량 구매, 리뷰 작성 등의 서비스를 이용하실 수 있습니다.
          </p>
        </div>

        <Button 
          type="button" 
          variant="outline" 
          className="w-full flex items-center justify-center gap-2 border-gray-300 hover:bg-gray-50"
          onClick={handleGoogleSignup}
        >
          <Google className="h-5 w-5" />
          <span>구글로 간편 가입</span>
        </Button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-background px-2 text-muted-foreground">또는 직접 입력</span>
          </div>
        </div>

        <div className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>이름</FormLabel>
                <FormControl>
                  <div className="flex">
                    <div className="bg-muted p-2 flex items-center rounded-l-md border border-r-0">
                      <User className="h-5 w-5 text-gray-500" />
                    </div>
                    <Input className="rounded-l-none" placeholder="이름을 입력하세요" {...field} />
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
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>휴대폰 번호</FormLabel>
                <FormControl>
                  <div className="flex">
                    <div className="bg-muted p-2 flex items-center rounded-l-md border border-r-0">
                      <Phone className="h-5 w-5 text-gray-500" />
                    </div>
                    <Input className="rounded-l-none" placeholder="휴대폰 번호를 입력하세요" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>기본 배송지 주소</FormLabel>
                <FormControl>
                  <div className="flex">
                    <div className="bg-muted p-2 flex items-center rounded-l-md border border-r-0">
                      <MapPin className="h-5 w-5 text-gray-500" />
                    </div>
                    <Input className="rounded-l-none" placeholder="기본 배송지 주소를 입력하세요" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="termsAgreed"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
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
          <Button type="submit" className="bg-fabri-pink hover:bg-pink-600 w-full">
            회원가입
          </Button>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          이미 계정이 있으신가요? <a href="/login" className="text-fabri-pink hover:underline">로그인</a>
        </div>
      </form>
    </Form>
  );
};

export default B2CRegistrationForm;
