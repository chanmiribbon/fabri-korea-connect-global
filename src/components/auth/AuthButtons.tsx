
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const AuthButtons = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col space-y-4 w-full sm:w-auto sm:flex-row sm:space-y-0 sm:space-x-4">
      <Button 
        onClick={() => navigate("/register/b2b")} 
        className="bg-fabri-blue text-white hover:bg-blue-600"
      >
        B2B 회원가입
      </Button>
      <Button 
        onClick={() => navigate("/register/b2c")} 
        className="bg-fabri-pink text-white hover:bg-pink-600"
      >
        B2C 회원가입
      </Button>
    </div>
  );
};
