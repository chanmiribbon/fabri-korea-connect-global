
import React, { useState } from "react";
import { useLanguageStore } from "@/hooks/useLanguageStore";
import ProductImageUpload from "./ProductImageUpload";

// Import the original form component - since we can't modify it directly
import OriginalProductRegistrationForm from "./OriginalProductRegistrationForm";

interface ProductRegistrationFormWrapperProps {
  onSubmitSuccess: (formData: any) => void;
}

export const ProductRegistrationFormWrapper: React.FC<ProductRegistrationFormWrapperProps> = ({ 
  onSubmitSuccess 
}) => {
  const { language } = useLanguageStore();
  const [additionalImages, setAdditionalImages] = useState<(File | null)[]>([null, null, null, null]); // Start with 4 empty slots
  
  const handleFormSubmit = (originalFormData: any) => {
    // Add our additional images to the form data
    const enhancedFormData = {
      ...originalFormData,
      additionalImages: additionalImages.filter(Boolean) // Remove null values
    };
    
    // Call the original onSubmitSuccess with enhanced data
    onSubmitSuccess(enhancedFormData);
  };
  
  return (
    <div className="space-y-8">
      {/* Original Registration Form */}
      <OriginalProductRegistrationForm onSubmitSuccess={handleFormSubmit} />
      
      {/* Additional Images Upload Section - moved below the main form */}
      <div className="p-6 bg-white rounded-lg shadow-sm border">
        <ProductImageUpload 
          onChange={setAdditionalImages}
          language={language}
          initialImages={additionalImages}
          maxImages={9}
        />
      </div>
    </div>
  );
};
