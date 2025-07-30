import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionItemProps {
  trigger: React.ReactNode;
  content: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
}

const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ trigger, content, isOpen, onToggle, className }, ref) => (
    <div ref={ref} className={cn("border-b border-border", className)}>
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180"
        data-state={isOpen ? "open" : "closed"}
      >
        {trigger}
        <ChevronDown 
          className={cn(
            "h-4 w-4 shrink-0 transition-transform duration-200",
            isOpen && "rotate-180"
          )} 
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-4 pt-0 text-sm">
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
);

AccordionItem.displayName = "AccordionItem";

interface AccordionProps {
  items: Array<{
    trigger: React.ReactNode;
    content: React.ReactNode;
  }>;
  type?: "single" | "multiple";
  className?: string;
}

const FramerAccordion = ({ items, type = "single", className }: AccordionProps) => {
  const [openItems, setOpenItems] = React.useState<Set<number>>(new Set());

  const handleToggle = (index: number) => {
    if (type === "single") {
      setOpenItems(openItems.has(index) ? new Set() : new Set([index]));
    } else {
      const newOpenItems = new Set(openItems);
      if (newOpenItems.has(index)) {
        newOpenItems.delete(index);
      } else {
        newOpenItems.add(index);
      }
      setOpenItems(newOpenItems);
    }
  };

  return (
    <div className={className}>
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          trigger={item.trigger}
          content={item.content}
          isOpen={openItems.has(index)}
          onToggle={() => handleToggle(index)}
        />
      ))}
    </div>
  );
};

export { FramerAccordion, AccordionItem };