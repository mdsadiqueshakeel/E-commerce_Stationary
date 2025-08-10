"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import NavigationBar from "../Navbar";
import Footer from "../Footer";
import CustomerTestimonials from "./CustomerTestimonals";
import Layout from "./Layout";
import MainContentSection from "./MainContent";
import ProductDetailsSection  from "./ProductDetail";
import ProductList from "../Products/MainContent";

const PdpDesktop = () => {
  const params = useParams();
  const [productId, setProductId] = useState(null);
  
  useEffect(() => {
    // Extract product ID from URL parameters
    if (params && params.product) {
      setProductId(params.product);
      console.log("Product ID from URL:", params.product);
    }
  }, [params]);

  return (
    <div className="flex flex-col w-full min-h-screen overflow-x-hidden pt-10">
      <NavigationBar />
      <ProductDetailsSection productId={productId} />
      <ProductList />
      <Layout />
      <MainContentSection />
      <CustomerTestimonials />
      <Footer />
    </div>
  );
};

export default PdpDesktop;
