import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

export default function LookbookTile() {
  return (
    <motion.section
      id="lookbook"
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-lg border border-border"
      style={{ minHeight: "180px" }}
    >
      <img
        src="/assets/generated/lookbook-summer.dim_600x400.jpg"
        alt="Summer Lookbook 2026"
        className="absolute inset-0 h-full w-full object-cover object-top"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.2) 100%)",
        }}
      />
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <p className="text-xs font-semibold tracking-[0.2em] text-white/60">
          LOOKBOOK 2026
        </p>
        <h3 className="mt-1 font-display text-xl font-extrabold uppercase tracking-tight text-white">
          Summer Essentials
        </h3>
        <a
          href="#lookbook"
          className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest text-white/80 transition-colors hover:text-white"
          data-ocid="lookbook.link"
        >
          Explore <ArrowRight className="h-3 w-3" />
        </a>
      </div>
    </motion.section>
  );
}
