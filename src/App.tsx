import { useEffect, useState } from "react";
import Splash from "./components/Splash";
import Navbar from "./components/Navbar";
import HeroCarousel from "./components/HeroCarousel";
import ActionBar from "./components/ActionBar";
import ServiceGrid from "./components/ServiceGrid";
import FeaturedCompanies from "./components/FeaturedCompanies";
import ListCompanyCTA from "./components/ListCompanyCTA";
import PartnersMarquee from "./components/PartnersMarquee";
import Footer from "./components/Footer";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShowSplash(false), 2200);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <Splash visible={showSplash} />
      <Navbar />
      <main className="flex-1 bg-app-bg">
        <HeroCarousel />
        <ActionBar />
        <ServiceGrid />
        <FeaturedCompanies />
        <ListCompanyCTA />
        <PartnersMarquee />
      </main>
      <Footer />
    </>
  );
}
