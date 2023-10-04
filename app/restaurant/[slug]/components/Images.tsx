import React from "react";

export default function Images() {
  return (
    <div>
      <h1 className="font-bold text-3xl mt-10 mb-7 border-b pb-5">7 Photos</h1>
      <div className="flex flex-wrap">
        <img
          className="w-56 h-44 mr-1 mb-1"
          src="https://resizer.otstatic.com/v2/photos/xlarge/2/48625221.webp"
          alt=""
        />
        <img
          className="w-56 h-44 mr-1 mb-1"
          src="https://resizer.otstatic.com/v2/photos/xlarge/2/48625218.webp"
          alt=""
        />
      </div>
    </div>
  );
}
