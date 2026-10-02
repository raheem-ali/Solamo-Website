/**
 * TEMPORARY DEMO DATA, set to false or replace with real data before going live.
 */

export const SHOW_DEMO_CONTENT = true;

export interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  text: string;
  verified: boolean;
  helpfulCount: number;
}

export function getReviewStats(productId: string) {
  // Deterministic demo stats based on productId string length/chars
  let hash = 0;
  for (let i = 0; i < productId.length; i++) {
    hash = (hash << 5) - hash + productId.charCodeAt(i);
    hash |= 0;
  }
  const positive = 4.5 + (Math.abs(hash) % 4) * 0.1; // 4.5 to 4.8
  const count = 120 + (Math.abs(hash) % 350); // 120 to 469
  const rating = Math.min(5.0, Number(positive.toFixed(1)));
  return { rating, count };
}

export function getDemoReviews(productId: string): ReviewItem[] {
  const { rating } = getReviewStats(productId);
  return [
    {
      id: `${productId}-rev-1`,
      author: "Ahmed K.",
      rating: 5,
      date: "2 weeks ago",
      title: "Exceptional performance & quality",
      text: "Installed this in my residential setup in Karachi. Output is extremely consistent even during peak noon hours. Solamo team handled installation professionally.",
      verified: true,
      helpfulCount: 14,
    },
    {
      id: `${productId}-rev-2`,
      author: "Bilal M.",
      rating: 5,
      date: "1 month ago",
      title: "Top-tier efficiency",
      text: "Very solid build quality. Noticed an immediate drop in grid electricity usage after pairing with my hybrid inverter.",
      verified: true,
      helpfulCount: 8,
    },
    {
      id: `${productId}-rev-3`,
      author: "Usman R.",
      rating: 4,
      date: "2 months ago",
      title: "Great product, prompt delivery",
      text: "Delivered safely with secure packaging. Working as expected. Highly recommend for solar upgrades.",
      verified: true,
      helpfulCount: 3,
    },
    {
      id: `${productId}-rev-4`,
      author: "Faisal T.",
      rating: 5,
      date: "3 months ago",
      title: "Exceeded expectations",
      text: "Top grade tier-1 equipment. Zero issues so far and energy generation stats are spot on.",
      verified: true,
      helpfulCount: 5,
    },
  ];
}

export function getCustomersSay(productId: string) {
  return [
    "High energy generation efficiency and low degradation",
    "Sturdy build quality with reliable manufacturer warranty",
    "Professional installation support and seamless integration",
  ];
}

export function getProductExtras(productId: string) {
  let hash = 0;
  for (let i = 0; i < productId.length; i++) {
    hash = (hash << 5) - hash + productId.charCodeAt(i);
    hash |= 0;
  }
  const isBestSeller = Math.abs(hash) % 2 === 0;
  const rank = (Math.abs(hash) % 5) + 1;
  return {
    isBestSeller,
    rankBadge: isBestSeller ? `#${rank} in Solar Equipment` : undefined,
    lowestPrice30Days: true,
  };
}
