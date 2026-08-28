import { useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { CreditCard, RotateCw, X } from "lucide-react";
import { media } from "../data/media";

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export default function BusinessCard() {
  const [open, setOpen] = useState(false);
  const dragState = useRef<{ x: number; y: number; rotateX: number; rotateY: number } | null>(null);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 260, damping: 22, mass: 0.7 });
  const springY = useSpring(rotateY, { stiffness: 260, damping: 22, mass: 0.7 });

  const handlePointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    dragState.current = { x: e.clientX, y: e.clientY, rotateX: rotateX.get(), rotateY: rotateY.get() };
  };

  const handlePointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragState.current) return;
    const dx = e.clientX - dragState.current.x;
    const dy = e.clientY - dragState.current.y;
    rotateY.set(dragState.current.rotateY + dx * 0.5);
    rotateX.set(clamp(dragState.current.rotateX - dy * 0.4, -35, 35));
  };

  const settle = () => {
    if (!dragState.current) return;
    dragState.current = null;
    rotateX.set(0);
    rotateY.set(Math.round(rotateY.get() / 180) * 180);
  };

  const flip = () => {
    rotateX.set(0);
    rotateY.set(Math.round(rotateY.get() / 180) * 180 + 180);
  };

  return (
    <div className="flex flex-col items-center">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group relative inline-flex items-center gap-3 border border-summit-gold/60 px-8 py-4 text-xs font-medium uppercase tracking-[0.18em] text-summit-ivory transition-colors duration-300 hover:border-summit-gold hover:bg-summit-gold/10"
      >
        <CreditCard className="h-4 w-4 text-summit-gold" aria-hidden="true" />
        Get My Card
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[70] flex flex-col items-center justify-center gap-8 bg-summit-black/90 px-6 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Digital business card"
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-6 top-6 p-2 text-summit-ivory transition-colors hover:text-summit-gold"
              aria-label="Close card"
            >
              <X className="h-6 w-6" />
            </button>

            <div
              className="w-full max-w-md select-none touch-none"
              style={{ perspective: 1600 }}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={settle}
              onPointerCancel={settle}
            >
              <motion.div
                className="relative aspect-[16/9] w-full cursor-grab active:cursor-grabbing"
                style={{
                  transformStyle: "preserve-3d",
                  rotateX: springX,
                  rotateY: springY,
                }}
              >
                <img
                  src={media.businessCardFront}
                  alt="Summit Management Consultancy business card — front"
                  draggable={false}
                  className="absolute inset-0 h-full w-full rounded-xl object-cover shadow-[0_20px_60px_-10px_rgba(0,0,0,0.7)]"
                  style={{ backfaceVisibility: "hidden" }}
                />
                <img
                  src={media.businessCardBack}
                  alt="Summit Management Consultancy business card — back, with contact details for Soukeina Awdeh, Managing Director"
                  draggable={false}
                  className="absolute inset-0 h-full w-full rounded-xl object-cover shadow-[0_20px_60px_-10px_rgba(0,0,0,0.7)]"
                  style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                />
              </motion.div>
            </div>

            <div className="flex flex-col items-center gap-4">
              <p className="text-xs uppercase tracking-[0.2em] text-summit-mute">
                Drag the card to turn it around
              </p>
              <button
                type="button"
                onClick={flip}
                className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-summit-gold transition-colors hover:text-summit-gold-soft"
              >
                <RotateCw className="h-4 w-4" aria-hidden="true" />
                Flip card
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
