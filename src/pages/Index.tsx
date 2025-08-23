import Header from "@/components/Header";
import Partners from "@/components/Partners";
import HowItWorks from "@/components/HowItWorks";
import EarlyAccess from "@/components/EarlyAccess";
import Tokenomics from "@/components/Tokenomics";
import Roadmap from "@/components/Roadmap";
import Footer from "@/components/Footer";
import FAQPage from "@/components/Faq";

const Index = () => {
  return (
    <div className="min-h-screen bg-transparent">
      <Header />
      <Partners />
      <HowItWorks />
      <EarlyAccess />
      <Tokenomics />
      <Roadmap />
      <FAQPage />
      <Footer />
    </div>
  );
};

export default Index;
