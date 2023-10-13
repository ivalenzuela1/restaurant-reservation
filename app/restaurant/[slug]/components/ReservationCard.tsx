"use client";

import { partySize, times } from "../../../../data";
import DatePicker from "react-datepicker";
import { useState } from "react";

export default function ReservationCard({
  openTime,
  closeTime,
}: {
  openTime: string;
  closeTime: string;
}) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const handleChangeDate = (date: Date | null) => {
    if (date) {
      return setSelectedDate(date);
    }
    return setSelectedDate(null);
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
        <select name="" id="" className="py-3 border-b font-light bg-white">
          {partySize.map((size) => {
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
          <select className="py-3 border-b font-light bg-white">
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
        <button className="bg-red-600 w-full rounded px-4 text-white font-bold h-16">
          Find a time
        </button>
      </div>
    </div>
  );
}
