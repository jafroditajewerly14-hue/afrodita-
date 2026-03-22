import HeroSection from "@/components/HeroSection";
import CatalogSection from "@/components/CatalogSection";
import ContactSection from "@/components/ContactSection";
import FooterSection from "@/components/FooterSection";
import Cart from "@/components/Cart";

const Index = () => {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <CatalogSection />
      <ContactSection />
      <FooterSection />
      <Cart />
    </main>
  );
};

export default Index;
