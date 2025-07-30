"use client";
import React, { useState } from "react";
import DarkVeil from "@/components/DarkVeil";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import clsx from "clsx";

// Pricing plan configuration
const PLANS = [
  {
    name: "Starter",
    description: "Perfect for small teams starting out.",
    basePrice: 29,
    perClientCost: 2,
    features: [
      "Up to 3 team members",
      "Basic analytics",
      "Email support",
      "Community access",
    ],
    highlight: false,
  },
  {
    name: "Pro",
    description: "For growing agencies and businesses.",
    basePrice: 79,
    perClientCost: 1.5,
    features: [
      "Up to 10 team members",
      "Advanced analytics",
      "Priority support",
      "AI-powered suggestions",
    ],
    highlight: true, // Most popular
  },
  {
    name: "Enterprise",
    description: "For large-scale operations and enterprises.",
    basePrice: 199,
    perClientCost: 1,
    features: [
      "Unlimited team members",
      "Custom integrations",
      "Dedicated manager",
      "24/7 premium support",
    ],
    highlight: false,
  },
];

// Price calculation function
function calculatePrice(base: number, perClient: number, clientAccounts: number) {
  return Math.round(base + perClient * clientAccounts);
}

// Custom slider component
const CustomSlider = ({
  min,
  max,
  value,
  onChange,
}: {
  min: number;
  max: number;
  value: number;
  onChange: (val: number) => void;
}) => {
  // Calculate thumb position as a percentage
  const percent = ((value - min) / (max - min)) * 100;

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <div className="w-full relative h-12 flex items-center">
        {/* Track */}
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-2 rounded-full bg-gradient-to-r from-primary/30 via-secondary/30 to-primary/30 shadow-inner" />
        {/* Range fill */}
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-2 rounded-full bg-primary/70 transition-all"
          style={{ width: `${percent}%` }}
        />
        {/* Thumb */}
        <div
          className={clsx(
            "absolute top-1/2 -translate-y-1/2 z-10 cursor-pointer",
            "transition-shadow",
          )}
          style={{ left: `calc(${percent}% - 20px)` }}
        >
          <motion.div
            whileHover={{ scale: 1.15, boxShadow: "0 0 0 8px #a78bfa33" }}
            whileTap={{ scale: 1.1, boxShadow: "0 0 0 16px #a78bfa55" }}
            className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full border-4 border-white/10 shadow-lg flex items-center justify-center"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0}
            style={{ touchAction: "none" }}
            tabIndex={0}
            aria-valuenow={value}
            aria-valuemin={min}
            aria-valuemax={max}
            role="slider"
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft" && value > min) onChange(value - 1);
              if (e.key === "ArrowRight" && value < max) onChange(value + 1);
            }}
          >
            {/* Tooltip above thumb */}
            <motion.div
              key={value}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 10, opacity: 0 }}
              className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-background/90 shadow text-sm font-medium text-primary"
            >
              {value}
            </motion.div>
            {/* Thumb inner circle */}
            <div className="w-4 h-4 bg-white/80 rounded-full" />
          </motion.div>
        </div>
        {/* Invisible input for accessibility and drag */}
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute left-0 right-0 top-0 w-full h-12 opacity-0 cursor-pointer"
          style={{ zIndex: 20 }}
          aria-label="Number of Client Accounts"
        />
        {/* Min/Max labels */}
        <span className="absolute left-0 top-full mt-2 text-xs text-muted-foreground">{min}</span>
        <span className="absolute right-0 top-full mt-2 text-xs text-muted-foreground">{max}</span>
      </div>
      <div className="text-sm text-muted-foreground font-medium">
        Number of Client Accounts
      </div>
    </div>
  );
};

// Slot-machine price animation
const AnimatedPrice = ({ price }: { price: number }) => (
  <AnimatePresence mode="wait" initial={false}>
    <motion.div
      key={price}
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 24, opacity: 0 }}
      transition={{ duration: 0.25, ease: "circOut" }}
      className="inline-block"
    >
      ${price}
    </motion.div>
  </AnimatePresence>
);

export default function InteractivePricingSection() {
  const [clientAccounts, setClientAccounts] = useState(10);

  return (
    <section
      id="pricing"
      className="relative py-24 px-4 bg-gradient-to-br from-background via-background to-accent/10 overflow-hidden"
    >
      {/* DarkVeil Animated Background */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <DarkVeil />
      </div>
      <div className="relative z-10 pt-10">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <h2 className="text-4xl lg:text-5xl font-bold text-center mb-4">
          Flexible Pricing for Every Team
        </h2>
        <p className="max-w-2xl text-center text-lg text-muted-foreground mb-10">
          Instantly calculate your personalized price. Move the slider to select the number of client accounts you need—see your plan update in real time!
        </p>
        {/* Slider */}
        <div className="w-full max-w-xl mb-12">
          <CustomSlider
            min={1}
            max={50}
            value={clientAccounts}
            onChange={setClientAccounts}
          />
        </div>
        {/* Pricing Cards */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
          {PLANS.map((plan, idx) => {
            const price = calculatePrice(
              plan.basePrice,
              plan.perClientCost,
              clientAccounts
            );
            return (
              <div
                key={plan.name}
                className={clsx(
                  "relative rounded-2xl p-8 flex flex-col items-center shadow-xl transition-all",
                  "bg-white/10 backdrop-blur-lg border border-white/10",
                  plan.highlight
                    ? "border-2 border-primary/60 shadow-glow-primary ring-2 ring-primary/40"
                    : "",
                  "hover:scale-[1.025] hover:shadow-2xl",
                  "duration-300"
                )}
                style={{
                  ...(plan.highlight
                    ? {
                        boxShadow:
                          "0 0 32px 4px rgba(139,92,246,0.25), 0 4px 32px 0 rgba(0,0,0,0.08)",
                      }
                    : {}),
                }}
              >
                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-white text-xs font-bold rounded-full shadow-glow-primary mb-2 border border-white/10 z-10">
                    Most Popular
                  </div>
                )}
                <div className="text-2xl font-bold mb-2 text-primary">{plan.name}</div>
                <div className="text-sm text-muted-foreground mb-4 text-center">
                  {plan.description}
                </div>
                <div className="mb-6">
                  <span className="text-4xl font-extrabold tracking-tight text-white">
                    <AnimatedPrice price={price} />
                  </span>
                  <span className="text-muted-foreground text-base font-medium ml-1">
                    /mo
                  </span>
                </div>
                <ul className="flex-1 flex flex-col gap-3 mb-6 w-full">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-white/90">
                      <Check className="w-4 h-4 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  className={clsx(
                    "mt-auto w-full py-3 rounded-lg font-semibold transition-all",
                    plan.highlight
                      ? "bg-primary text-white shadow-glow-primary hover:bg-primary/90"
                      : "bg-white/20 text-primary hover:bg-white/30"
                  )}
                >
                  {plan.highlight ? "Start Pro Trial" : "Get Started"}
                </button>
              </div>
            );
          })}
        </div>
      </div>
      </div>
    </section>
  );
}