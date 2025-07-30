'use client';
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import DemoVideoModal from "@/components/ui/DemoVideoModal";
import { InteractiveGlowBackground } from "@/components/ui/interactive-glow-background";
import DarkVeil from "@/components/DarkVeil";
import { ArrowRight, Sparkles, Zap } from "lucide-react";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-dashboard.jpg";
import { useState, useRef } from "react";

const Hero = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Modal state for this page (optional, for SSR or direct modal open)
  const [showDemoModal, setShowDemoModal] = useState(false);
  const router = useRouter();

  // Open modal and navigate to /pricing-demo with modal open param
  const handleWatchDemo = () => {
    router.push("/pricing-demo?demo=1");
  };

  // Optionally, close modal and remove query param (if modal is shown here)
  const handleCloseDemo = () => {
    setShowDemoModal(false);
    router.replace("/pricing-demo", undefined);
  };


  const handleMouseMove = (e: React.MouseEvent) => {
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-accent/10 p-0 m-0"
      style={{marginTop: 0, paddingTop: 0}}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Interactive Glow Background */}
      <InteractiveGlowBackground 
        intensity={0.5}
        glowSize={1000}
        glowColor="#9333ea"
        springConfig={{
          stiffness: 100,
          damping: 30,
          mass: 0.3
        }}
        mousePosition={mousePos}
        isHovered={isHovered}
      />
      
      {/* DarkVeil True Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <DarkVeil />
      </div>
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(var(--primary)/0.1)_0%,_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(var(--secondary)/0.1)_0%,_transparent_50%)]" />
      
      <div className="container relative z-10 px-6 py-24 pt-40">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-foreground via-primary to-secondary bg-clip-text text-transparent">
                  Transform Your Brand
                </span>
                <br />
                <span className="text-foreground">with AI Suite</span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
                Revolutionize your brand management with our comprehensive AI-powered platform. 
                From strategy to execution, let artificial intelligence amplify your brand's potential.
              </p>
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button variant="primary" size="lg" className="group">
                Start Free Trial
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button variant="secondary" size="lg" className="group" onClick={handleWatchDemo}>
                <Zap className="w-5 h-5" />
                Watch Demo
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="grid grid-cols-3 gap-8 pt-8 border-t border-border/50"
            >
              <div>
                <div className="text-2xl font-bold text-primary">50K+</div>
                <div className="text-sm text-muted-foreground">Active Brands</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-secondary">99.9%</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">4.9★</div>
                <div className="text-sm text-muted-foreground">Rating</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-elegant">
              <img
                src={heroImage.src}
                alt="ADmyBRAND AI Suite Dashboard"
                className="w-full h-auto object-cover"
              />
              
              {/* Overlay Effects */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-secondary/20" />
              
              {/* Floating Elements */}
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 1, 0]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-8 right-8 bg-card/90 backdrop-blur-sm border border-border rounded-lg p-4 shadow-elegant"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                  <span className="text-sm font-medium">AI Active</span>
                </div>
              </motion.div>

              <motion.div
                animate={{ 
                  y: [0, 10, 0],
                  rotate: [0, -1, 0]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
                className="absolute bottom-8 left-8 bg-card/90 backdrop-blur-sm border border-border rounded-lg p-4 shadow-elegant"
              >
                <div className="text-xs text-muted-foreground">Brand Score</div>
                <div className="text-2xl font-bold text-primary">98.5</div>
              </motion.div>
            </div>

            {/* Glow Effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-primary opacity-20 blur-3xl -z-10" />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-primary rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;