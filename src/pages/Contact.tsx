
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow pt-16">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-fabri-darkPurple mb-6">Contact Us</h1>
          <p className="text-lg text-gray-700">
            Get in touch with our team for inquiries about our products and services. Contact form coming soon.
          </p>
        </div>
      </div>
      <Footer language="EN" />
    </div>
  );
};

export default Contact;
