
import { Language } from "@/hooks/useLanguageStore";

export const getNavLinks = (lang: Language) => {
  switch (lang) {
    case "KR":
      return { 
        home: "홈", 
        products: "제품", 
        about: "회사 소개", 
        contact: "연락처", 
        login: "로그인",
        sellerCenter: "판매자 센터",
        retailMall: "소매 쇼핑몰",
        wholesaleMall: "도매 쇼핑몰" 
      };
    case "CN":
      return { 
        home: "首页", 
        products: "产品", 
        about: "公司简介", 
        contact: "联系我们", 
        login: "登录",
        sellerCenter: "卖家中心",
        retailMall: "零售商城",
        wholesaleMall: "批发商城"
      };
    case "JP":
      return { 
        home: "ホーム", 
        products: "製品", 
        about: "会社紹介", 
        contact: "お問い合わせ", 
        login: "ログイン",
        sellerCenter: "販売者センター",
        retailMall: "小売モール",
        wholesaleMall: "卸売モール"
      };
    default:
      return { 
        home: "Home", 
        products: "Products", 
        about: "About Us", 
        contact: "Contact", 
        login: "Login",
        sellerCenter: "Seller Center",
        retailMall: "Retail Mall",
        wholesaleMall: "Wholesale Mall"
      };
  }
};
