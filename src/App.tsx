import React, { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Products from "./pages/Products";
import BuyerProducts from "./pages/BuyerProducts";
import ConsumerProducts from "./pages/ConsumerProducts";
import SearchResults from "./pages/SearchResults";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import B2BRegister from "./pages/register/B2BRegister";
import B2CRegister from "./pages/register/B2CRegister";
import ChatSupport from "./components/chat/ChatSupport";
import AccessDenied from "./pages/AccessDenied";
import ProductDetail from "./pages/ProductDetail";

// Use lazy with proper import syntax
const CategoryProducts = lazy(() => import('./pages/Products/[category]'));
const ProductRegistration = lazy(() => import('./pages/ProductRegistration'));
const SupplierDashboard = lazy(() => import('./pages/SupplierDashboard'));
const ProductPurchase = lazy(() => import('./pages/ProductPurchase'));
const ProductQuote = lazy(() => import('./pages/ProductQuote'));

// Seller Center pages
const SellerDashboard = lazy(() => import('./pages/seller/Dashboard'));
const SellerProducts = lazy(() => import('./pages/seller/Products'));
const SellerOrders = lazy(() => import('./pages/seller/Orders'));
const SellerProductRegistration = lazy(() => import('./pages/seller/ProductRegistration'));

// Add the new import
const BusinessProfileSettings = lazy(() => import('./components/seller/settings/BusinessProfileSettings'));

const queryClient = new QueryClient();

// Initialize language (moved outside of component to ensure it runs immediately)
// This will make sure the language is set correctly even before the first render
const initializeLanguage = () => {
  const storedLanguage = localStorage.getItem('preferredLanguage');
  if (storedLanguage && ["KR", "EN", "CN", "JP"].includes(storedLanguage)) {
    document.documentElement.lang = storedLanguage.toLowerCase();
  }
};

initializeLanguage();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/buyer-products" element={<BuyerProducts />} />
          <Route path="/consumer-products" element={<ConsumerProducts />} />
          <Route path="/search" element={<SearchResults />} />
          <Route 
            path="/products/:category" 
            element={
              <Suspense fallback={<div className="p-20 text-center">Loading...</div>}>
                <CategoryProducts />
              </Suspense>
            } 
          />
          
          {/* Product detail routes */}
          <Route path="/consumer-products/:productId" element={<ProductDetail />} />
          <Route path="/buyer-products/:productId" element={<ProductDetail />} />
          
          {/* New purchase and quote routes */}
          <Route 
            path="/consumer-products/:productId/purchase" 
            element={
              <Suspense fallback={<div className="p-20 text-center">Loading...</div>}>
                <ProductPurchase />
              </Suspense>
            } 
          />
          <Route 
            path="/buyer-products/:productId/purchase" 
            element={
              <Suspense fallback={<div className="p-20 text-center">Loading...</div>}>
                <ProductPurchase isWholesale={true} />
              </Suspense>
            } 
          />
          <Route 
            path="/buyer-products/:productId/quote" 
            element={
              <Suspense fallback={<div className="p-20 text-center">Loading...</div>}>
                <ProductQuote />
              </Suspense>
            } 
          />
          
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register/b2b" element={<B2BRegister />} />
          <Route path="/register/b2c" element={<B2CRegister />} />
          <Route path="/access-denied" element={<AccessDenied />} />
          <Route path="*" element={<NotFound />} />
          <Route 
            path="/supplier/register-product" 
            element={
              <Suspense fallback={<div className="p-20 text-center">Loading...</div>}>
                <ProductRegistration />
              </Suspense>
            } 
          />
          <Route 
            path="/supplier/dashboard" 
            element={
              <Suspense fallback={<div className="p-20 text-center">Loading...</div>}>
                <SupplierDashboard />
              </Suspense>
            } 
          />
          
          {/* Seller Center Routes */}
          <Route 
            path="/seller/dashboard" 
            element={
              <Suspense fallback={<div className="p-20 text-center">Loading...</div>}>
                <SellerDashboard />
              </Suspense>
            } 
          />
          <Route 
            path="/seller/products" 
            element={
              <Suspense fallback={<div className="p-20 text-center">Loading...</div>}>
                <SellerProducts />
              </Suspense>
            } 
          />
          <Route 
            path="/seller/products/new" 
            element={
              <Suspense fallback={<div className="p-20 text-center">Loading...</div>}>
                <SellerProductRegistration />
              </Suspense>
            } 
          />
          <Route 
            path="/seller/orders" 
            element={
              <Suspense fallback={<div className="p-20 text-center">Loading...</div>}>
                <SellerOrders />
              </Suspense>
            } 
          />
          
          {/* Add the new route */}
          <Route 
            path="/seller/profile" 
            element={
              <Suspense fallback={<div className="p-20 text-center">Loading...</div>}>
                <BusinessProfileSettings />
              </Suspense>
            } 
          />
        </Routes>
        <ChatSupport />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
