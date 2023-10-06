import { Item } from "@prisma/client";
import React from "react";
import MenuCard from "./MenuCard";

export default function Menu({ menu }: { menu: Item[] }) {
  return (
    <main className="b-white mt-5">
      <div>
        <div className="mt-4 pb-1 mb-1">
          <h1 className="font-bold text-4xl">Menu</h1>
        </div>
        {menu.length ? (
          <div className="flex flex-wrap justify-between">
            {menu.map((item) => {
              return <MenuCard key={item.id} item={item} />;
            })}
          </div>
        ) : (
          <div className="flex flex-wrap justify-between">
            <p>This restaurant does not have a Menu</p>
          </div>
        )}
      </div>
    </main>
  );
}
