
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { save } from "lucide-react";
import { useLanguageStore } from "@/hooks/useLanguageStore";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  ceoName: z.string().min(1, "CEO name is required"),
  phone: z.string().min(1, "Phone number is required"),
  address: z.string().min(1, "Address is required"),
  email: z.string().email("Invalid email address"),
  bankName: z.string().min(1, "Bank name is required"),
  accountNumber: z.string().min(1, "Account number is required"),
  accountHolder: z.string().min(1, "Account holder name is required"),
});

type FormData = z.infer<typeof formSchema>;

const translations = {
  businessProfile: {
    KR: "비즈니스 프로필",
    EN: "Business Profile",
    CN: "商业档案",
    JP: "ビジネスプロフィール",
  },
  companyInfo: {
    KR: "회사 정보",
    EN: "Company Information",
    CN: "公司信息",
    JP: "会社情報",
  },
  bankInfo: {
    KR: "은행 정보",
    EN: "Bank Information",
    CN: "银行信息",
    JP: "銀行情報",
  },
  companyName: {
    KR: "회사명",
    EN: "Company Name",
    CN: "公司名称",
    JP: "会社名",
  },
  ceoName: {
    KR: "대표자명",
    EN: "CEO Name",
    CN: "总裁姓名",
    JP: "代表者名",
  },
  phone: {
    KR: "전화번호",
    EN: "Phone Number",
    CN: "电话号码",
    JP: "電話番号",
  },
  address: {
    KR: "주소",
    EN: "Address",
    CN: "地址",
    JP: "住所",
  },
  email: {
    KR: "이메일",
    EN: "Email",
    CN: "电子邮件",
    JP: "メール",
  },
  bankName: {
    KR: "은행명",
    EN: "Bank Name",
    CN: "银行名称",
    JP: "銀行名",
  },
  accountNumber: {
    KR: "계좌번호",
    EN: "Account Number",
    CN: "账号",
    JP: "口座番号",
  },
  accountHolder: {
    KR: "예금주",
    EN: "Account Holder",
    CN: "账户持有人",
    JP: "口座名義人",
  },
  save: {
    KR: "저장",
    EN: "Save Changes",
    CN: "保存更改",
    JP: "変更を保存",
  },
  uploadLogo: {
    KR: "로고 업로드",
    EN: "Upload Logo",
    CN: "上传标志",
    JP: "ロゴをアップロード",
  },
};

const BusinessProfileSettings = () => {
  const { language } = useLanguageStore();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      ceoName: "",
      phone: "",
      address: "",
      email: "",
      bankName: "",
      accountNumber: "",
      accountHolder: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    console.log("Form data:", data);
    // TODO: Handle form submission
  };

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">
        {translations.businessProfile[language]}
      </h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{translations.companyInfo[language]}</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="logo">{translations.uploadLogo[language]}</Label>
                <Input
                  id="logo"
                  type="file"
                  accept="image/*"
                  className="cursor-pointer"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="companyName">
                  {translations.companyName[language]}
                </Label>
                <Input
                  id="companyName"
                  {...form.register("companyName")}
                  placeholder="ACME Corp"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ceoName">{translations.ceoName[language]}</Label>
                <Input
                  id="ceoName"
                  {...form.register("ceoName")}
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">{translations.phone[language]}</Label>
                <Input
                  id="phone"
                  {...form.register("phone")}
                  placeholder="+1 234 567 890"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">{translations.address[language]}</Label>
                <Input
                  id="address"
                  {...form.register("address")}
                  placeholder="123 Business Street"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{translations.email[language]}</Label>
                <Input
                  id="email"
                  type="email"
                  {...form.register("email")}
                  placeholder="contact@acme.com"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{translations.bankInfo[language]}</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="bankName">{translations.bankName[language]}</Label>
                <Input
                  id="bankName"
                  {...form.register("bankName")}
                  placeholder="Bank of Business"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="accountNumber">
                  {translations.accountNumber[language]}
                </Label>
                <Input
                  id="accountNumber"
                  {...form.register("accountNumber")}
                  placeholder="1234-5678-9012"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="accountHolder">
                  {translations.accountHolder[language]}
                </Label>
                <Input
                  id="accountHolder"
                  {...form.register("accountHolder")}
                  placeholder="ACME Corporation"
                />
              </div>
            </CardContent>
          </Card>

          <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4 flex justify-end">
            <Button type="submit" className="min-w-[200px]">
              <save className="w-4 h-4 mr-2" />
              {translations.save[language]}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default BusinessProfileSettings;
