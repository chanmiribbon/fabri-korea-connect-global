
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow pt-16">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-fabri-darkPurple mb-6">About Us</h1>
          <p className="text-lg text-gray-700">
            FabriKorea is a premium B2B/B2C platform connecting global buyers with high-quality Korean fabrics and materials from Dongdaemun and Namdaemun markets. More content coming soon.
          </p>
        </div>
      </div>
      <Footer language="EN" />
    </div>
  );
};

export default About;
