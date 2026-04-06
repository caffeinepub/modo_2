import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "motion/react";
import { useState } from "react";
import { useGetAllProducts } from "../hooks/useQueries";
import ProductCard from "./ProductCard";

const FILTER_TABS = [
  { label: "ALL", value: "ALL" },
  { label: "TEES", value: "t-shirts" },
  { label: "JEANS", value: "jeans" },
  { label: "GADGETS", value: "gadgets" },
];

const FALLBACK_PRODUCTS = [
  {
    id: BigInt(1),
    name: "Essential Black Crew Tee",
    description: "Premium cotton crew neck",
    category: "t-shirts",
    rating: 4.8,
    price: 49.99,
    reviewCount: BigInt(128),
  },
  {
    id: BigInt(2),
    name: "Slim Dark Indigo Jeans",
    description: "Modern slim fit denim",
    category: "jeans",
    rating: 4.7,
    price: 89.99,
    reviewCount: BigInt(94),
  },
  {
    id: BigInt(3),
    name: "Pro Wireless Headphones",
    description: "ANC, 40hr battery",
    category: "gadgets",
    rating: 4.9,
    price: 199.99,
    reviewCount: BigInt(211),
  },
  {
    id: BigInt(4),
    name: "Luxury Smart Watch",
    description: "AMOLED, health tracking",
    category: "gadgets",
    rating: 4.6,
    price: 299.99,
    reviewCount: BigInt(77),
  },
];

const LOADING_PLACEHOLDERS = ["p1", "p2", "p3", "p4"];

export default function FeaturedArrivals() {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const { data: allProducts, isLoading } = useGetAllProducts();

  const products =
    allProducts && allProducts.length > 0 ? allProducts : FALLBACK_PRODUCTS;

  const filtered =
    activeFilter === "ALL"
      ? products.slice(0, 4)
      : products
          .filter((p) =>
            p.category.toLowerCase().includes(activeFilter.toLowerCase()),
          )
          .slice(0, 4);

  const display = filtered.length > 0 ? filtered : products.slice(0, 4);

  return (
    <section id="featured" className="mt-8">
      {/* ─── SALE PROMO BANNER ─── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="mb-5 overflow-hidden rounded-lg"
        style={{
          background:
            "linear-gradient(105deg, oklch(0.18 0.03 27) 0%, oklch(0.22 0.06 35) 30%, oklch(0.18 0.03 27) 100%)",
          border: "1px solid oklch(0.5 0.23 27 / 0.4)",
        }}
        data-ocid="featured.panel"
      >
        <div className="flex flex-col items-start gap-2 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span
              className="rounded px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white"
              style={{
                background:
                  "linear-gradient(90deg, oklch(0.5 0.23 27) 0%, oklch(0.62 0.22 45) 100%)",
              }}
            >
              SALE
            </span>
            <span className="text-sm font-extrabold uppercase tracking-wider text-white">
              LIMITED TIME: 50% OFF EVERYTHING
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: "oklch(0.72 0.22 45)" }}
            >
              ⏳ Ends Soon!
            </span>
            <span className="rounded bg-white/10 px-3 py-1 text-xs font-black uppercase tracking-widest text-white">
              CODE: MODO50
            </span>
          </div>
        </div>
      </motion.div>

      {/* ─── HEADER + FILTER ─── */}
      <div className="mb-5 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="font-display text-lg font-extrabold uppercase tracking-[0.15em] text-foreground">
          FEATURED ARRIVALS
        </h2>
        <Tabs value={activeFilter} onValueChange={setActiveFilter}>
          <TabsList className="h-8 bg-muted">
            {FILTER_TABS.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="h-6 px-3 text-xs tracking-widest"
                data-ocid="featured.tab"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {isLoading ? (
        <div
          className="grid grid-cols-2 gap-4 lg:grid-cols-4"
          data-ocid="featured.loading_state"
        >
          {LOADING_PLACEHOLDERS.map((id) => (
            <div
              key={id}
              className="flex flex-col gap-3 rounded-lg border border-border bg-card p-4"
            >
              <Skeleton className="aspect-square w-full rounded-md" />
              <Skeleton className="h-4 w-3/4 rounded" />
              <Skeleton className="h-4 w-1/2 rounded" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {display.map((product, i) => (
            <ProductCard
              key={Number(product.id)}
              product={product}
              size="lg"
              index={i + 1}
            />
          ))}
        </div>
      )}
    </section>
  );
}
