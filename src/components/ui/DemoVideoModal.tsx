import React, { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

interface DemoVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * DemoVideoModal
 * A reusable modal for displaying a video in a lightbox overlay.
 *
 * Props:
 * - isOpen: Controls visibility
 * - onClose: Called when modal should close (overlay or close button)
 */
// const YOUTUBE_URL = "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"; // Placeholder video
const LOCAL_DEMO_VIDEO = "/AI_Video_Demo_ADmyBRAND_Suite.mp4";

export const DemoVideoModal: React.FC<DemoVideoModalProps> = ({ isOpen, onClose }) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  // Close if user clicks directly on the overlay (not modal content)
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={overlayRef}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md"
          aria-modal="true"
          role="dialog"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleOverlayClick}
        >
          <motion.div
            className="relative w-full max-w-3xl mx-4 bg-white/10 rounded-2xl shadow-xl overflow-hidden"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Close Button */}
            <button
              aria-label="Close demo video"
              className="absolute top-4 right-4 z-10 rounded-full p-2 bg-white/50 hover:bg-white/80 backdrop-blur-sm transition"
              onClick={onClose}
            >
              <X className="w-6 h-6 text-black" />
            </button>
            {/* Video */}
            <div className="w-full aspect-video rounded-xl overflow-hidden bg-black">
              <video
                src={LOCAL_DEMO_VIDEO}
                controls
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
                title="ADmyBRAND AI Suite Demo Video"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DemoVideoModal;
