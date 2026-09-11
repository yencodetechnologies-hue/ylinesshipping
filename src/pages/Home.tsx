import HeroCarousel from "../components/HeroCarousel";
import ActionBar from "../components/ActionBar";
import ServiceGrid from "../components/ServiceGrid";
import FeaturedCompanies from "../components/FeaturedCompanies";
import ListCompanyCTA from "../components/ListCompanyCTA";
import PartnersMarquee from "../components/PartnersMarquee";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
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
