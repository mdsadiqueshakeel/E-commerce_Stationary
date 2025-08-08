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
    <div className="flex flex-col w-full min-h-screen overflow-x-hidden pt-16">
      <NavigationBar />
      <Header />
      <MainContent />
      <ProductShowcase />
      <PageLayout />
      <Features />
      <CallToAction />
      <Footer />
    </div>
  );
}
