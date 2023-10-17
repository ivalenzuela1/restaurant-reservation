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

  return NextResponse.json({ searchTimeWithTables });
}

// http://localhost:3000/api/restaurant/vivaan-fine-indian-cuisine-ottawa/reserve?day=2023-10-16&time=15:00:00.000Z&partySize=4
