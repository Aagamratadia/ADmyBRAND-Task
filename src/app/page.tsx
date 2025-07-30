import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import Pricing from "@/components/sections/Pricing";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/sections/Footer";
import ContactSection from "@/components/sections/ContactSection";
import { ScrollLinkedVerticalLine } from "@/components/ui/ScrollLinkedVerticalLine";
import TestimonialsCarousel from "@/components/sections/TestimonialsCarousel";
import FaqSection from "@/components/sections/FaqSection";

export default function Home() {
  return (
    <>
      <main className="flex flex-col min-h-screen w-full bg-background">
        <div className="my-1 md:my-0"><Hero /></div>
        <ScrollLinkedVerticalLine startTrigger="#features" endTrigger="#faq" />
        <div className="my-1 md:my-0"><Features /></div>
        <div className="my-1 md:my-0"><Pricing /></div>
        <div className="my-1 md:my-0"><CTA /></div>
        <div className="my-1 md:my-0"><TestimonialsCarousel /></div>
        <div className="my-1 md:my-0"><FaqSection /></div>
        <Footer />
      </main>
    </>
  );
}
