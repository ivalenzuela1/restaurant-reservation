"use client";

import Link from "next/link";
import React, { useContext } from "react";
import useAuth from "../../hooks/useAuth";
import { AuthenticationContext } from "../context/AuthContext";
import AuthModal from "./AuthModal";

export default function NavBar() {
  const { loading, data } = useContext(AuthenticationContext);
  const { signout } = useAuth();

  return (
    <nav className="bg-white p-2 flex justify-between">
      <Link href="/" className="font-bold text-gray-700 text-2xl">
        Open Table
      </Link>
      {loading ? null : (
        <div className="flex">
          {data ? (
            <>
              <p className="mr-4 flex items-center font-bold">
                Hi, {data?.firstName}
              </p>
              <button
                className="bg-blue-400 text-white border p-1 px-4 rounded mr-3"
                onClick={signout}
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <AuthModal isSignIn={true} />
              <AuthModal isSignIn={false} />
            </>
          )}
        </div>
      )}
    </nav>
  );
}
