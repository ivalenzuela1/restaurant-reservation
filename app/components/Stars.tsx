import React from "react";
import fullStar from "../../public/icons/full-star.png";
import halfStar from "../../public/icons/half-star.png";
import emptyStar from "../../public/icons/empty-star.png";
import Image from "next/image";
import { calculateReviewRatingAverage } from "../../utilities/calculateReviewRatingAvergae";
import { Review } from "@prisma/client";

export default function Stars({
  reviews,
  rating,
}: {
  reviews: Review[];
  rating?: number;
}) {
  const ratingAverage = rating || calculateReviewRatingAverage(reviews);

  // Calculate full and half stars
  const fullStars = Math.floor(ratingAverage);
  const hasHalfStar = ratingAverage - fullStars >= 0.5;

  return (
    <>
      {Array.from({ length: fullStars }, (_, index) => (
        <Image key={index} src={fullStar} alt="" width={15} height={15} />
      ))}
      {hasHalfStar && <Image src={halfStar} alt="" width={15} height={15} />}
      {Array.from({ length: 5 - Math.ceil(ratingAverage) }, (_, index) => (
        <Image key={index} src={emptyStar} alt="" width={15} height={15} />
      ))}
    </>
  );
}
