import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Globe, Mail, Lock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import { useLanguageStore } from "@/hooks/useLanguageStore";
import { useNavigate } from "react-router-dom";

const LoginSchema = z.object({
  email: z.string().min(1, { message: "이메일을 입력해주세요" }),
  password: z.string().min(1, { message: "비밀번호를 입력해주세요" }),
});

type LoginFormData = z.infer<typeof LoginSchema>;

const Login = () => {
  const { language } = useLanguageStore();
  const navigate = useNavigate();
  
  const form = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    console.log("Login Form Data:", data);
    
    // Check for admin credentials
    if (data.email === "admin" && data.password === "1234!") {
      // Set admin status in localStorage
      localStorage.setItem("userType", "business");
      localStorage.setItem("verificationStatus", "verified");
      
      toast.success("관리자로 로그인이 완료되었습니다.", {
        duration: 3000,
      });
      
      // Redirect to seller dashboard after successful admin login
      navigate("/seller/dashboard");
      return;
    }
    
    // Regular login logic (unchanged)
    toast.success("로그인이 완료되었습니다.", {
      duration: 3000,
    });
  };

  const handleGoogleLogin = () => {
    // Here you would implement Google OAuth login
    console.log("Google login clicked");
    
    toast.info("구글 계정으로 로그인 중...");
    // Simulate a successful login after a delay
    setTimeout(() => {
      toast.success("구글 계정으로 로그인이 완료되었습니다.");
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center">로그인</CardTitle>
              <CardDescription className="text-center">
                Fabri Korea Connect Global에 오신 것을 환영합니다
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid grid-cols-2 w-full mb-6">
                  <TabsTrigger value="login">로그인</TabsTrigger>
                  <TabsTrigger value="register">회원가입</TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                  <div className="space-y-6">
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="w-full flex items-center justify-center gap-2 border-gray-300 hover:bg-gray-50"
                      onClick={handleGoogleLogin}
                    >
                      <Globe className="h-5 w-5" />
                      <span>구글로 로그인</span>
                    </Button>

                    <div className="relative my-6">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="bg-background px-2 text-muted-foreground">또는</span>
                      </div>
                    </div>

                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>아이디 또는 이메일</FormLabel>
                              <FormControl>
                                <div className="flex">
                                  <div className="bg-muted p-2 flex items-center rounded-l-md border border-r-0">
                                    <Mail className="h-5 w-5 text-gray-500" />
                                  </div>
                                  <Input className="rounded-l-none" placeholder="아이디 또는 이메일을 입력하세요" {...field} />
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
                              <div className="flex justify-between items-center">
                                <FormLabel>비밀번호</FormLabel>
                                <a href="/forgot-password" className="text-xs text-fabri-blue hover:underline">
                                  비밀번호 찾기
                                </a>
                              </div>
                              <FormControl>
                                <div className="flex">
                                  <div className="bg-muted p-2 flex items-center rounded-l-md border border-r-0">
                                    <Lock className="h-5 w-5 text-gray-500" />
                                  </div>
                                  <Input className="rounded-l-none" type="password" placeholder="비밀번호를 입력하세요" {...field} />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Button type="submit" className="w-full">로그인</Button>
                      </form>
                    </Form>
                    
                    <div className="text-xs text-gray-500 mt-2">
                      <p>관리자 테스트 계정: ID - admin, PW - 1234!</p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="register">
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <h3 className="text-lg font-medium">회원 유형을 선택하세요</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        유형에 따라 다른 혜택과 서비스를 이용하실 수 있습니다
                      </p>
                    </div>
                    <div className="grid gap-4">
                      <div className="p-4 border rounded-xl">
                        <h4 className="text-fabri-pink font-medium mb-2">개인 회원 (일반 소비자)</h4>
                        <p className="text-sm text-muted-foreground mb-3">개인 구매, 장바구니, 리뷰 작성 가능</p>
                        <Button 
                          className="w-full bg-fabri-pink hover:bg-pink-600"
                          onClick={() => window.location.href = "/register/b2c"}
                        >
                          개인 회원가입
                        </Button>
                      </div>
                      <div className="p-4 border rounded-xl">
                        <h4 className="text-fabri-blue font-medium mb-2">B2B 회원 (기업/사업자)</h4>
                        <p className="text-sm text-muted-foreground mb-3">도매 가격, 견적 요청, 대량 주문 가능</p>
                        <Button 
                          className="w-full bg-fabri-blue hover:bg-blue-600"
                          onClick={() => window.location.href = "/register/b2b"}
                        >
                          B2B 회원가입
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-center">
              <p className="text-sm text-muted-foreground">
                © 2025 Fabri Korea Connect Global
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
      <Footer language={language} />
    </div>
  );
};

export default Login;
