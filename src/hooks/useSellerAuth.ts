
import { useState, useEffect } from "react";
import { useAccessControl } from "./useAccessControl";

// Enhanced implementation that uses the access control hook
export const useSellerAuth = () => {
  const [isSeller, setIsSeller] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { canAccessSellerCenter, isLoading: accessLoading } = useAccessControl();

  useEffect(() => {
    // If access control is still loading, wait
    if (accessLoading) {
      return;
    }
    
    // Use the access control hook to determine seller status
    setIsSeller(canAccessSellerCenter());
    setIsLoading(false);
  }, [canAccessSellerCenter, accessLoading]);

  return { isSeller, isLoading };
};
