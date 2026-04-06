import { Star } from "lucide-react";

const STARS = [1, 2, 3, 4, 5];

interface StarRatingProps {
  rating: number;
  reviewCount?: number;
  size?: "sm" | "md";
}

export default function StarRating({
  rating,
  reviewCount,
  size = "sm",
}: StarRatingProps) {
  const starSize = size === "sm" ? "h-3 w-3" : "h-4 w-4";
  const count = Math.min(5, Math.max(0, Math.round(rating)));

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0.5">
        {STARS.map((star) => (
          <Star
            key={star}
            className={`${starSize} ${
              star <= count
                ? "fill-gold text-gold"
                : "fill-transparent text-muted-foreground"
            }`}
          />
        ))}
      </div>
      {reviewCount !== undefined && (
        <span className="text-xs text-muted-foreground">
          ({Number(reviewCount)})
        </span>
      )}
    </div>
  );
}
