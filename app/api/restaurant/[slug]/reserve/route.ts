import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";
import { findAvailableTables } from "../../../../../services/restaurant/findAvailableTables";

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

  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      tables: true,
      open_time: true,
      close_time: true,
    },
  });

  // Check if restaurant exists
  if (!restaurant) {
    return new NextResponse("Restaurant not found", {
      status: 400,
    });
  }

  // Check restaurant times
  const selectedTime = new Date(`${day}T${time}`);
  const openTime = new Date(`${day}T${restaurant.open_time}`);
  const closeTime = new Date(`${day}T${restaurant.close_time}`);

  // if provided hours are not within restaurant hours, return error
  if (selectedTime < openTime || selectedTime > closeTime) {
    return new NextResponse("Time is outside of open hours", {
      status: 400,
    });
  }

  const searchTimesWithTables = await findAvailableTables({
    time,
    day,
    restaurant,
  });

  if (!searchTimesWithTables) {
    return new NextResponse("Invalid data provided", {
      status: 400,
    });
  }

  const searchTimeWithTables = searchTimesWithTables.find((t) => {
    return t.date.toISOString() === selectedTime.toISOString();
  });

  if (!searchTimeWithTables) {
    return new NextResponse("No availability, cannot book   ", {
      status: 400,
    });
  }

  const tablesCount: {
    2: number[];
    4: number[];
  } = {
    2: [],
    4: [],
  };

  searchTimeWithTables.tables.forEach((table) => {
    if (table.seats === 2) {
      tablesCount[2].push(table.id);
    } else {
      tablesCount[4].push(table.id);
    }
  });

  const tablesToBook: number[] = [];
  let seatsRemaining = parseInt(partySize);

  while (seatsRemaining > 0) {
    if (seatsRemaining >= 3) {
      if (tablesCount[4].length) {
        tablesToBook.push(tablesCount[4][0]);
        tablesCount[4].shift();
        seatsRemaining = seatsRemaining - 4;
      } else {
        tablesToBook.push(tablesCount[2][0]);
        tablesCount[2].shift();
        seatsRemaining = seatsRemaining - 2;
      }
    } else {
      if (tablesCount[2].length) {
        tablesToBook.push(tablesCount[4][0]);
        tablesCount[2].shift();
        seatsRemaining = seatsRemaining - 2;
      } else {
        tablesToBook.push(tablesCount[4][0]);
        tablesCount[4].shift();
        seatsRemaining = seatsRemaining - 4;
      }
    }
  }

  return NextResponse.json({ tablesToBook, tablesCount });
}

// http://localhost:3000/api/restaurant/vivaan-fine-indian-cuisine-ottawa/reserve?day=2023-10-16&time=15:00:00.000Z&partySize=4
