"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugin safely
if (typeof window !== "undefined" && gsap.core && !gsap.core.globals().ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollLinkedVerticalLineProps {
  /**
   * The selector or element for the Features section (start)
   * @default '#features'
   */
  startTrigger?: string;
  /**
   * The selector or element for the FAQ section (end)
   * @default '#faq'
   */
  endTrigger?: string;
  /**
   * Height of the SVG path in px (should be >= the distance between start and end triggers)
   * @default 1000
   */
  height?: number;
  /**
   * Tailwind/CSS classes for positioning
   */
  className?: string;
}

export const ScrollLinkedVerticalLine = ({
  startTrigger = "#features",
  endTrigger = "#faq",
  height = 1000,
  className = "fixed left-8 top-32 z-20 h-[70vh] md:h-[80vh] w-4",
}: ScrollLinkedVerticalLineProps) => {
  const pathRef = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const pathLength = path.getTotalLength();
    path.setAttribute("stroke-dasharray", pathLength.toString());
    path.setAttribute("stroke-dashoffset", pathLength.toString());

    const trigger = ScrollTrigger.create({
      trigger: startTrigger,
      start: "top center+=100",
      endTrigger: endTrigger,
      end: "bottom center",
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        const draw = pathLength * (1 - progress);
        path.setAttribute("stroke-dashoffset", draw.toString());
      },
    });
    return () => {
      trigger && trigger.kill();
    };
  }, [startTrigger, endTrigger, height]);

  return (
    <svg
      width="4"
      height={height}
      viewBox={`0 0 4 ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ minHeight: 400, maxHeight: "90vh" }}
      aria-hidden
    >
      <path
        ref={pathRef}
        d={`M2 0 V${height}`}
        stroke="hsl(var(--primary, 263, 70%, 50%))"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray={height}
        strokeDashoffset={height}
      />
    </svg>
  );
};
