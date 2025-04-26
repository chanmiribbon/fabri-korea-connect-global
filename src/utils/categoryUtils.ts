
import { Subcategory } from "@/types/product";
import { 
  ShoppingBag, 
  Heart, 
  Gem, 
  CircleDot, 
  CircleDashed, 
  CircleEllipsis, 
  Shirt, 
  Scissors, 
  Gift, 
  Package, 
  Ribbon, 
  Tag, 
  PackageOpen 
} from "lucide-react";
import React from "react";

export const getSubcategories = (category: string | undefined): Subcategory[] => {
  switch (category) {
    case 'accessories':
      return [
        { id: 'hair', name: 'Hair Accessories', nameKr: '헤어 악세서리', nameCn: '发饰', nameJp: 'ヘアアクセサリー', icon: React.createElement(ShoppingBag, { className: "w-4 h-4" }) },
        { id: 'necklaces', name: 'Necklaces', nameKr: '목걸이', nameCn: '项链', nameJp: 'ネックレス', icon: React.createElement(Gem, { className: "w-4 h-4" }) },
        { id: 'rings', name: 'Rings', nameKr: '반지', nameCn: '戒指', nameJp: 'リング', icon: React.createElement(CircleDot, { className: "w-4 h-4" }) },
        { id: 'brooches', name: 'Brooches', nameKr: '브로치', nameCn: '胸针', nameJp: 'ブローチ', icon: React.createElement(Heart, { className: "w-4 h-4" }) },
        { id: 'earrings', name: 'Earrings', nameKr: '귀걸이', nameCn: '耳环', nameJp: 'イヤリング', icon: React.createElement(CircleDashed, { className: "w-4 h-4" }) },
      ];
    case 'diy-parts':
      return [
        { id: 'buttons', name: 'Buttons', nameKr: '단추', nameCn: '按钮', nameJp: 'ボタン', icon: React.createElement(CircleDot, { className: "w-4 h-4" }) },
        { id: 'zippers', name: 'Zippers', nameKr: '지퍼', nameCn: '拉链', nameJp: 'ジッパー', icon: React.createElement(Scissors, { className: "w-4 h-4" }) },
        { id: 'buckles', name: 'Buckles', nameKr: '버클', nameCn: '扣环', nameJp: 'バックル', icon: React.createElement(Package, { className: "w-4 h-4" }) },
        { id: 'craft-parts', name: 'Craft Parts', nameKr: '공예 파츠', nameCn: '工艺零件', nameJp: 'クラフトパーツ', icon: React.createElement(CircleEllipsis, { className: "w-4 h-4" }) },
      ];
    case 'hanbok':
      return [
        { id: 'hanbok-accessories', name: 'Hanbok Accessories', nameKr: '한복 악세서리', nameCn: '韩服配饰', nameJp: '韓服アクセサリー', icon: React.createElement(Shirt, { className: "w-4 h-4" }) },
        { id: 'hanbok-parts', name: 'Hanbok Parts', nameKr: '한복 부자재', nameCn: '韩服部件', nameJp: '韓服の部品', icon: React.createElement(Scissors, { className: "w-4 h-4" }) },
      ];
    case 'fabric-materials':
      return [
        { id: 'cotton', name: 'Cotton Fabric', nameKr: '면 원단', nameCn: '棉布', nameJp: '綿生地', icon: React.createElement(Shirt, { className: "w-4 h-4" }) },
        { id: 'linen', name: 'Linen Fabric', nameKr: '리넨 원단', nameCn: '亚麻布', nameJp: 'リネン生地', icon: React.createElement(Shirt, { className: "w-4 h-4" }) },
        { id: 'silk', name: 'Silk Fabric', nameKr: '실크 원단', nameCn: '丝绸', nameJp: 'シルク生地', icon: React.createElement(Shirt, { className: "w-4 h-4" }) },
        { id: 'embroidered', name: 'Embroidered Fabric', nameKr: '자수 원단', nameCn: '刺绣布料', nameJp: '刺繍生地', icon: React.createElement(Shirt, { className: "w-4 h-4" }) },
      ];
    case 'gift-packaging':
      return [
        { id: 'gift-boxes', name: 'Gift Boxes', nameKr: '선물 상자', nameCn: '礼品盒', nameJp: 'ギフトボックス', icon: React.createElement(Gift, { className: "w-4 h-4" }) },
        { id: 'ribbons', name: 'Ribbons', nameKr: '리본', nameCn: '丝带', nameJp: 'リボン', icon: React.createElement(Ribbon, { className: "w-4 h-4" }) },
        { id: 'tags', name: 'Tags & Labels', nameKr: '태그/라벨', nameCn: '标签', nameJp: 'タグ・ラベル', icon: React.createElement(Tag, { className: "w-4 h-4" }) },
        { id: 'pouches', name: 'Fabric Pouches', nameKr: '원단 파우치', nameCn: '布袋', nameJp: '布製ポーチ', icon: React.createElement(PackageOpen, { className: "w-4 h-4" }) },
      ];
    default:
      return [];
  }
};

export const getCategoryName = (slug: string | undefined): { name: string, nameKr: string } => {
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
