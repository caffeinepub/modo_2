import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

const categories = [
  {
    label: "PREMIUM TEES",
    description: "Essential cuts, superior fabric",
    image: "/assets/generated/category-tees.dim_600x400.jpg",
    href: "#tees",
    id: "tees",
  },
  {
    label: "SIGNATURE JEANS",
    description: "Crafted for the modern man",
    image: "/assets/generated/category-jeans.dim_600x400.jpg",
    href: "#jeans",
    id: "jeans",
  },
  {
    label: "ELITE GADGETS",
    description: "Technology meets style",
    image: "/assets/generated/category-gadgets.dim_600x400.jpg",
    href: "#gadgets",
    id: "gadgets",
  },
];

export default function CategoryTiles() {
  return (
    <section id="collections" className="mt-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {categories.map((cat, i) => (
          <motion.a
            key={cat.id}
            href={cat.href}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="group relative overflow-hidden rounded-lg border border-border"
            style={{ minHeight: "160px" }}
            data-ocid="categories.card"
          >
            <img
              src={cat.image}
              alt={cat.label}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.25) 100%)",
              }}
            />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <p className="font-display text-sm font-extrabold uppercase tracking-[0.18em] text-white">
                {cat.label}
              </p>
              <p className="mt-0.5 flex items-center gap-1 text-xs text-white/60 transition-all group-hover:text-white/80">
                {cat.description}
                <ArrowRight className="h-3 w-3 opacity-0 transition-all group-hover:opacity-100" />
              </p>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
