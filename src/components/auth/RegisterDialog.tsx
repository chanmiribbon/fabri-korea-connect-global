
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Building, User } from "lucide-react";
import { Language } from "@/hooks/useLanguageStore";

interface RegisterDialogProps {
  language: Language;
  trigger?: React.ReactNode;
}

const translations = {
  KR: {
    title: "회원가입 유형 선택",
    subtitle: "원하시는 회원가입 유형을 선택해주세요",
    registerButton: "지금 회원가입하고 혜택 받기",
    b2c: {
      title: "개인 회원가입",
      desc: "소량 구매를 원하는 일반 소비자용 가입"
    },
    b2b: {
      title: "기업 회원가입",
      desc: "도매 구매를 원하는 해외 바이어/업체용 가입"
    }
  },
  EN: {
    title: "Select Registration Type",
    subtitle: "Please select your preferred registration type",
    registerButton: "Register Now for Benefits",
    b2c: {
      title: "Individual Registration",
      desc: "For general consumers interested in retail purchases"
    },
    b2b: {
      title: "Business Registration",
      desc: "For international buyers and companies interested in wholesale"
    }
  },
  CN: {
    title: "选择注册类型",
    subtitle: "请选择您想要的注册类型",
    registerButton: "立即注册并获取优惠",
    b2c: {
      title: "个人注册",
      desc: "适用于想要零售购买的普通消费者"
    },
    b2b: {
      title: "企业注册",
      desc: "适用于想要批发采购的海外买家/企业"
    }
  },
  JP: {
    title: "会員登録タイプの選択",
    subtitle: "希望する会員登録タイプを選択してください",
    registerButton: "今すぐ登録して特典を受け取る",
    b2c: {
      title: "個人会員登録",
      desc: "小売購入を希望する一般消費者向け"
    },
    b2b: {
      title: "企業会員登録",
      desc: "卸売購入を希望する海外バイヤー/企業向け"
    }
  }
};

const RegisterDialog = ({ language, trigger }: RegisterDialogProps) => {
  const navigate = useNavigate();
  const text = translations[language];

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-[#6EC1E4] hover:bg-[#5DB1D4] text-white rounded-xl px-6 py-2 text-lg font-medium">
            {text.registerButton}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] p-6 overflow-hidden">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-2xl font-bold text-center">
            {text.title}
          </DialogTitle>
          <DialogDescription className="text-center">
            {text.subtitle}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
          <Button
            variant="outline"
            size="lg"
            className="h-auto px-4 py-6 flex flex-col items-center gap-3 hover:bg-slate-50"
            onClick={() => navigate('/register/b2c')}
          >
            <User className="w-10 h-10 text-[#6EC1E4]" />
            <div className="space-y-1 text-center">
              <h3 className="font-semibold text-lg">{text.b2c.title}</h3>
              <p className="text-sm text-muted-foreground px-2 break-words hyphens-auto">
                {text.b2c.desc}
              </p>
            </div>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="h-auto px-4 py-6 flex flex-col items-center gap-3 hover:bg-slate-50"
            onClick={() => navigate('/register/b2b')}
          >
            <Building className="w-10 h-10 text-[#6EC1E4]" />
            <div className="space-y-1 text-center">
              <h3 className="font-semibold text-lg">{text.b2b.title}</h3>
              <p className="text-sm text-muted-foreground px-2 break-words hyphens-auto">
                {text.b2b.desc}
              </p>
            </div>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterDialog;
