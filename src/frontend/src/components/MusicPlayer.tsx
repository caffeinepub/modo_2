import { ChevronDown, Music2, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function MusicPlayer() {
  const [isVisible, setIsVisible] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);

  if (!isVisible) {
    return (
      <motion.button
        type="button"
        data-ocid="music_player.open_modal_button"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-2xl ring-2 ring-primary/40"
        onClick={() => setIsVisible(true)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        title="Open music player"
      >
        <Music2 className="h-6 w-6" />
      </motion.button>
    );
  }

  return (
    <motion.div
      data-ocid="music_player.panel"
      className="fixed bottom-6 right-6 z-50 overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10"
      style={{ background: "oklch(0.14 0.01 260)" }}
      initial={{ scale: 0.8, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 28 }}
    >
      {/* Header bar */}
      <div
        className="flex items-center justify-between px-3 py-2"
        style={{ background: "oklch(0.18 0.015 260)" }}
      >
        <div className="flex items-center gap-2">
          <Music2 className="h-4 w-4 text-primary" />
          <span className="text-xs font-semibold tracking-wide text-white/80">
            Now Playing
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            data-ocid="music_player.toggle"
            onClick={() => setIsMinimized((p) => !p)}
            className="flex h-6 w-6 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white"
            title={isMinimized ? "Expand player" : "Minimize player"}
          >
            <motion.span
              animate={{ rotate: isMinimized ? 180 : 0 }}
              transition={{ duration: 0.25 }}
              className="flex"
            >
              <ChevronDown className="h-4 w-4" />
            </motion.span>
          </button>
          <button
            type="button"
            data-ocid="music_player.close_button"
            onClick={() => setIsVisible(false)}
            className="flex h-6 w-6 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white"
            title="Close player"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* YouTube iframe */}
      <AnimatePresence initial={false}>
        {!isMinimized && (
          <motion.div
            key="iframe-wrapper"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 158, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <iframe
              data-ocid="music_player.canvas_target"
              width="280"
              height="158"
              src="https://www.youtube.com/embed/l_gQLv002NQ?autoplay=1&loop=1&playlist=l_gQLv002NQ"
              title="MODO Music Player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ display: "block", border: "none" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
