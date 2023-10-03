import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "./page.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="bg-gray-100 min-h-screen w-screen">
      <main className="max-w-screen-2xl m-auto bg-white text-black">
        {/* NAVBAR */}
        <nav className="bg-white p-2 flex justify-between">
          <a href="" className="font-bold text-gray-700 text-2xl">
            Open Table
          </a>
          <div className="flex">
            <button className="bg-blue-400 text-white border p-1 px-4 rounded mr-3">
              Sign in
            </button>
            <button className="border p-1 px-4 rounded">Sign out</button>
          </div>
        </nav>
        {/* NAVBAR */}
        <main>
          {/* HEADER */}
          <div className="h-64 bg-gradient-to-r from-[#0f1f47] to-[#5f6984] p-2">
            <div className="text-center mt-10">
              <h1 className="text-white text-5xl font-bold mb-2">
                Find your table for any occation
              </h1>
              {/* SEARCHBAR */}
              <div className="text-lg text-left py-3 m-auto flex justify-center">
                <input
                  className="rounded text-lg mr-3 p-2 w-[450px] bg-white"
                  type="text"
                  placeholder="State, city, or town"
                />
                <button className="rounded bg-red-600 px-9 py-2 text-white">
                  Let's Go
                </button>
              </div>
              {/* SEARCHBAR */}
            </div>
          </div>
          {/* HEADER */}
        </main>
      </main>
    </main>
  );
}
//
