import { Product } from "@/types/product";

const sampleProducts = {
  dongdaemun: [
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
  ],
  namdaemun: [
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
  ],
  accessories: [
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
      descriptionKr: "진주와 크리스탈 장식이 있는 우아한 헤어 클",
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
  ],
  'diy-parts': [
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
  ]
};

export const useProducts = (category: string | undefined, subcategory: string | null) => {
  const getCategoryProducts = (category: string | undefined, subcategory: string | null): Product[] => {
    // Get all products for the category
    let products: Product[] = [];
    
    if (category?.includes('dongdaemun') && category?.includes('accessories')) {
      products = sampleProducts.dongdaemun;
    } else if (category?.includes('namdaemun') && category?.includes('accessories')) {
      products = sampleProducts.namdaemun;
    } else if (category === 'accessories') {
      products = sampleProducts.accessories;
    } else if (category === 'diy-parts') {
      products = sampleProducts['diy-parts'];
    }
    
    // Filter by subcategory if specified
    if (subcategory) {
      return products.filter(product => product.subcategory === subcategory);
    }
    
    return products;
  };

  return {
    products: getCategoryProducts(category, subcategory)
  };
};
