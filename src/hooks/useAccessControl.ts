
import { useState, useEffect } from 'react';

type UserType = 'business' | 'personal' | null;
type VerificationStatus = 'pending' | 'verified' | 'rejected' | null;

export const useAccessControl = () => {
  const [userType, setUserType] = useState<UserType>(null);
  const [verificationStatus, setVerificationStatus] = useState<VerificationStatus>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real application, this would fetch from your auth service
    const checkUserAccess = () => {
      setIsLoading(true);
      
      // Mock implementation - in production, this would check with your backend
      setTimeout(() => {
        const storedUserType = localStorage.getItem("userType") as UserType;
        const storedVerificationStatus = localStorage.getItem("verificationStatus") as VerificationStatus;
        
        setUserType(storedUserType);
        setVerificationStatus(storedVerificationStatus || 'pending');
        setIsLoading(false);
      }, 500);
    };

    checkUserAccess();
  }, []);

  const canAccessWholesale = () => {
    // Only verified business accounts can access wholesale
    return userType === 'business' && verificationStatus === 'verified';
  };

  const canAccessRetail = () => {
    // Everyone can access retail
    return true;
  };

  const canAccessSellerCenter = () => {
    // Only business accounts can access seller center
    return userType === 'business';
  };

  return {
    userType,
    verificationStatus,
    isLoading,
    canAccessWholesale,
    canAccessRetail,
    canAccessSellerCenter,
  };
};
