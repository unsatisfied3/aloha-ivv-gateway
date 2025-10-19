import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Workflow } from "@/components/Workflow";
import { SearchPreview } from "@/components/SearchPreview";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Workflow />
        <SearchPreview />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
