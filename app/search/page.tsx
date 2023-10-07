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

const fetchRestaurantsByLocation = (searchParams: {
  [key: string]: string | string[] | undefined;
}): Promise<RestaurantCardType[]> => {
  const where: any = {};

  if (searchParams.city) {
    const locality = {
      name: {
        equals: (searchParams.city as string).toLowerCase(),
      },
    };
    where.locality = locality;
  }

  if (searchParams.cuisine) {
    const cuisine = {
      name: {
        equals: (searchParams.cuisine as string).toLowerCase(),
      },
    };
    where.cuisine = cuisine;
  }

  if (searchParams.price) {
    const price = {
      equals: searchParams.price,
    };
    where.price = price;
  }

  const select = {
    id: true,
    name: true,
    main_image: true,
    cuisine: true,
    locality: true,
    price: true,
    slug: true,
  };

  return prisma.restaurant.findMany({
    where,
    select,
  });
};

const fetchLocations = () => {
  return prisma.locality.findMany();
};

const fetchCuisines = () => {
  return prisma.cuisine.findMany();
};

export default async function Search({ searchParams }: Props) {
  const restaurants = await fetchRestaurantsByLocation(searchParams);
  const locations = await fetchLocations();
  const cuisines = await fetchCuisines();

  return (
    <>
      <Header />
      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
        <SearchSideBar
          locations={locations}
          cuisines={cuisines}
          searchParams={searchParams}
        />
        <div className="w-5/6">
          {restaurants.length ? (
            <>
              {restaurants.map((restaurant) => {
                return (
                  <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                );
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
