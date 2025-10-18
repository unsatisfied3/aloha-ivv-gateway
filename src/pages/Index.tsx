import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Workflow } from "@/components/Workflow";
import { Features } from "@/components/Features";
import { SearchPreview } from "@/components/SearchPreview";
import { PortalTiles } from "@/components/PortalTiles";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Workflow />
        <Features />
        <SearchPreview />
        <PortalTiles />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
