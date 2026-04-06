import { Play } from "lucide-react";
import { motion } from "motion/react";

export default function VideoSection() {
  // YouTube Shorts video ID extracted from: https://youtube.com/shorts/m3HponmXv0o
  const videoId = "m3HponmXv0o";
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&modestbranding=1`;

  return (
    <motion.section
      id="video"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="mt-8"
    >
      {/* Section Header */}
      <div className="mb-5 flex items-center gap-3">
        <span
          className="flex h-8 w-8 items-center justify-center rounded-full"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.5 0.23 27) 0%, oklch(0.62 0.22 45) 100%)",
          }}
        >
          <Play className="h-4 w-4 fill-white text-white" />
        </span>
        <h2 className="font-display text-lg font-extrabold uppercase tracking-[0.15em] text-foreground">
          WATCH NOW
        </h2>
      </div>

      {/* Video Container — portrait (Shorts ratio 9:16) */}
      <div
        className="overflow-hidden rounded-xl border border-border"
        style={{
          background: "oklch(0.1 0.01 27)",
          boxShadow:
            "0 0 32px oklch(0.5 0.23 27 / 0.25), 0 4px 24px rgba(0,0,0,0.5)",
        }}
      >
        {/* Shorts badge */}
        <div
          className="flex items-center justify-between px-4 py-2.5"
          style={{ borderBottom: "1px solid oklch(0.18 0.02 27)" }}
        >
          <span className="text-xs font-semibold tracking-[0.15em] text-white/50 uppercase">
            MODO Shorts
          </span>
          <span
            className="rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-white"
            style={{
              background:
                "linear-gradient(90deg, oklch(0.5 0.23 27) 0%, oklch(0.62 0.22 45) 100%)",
            }}
          >
            🔥 TRENDING
          </span>
        </div>

        {/* Shorts aspect ratio wrapper: 9:16 */}
        <div className="relative mx-auto" style={{ maxWidth: "360px" }}>
          <div style={{ paddingBottom: "177.78%", position: "relative" }}>
            <iframe
              src={embedUrl}
              title="MODO YouTube Shorts Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
              style={{ border: "none" }}
            />
          </div>
        </div>

        {/* Footer bar */}
        <div className="px-4 py-3 text-center">
          <p className="text-xs text-white/40 tracking-wider">
            by{" "}
            <span
              className="font-bold"
              style={{ color: "oklch(0.72 0.22 45)" }}
            >
              YASH JAISWAL
            </span>{" "}
            · MODO
          </p>
        </div>
      </div>
    </motion.section>
  );
}
