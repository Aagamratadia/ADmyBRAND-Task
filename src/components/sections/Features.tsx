'use client';
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { 
  Brain, 
  BarChart3, 
  Palette, 
  Target, 
  Zap, 
  Shield,
  Users,
  Rocket,
  Globe
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Brand Strategy",
    description: "Advanced AI algorithms analyze market trends and competitor data to create winning brand strategies.",
    color: "primary"
  },
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    description: "Get instant insights into brand performance with comprehensive analytics and reporting tools.",
    color: "secondary"
  },
  {
    icon: Palette,
    title: "Creative Suite",
    description: "AI-powered design tools that maintain brand consistency across all your creative assets.",
    color: "primary"
  },
  {
    icon: Target,
    title: "Audience Targeting",
    description: "Precisely identify and reach your ideal customers with intelligent audience segmentation.",
    color: "secondary"
  },
  {
    icon: Zap,
    title: "Automation Engine",
    description: "Streamline your brand management workflow with intelligent automation and scheduling.",
    color: "primary"
  },
  {
    icon: Shield,
    title: "Brand Protection",
    description: "Monitor and protect your brand reputation across all digital channels in real-time.",
    color: "secondary"
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Seamless collaboration tools that keep your entire brand team aligned and productive.",
    color: "primary"
  },
  {
    icon: Rocket,
    title: "Growth Optimization",
    description: "Data-driven recommendations to accelerate your brand growth and market expansion.",
    color: "secondary"
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "Scale your brand globally with localized strategies and multi-market campaign management.",
    color: "primary"
  }
];

const Features = () => {
  return (
    <section id="features" className="py-24 bg-gradient-to-b from-background to-accent/5">
      <div className="container px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              Powerful Features
            </span>
            <br />
            for Modern Brands
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Everything you need to build, manage, and scale your brand with the power of artificial intelligence.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="relative p-8 h-full bg-gradient-surface border-border/50 hover:border-primary/30 transition-all duration-300 group overflow-hidden">
                  {/* Background Glow */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${
                    feature.color === 'primary' 
                      ? 'from-primary/5 to-transparent' 
                      : 'from-secondary/5 to-transparent'
                  } opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className={`inline-flex p-3 rounded-xl mb-6 ${
                      feature.color === 'primary'
                        ? 'bg-primary/10 text-primary'
                        : 'bg-secondary/10 text-secondary'
                    } group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6" />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                      {feature.title}
                    </h3>
                    
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className={`absolute inset-0 rounded-lg ${
                      feature.color === 'primary' 
                        ? 'shadow-glow-primary' 
                        : 'shadow-glow-secondary'
                    } opacity-20`} />
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-lg text-muted-foreground mb-6">
            Ready to experience the future of brand management?
          </p>
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-primary text-white font-medium hover:shadow-glow-primary transition-all duration-300 cursor-pointer">
            <Zap className="w-5 h-5" />
            Explore All Features
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;