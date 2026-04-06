import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function AnnouncementBanner() {
  const [visible, setVisible] = useState(true);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="relative z-50 overflow-hidden"
          data-ocid="announcement.panel"
        >
          <div
            className="relative flex items-center overflow-hidden py-2.5"
            style={{
              background:
                "linear-gradient(90deg, oklch(0.5 0.23 27) 0%, oklch(0.62 0.22 45) 40%, oklch(0.58 0.24 32) 70%, oklch(0.5 0.23 27) 100%)",
            }}
          >
            {/* Scrolling ticker text */}
            <div className="flex min-w-full flex-shrink-0 overflow-hidden pr-10">
              <motion.div
                className="flex min-w-max items-center gap-0 whitespace-nowrap"
                animate={{ x: ["-50%", "0%"] }}
                transition={{
                  duration: 18,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                  repeatType: "loop",
                }}
              >
                {/* Duplicate for seamless loop */}
                {[0, 1].map((i) => (
                  <span
                    key={i}
                    className="flex items-center gap-4 px-6 text-sm font-extrabold uppercase tracking-[0.18em] text-white drop-shadow"
                  >
                    <span className="text-base">🔥</span>
                    <span>MEGA SALE — 50% OFF ALL PRODUCTS</span>
                    <span className="text-white/70">|</span>
                    <span>USE CODE:</span>
                    <span className="rounded bg-white/20 px-2 py-0.5 font-black tracking-widest text-white">
                      MODO50
                    </span>
                    <span className="text-white/70">|</span>
                    <span>LIMITED TIME OFFER</span>
                    <span className="text-base">🔥</span>
                    <span className="mx-6 text-white/40">✦</span>
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Dismiss button */}
            <button
              type="button"
              onClick={() => setVisible(false)}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
              aria-label="Close announcement"
              data-ocid="announcement.close_button"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
