'use client';

import React, { useRef, useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { motion, useInView } from 'framer-motion';

// --- TYPE DEFINITION ---
type Testimonial = {
  quote: string;
  name: string;
  title: string;
  company: string;
  image: string;
};

// --- PLACEHOLDER CONTENT ---
const testimonials: Testimonial[] = [
  {
    quote: "ADmyBRAND's AI completely transformed our campaign strategy. The insights are second to none, leading to a 200% increase in our client's ROI.",
    name: 'Sarah Johnson',
    title: 'CEO',
    company: 'GrowthLeap',
    image: 'https://placehold.co/100x100/EFEFEF/333?text=SJ',
  },
  {
    quote: "The automated campaign generation is a game-changer. What used to take days now takes minutes, freeing up our team to focus on creative execution.",
    name: 'Michael Chen',
    title: 'Marketing Director',
    company: 'Innovate Digital',
    image: 'https://placehold.co/100x100/E0F2FE/333?text=MC',
  },
  {
    quote: 'The user interface is incredibly intuitive and beautiful. It makes data analysis not just easy, but enjoyable. Our team adopted it instantly.',
    name: 'Jessica Rodriguez',
    title: 'Head of Analytics',
    company: 'DataDriven Inc.',
    image: 'https://placehold.co/100x100/FBCFE8/333?text=JR',
  },
  {
    quote: 'As a large agency, the ability to manage dozens of client accounts seamlessly is critical. ADmyBRAND AI Suite scales with our needs perfectly.',
    name: 'David Lee',
    title: 'Partner',
    company: 'ScaleUp Agency',
    image: 'https://placehold.co/100x100/D1FAE5/333?text=DL',
  },
  {
    quote: "The competitor tracking feature gave us the edge we needed. We can now anticipate market shifts and react proactively, keeping our clients ahead.",
    name: 'Emily White',
    title: 'Strategy Lead',
    company: 'MarketMinds',
    image: 'https://placehold.co/100x100/FEF9C3/333?text=EW',
  },
];

// --- MAIN COMPONENT ---
export default function TestimonialsCarousel() {
  // Embla Carousel setup with Autoplay plugin
  // It pauses on hover (stopOnMouseEnter) and resumes on leave
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start' }, 
    [Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true })]
  );
  
  // Framer Motion setup for entrance animation
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section 
      ref={sectionRef}
      className="py-20 sm:py-28 bg-gradient-to-b from-background to-accent/5"
    >
      <motion.div 
        className="container mx-auto px-4"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-2 text-white">
            <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">Trusted</span> by Agencies That Matter
          </h2>
          <p className="mt-4 text-lg text-neutral-400">
            Our AI-powered suite is the secret weapon for top-tier marketing and brand agencies worldwide.
          </p>
        </div>

        {/* Carousel */}
        <div className="overflow-hidden cursor-grab" ref={emblaRef}>
          <div className="flex">
            {/* We map the testimonials array twice for a seamless infinite loop effect */}
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <div 
                key={index} 
                className="flex-[0_0_90%] sm:flex-[0_0_50%] md:flex-[0_0_40%] lg:flex-[0_0_33.33%] min-w-0 pl-6"
              >
                <div className="h-full flex flex-col justify-between p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg">
                  <blockquote className="text-neutral-200 text-lg italic">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="mt-6 flex items-center gap-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-purple-400/50"
                    />
                    <div>
                      <p className="font-semibold text-white">{testimonial.name}</p>
                      <p className="text-sm text-neutral-400">
                        {testimonial.title}, {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}