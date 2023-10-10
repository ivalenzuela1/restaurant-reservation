import React from "react";

export default function AuthModalInputs() {
  return (
    <div>
      <div className="my-3 flex justify-between text-sm">
        <input
          type="text"
          className="border rounded p-2 py-3 w-[49%] bg-white"
          placeholder="First Name"
        />
        <input
          type="text"
          className="border rounded p-2 py-3 w-[49%] bg-white"
          placeholder="Last Name"
        />
      </div>
      <div className="my-3 flex justify-between text-sm">
        <input
          type="text"
          className="border rounded p-2 py-3 w-full bg-white"
          placeholder="Email"
        />
      </div>
      <div className="my-3 flex justify-between text-sm">
        <input
          type="text"
          className="border rounded p-2 py-3 w-[49%] bg-white"
          placeholder="Phone"
        />
        <input
          type="text"
          className="border rounded p-2 py-3 w-[49%] bg-white"
          placeholder="City"
        />
      </div>
      <div className="my-3 flex justify-between text-sm">
        <input
          type="text"
          className="border rounded p-2 py-3 w-full bg-white"
          placeholder="Password"
        />
      </div>
    </div>
  );
}
