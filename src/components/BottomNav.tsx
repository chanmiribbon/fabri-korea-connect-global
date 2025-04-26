
import React from "react";
import { Link } from "react-router-dom";
import { Grid, Bookmark, ShoppingCart, User } from "lucide-react";

const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 py-2 md:hidden">
      <div className="grid grid-cols-4 gap-1">
        <Link 
          to="/categories" 
          className="flex flex-col items-center justify-center p-2 text-gray-600 hover:text-fabri-purple"
        >
          <Grid className="w-6 h-6" />
          <span className="text-xs mt-1">카테고리</span>
        </Link>
        <Link 
          to="/bookmarks" 
          className="flex flex-col items-center justify-center p-2 text-gray-600 hover:text-fabri-purple"
        >
          <Bookmark className="w-6 h-6" />
          <span className="text-xs mt-1">즐겨찾기</span>
        </Link>
        <Link 
          to="/cart" 
          className="flex flex-col items-center justify-center p-2 text-gray-600 hover:text-fabri-purple"
        >
          <ShoppingCart className="w-6 h-6" />
          <span className="text-xs mt-1">장바구니</span>
        </Link>
        <Link 
          to="/account" 
          className="flex flex-col items-center justify-center p-2 text-gray-600 hover:text-fabri-purple"
        >
          <User className="w-6 h-6" />
          <span className="text-xs mt-1">내 계정</span>
        </Link>
      </div>
    </nav>
  );
};

export default BottomNav;
