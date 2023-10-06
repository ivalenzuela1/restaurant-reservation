import Link from "next/link";
import React from "react";

interface Props {
  restaurant: RestaurantCardType;
}

export default function RestaurantCard({ restaurant }: Props) {
  return (
    <div className="w-64 h-72 m-3 rounded overflow-hidden border cursor-pointer">
      <Link href="/restaurant/milestone-grill">
        <img src={restaurant.main_image} alt="" className="w-full h36" />
        <div className="p1">
          <h3 className="font-bold text-2xl mb-2">{restaurant.name}</h3>
          <div className="flex items-start">
            <div className="flex mb-2">{restaurant.price}</div>
            <p className="ml-2">77 Reviews</p>
          </div>
          <div className="flex text-reg font-light capitalize">
            <p className="mr-3">{restaurant.cuisine.name}</p>
            <p className="mr-3">$$$</p>
            <p className="mr-3">Toronto</p>
          </div>
          <p className="text-sm mt-1 font-bold">Booked 3 times today</p>
        </div>
      </Link>
    </div>
  );
}
