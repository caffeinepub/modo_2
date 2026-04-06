import { ShoppingBag } from "lucide-react";
import { motion } from "motion/react";
import type { Product } from "../backend.d";
import StarRating from "./StarRating";

const categoryImages: Record<string, string> = {
  "t-shirts": "/assets/generated/product-tshirt-black.dim_400x400.jpg",
  tees: "/assets/generated/product-tshirt-white.dim_400x400.jpg",
  jeans: "/assets/generated/product-jeans-dark.dim_400x400.jpg",
  denim: "/assets/generated/product-jeans-light.dim_400x400.jpg",
  gadgets: "/assets/generated/product-headphones.dim_400x400.jpg",
  electronics: "/assets/generated/product-smartwatch.dim_400x400.jpg",
  audio: "/assets/generated/product-speaker.dim_400x400.jpg",
  accessories: "/assets/generated/product-hoodie.dim_400x400.jpg",
};

const IMAGE_VALUES = Object.values(categoryImages);

function getProductImage(product: Product): string {
  const catLower = product.category.toLowerCase();
  for (const [key, img] of Object.entries(categoryImages)) {
    if (catLower.includes(key)) return img;
  }
  const hash = product.name.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return IMAGE_VALUES[hash % IMAGE_VALUES.length];
}

interface ProductCardProps {
  product: Product;
  size?: "sm" | "lg";
  index: number;
}

export default function ProductCard({
  product,
  size = "lg",
  index,
}: ProductCardProps) {
  const image = getProductImage(product);

  if (size === "sm") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.07 }}
        className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-shadow hover:shadow-card"
        data-ocid={`products.item.${index}`}
      >
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="flex flex-col gap-1.5 p-3">
          <p className="line-clamp-2 text-xs font-semibold text-foreground">
            {product.name}
          </p>
          <p className="text-sm font-bold text-foreground">
            ${product.price.toFixed(2)}
          </p>
          <StarRating
            rating={product.rating}
            reviewCount={Number(product.reviewCount)}
            size="sm"
          />
          <button
            type="button"
            className="mt-1 rounded-md border border-border bg-muted px-3 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
            data-ocid="products.button"
          >
            View Details
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-shadow hover:shadow-card"
      data-ocid={`featured.item.${index}`}
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
      </div>
      <div className="flex flex-col gap-2 p-4">
        <p className="line-clamp-2 text-sm font-semibold text-foreground">
          {product.name}
        </p>
        <p className="text-base font-extrabold text-foreground">
          ${product.price.toFixed(2)}
        </p>
        <StarRating
          rating={product.rating}
          reviewCount={Number(product.reviewCount)}
        />
        <button
          type="button"
          className="mt-1 flex items-center justify-center gap-2 rounded-md border border-border bg-muted px-4 py-2 text-xs font-semibold text-muted-foreground transition-all hover:border-foreground/30 hover:bg-accent hover:text-foreground"
          data-ocid="featured.button"
        >
          <ShoppingBag className="h-3 w-3" /> View Details
        </button>
      </div>
    </motion.div>
  );
}
