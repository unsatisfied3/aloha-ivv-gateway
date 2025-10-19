import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Workflow } from "@/components/Workflow";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Workflow />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
