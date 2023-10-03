import Link from "next/link";
import React from "react";

export default function Reserve() {
  return (
    <main className="bg-gray-100 min-h-screen w-screen">
      <main className="max-w-screen-2xl m-auto bg-white text-black">
        {/* NAVBAR */}
        <nav className="bg-white p-2 flex justify-between">
          <Link href="/" className="font-bold text-gray-700 text-2xl">
            Open Table
          </Link>
          <div className="flex">
            <button className="bg-blue-400 text-white border p-1 px-4 rounded mr-3">
              Sign in
            </button>
            <button className="border p-1 px-4 rounded">Sign out</button>
          </div>
        </nav>
        {/* NAVBAR */}
        {/* new */}
        <div className="border-t h-screen">
          <div className="py-9 w-3/5 m-auto">
            {/* HEADER */}
            <div className="">
              <h3 className="font-bold">You're almost done</h3>
              <div className="mt-5 flex">
                <img
                  src="https://images.otstatic.com/prod1/30639096/3/medium.jpg"
                  alt=""
                  className="w-32 h-18 rounded"
                />
                <div className="ml-4">
                  <h1 className="text-3xl font-bold">Aiana Restaurant</h1>
                  <div className="flex mt-3">
                    <p className="mr-6">Tuesday, 22, 2023</p>
                    <p className="mr-6">7:30 PM</p>
                    <p className="mr-6">3 people</p>
                  </div>
                </div>
              </div>
            </div>
            {/* HEADER */}
            {/* FORM */}
            <div className="mt-10 flex flex-wrap justify-between w-[660px]">
              <input
                type="text"
                className="border rounded p-3 w-80 mb-4 bg-white"
                placeholder="First Name"
              />
              <input
                type="text"
                className="border rounded p-3 w-80 mb-4 bg-white"
                placeholder="Last Name"
              />
              <input
                type="text"
                className="border rounded p-3 w-80 mb-4 bg-white"
                placeholder="Phone Number"
              />
              <input
                type="text"
                className="border rounded p-3 w-80 mb-4 bg-white"
                placeholder="Email"
              />
              <input
                type="text"
                className="border rounded p-3 w-80 mb-4 bg-white"
                placeholder="Occasion (optional)"
              />
              <input
                type="text"
                className="border rounded p-3 w-80 mb-4 bg-white"
                placeholder="Requests (optional)"
              />
              <button className="bg-red-600 w-full p-3 text-white font-bold rounded disabled:bg-gray-300">
                Complete reservation
              </button>
              <p className="mt-4 text-sm">
                By clicking “Complete reservation” you agree to the OpenTable
                Terms of Use and Privacy Policy. Message & data rates may apply.
                You can opt out of receiving text messages at any time in your
                account settings or by replying STOP.
              </p>
            </div>
            {/* FORM */}
          </div>
        </div>
        {/* new */}
      </main>
    </main>
  );
}
