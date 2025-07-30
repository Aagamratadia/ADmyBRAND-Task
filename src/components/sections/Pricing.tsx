'use client';
import { motion } from "framer-motion";
import {Button} from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Zap, Crown, Rocket } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "$29",
    period: "/month",
    description: "Perfect for small businesses and startups",
    icon: Zap,
    features: [
      "AI Brand Analysis",
      "Basic Analytics Dashboard",
      "5 Brand Assets",
      "Email Support",
      "1 Team Member"
    ],
    buttonVariant: "secondary" as const,
    popular: false
  },
  {
    name: "Professional",
    price: "$99",
    period: "/month",
    description: "Ideal for growing brands and agencies",
    icon: Rocket,
    features: [
      "Everything in Starter",
      "Advanced AI Strategy",
      "Real-time Monitoring",
      "50 Brand Assets",
      "Priority Support",
      "10 Team Members",
      "Custom Integrations"
    ],
    buttonVariant: "primary" as const,
    popular: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large organizations with complex needs",
    icon: Crown,
    features: [
      "Everything in Professional",
      "Unlimited Brand Assets",
      "Dedicated Account Manager",
      "Custom AI Training",
      "White-label Solutions",
      "Unlimited Team Members",
      "SLA Guarantee"
    ],
    buttonVariant: "primary" as const,
    popular: false
  }
];

const Pricing = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-accent/5 to-background">
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
              Simple Pricing
            </span>
            <br />
            for Every Business
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Choose the perfect plan to accelerate your brand growth. No hidden fees, cancel anytime.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-gradient-primary text-white px-4 py-2 rounded-full text-sm font-medium shadow-primary">
                      Most Popular
                    </div>
                  </div>
                )}

                <Card className={`relative p-8 h-full transition-all duration-300 overflow-hidden ${
                  plan.popular 
                    ? 'border-primary/50 shadow-primary bg-gradient-surface' 
                    : 'border-border/50 bg-gradient-surface hover:border-primary/30'
                } group`}>
                  
                  {/* Background Glow */}
                  <div className={`absolute inset-0 ${
                    plan.popular 
                      ? 'bg-gradient-to-br from-primary/10 to-secondary/5' 
                      : 'bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100'
                  } transition-opacity duration-300`} />
                  
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className={`inline-flex p-3 rounded-xl mb-6 ${
                      plan.popular
                        ? 'bg-primary/20 text-primary'
                        : 'bg-primary/10 text-primary group-hover:bg-primary/20'
                    } transition-colors duration-300`}>
                      <Icon className="w-6 h-6" />
                    </div>

                    {/* Plan Header */}
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                      <p className="text-muted-foreground">{plan.description}</p>
                    </div>

                    {/* Price */}
                    <div className="mb-8">
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold text-primary">{plan.price}</span>
                        <span className="text-muted-foreground">{plan.period}</span>
                      </div>
                    </div>

                    {/* Features */}
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-3">
                          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                            <Check className="w-3 h-3 text-primary" />
                          </div>
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <Button 
                      variant={plan.buttonVariant} 
                      size="lg" 
                      className="w-full"
                    >
                      {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                    </Button>
                  </div>

                  {/* Hover Glow Effect */}
                  {plan.popular && (
                    <div className="absolute inset-0 rounded-lg shadow-glow-primary opacity-30 -z-10" />
                  )}
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground">
            All plans include a 14-day free trial. No credit card required.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;