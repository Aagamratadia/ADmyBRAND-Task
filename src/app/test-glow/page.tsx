'use client';

import { InteractiveGlowBackground } from "@/components/ui/interactive-glow-background";

export default function TestGlowPage() {
  return (
    <div className="min-h-screen bg-black relative flex items-center justify-center">
      <InteractiveGlowBackground 
        intensity={0.6}
        glowSize={600}
        glowColor="#9333ea"
        springConfig={{
          stiffness: 100,
          damping: 20,
          mass: 0.1
        }}
      />
      
      <div className="relative z-10 text-center">
        <h1 className="text-4xl font-bold text-white mb-4">
          Test Interactive Glow
        </h1>
        <p className="text-gray-300">
          Move your mouse around to see the glow effect
        </p>
      </div>
    </div>
  );
}
