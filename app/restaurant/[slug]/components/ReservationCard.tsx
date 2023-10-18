"use client";

import { partySize as partySizes, times } from "../../../../data";
import DatePicker from "react-datepicker";
import { useState } from "react";
import useAvailabilities from "../../../../hooks/useAvailability";
import { CircularProgress } from "@mui/material";
import Link from "next/link";
import {
  convertToDisplayTime,
  Time,
} from "../../../../utilities/convertToDisplayTime";

export default function ReservationCard({
  openTime,
  closeTime,
  slug,
}: {
  openTime: string;
  closeTime: string;
  slug: string;
}) {
  const { loading, data, error, fetchAvailabilities } = useAvailabilities();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [time, setTime] = useState(openTime);
  const [partySize, setPartySize] = useState("2");
  const [day, setDay] = useState(new Date().toISOString().split("T")[0]);

  const handleChangeDate = (date: Date | null) => {
    if (date) {
      // get day from dateTime
      setDay(date.toISOString().split("T")[0]);
      return setSelectedDate(date);
    }
    return setSelectedDate(null);
  };

  const handleClick = () => {
    fetchAvailabilities({
      slug,
      day,
      time,
      partySize,
    });
  };

  const filterTimeByRestaurantOpenWindow = () => {
    let timesInWindow: typeof times = [];
    let isWithinWindow = false;

    times.forEach((time) => {
      if (time.time == openTime) {
        isWithinWindow = true;
      }
      if (isWithinWindow) {
        timesInWindow.push(time);
      }
      if (time.time == closeTime) {
        isWithinWindow = false;
      }
    });
    return timesInWindow;
  };

  return (
    <div className="fixed w-[15%] bg-white rounded p3 shadow">
      <div className="text-center border-b pb-2 font-bold">
        <h4 className="mr-7 text-lg">Make a Reservation</h4>
      </div>
      <div className="my-3 flex flex-col">
        <div>Party size</div>
        <select
          name=""
          id=""
          className="py-3 border-b font-light bg-white"
          value={partySize}
          onChange={(e) => setPartySize(e.target.value)}
        >
          {partySizes.map((size) => {
            return (
              <option value={size.value} key={size.value}>
                {size.label}
              </option>
            );
          })}
        </select>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col w-[48%]">
          <div>Date</div>
          <DatePicker
            selected={selectedDate}
            onChange={handleChangeDate}
            className="py-3 border-b font-light text-reg w-24 bg-white"
            dateFormat="MMMM d"
            wrapperClassName="w-"
          />
        </div>
        <div className="flex flex-col w-[48%]">
          <div>Time</div>
          <select
            className="py-3 border-b font-light bg-white"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          >
            {filterTimeByRestaurantOpenWindow().map((time) => {
              return (
                <option value={time.time} key={time.time}>
                  {time.displayTime}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="mt-5 ">
        <button
          className="bg-red-600 w-full rounded px-4 text-white font-bold h-16"
          onClick={handleClick}
        >
          {loading ? <CircularProgress color="inherit" /> : "Find a time"}
        </button>
      </div>
      {data && data.length ? (
        <div className="mt-4">
          <p className="text-reg">Select a Time</p>
          <div className="flex flex-wrap mt-2">
            {data.map((time) => {
              return time.available ? (
                <Link
                  key={time.time}
                  href={`/reserve/${slug}?date=${day}T${time.time}&partySize=${partySize}`}
                  className="bg-red-600 cursor-pointer p-2 w-24 text-center text-white rounded mb-3 mr-3"
                >
                  <p className="text-sm font-bold" key={time.time}>
                    {convertToDisplayTime(time.time as Time)}
                  </p>
                </Link>
              ) : (
                <p className="bg-gray-300 p-2 w-24 text-white mb-3 rounded mr-3">
                  {time.time}
                </p>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
