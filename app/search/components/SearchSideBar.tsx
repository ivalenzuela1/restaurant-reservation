import { Cuisine, Locality, PRICE } from "@prisma/client";
import Link from "next/link";
import React from "react";

export default function SearchSideBar({
  locations,
  cuisines,
  searchParams,
}: {
  locations: Locality[];
  cuisines: Cuisine[];
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const prices = [
    {
      price: PRICE.CHEAP,
      label: "$",
      className: "border w-full text-reg text-center font-light rounded-l p-2",
    },
    {
      price: PRICE.REGULAR,
      label: "$$",
      className: "border w-full text-reg text-center font-light p-2",
    },
    {
      price: PRICE.EXPENSIVE,
      label: "$$$",
      className: "border w-full text-reg text-center font-light rounded-r p-2",
    },
  ];

  return (
    <>
      <div className="w-1/5">
        <div className="border-b pb-4 flex flex-col">
          <h1 className="mb-2">Region</h1>
          {locations.map((location) => {
            return (
              <Link
                href={{
                  pathname: "/search",
                  query: {
                    ...searchParams,
                    city: location.name,
                  },
                }}
                className="font-light text-reg capitalize"
                key={location.id}
              >
                {location.name}
              </Link>
            );
          })}
        </div>
        <div className="border-b pb-4 mt-3 flex flex-col">
          <h1 className="mb-2">Cuisine</h1>
          {cuisines.map((cuisine) => {
            return (
              <Link
                href={{
                  pathname: "/search",
                  query: {
                    ...searchParams,
                    cuisine: cuisine.name,
                  },
                }}
                className="font-light text-reg capitalize"
                key={cuisine.id}
              >
                {cuisine.name}
              </Link>
            );
          })}
        </div>
        <div className="mt-3 pb-4">
          <h1 className="mb-2">Price</h1>
          <div className="flex">
            {prices.map(({ price, label, className }) => {
              return (
                <>
                  <Link
                    href={{
                      pathname: "/search",
                      query: {
                        ...searchParams,
                        price,
                      },
                    }}
                    className={className}
                    key={price}
                  >
                    {label}
                  </Link>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
