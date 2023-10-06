import { PrismaClient } from "@prisma/client";
import React from "react";
import Header from "./components/Header";
import RestaurantCard from "./components/RestaurantCard";
import SearchSideBar from "./components/SearchSideBar";

const prisma = new PrismaClient();

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const fetchRestaurantsByLocation = (
  location: string | undefined
): Promise<RestaurantCardType[]> => {
  const select = {
    id: true,
    name: true,
    main_image: true,
    cuisine: true,
    locality: true,
    price: true,
    slug: true,
  };

  if (!location)
    return prisma.restaurant.findMany({
      select,
    });
  return prisma.restaurant.findMany({
    where: {
      locality: {
        name: {
          equals: location.toLowerCase(),
        },
      },
    },
    select,
  });
};

export default async function Search({ searchParams }: Props) {
  const city = searchParams.city as string;
  const restaurants = await fetchRestaurantsByLocation(city);

  return (
    <>
      <Header />
      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
        <SearchSideBar />
        <div className="w-5/6">
          {restaurants.length ? (
            <>
              {restaurants.map((restaurant) => {
                return <RestaurantCard restaurant={restaurant} />;
              })}
            </>
          ) : (
            <p>Sorry we found no restaurants in this area</p>
          )}
        </div>
      </div>
    </>
  );
}
