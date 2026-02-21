// components/RatingSystem.tsx
"use client";

import { useState } from "react";
import { Star } from "lucide-react";

interface RatingProps {
  companyId: string;
  initialRating: number;
}

export default function RatingSystem({ companyId, initialRating }: RatingProps) {
  const [rating, setRating] = useState(initialRating || 0);
  const [hover, setHover] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRating = async (value: number) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/companies/rate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ companyId, rating: value }),
      });

      const data = await response.json();
      if (data.success) {
        setRating(data.newRating);
        alert("Thank you for your rating!");
      }
    } catch (error) {
      console.error("Failed to rate:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          disabled={isSubmitting}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          onClick={() => handleRating(star)}
          className={`transition-all ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:scale-110'}`}
        >
          <Star
            className={`w-5 h-5 ${
              (hover || rating) >= star
                ? "fill-amber-400 text-amber-400"
                : "text-slate-300"
            }`}
          />
        </button>
      ))}
      <span className="ml-2 font-bold text-slate-700">{rating.toFixed(1)}</span>
    </div>
  );
}