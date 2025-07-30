import Image from "next/image";
import React from "react";

export interface Logo {
  src: string;
  alt: string;
}

interface InfiniteLogoMarqueeProps {
  logos: Logo[];
  speed?: number; // seconds for one full loop
  className?: string;
}

/**
 * InfiniteLogoMarquee - horizontally scrolling, infinitely looping logo row.
 * Logos are grayscale by default, colored on hover.
 */
export const InfiniteLogoMarquee: React.FC<InfiniteLogoMarqueeProps> = ({
  logos,
  speed = 20,
  className = "",
}) => {
  // Duplicate logos for seamless infinite scroll
  const marqueeLogos = [...logos, ...logos];

  return (
    <div
      className={`relative w-full overflow-hidden py-4 ${className}`}
      aria-label="Infinite logo marquee"
    >
      <div
        className="flex w-max animate-infinite-marquee"
        style={{
          animationDuration: `${speed}s`,
        }}
      >
        {marqueeLogos.map((logo, i) => (
          <div
            key={logo.src + i}
            className="mx-8 flex-shrink-0 transition-all duration-300 grayscale hover:grayscale-0 opacity-80 hover:opacity-100"
            style={{ width: 120, height: 60 }}
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={120}
              height={60}
              className="object-contain w-full h-full"
              draggable={false}
              loading="eager"
              unoptimized={logo.src.startsWith("/")} // allow local static images
            />
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Sample usage ---
// Place this in your page or section to test:
// import { InfiniteLogoMarquee, Logo } from "@/components/ui/InfiniteLogoMarquee";
// const logos: Logo[] = [
//   { src: "/logos/google.svg", alt: "Google" },
//   { src: "/logos/meta.svg", alt: "Meta" },
//   { src: "/logos/amazon.svg", alt: "Amazon" },
//   { src: "/logos/microsoft.svg", alt: "Microsoft" },
//   { src: "/logos/adobe.svg", alt: "Adobe" },
//   { src: "/logos/shopify.svg", alt: "Shopify" },
// ];
// <InfiniteLogoMarquee logos={logos} speed={18} />
