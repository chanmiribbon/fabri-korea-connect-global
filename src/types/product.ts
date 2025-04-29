
export interface Product {
  id: number;
  name: string;
  nameKr: string;
  nameCn: string;
  nameJp: string;
  image: string;
  detailImages?: string[];
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
  isRetail?: boolean;
  isWholesale?: boolean;
  moq?: number;
  createdAt?: string;  // Add timestamp for sorting
}

export interface NewProduct {
  name: {
    kr: string;
    en: string;
    cn: string;
    jp: string;
  };
  price: {
    kr: string;
    en: string;
    cn: string;
    jp: string;
  };
  description: {
    kr: string;
    en: string;
    cn: string;
    jp: string;
  };
  category: string;
  specifications: {
    size?: string;
    material?: string;
    colors?: string[];
    weight?: string;
    width?: string;
  };
  isRetail: boolean;
  isWholesale: boolean;
  moq: number;
  thumbnailImage: File | null;
  detailImages: FileList | null;
}

export interface Subcategory {
  id: string;
  name: string;
  nameKr: string;
  nameCn: string;
  nameJp: string;
  icon?: React.ReactNode;
}
