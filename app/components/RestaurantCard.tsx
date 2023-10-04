import Link from "next/link";
import React from "react";

export default function RestaurantCard() {
  return (
    <div className="w-64 h-72 m-3 rounded overflow-hidden border cursor-pointer">
      <Link href="/restaurant/milestone-grill">
        <img
          src="https://resizer.otstatic.com/v2/photos/wide-huge/3/48569639.webp"
          alt=""
          className="w-full h36"
        />
        <div className="p1">
          <h3 className="font-bold text-2xl mb-2">Milestone Grill</h3>
          <div className="flex items-start">
            <div className="flex mb-2">*****</div>
            <p className="ml-2">77 Reviews</p>
          </div>
          <div className="flex text-reg font-light capitalize">
            <p className="mr-3">Mexican</p>
            <p className="mr-3">$$$</p>
            <p className="mr-3">Toronto</p>
          </div>
          <p className="text-sm mt-1 font-bold">Booked 3 times today</p>
        </div>
      </Link>
    </div>
  );
}
