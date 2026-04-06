import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const testimonials = [
  {
    id: 1,
    quote:
      "MODO has completely transformed my wardrobe. The quality of the tees is unmatched — supple fabric, perfect cut. This is what premium menswear should feel like.",
    author: "Arjun M.",
    role: "Creative Director",
  },
  {
    id: 2,
    quote:
      "Ordered the Slim Dark Jeans and the Pro Headphones together. Both arrived in perfect condition. The headphones are the best I’ve owned at this price. MODO gets it.",
    author: "Dhruv K.",
    role: "Product Designer",
  },
  {
    id: 3,
    quote:
      "Finally a store that treats men’s fashion seriously. The curation is excellent — every item feels intentional. The smart watch I got is a conversation starter everywhere I go.",
    author: "Vikram S.",
    role: "Tech Entrepreneur",
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const prev = () =>
    setActive((p) => (p - 1 + testimonials.length) % testimonials.length);
  const next = () => setActive((p) => (p + 1) % testimonials.length);
  const current = testimonials[active];

  return (
    <section className="rounded-lg border border-border bg-card p-5">
      <h2 className="mb-4 font-display text-sm font-extrabold uppercase tracking-[0.15em] text-foreground">
        What They Say
      </h2>

      <div className="relative overflow-hidden" style={{ minHeight: "120px" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-sm leading-relaxed text-muted-foreground">
              &ldquo;{current.quote}&rdquo;
            </p>
            <div className="mt-3">
              <p className="text-sm font-semibold text-foreground">
                {current.author}
              </p>
              <p className="text-xs text-muted-foreground">{current.role}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-4 flex items-center justify-between">
        {/* Dot indicators */}
        <div className="flex items-center gap-2">
          {testimonials.map((t, i) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Testimonial ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === active
                  ? "w-5 bg-foreground"
                  : "w-1.5 bg-muted-foreground/40 hover:bg-muted-foreground/60"
              }`}
              data-ocid="testimonials.toggle"
            />
          ))}
        </div>

        {/* Arrow controls */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous testimonial"
            className="rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground"
            data-ocid="testimonials.button"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next testimonial"
            className="rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground"
            data-ocid="testimonials.button"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
