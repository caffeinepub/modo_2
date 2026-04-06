import { ArrowRight, ShoppingBag } from "lucide-react";
import { motion } from "motion/react";

export default function HeroSection() {
  return (
    <section
      id="shop"
      className="relative min-h-[680px] overflow-hidden rounded-lg lg:min-h-[800px]"
    >
      {/* Hero image */}
      <img
        src="/assets/generated/hero-banner.dim_1400x700.jpg"
        alt="MODO — Premium Menswear"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex h-full min-h-[680px] flex-col justify-end p-8 lg:min-h-[800px] lg:p-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {/* Mega Sale badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-5 inline-flex items-center gap-2"
          >
            <span
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-widest text-white"
              style={{
                background:
                  "linear-gradient(90deg, oklch(0.5 0.23 27) 0%, oklch(0.62 0.22 45) 100%)",
                boxShadow:
                  "0 0 18px oklch(0.5 0.23 27 / 0.7), 0 0 40px oklch(0.58 0.22 35 / 0.35)",
              }}
            >
              🔥 MEGA SALE • 50% OFF
            </span>
          </motion.div>

          <p className="mb-3 text-xs font-semibold tracking-[0.3em] text-white/60">
            FOUNDED BY YASH JAISWAL
          </p>
          <h1 className="mb-2 font-display text-4xl font-extrabold uppercase leading-[1.05] tracking-tight text-white lg:text-5xl xl:text-6xl">
            The Modern
            <br />
            Essentials.
          </h1>
          <p className="mb-8 font-display text-lg font-semibold uppercase tracking-widest text-white/70 lg:text-xl">
            Premium Menswear + Gadgets
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#featured"
              className="inline-flex items-center gap-2 rounded-md bg-white px-6 py-3 text-sm font-bold uppercase tracking-widest text-black transition-all hover:bg-white/90 hover:gap-3"
              data-ocid="hero.primary_button"
            >
              Shop Now <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#featured"
              className="inline-flex items-center gap-2 rounded-md border border-white/50 bg-white/10 px-6 py-3 text-sm font-bold uppercase tracking-widest text-white backdrop-blur-sm transition-all hover:border-white/80 hover:bg-white/20"
              data-ocid="hero.secondary_button"
            >
              <ShoppingBag className="h-4 w-4" />
              View Sale Items
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
