import React, { use } from "react";
import Faq from "./Faq";
import Footer from "../Footer";
import Header from "./Header";
import Layout from "./Layout";
import MainContent from "./MainContent";
import Navbar from "../Navbar";
import ProductGallery from "./ProductGallery";
import ServiceOverview from "./Service";

const ProductDesktop = () => {
  return (
    <div className="flex flex-col w-full min-h-screen overflow-x-hidden pt-10">
      <Navbar />
      <MainContent />
      <ProductGallery />
      <Header />
      <Layout />
      <ServiceOverview />
      <Faq />
      <Footer />
    </div>
  );
};

export default ProductDesktop;
