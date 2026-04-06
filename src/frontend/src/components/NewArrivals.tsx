import { Skeleton } from "@/components/ui/skeleton";
import { useGetAllProducts } from "../hooks/useQueries";
import ProductCard from "./ProductCard";

const FALLBACK_NEW = [
  {
    id: BigInt(5),
    name: "White Graphic Tee",
    description: "Bold minimal print",
    category: "t-shirts",
    rating: 4.5,
    price: 44.99,
    reviewCount: BigInt(62),
  },
  {
    id: BigInt(6),
    name: "Light Wash Distressed Jeans",
    description: "Vintage look denim",
    category: "jeans",
    rating: 4.4,
    price: 79.99,
    reviewCount: BigInt(45),
  },
  {
    id: BigInt(7),
    name: "Bluetooth Speaker",
    description: "360° surround sound",
    category: "gadgets",
    rating: 4.7,
    price: 129.99,
    reviewCount: BigInt(88),
  },
  {
    id: BigInt(8),
    name: "Charcoal Hoodie",
    description: "Heavyweight fleece",
    category: "accessories",
    rating: 4.6,
    price: 69.99,
    reviewCount: BigInt(103),
  },
  {
    id: BigInt(9),
    name: "Classic Navy Tee",
    description: "Everyday essential",
    category: "tees",
    rating: 4.3,
    price: 39.99,
    reviewCount: BigInt(157),
  },
  {
    id: BigInt(10),
    name: "Smart Earbuds",
    description: "Hi-fi, active ANC",
    category: "electronics",
    rating: 4.8,
    price: 159.99,
    reviewCount: BigInt(221),
  },
];

const LOADING_PLACEHOLDERS = ["n1", "n2", "n3", "n4", "n5", "n6"];

export default function NewArrivals() {
  const { data: allProducts, isLoading } = useGetAllProducts();

  const products =
    allProducts && allProducts.length > 0
      ? allProducts.slice(4, 10)
      : FALLBACK_NEW;

  const display = products.length > 0 ? products : FALLBACK_NEW;

  return (
    <section id="gadgets" className="">
      <h2 className="mb-4 font-display text-sm font-extrabold uppercase tracking-[0.15em] text-foreground">
        NEW ARRIVALS
      </h2>

      {isLoading ? (
        <div
          className="grid grid-cols-2 gap-3"
          data-ocid="arrivals.loading_state"
        >
          {LOADING_PLACEHOLDERS.map((id) => (
            <div
              key={id}
              className="flex flex-col gap-2 rounded-lg border border-border bg-card p-3"
            >
              <Skeleton className="aspect-square w-full rounded-md" />
              <Skeleton className="h-3 w-3/4 rounded" />
              <Skeleton className="h-3 w-1/2 rounded" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {display.slice(0, 6).map((product, i) => (
            <ProductCard
              key={Number(product.id)}
              product={product}
              size="sm"
              index={i + 1}
            />
          ))}
        </div>
      )}
    </section>
  );
}
