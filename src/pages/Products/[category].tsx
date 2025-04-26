
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Hairpin, Necklace, Ring, Brooch, Earring, Button as ButtonIcon, Zipper, Buckle, Craft, Hanbok, Fabric, Gift, Box, Ribbon, Tag, Pouch } from "lucide-react";
import { useLanguageStore } from "@/hooks/useLanguageStore";

// Product type expanded with more detailed information
interface Product {
  id: number;
  name: string;
  nameKr: string;
  nameCn: string;
  nameJp: string;
  image: string;
  price: string;
  priceUsd: string;
  subcategory: string;
  description: string;
  descriptionKr: string;
  descriptionCn: string;
  descriptionJp: string;
  stock: number;
  specifications: {
    size?: string;
    material?: string;
    colors?: string[];
    weight?: string;
    width?: string;
    composition?: string;
    usage?: string;
  };
  badges?: string[];
  isNewArrival?: boolean;
  isBestSeller?: boolean;
}

// Subcategory type
interface Subcategory {
  id: string;
  name: string;
  nameKr: string;
  nameCn: string;
  nameJp: string;
  icon?: React.ReactNode;
}

const CategoryProducts = () => {
  const { category } = useParams();
  const { language } = useLanguageStore();
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null);
  
  // Get subcategories based on main category
  const getSubcategories = (category: string | undefined): Subcategory[] => {
    switch (category) {
      case 'accessories':
        return [
          { id: 'hair', name: 'Hair Accessories', nameKr: '헤어 악세서리', nameCn: '发饰', nameJp: 'ヘアアクセサリー', icon: <Hairpin className="w-4 h-4" /> },
          { id: 'necklaces', name: 'Necklaces', nameKr: '목걸이', nameCn: '项链', nameJp: 'ネックレス', icon: <Necklace className="w-4 h-4" /> },
          { id: 'rings', name: 'Rings', nameKr: '반지', nameCn: '戒指', nameJp: 'リング', icon: <Ring className="w-4 h-4" /> },
          { id: 'brooches', name: 'Brooches', nameKr: '브로치', nameCn: '胸针', nameJp: 'ブローチ', icon: <Brooch className="w-4 h-4" /> },
          { id: 'earrings', name: 'Earrings', nameKr: '귀걸이', nameCn: '耳环', nameJp: 'イヤリング', icon: <Earring className="w-4 h-4" /> },
        ];
      case 'diy-parts':
        return [
          { id: 'buttons', name: 'Buttons', nameKr: '단추', nameCn: '按钮', nameJp: 'ボタン', icon: <ButtonIcon className="w-4 h-4" /> },
          { id: 'zippers', name: 'Zippers', nameKr: '지퍼', nameCn: '拉链', nameJp: 'ジッパー', icon: <Zipper className="w-4 h-4" /> },
          { id: 'buckles', name: 'Buckles', nameKr: '버클', nameCn: '扣环', nameJp: 'バックル', icon: <Buckle className="w-4 h-4" /> },
          { id: 'craft-parts', name: 'Craft Parts', nameKr: '공예 파츠', nameCn: '工艺零件', nameJp: 'クラフトパーツ', icon: <Craft className="w-4 h-4" /> },
        ];
      case 'hanbok':
        return [
          { id: 'hanbok-accessories', name: 'Hanbok Accessories', nameKr: '한복 악세서리', nameCn: '韩服配饰', nameJp: '韓服アクセサリー', icon: <Hanbok className="w-4 h-4" /> },
          { id: 'hanbok-parts', name: 'Hanbok Parts', nameKr: '한복 부자재', nameCn: '韩服部件', nameJp: '韓服の部品', icon: <Hanbok className="w-4 h-4" /> },
        ];
      case 'fabric-materials':
        return [
          { id: 'cotton', name: 'Cotton Fabric', nameKr: '면 원단', nameCn: '棉布', nameJp: '綿生地', icon: <Fabric className="w-4 h-4" /> },
          { id: 'linen', name: 'Linen Fabric', nameKr: '리넨 원단', nameCn: '亚麻布', nameJp: 'リネン生地', icon: <Fabric className="w-4 h-4" /> },
          { id: 'silk', name: 'Silk Fabric', nameKr: '실크 원단', nameCn: '丝绸', nameJp: 'シルク生地', icon: <Fabric className="w-4 h-4" /> },
          { id: 'embroidered', name: 'Embroidered Fabric', nameKr: '자수 원단', nameCn: '刺绣布料', nameJp: '刺繍生地', icon: <Fabric className="w-4 h-4" /> },
        ];
      case 'gift-packaging':
        return [
          { id: 'gift-boxes', name: 'Gift Boxes', nameKr: '선물 상자', nameCn: '礼品盒', nameJp: 'ギフトボックス', icon: <Box className="w-4 h-4" /> },
          { id: 'ribbons', name: 'Ribbons', nameKr: '리본', nameCn: '丝带', nameJp: 'リボン', icon: <Ribbon className="w-4 h-4" /> },
          { id: 'tags', name: 'Tags & Labels', nameKr: '태그/라벨', nameCn: '标签', nameJp: 'タグ・ラベル', icon: <Tag className="w-4 h-4" /> },
          { id: 'pouches', name: 'Fabric Pouches', nameKr: '원단 파우치', nameCn: '布袋', nameJp: '布製ポーチ', icon: <Pouch className="w-4 h-4" /> },
        ];
      case 'dongdaemun-accessories':
      case 'namdaemun-accessories':
        return [
          { id: 'hair', name: 'Hair Accessories', nameKr: '헤어 악세서리', nameCn: '发饰', nameJp: 'ヘアアクセサリー', icon: <Hairpin className="w-4 h-4" /> },
          { id: 'jewelry', name: 'Jewelry', nameKr: '주얼리', nameCn: '珠宝', nameJp: 'ジュエリー', icon: <Ring className="w-4 h-4" /> },
          { id: 'bags', name: 'Bags', nameKr: '가방', nameCn: '包', nameJp: 'バッグ', icon: <Gift className="w-4 h-4" /> },
        ];
      default:
        return [];
    }
  };
  
  // Get category name based on slug
  const getCategoryName = (slug: string | undefined): { name: string, nameKr: string } => {
    if (slug?.includes('dongdaemun')) {
      return { name: 'Dongdaemun Market', nameKr: '동대문 시장' };
    } else if (slug?.includes('namdaemun')) {
      return { name: 'Namdaemun Market', nameKr: '남대문 시장' };
    } else if (slug === 'accessories') {
      return { name: 'Accessories', nameKr: '악세서리' };
    } else if (slug === 'diy-parts') {
      return { name: 'DIY Parts', nameKr: '부자재' };
    } else if (slug === 'hanbok') {
      return { name: 'Traditional Korean Items', nameKr: '한복소품' };
    } else if (slug === 'fabric-materials') {
      return { name: 'Fabric Materials', nameKr: '원단' };
    } else if (slug === 'gift-packaging') {
      return { name: 'Gift Packaging', nameKr: '포장재' };
    } else {
      return { name: 'Products', nameKr: '제품' };
    }
  };
  
  // Sample data for products based on category and subcategory
  const getCategoryProducts = (slug: string | undefined, subcategory: string | null): Product[] => {
    // Return all products if no subcategory is selected
    let products: Product[] = [];
    
    if (slug?.includes('dongdaemun') && slug?.includes('accessories')) {
      products = [
        {
          id: 1,
          name: "Crystal Flower Hair Pin",
          nameKr: "크리스탈 플라워 머리핀",
          nameCn: "水晶花朵发夹",
          nameJp: "クリスタルフラワーヘアピン",
          image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
          price: "15,000원",
          priceUsd: "$12.99",
          subcategory: "hair",
          description: "Elegant crystal flower hair pin with pearl accents",
          descriptionKr: "진주 장식이 있는 우아한 크리스탈 플라워 머리핀",
          descriptionCn: "优雅的水晶花朵发夹，珍珠装饰",
          descriptionJp: "パール装飾付きエレガントクリスタルフラワーヘアピン",
          stock: 150,
          specifications: {
            size: "8cm x 3cm",
            material: "Crystal, Pearl, Alloy",
            colors: ["Silver", "Gold", "Rose Gold"]
          },
          isNewArrival: true
        },
        {
          id: 2,
          name: "Vintage Style Necklace",
          nameKr: "빈티지 스타일 목걸이",
          nameCn: "复古风格项链",
          nameJp: "ヴィンテージスタイルネックレス",
          image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
          price: "25,000원",
          priceUsd: "$21.99",
          subcategory: "jewelry",
          description: "Vintage-inspired pendant necklace with antique finish",
          descriptionKr: "앤틱 마감 처리된 빈티지 스타일의 펜던트 목걸이",
          descriptionCn: "复古风格吊坠项链，古董式处理",
          descriptionJp: "アンティーク仕上げのヴィンテージ風ペンダントネックレス",
          stock: 100,
          specifications: {
            size: "Chain length: 45cm",
            material: "Brass with antique finish",
            colors: ["Antique Gold", "Antique Silver"]
          },
          isBestSeller: true
        },
        {
          id: 3,
          name: "Pearl Drop Earrings",
          nameKr: "진주 드롭 귀걸이",
          nameCn: "珍珠水滴耳环",
          nameJp: "パールドロップピアス",
          image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
          price: "18,000원",
          priceUsd: "$15.99",
          subcategory: "jewelry",
          description: "Elegant pearl drop earrings with crystal accents",
          descriptionKr: "크리스탈 장식이 있는 우아한 진주 드롭 귀걸이",
          descriptionCn: "优雅的珍珠水滴耳环，水晶装饰",
          descriptionJp: "クリスタル装飾付きエレガントパールドロップピアス",
          stock: 200,
          specifications: {
            size: "3.5cm length",
            material: "Fresh water pearl, Crystal, 925 Sterling Silver",
            colors: ["White Pearl", "Pink Pearl"]
          }
        },
        {
          id: 4,
          name: "Satin Hair Scrunchie Set",
          nameKr: "새틴 헤어 스크런치 세트",
          nameCn: "缎面发圈套装",
          nameJp: "サテンヘアシュシュセット",
          image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
          price: "10,000원",
          priceUsd: "$8.99",
          subcategory: "hair",
          description: "Set of 3 luxurious satin hair scrunchies",
          descriptionKr: "3개 세트 고급 새틴 헤어 스크런치",
          descriptionCn: "3件套豪华缎面发圈",
          descriptionJp: "3点セット高級サテンヘアシュシュ",
          stock: 300,
          specifications: {
            size: "Diameter: 10cm",
            material: "Premium Satin",
            colors: ["Black", "Ivory", "Burgundy"]
          }
        },
        {
          id: 5,
          name: "Mini Cross Body Bag",
          nameKr: "미니 크로스 백",
          nameCn: "迷你斜挎包",
          nameJp: "ミニクロスボディバッグ",
          image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
          price: "35,000원",
          priceUsd: "$29.99",
          subcategory: "bags",
          description: "Compact crossbody bag with adjustable strap",
          descriptionKr: "조절 가능한 스트랩이 있는 콤팩트한 크로스백",
          descriptionCn: "带可调节肩带的小巧斜挎包",
          descriptionJp: "調節可能なストラップ付きコンパクトクロスボディバッグ",
          stock: 80,
          specifications: {
            size: "18cm x 12cm x 6cm",
            material: "Premium PU Leather",
            colors: ["Black", "Brown", "Beige"]
          }
        }
      ];
    } else if (slug?.includes('namdaemun') && slug?.includes('accessories')) {
      products = [
        {
          id: 1,
          name: "Fashion Statement Ring",
          nameKr: "패션 스테이트먼트 반지",
          nameCn: "时尚宣言戒指",
          nameJp: "ファッションステートメントリング",
          image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
          price: "12,000원",
          priceUsd: "$9.99",
          subcategory: "jewelry",
          description: "Bold statement ring with geometric design",
          descriptionKr: "기하학적 디자인의 볼드한 스테이트먼트 반지",
          descriptionCn: "大胆的几何设计宣言戒指",
          descriptionJp: "幾何学デザインのボールドなステートメントリング",
          stock: 300,
          specifications: {
            size: "Adjustable (US size 6-9)",
            material: "Brass with 18K Gold plating",
            colors: ["Gold", "Silver", "Rose Gold"]
          },
          isBestSeller: true
        },
        {
          id: 2,
          name: "Mini Cross Body Bag",
          nameKr: "미니 크로스 백",
          nameCn: "迷你斜挎包",
          nameJp: "ミニクロスボディバッグ",
          image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
          price: "35,000원",
          priceUsd: "$29.99",
          subcategory: "bags",
          description: "Compact crossbody bag with adjustable strap",
          descriptionKr: "조절 가능한 스트랩이 있는 콤팩트한 크로스백",
          descriptionCn: "带可调节肩带的小巧斜挎包",
          descriptionJp: "調節可能なストラップ付きコンパクトクロスボディバッグ",
          stock: 80,
          specifications: {
            size: "18cm x 12cm x 6cm",
            material: "Premium PU Leather",
            colors: ["Black", "Brown", "Beige"]
          }
        },
        {
          id: 3,
          name: "Gemstone Hair Clip Set",
          nameKr: "젬스톤 헤어 클립 세트",
          nameCn: "宝石发夹套装",
          nameJp: "ジェムストーンヘアクリップセット",
          image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
          price: "16,000원",
          priceUsd: "$13.99",
          subcategory: "hair",
          description: "Set of 3 elegant hair clips with colorful gemstones",
          descriptionKr: "다양한 색상의 보석이 장식된 3개 세트 우아한 헤어 클립",
          descriptionCn: "3件套带彩色宝石的优雅发夹",
          descriptionJp: "カラフルな宝石付き3点セットエレガントヘアクリップ",
          stock: 150,
          specifications: {
            size: "6cm length each",
            material: "Acrylic gemstones, Metal alloy",
            colors: ["Multi-color"]
          },
          isNewArrival: true
        }
      ];
    } else if (slug === 'accessories') {
      // Accessories category products
      products = [
        // Hair Accessories
        {
          id: 101,
          name: "Pearl Embellished Hair Clip",
          nameKr: "진주 장식 헤어 클립",
          nameCn: "珍珠装饰发夹",
          nameJp: "パール付きヘアクリップ",
          image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
          price: "12,000원",
          priceUsd: "$10.50",
          subcategory: "hair",
          description: "Elegant hair clip with pearl and crystal embellishments",
          descriptionKr: "진주와 크리스탈 장식이 있는 우아한 헤어 클립",
          descriptionCn: "优雅的发夹，珍珠和水晶装饰",
          descriptionJp: "パールとクリスタル装飾付きのエレガントなヘアクリップ",
          stock: 120,
          specifications: {
            size: "7cm x 2.5cm",
            material: "Metal alloy, Pearls, Crystal",
            colors: ["Gold", "Silver", "Rose Gold"]
          },
          isBestSeller: true
        },
        {
          id: 102,
          name: "Velvet Headband Collection",
          nameKr: "벨벳 헤어밴드 컬렉션",
          nameCn: "天鹅绒发带系列",
          nameJp: "ベルベットヘアバンドコレクション",
          image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
          price: "18,000원",
          priceUsd: "$15.99",
          subcategory: "hair",
          description: "Set of 3 luxurious velvet headbands in different colors",
          descriptionKr: "다양한 색상의 3개 세트 고급 벨벳 헤어밴드",
          descriptionCn: "3件套不同颜色的豪华天鹅绒发带",
          descriptionJp: "異なる色の3点セット高級ベルベットヘアバンド",
          stock: 85,
          specifications: {
            size: "One size fits most",
            material: "Premium velvet fabric",
            colors: ["Black", "Burgundy", "Emerald Green"]
          }
        },
        
        // Necklaces
        {
          id: 201,
          name: "Layered Chain Necklace",
          nameKr: "레이어드 체인 목걸이",
          nameCn: "多层链条项链",
          nameJp: "レイヤードチェーンネックレス",
          image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
          price: "22,000원",
          priceUsd: "$19.50",
          subcategory: "necklaces",
          description: "Trendy layered chain necklace with various pendants",
          descriptionKr: "다양한 펜던트가 있는 트렌디한 레이어드 체인 목걸이",
          descriptionCn: "时尚多层链条项链，配有各种吊坠",
          descriptionJp: "様々なペンダント付きトレンディなレイヤードチェーンネックレス",
          stock: 70,
          specifications: {
            size: "Shortest chain: 40cm, Longest chain: 60cm",
            material: "Stainless steel with gold plating",
            colors: ["Gold", "Silver"]
          },
          isNewArrival: true
        },
        {
          id: 202,
          name: "Fresh Water Pearl Necklace",
          nameKr: "민물 진주 목걸이",
          nameCn: "淡水珍珠项链",
          nameJp: "淡水パールネックレス",
          image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
          price: "35,000원",
          priceUsd: "$30.99",
          subcategory: "necklaces",
          description: "Elegant necklace with genuine freshwater pearls",
          descriptionKr: "진짜 민물 진주로 만든 우아한 목걸이",
          descriptionCn: "优雅的项链，采用真正的淡水珍珠",
          descriptionJp: "本物の淡水パールを使用したエレガントなネックレス",
          stock: 50,
          specifications: {
            size: "Length: 45cm with 5cm extender",
            material: "Freshwater pearls, Sterling silver clasp",
            colors: ["White Pearl", "Pink Pearl"]
          }
        },
        
        // Rings
        {
          id: 301,
          name: "Minimalist Stackable Rings",
          nameKr: "미니멀리스트 스택형 반지",
          nameCn: "简约可叠戴戒指",
          nameJp: "ミニマリストスタッキングリング",
          image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
          price: "15,000원",
          priceUsd: "$12.99",
          subcategory: "rings",
          description: "Set of 3 minimalist rings that can be stacked together",
          descriptionKr: "함께 스택할 수 있는 3개 세트 미니멀한 반지",
          descriptionCn: "3件套简约戒指，可以叠戴在一起",
          descriptionJp: "重ね付け可能な3点セットミニマルリング",
          stock: 100,
          specifications: {
            size: "US sizes 5-9 available",
            material: "925 Sterling Silver",
            colors: ["Silver", "Gold", "Rose Gold"]
          }
        },
        
        // Brooches
        {
          id: 401,
          name: "Vintage Flower Brooch",
          nameKr: "빈티지 플라워 브로치",
          nameCn: "复古花朵胸针",
          nameJp: "ヴィンテージフラワーブローチ",
          image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
          price: "28,000원",
          priceUsd: "$24.99",
          subcategory: "brooches",
          description: "Elegant vintage-style flower brooch with crystal details",
          descriptionKr: "크리스탈 디테일이 있는 우아한 빈티지 스타일 플라워 브로치",
          descriptionCn: "优雅的复古风格花朵胸针，水晶细节",
          descriptionJp: "クリスタル装飾付きエレガントなヴィンテージスタイルのフラワーブローチ",
          stock: 60,
          specifications: {
            size: "4.5cm diameter",
            material: "Brass with antique finish, Crystal stones",
            colors: ["Antique Gold", "Antique Silver"]
          }
        },
        
        // Earrings
        {
          id: 501,
          name: "Korean Style Hoop Earrings",
          nameKr: "한국 스타일 후프 귀걸이",
          nameCn: "韩式圈形耳环",
          nameJp: "韓国スタイルフープピアス",
          image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
          price: "16,000원",
          priceUsd: "$13.99",
          subcategory: "earrings",
          description: "Trendy Korean-style gold hoop earrings",
          descriptionKr: "트렌디한 한국식 골드 후프 귀걸이",
          descriptionCn: "时尚韩式金圈形耳环",
          descriptionJp: "トレンディな韓国スタイルのゴールドフープピアス",
          stock: 85,
          specifications: {
            size: "2.5cm diameter",
            material: "Brass with 14K gold plating",
            colors: ["Gold"]
          },
          isBestSeller: true
        }
      ];
    } else if (slug === 'diy-parts') {
      // DIY Parts category products
      products = [
        // Buttons
        {
          id: 601,
          name: "Wooden Button Collection",
          nameKr: "우드 버튼 컬렉션",
          nameCn: "木制纽扣系列",
          nameJp: "ウッドボタンコレクション",
          image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
          price: "8,000원",
          priceUsd: "$6.99",
          subcategory: "buttons",
          description: "Assorted wooden buttons in different sizes and designs",
          descriptionKr: "다양한 크기와 디자인의 우드 버튼 모음",
          descriptionCn: "各种尺寸和设计的木制纽扣",
          descriptionJp: "様々なサイズとデザインの木製ボタン詰め合わせ",
          stock: 200,
          specifications: {
            size: "10mm-25mm diameter",
            material: "Natural wood",
            colors: ["Natural", "Dark Brown", "Light Brown"]
          }
        },
        
        // Zippers
        {
          id: 701,
          name: "Metal Zipper Pack",
          nameKr: "메탈 지퍼 팩",
          nameCn: "金属拉链包",
          nameJp: "メタルジッパーパック",
          image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
          price: "12,000원",
          priceUsd: "$10.50",
          subcategory: "zippers",
          description: "Pack of 5 high-quality metal zippers for clothing and bags",
          descriptionKr: "의류 및 가방용 고품질 메탈 지퍼 5개 세트",
          descriptionCn: "5件装高质量金属拉链，适用于服装和包袋",
          descriptionJp: "衣類やバッグ用の高品質メタルジッパー5本セット",
          stock: 150,
          specifications: {
            size: "20cm length",
            material: "Metal teeth with fabric tape",
            colors: ["Black", "Silver", "Brass", "Gunmetal", "Gold"]
          }
        }
      ];
    }
    
    // Filter by subcategory if specified
    if (subcategory) {
      return products.filter(product => product.subcategory === subcategory);
    }
    
    return products;
  };

  const subcategories = getSubcategories(category);
  const products = getCategoryProducts(category, activeSubcategory);
  const categoryInfo = getCategoryName(category);
  const categoryName = language === 'KR' ? categoryInfo.nameKr : categoryInfo.name;
  
  // Handle subcategory selection
  const handleSubcategoryClick = (subcategoryId: string) => {
    if (activeSubcategory === subcategoryId) {
      setActiveSubcategory(null); // Toggle off if already selected
    } else {
      setActiveSubcategory(subcategoryId);
    }
  };
  
  // Get subcategory name based on language
  const getSubcategoryName = (subcategory: Subcategory) => {
    switch (language) {
      case 'KR': return subcategory.nameKr;
      case 'CN': return subcategory.nameCn;
      case 'JP': return subcategory.nameJp;
      default: return subcategory.name;
    }
  };
  
  // Get product name and description based on language
  const getProductName = (product: Product) => {
    switch (language) {
      case 'KR': return product.nameKr;
      case 'CN': return product.nameCn;
      case 'JP': return product.nameJp;
      default: return product.name;
    }
  };
  
  const getProductDescription = (product: Product) => {
    switch (language) {
      case 'KR': return product.descriptionKr;
      case 'CN': return product.descriptionCn;
      case 'JP': return product.descriptionJp;
      default: return product.description;
    }
  };

  return (
    <div className="pt-20 px-4 min-h-screen bg-gradient-to-b from-white to-pink-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center justify-between mb-4">
          <div>
            <h1 className="text-4xl font-bold text-fabri-purple mb-2">
              {categoryName}
            </h1>
            {activeSubcategory && subcategories.find(sub => sub.id === activeSubcategory) && (
              <p className="text-lg text-gray-600">
                {getSubcategoryName(subcategories.find(sub => sub.id === activeSubcategory)!)}
              </p>
            )}
          </div>
          <Link to="/products" className="text-fabri-blue hover:text-fabri-purple">
            &larr; {language === 'KR' ? '모든 카테고리' : 'All Categories'}
          </Link>
        </div>
        
        {/* Subcategories Section */}
        {subcategories.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-medium mb-4">
              {language === 'KR' ? '하위 카테고리' : 'Subcategories'}
            </h2>
            <div className="flex flex-wrap gap-2">
              {subcategories.map((subcategory) => (
                <button
                  key={subcategory.id}
                  onClick={() => handleSubcategoryClick(subcategory.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                    activeSubcategory === subcategory.id
                      ? 'bg-fabri-purple text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  {subcategory.icon}
                  {getSubcategoryName(subcategory)}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.length > 0 ? (
            products.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-xl transition-all duration-300">
                <AspectRatio ratio={1}>
                  <img
                    src={product.image}
                    alt={getProductName(product)}
                    className="object-cover w-full h-full"
                  />
                  {/* Badge Section */}
                  <div className="absolute top-2 right-2 flex flex-col gap-2">
                    {product.isBestSeller && (
                      <Badge className="bg-amber-500 hover:bg-amber-600">
                        {language === 'KR' ? '베스트셀러' : 'Best Seller'}
                      </Badge>
                    )}
                    {product.isNewArrival && (
                      <Badge className="bg-emerald-500 hover:bg-emerald-600">
                        {language === 'KR' ? '신상품' : 'New Arrival'}
                      </Badge>
                    )}
                  </div>
                </AspectRatio>
                <CardContent className="p-4">
                  <Tabs defaultValue="details" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="details">
                        {language === 'KR' ? '상세정보' : 'Details'}
                      </TabsTrigger>
                      <TabsTrigger value="specs">
                        {language === 'KR' ? '제품사양' : 'Specs'}
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="details" className="mt-2">
                      <h3 className="font-semibold text-lg mb-1">{getProductName(product)}</h3>
                      <p className="text-gray-600 text-sm mb-2">{getProductDescription(product)}</p>
                      <div className="flex items-center justify-between mt-3">
                        <p className="text-fabri-purple font-medium">{product.price}</p>
                        <p className="text-gray-400 text-sm">{product.priceUsd}</p>
                      </div>
                      <p className="text-gray-500 text-xs mt-1">
                        {language === 'KR' ? `재고: ${product.stock}개` : `Stock: ${product.stock} units`}
                      </p>
                    </TabsContent>
                    
                    <TabsContent value="specs" className="mt-2">
                      {product.specifications.size && (
                        <p className="text-gray-700 text-sm mb-1">
                          <span className="font-medium">{language === 'KR' ? '크기' : 'Size'}:</span> {product.specifications.size}
                        </p>
                      )}
                      {product.specifications.material && (
                        <p className="text-gray-700 text-sm mb-1">
                          <span className="font-medium">{language === 'KR' ? '소재' : 'Material'}:</span> {product.specifications.material}
                        </p>
                      )}
                      {product.specifications.colors && product.specifications.colors.length > 0 && (
                        <div className="mb-1">
                          <p className="text-gray-700 text-sm font-medium mb-1">
                            {language === 'KR' ? '색상' : 'Colors'}:
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {product.specifications.colors.map((color, idx) => (
                              <span key={idx} className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs">
                                {color}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {product.specifications.weight && (
                        <p className="text-gray-700 text-sm mb-1">
                          <span className="font-medium">{language === 'KR' ? '무게' : 'Weight'}:</span> {product.specifications.weight}
                        </p>
                      )}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <p className="text-gray-500 text-lg">
                {language === 'KR' 
                  ? '이 카테고리에 제품이 없습니다.' 
                  : 'No products found in this category.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryProducts;
