"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {
  const router = useRouter();
  const [location, setLocation] = useState("");

  return (
    <div className="text-lg text-left py-3 m-auto flex justify-center">
      <input
        className="rounded text-lg mr-3 p-2 w-[450px] bg-white"
        type="text"
        placeholder="State, city, or town"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button
        className="rounded bg-red-600 px-9 py-2 text-white"
        onClick={() => {
          if (location === "banana") return;
          router.push("/search");
        }}
      >
        Let's Go
      </button>
    </div>
  );
}
