'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';

// --- TYPE & DATA DEFINITIONS ---
type FaqItemType = {
  question: string;
  answer: string;
};

const faqData: FaqItemType[] = [
  {
    question: 'What is the ADmyBRAND AI Suite?',
    answer:
      'The ADmyBRAND AI Suite is a comprehensive platform that uses artificial intelligence to streamline and enhance your brand management. It offers tools for brand analysis, campaign generation, competitor tracking, and reporting, all powered by our advanced AI models.',
  },
  {
    question: 'Who is this platform for?',
    answer:
      'Our platform is designed for marketing teams, brand managers, and agencies of all sizes. Whether you are a small startup looking to make your mark or a large enterprise managing multiple brands, our scalable solution can be tailored to your specific needs.',
  },
  {
    question: 'Can I integrate the suite with my existing tools?',
    answer:
      'Yes! Our Enterprise plan includes full API access and support for custom integrations. You can connect the ADmyBRAND AI Suite with your favorite CRM, analytics software, social media management tools, and more to create a seamless workflow.',
  },
  {
    question: 'How does the AI-powered campaign generation work?',
    answer:
      'Our AI analyzes your brand identity, target audience, and current market trends to automatically generate high-quality ad copy, visuals, and campaign strategies. It provides multiple creative options that you can then review, edit, and deploy in minutes.',
  },
  {
    question: 'What kind of support do you offer?',
    answer:
      'We offer tiered support based on your plan. All customers receive email support. Our Pro plan includes priority support, and our Enterprise plan comes with a dedicated account manager and 24/7 premium support to ensure you get the most out of our platform.',
  },
];

// --- Animated Plus/Minus Icon Sub-Component ---
const AnimatedIcon = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <motion.div
      className="relative h-5 w-5"
      animate={{ rotate: isOpen ? 180 : 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <span className="absolute h-0.5 w-full bg-current top-1/2 -translate-y-1/2" />
      <motion.span
        className="absolute w-0.5 h-full bg-current left-1/2 -translate-x-1/2"
        animate={{ scaleY: isOpen ? 0 : 1 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      />
    </motion.div>
  );
};


// --- FAQ Item Sub-Component ---
const FaqItem = ({
  item,
  index,
  expandedIndex,
  setExpandedIndex,
}: {
  item: FaqItemType;
  index: number;
  expandedIndex: number | null;
  setExpandedIndex: (index: number | null) => void;
}) => {
  const isOpen = index === expandedIndex;

  const handleClick = () => {
    setExpandedIndex(isOpen ? null : index);
  };

  return (
    <div
      className={clsx(
        'border-b transition-colors duration-300',
        isOpen ? 'border-purple-400/30' : 'border-neutral-800'
      )}
    >
      <button
        onClick={handleClick}
        className="flex w-full items-center justify-between py-6 text-left"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
      >
        <span className={clsx(
          "text-lg font-medium transition-colors duration-300",
          isOpen ? 'text-purple-400' : 'text-white'
        )}>
          {item.question}
        </span>
        <AnimatedIcon isOpen={isOpen} />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.section
            key="content"
            id={`faq-answer-${index}`}
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: 'auto' },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-neutral-400">{item.answer}</p>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- MAIN COMPONENT ---
export default function FaqSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0); // Start with the first item open

  return (
    <section className="py-20 sm:py-28 bg-gradient-to-b from-background to-accent/5">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-2">
              <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                Frequently Asked Questions
              </span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Have questions? We have answers. If you can't find what you're looking for, feel free to contact us.
            </p>
          </div>
          <div className="divide-y divide-border rounded-2xl overflow-hidden">
            {faqData.map((item, index) => (
              <FaqItem
                key={index}
                item={item}
                index={index}
                expandedIndex={expandedIndex}
                setExpandedIndex={setExpandedIndex}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}