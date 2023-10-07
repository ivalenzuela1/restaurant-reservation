import { Review } from "@prisma/client";
import React from "react";
import ReviewCard from "./ReviewCard";

export default function Reviews({ reviews }: { reviews: Review[] }) {
  return (
    <div>
      <h1 className="font-bold text-3xl mt-10 mb-7 border-b pb-5">
        what {reviews.length} {reviews.length == 1 ? "people" : "person"} are
        saying
      </h1>
      <div>
        {reviews.map((review) => {
          return <ReviewCard review={review} key={review.id} />;
        })}
      </div>
    </div>
  );
}
