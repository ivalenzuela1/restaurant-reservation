"use client";

import React, { useContext } from "react";
import { AuthenticationContext } from "../context/AuthContext";
import SearchBar from "./SearchBar";

export default function Header() {
  const { data } = useContext(AuthenticationContext);
  return (
    <div className="h-64 bg-gradient-to-r from-[#0f1f47] to-[#5f6984] p-2">
      <div className="text-center mt-10">
        <h1 className="text-white text-5xl font-bold mb-2">
          {data ? (
            <p className="text-4xl text-red-400">
              Welcome, {data?.firstName} {data?.lastName}
            </p>
          ) : null}
          Find your table for any occation
        </h1>
        <SearchBar />
      </div>
    </div>
  );
}
