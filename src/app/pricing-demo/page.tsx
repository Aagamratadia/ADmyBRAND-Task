"use client";
import InteractivePricingSection from "@/components/sections/InteractivePricingSection";
import DemoVideoModal from "@/components/ui/DemoVideoModal";
import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function PricingDemoPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Open modal if ?demo=1 is present
  useEffect(() => {
    if (searchParams.get("demo") === "1") {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  }, [searchParams]);

  // Remove ?demo param on close
  const handleClose = useCallback(() => {
    setIsModalOpen(false);
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.delete("demo");
    router.replace(`/pricing-demo${params.toString() ? `?${params}` : ""}`);
  }, [router, searchParams]);

  return (
    <main className="min-h-screen w-screen bg-background p-0 m-0 overflow-hidden">
      <DemoVideoModal isOpen={isModalOpen} onClose={handleClose} />
      <InteractivePricingSection />
    </main>
  );
}
