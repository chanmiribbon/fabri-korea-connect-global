
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
                  <span>찬미리본</span>
                </li>
                <li className="flex">
                  <span className="font-medium w-32">
                    {language === "KR" ? "사업자번호" : "Business Number"}:
                  </span>
                  <span>565-03-02700</span>
                </li>
                <li className="flex">
                  <span className="font-medium w-32">
                    {language === "KR" ? "대표자" : "CEO"}:
                  </span>
                  <span>Jeon Chan-ung</span>
                </li>
                <li className="flex">
                  <span className="font-medium w-32">
                    {language === "KR" ? "설립일" : "Established"}:
                  </span>
                  <span>2023.01.01</span>
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
                      ? "경기도 구리시 갈매순환로 166번길 45 갈매 아너시티 H932호"
                      : "H932, Galmae Honor City, 45, Galmaesunhwan-ro 166beon-gil, Guri-si, Gyeonggi-do, Korea"}
                  </span>
                </li>
                <li className="flex">
                  <span className="font-medium w-32">
                    {language === "KR" ? "전화번호" : "Phone"}:
                  </span>
                  <span>+82 01-6835-1009</span>
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
                  <span>10:00 - 16:00 (Mon-Fri)</span>
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
