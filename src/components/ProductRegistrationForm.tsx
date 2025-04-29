
// This file is readonly, we need to create a wrapper component to add our additional images functionality
// Let's create a wrapper for the ProductRegistrationForm that incorporates our new component

import React from "react";
import { ProductRegistrationFormWrapper } from "./ProductRegistrationFormWrapper";

const ProductRegistrationForm = ({ onSubmitSuccess }: { onSubmitSuccess: (formData: any) => void }) => {
  return <ProductRegistrationFormWrapper onSubmitSuccess={onSubmitSuccess} />;
};

export default ProductRegistrationForm;
