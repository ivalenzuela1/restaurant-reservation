import React from "react";
import Description from "./components/Description";
import Images from "./components/Images";
import Ratings from "./components/Ratings";
import ReservationCard from "./components/ReservationCard";
import RestaurantNavBar from "./components/RestaurantNavBar";
import Reviews from "./components/Reviews";
import Title from "./components/Title";
import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";

const prisma = new PrismaClient();

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const fetchRestaurantBySlug = async (slug: string): Promise<RestaurantType> => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
      name: true,
      images: true,
      description: true,
      slug: true,
      reviews: true,
    },
  });

  if (!restaurant) {
    notFound();
    //throw new Error("No Restaurant Found");
  }

  return restaurant;
};

export default async function RestaurantDetails({
  params,
  searchParams,
}: Props) {
  // get url params (slug)
  const restaurantSlug = params.slug;
  // fetch restaurant data and filter restaurant data by slug
  const restaurantData = await fetchRestaurantBySlug(restaurantSlug);
  // pass data to components
  return (
    <>
      <div className="bg-white w-[70%] rounded p-3 shadow">
        <RestaurantNavBar slug={restaurantData.slug} />
        <Title name={restaurantData.name} />
        <Ratings reviews={restaurantData.reviews} />
        <Description description={restaurantData.description} />
        <Images images={restaurantData.images} />
        <Reviews reviews={restaurantData.reviews} />
      </div>
      <div className="w-[27%] relative text-reg">
        <ReservationCard />
      </div>
    </>
  );
}
