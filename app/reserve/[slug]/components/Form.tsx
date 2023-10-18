"use client";

import React, { useEffect, useState } from "react";

export default function Form() {
  const [inputs, setInputs] = useState({
    bookerFirstName: "",
    bookerLastName: "",
    bookerPhone: "",
    bookerEmail: "",
    bookerOccasion: "",
    bookerRequest: "",
  });

  const [disabled, setDisabled] = useState(true);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    console.log("inputs");
    console.log(inputs);
  };

  // TODO: bookerOccasion & bookerRequest should be optional
  useEffect(() => {
    if (
      inputs.bookerFirstName &&
      inputs.bookerLastName &&
      inputs.bookerPhone &&
      inputs.bookerEmail &&
      inputs.bookerOccasion &&
      inputs.bookerRequest
    ) {
      return setDisabled(false);
    }

    setDisabled(true);
  }, [inputs]);

  return (
    <div className="mt-10 flex flex-wrap justify-between w-[660px]">
      <input
        type="text"
        className="border rounded p-3 w-80 mb-4 bg-white"
        placeholder="First Name"
        name="bookerFirstName"
        value={inputs.bookerFirstName}
        onChange={handleChangeInput}
      />
      <input
        type="text"
        className="border rounded p-3 w-80 mb-4 bg-white"
        placeholder="Last Name"
        name="bookerLastName"
        value={inputs.bookerLastName}
        onChange={handleChangeInput}
      />
      <input
        type="text"
        className="border rounded p-3 w-80 mb-4 bg-white"
        placeholder="Phone Number"
        name="bookerPhone"
        value={inputs.bookerPhone}
        onChange={handleChangeInput}
      />
      <input
        type="text"
        className="border rounded p-3 w-80 mb-4 bg-white"
        placeholder="Email"
        name="bookerEmail"
        value={inputs.bookerEmail}
        onChange={handleChangeInput}
      />
      <input
        type="text"
        className="border rounded p-3 w-80 mb-4 bg-white"
        placeholder="Occasion (optional)"
        name="bookerOccasion"
        value={inputs.bookerOccasion}
        onChange={handleChangeInput}
      />
      <input
        type="text"
        className="border rounded p-3 w-80 mb-4 bg-white"
        placeholder="Requests (optional)"
        name="bookerRequest"
        value={inputs.bookerRequest}
        onChange={handleChangeInput}
      />
      <button
        disabled={disabled}
        className="bg-red-600 w-full p-3 text-white font-bold rounded disabled:bg-gray-300"
        onClick={handleSubmit()}
      >
        Complete reservation
      </button>
      <p className="mt-4 text-sm">
        By clicking “Complete reservation” you agree to the OpenTable Terms of
        Use and Privacy Policy. Message & data rates may apply. You can opt out
        of receiving text messages at any time in your account settings or by
        replying STOP.
      </p>
    </div>
  );
}
