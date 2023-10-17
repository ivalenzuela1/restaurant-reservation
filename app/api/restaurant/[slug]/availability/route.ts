import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";
import { times } from "../../../../../data";
import validator from "validator";
import bcrypt from "bcrypt";
import * as jose from "jose";
import { cookies } from "next/headers";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug;
  const { day, time, partySize } = Object.fromEntries(
    req.nextUrl.searchParams.entries()
  );

  if (!day || !time || !partySize) {
    return new NextResponse("Invalid data provided", {
      status: 400,
    });
  }

  const searchTimes = times.find((t) => {
    return t.time === time;
  })?.searchTimes;

  if (!searchTimes) {
    return new NextResponse("Invalid data provided", {
      status: 400,
    });
  }

  const bookings = await prisma.booking.findMany({
    where: {
      booking_time: {
        gte: new Date(`${day}T${searchTimes[0]}`),
        lte: new Date(`${day}T${searchTimes[searchTimes.length - 1]}`),
      },
    },
    select: {
      number_of_people: true,
      booking_time: true,
      tables: true,
    },
  });

  const bookingTablesObj: { [key: string]: { [key: number]: true } } = {};
  bookings.forEach((booking) => {
    bookingTablesObj[booking.booking_time.toISOString()] =
      booking.tables.reduce((obj, table) => {
        return { ...obj, [table.table_id]: true };
      }, {});
  });

  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      tables: true,
    },
  });

  if (!restaurant) {
    return new NextResponse("Invalid data provided", {
      status: 400,
    });
  }

  const tables = restaurant.tables;

  const searchTimesWithTables = searchTimes.map((searchTime) => {
    return {
      date: new Date(`${day}T${searchTime}`),
      time: searchTime,
      tables,
    };
  });

  searchTimesWithTables.forEach((t) => {
    t.tables = t.tables.filter((table) => {
      if (bookingTablesObj[t.date.toISOString()]) {
        if (bookingTablesObj[t.date.toISOString()][table.id]) {
          return false;
        }
      }
      return true;
    });
  });

  const availabilities = searchTimesWithTables.map((t) => {
    const sumSeats = t.tables.reduce((sum, table) => {
      return sum + table.seats;
    }, 0);

    return {
      time: t.time,
      available: sumSeats >= parseInt(partySize),
    };
  });

  return NextResponse.json({
    availabilities,
    bookingTablesObj,
    tables,
    searchTimesWithTables,
  });
}

//Sample URL: http://localhost:3000/api/restaurant/vivaan-fine-indian-cuisine-ottawa/availability?day=2023-05-27&time=15:00:00.000Z&partySize=4
//vivaan-fine-indian-cuisine-ottawa
// 99

/*
    slug,
    day,
    time,
    partySize,
    searchTimes,
    bookings,
    */
