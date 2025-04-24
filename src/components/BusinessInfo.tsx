
import React from "react";

interface BusinessInfoProps {
  language: string;
}

const BusinessInfo: React.FC<BusinessInfoProps> = ({ language }) => {
  return (
    <section className="py-16 bg-fabri-darkPurple text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            {language === "KR" ? "사업자 정보" : "Business Information"}
          </h2>
        </div>

        <div className="mt-12 bg-white/10 rounded-lg shadow-lg p-8 backdrop-blur-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-fabri-lightPurple mb-4">
                {language === "KR" ? "회사 정보" : "Company Details"}
              </h3>
              <ul className="space-y-3">
                <li className="flex">
                  <span className="font-medium w-32">
                    {language === "KR" ? "회사명" : "Company Name"}:
                  </span>
                  <span>FabriKorea Co., Ltd.</span>
                </li>
                <li className="flex">
                  <span className="font-medium w-32">
                    {language === "KR" ? "사업자번호" : "Business Number"}:
                  </span>
                  <span>123-45-67890</span>
                </li>
                <li className="flex">
                  <span className="font-medium w-32">
                    {language === "KR" ? "대표자" : "CEO"}:
                  </span>
                  <span>Kim Min-su</span>
                </li>
                <li className="flex">
                  <span className="font-medium w-32">
                    {language === "KR" ? "설립일" : "Established"}:
                  </span>
                  <span>2015.08.15</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-fabri-lightPurple mb-4">
                {language === "KR" ? "연락처 정보" : "Contact Information"}
              </h3>
              <ul className="space-y-3">
                <li className="flex">
                  <span className="font-medium w-32">
                    {language === "KR" ? "주소" : "Address"}:
                  </span>
                  <span>
                    {language === "KR"
                      ? "서울특별시 중구 남대문시장 12길 34"
                      : "34, Namdaemun Market 12-gil, Jung-gu, Seoul, Korea"}
                  </span>
                </li>
                <li className="flex">
                  <span className="font-medium w-32">
                    {language === "KR" ? "전화번호" : "Phone"}:
                  </span>
                  <span>+82-2-123-4567</span>
                </li>
                <li className="flex">
                  <span className="font-medium w-32">
                    {language === "KR" ? "이메일" : "Email"}:
                  </span>
                  <span>contact@fabrikorea.com</span>
                </li>
                <li className="flex">
                  <span className="font-medium w-32">
                    {language === "KR" ? "영업시간" : "Business Hours"}:
                  </span>
                  <span>9:00 - 18:00 (Mon-Fri)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessInfo;
