import { getReviewContent } from "content/getReviewContent";
import { Marquee } from "../marquee";
import { cn } from "@/lib/utils";
import { ReviewCard } from "./ReviewCard";

var reviews = getReviewContent().find(
  (e) => e.appName == process.env.NEXT_PUBLIC_APP_CONTENT
).reviews;

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

export function ReviewView() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee pauseOnHover className="[--duration:90s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:90s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[var(--accent-1)]"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-[var(--accent-1)]"></div>
    </div>
  );
}
