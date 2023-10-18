import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import React from "react";
import Form from "./components/Form";
import Header from "./components/Header";

const prisma = new PrismaClient();

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const fetchRestaurantBySlug = async (slug: string) => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
  });

  if (!restaurant) {
    notFound();
  }

  return restaurant;
};

export default async function Reserve({ params, searchParams }: Props) {
  const slug = params.slug;
  const dateTime = searchParams.date as string;
  const partySize = searchParams.partySize as string;

  const restaurant = await fetchRestaurantBySlug(slug);

  return (
    <div className="border-t h-screen">
      <div className="py-9 w-3/5 m-auto">
        <Header
          name={restaurant.name}
          image={restaurant.main_image}
          dateTime={dateTime}
          partySize={partySize}
        />
        <Form slug={slug} dateTime={dateTime} partySize={partySize} />
      </div>
    </div>
  );
}
