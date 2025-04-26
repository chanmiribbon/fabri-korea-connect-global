
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
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import B2BRegister from "./pages/register/B2BRegister";
import B2CRegister from "./pages/register/B2CRegister";

// Use lazy with proper import syntax
const CategoryProducts = lazy(() => import('./pages/Products/[category]'));

// Add new imports
const ProductRegistration = lazy(() => import('./pages/ProductRegistration'));
const SupplierDashboard = lazy(() => import('./pages/SupplierDashboard'));

const queryClient = new QueryClient();

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
          <Route 
            path="/products/:category" 
            element={
              <Suspense fallback={<div className="p-20 text-center">Loading...</div>}>
                <CategoryProducts />
              </Suspense>
            } 
          />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register/b2b" element={<B2BRegister />} />
          <Route path="/register/b2c" element={<B2CRegister />} />
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
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
