
import React from "react";
import { Link } from "react-router-dom";

interface FooterProps {
  language: string;
}

const Footer: React.FC<FooterProps> = ({ language }) => {
  return (
    <footer className="bg-fabri-darkPurple text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-white">
                Fabri<span className="text-fabri-purple">Korea</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-gray-300">
              {language === "KR"
                ? "동대문과 남대문 시장의 프리미엄 원단 및 부자재 수출 플랫폼"
                : "Premium fabric and material export platform from Dongdaemun and Namdaemun markets"}
            </p>
          </div>

          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-fabri-lightPurple tracking-wider uppercase">
              {language === "KR" ? "제품" : "Products"}
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/fabrics" className="text-gray-300 hover:text-white">
                  {language === "KR" ? "원단" : "Fabrics"}
                </Link>
              </li>
              <li>
                <Link to="/accessories" className="text-gray-300 hover:text-white">
                  {language === "KR" ? "부자재" : "Accessories"}
                </Link>
              </li>
              <li>
                <Link to="/materials" className="text-gray-300 hover:text-white">
                  {language === "KR" ? "자재" : "Materials"}
                </Link>
              </li>
              <li>
                <Link to="/custom" className="text-gray-300 hover:text-white">
                  {language === "KR" ? "맞춤 주문" : "Custom Orders"}
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-fabri-lightPurple tracking-wider uppercase">
              {language === "KR" ? "회사" : "Company"}
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white">
                  {language === "KR" ? "회사 소개" : "About Us"}
                </Link>
              </li>
              <li>
                <Link to="/business" className="text-gray-300 hover:text-white">
                  {language === "KR" ? "사업자 정보" : "Business Info"}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white">
                  {language === "KR" ? "연락처" : "Contact"}
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-300 hover:text-white">
                  {language === "KR" ? "채용정보" : "Careers"}
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-fabri-lightPurple tracking-wider uppercase">
              {language === "KR" ? "고객 지원" : "Support"}
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-white">
                  {language === "KR" ? "자주 묻는 질문" : "FAQ"}
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-300 hover:text-white">
                  {language === "KR" ? "배송 정보" : "Shipping"}
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-300 hover:text-white">
                  {language === "KR" ? "반품 정책" : "Returns"}
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-white">
                  {language === "KR" ? "개인정보처리방침" : "Privacy Policy"}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-700 pt-8">
          <p className="text-sm text-gray-400 text-center">
            &copy; {new Date().getFullYear()} FabriKorea Co., Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
