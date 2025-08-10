// src/components/home/HomeDesktop.jsx
import NavigationBar from "../Navbar";
import MainContent from "./MainContent";
import Header from "./Header";
import ProductShowcase from "./ProductShowCase";
import PageLayout from "./PageLayout";
import Features from "./Feature";
import CallToAction from "./callToAction";
import Footer from "../Footer";

export default function HomeDesktop() {
  return (
    <div className="flex flex-col w-full min-h-screen overflow-x-hidden pt-10">
      <NavigationBar />
      {/* Header section with clear separation */}
      {/* <div className="mb-20 sm:mb-20 md:mb-24 lg:mb-32"> */}
        <Header />
      {/* </div> */}
      {/* MainContent with clear separation */}
      {/* <div className="mt-30 sm:mt-20 md:mt-24 lg:mt-32 mb-[-50]"> */}
        <MainContent />
      {/* </div> */}
      <ProductShowcase />
      <PageLayout />
      <Features />
      <CallToAction />
      <Footer />
    </div>
  );
}
