import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Workflow } from "@/components/Workflow";
import { PublicReports } from "@/components/PublicReports";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Features />
        <Workflow />
        <PublicReports />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
