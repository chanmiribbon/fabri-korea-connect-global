
export const validateBusinessNumber = (country: string, businessNumber: string): boolean => {
  if (!country || !businessNumber) return false;

  // Simple validation patterns for business numbers by country
  switch (country) {
    case "KR": // Korean Business Registration Number
      return /^\d{3}-\d{2}-\d{5}$/.test(businessNumber);
    
    case "US": // US Employer Identification Number
      return /^\d{2}-\d{7}$/.test(businessNumber);
    
    case "CN": // Chinese Uniform Social Credit Code
      return /^[A-Z0-9]{18}$/.test(businessNumber);
    
    case "JP": // Japanese Corporate Number
      return /^\d{13}$/.test(businessNumber);
    
    // Add more country-specific validations as needed
    
    default:
      // For other countries, just check if there's any input
      return businessNumber.length > 0;
  }
};
