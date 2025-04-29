
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, X, Images } from "lucide-react";

interface ProductImageUploadProps {
  onChange: (images: (File | null)[]) => void;
  language: string;
  initialImages?: (File | null)[];
  maxImages?: number;
}

const translations = {
  additionalImages: {
    KR: "추가 이미지",
    EN: "Additional Images",
    CN: "额外图片",
    JP: "追加画像",
  },
  addImage: {
    KR: "이미지 추가",
    EN: "Add Image",
    CN: "添加图片",
    JP: "画像を追加",
  },
  maxImagesReached: {
    KR: "최대 이미지 수에 도달했습니다",
    EN: "Maximum number of images reached",
    CN: "已达到最大图片数",
    JP: "最大画像数に達しました",
  },
  image: {
    KR: "이미지",
    EN: "Image",
    CN: "图片",
    JP: "画像",
  }
};

const ProductImageUpload: React.FC<ProductImageUploadProps> = ({
  onChange,
  language,
  initialImages = [],
  maxImages = 9
}) => {
  const [images, setImages] = useState<(File | null)[]>(initialImages);
  const [previews, setPreviews] = useState<string[]>(
    initialImages.map(img => img ? URL.createObjectURL(img) : '')
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Create a copy of the images array
      const newImages = [...images];
      newImages[index] = file;
      setImages(newImages);
      
      // Create a copy of the previews array
      const newPreviews = [...previews];
      newPreviews[index] = URL.createObjectURL(file);
      setPreviews(newPreviews);
      
      // Notify parent component
      onChange(newImages);
    }
  };

  const addImageSlot = () => {
    if (images.length < maxImages) {
      setImages([...images, null]);
      setPreviews([...previews, '']);
      onChange([...images, null]);
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
    
    const newPreviews = [...previews];
    newPreviews.splice(index, 1);
    setPreviews(newPreviews);
    
    onChange(newImages);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">
        {translations.additionalImages[language as keyof typeof translations.additionalImages] || translations.additionalImages.EN} 
        (4-9)
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <Card key={index} className="p-2 relative">
            <div className="aspect-square w-full overflow-hidden rounded-lg border flex items-center justify-center bg-gray-50">
              {previews[index] ? (
                <img 
                  src={previews[index]} 
                  alt={`Product image ${index + 1}`}
                  className="h-full w-full object-contain" 
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full w-full text-gray-400">
                  <Images className="h-8 w-8 mb-2" />
                  <span>{translations.image[language as keyof typeof translations.image] || translations.image.EN} {index + 1}</span>
                </div>
              )}
            </div>
            <div className="flex justify-between mt-2">
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, index)}
                className="text-sm"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute top-1 right-1 bg-white/80 text-red-500 hover:text-red-700 hover:bg-white/90 h-6 w-6"
                onClick={() => removeImage(index)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </Card>
        ))}
        
        {images.length < maxImages && (
          <Button
            type="button"
            variant="outline"
            className="h-full min-h-[200px] border-dashed flex flex-col gap-2"
            onClick={addImageSlot}
          >
            <Plus className="h-8 w-8" />
            <span>{translations.addImage[language as keyof typeof translations.addImage] || translations.addImage.EN}</span>
          </Button>
        )}
        
        {images.length >= maxImages && (
          <div className="col-span-full text-center text-amber-500 text-sm mt-2">
            {translations.maxImagesReached[language as keyof typeof translations.maxImagesReached] || translations.maxImagesReached.EN}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductImageUpload;
