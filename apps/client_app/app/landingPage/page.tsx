"use client";
import React from "react";
import { AppbarClient } from "../components/AppbarClient";
import { FlipWords } from "../components/ui/flip-word";
import { signIn } from "next-auth/react";
const LandingPage = () => {
  const words = ["Quickly!", "Safely!", "Seamlessly!"];
  return (
    <div>
      <AppbarClient />
      <div className=" h-screen text-center justify-center items-center pt-40 lg:pt-72">
        <div className="font-serif text-6xl pb-6 flex justify-center items-center flex-wrap">
          <span>Transfer </span>
          <FlipWords words={words} />
          <span>with PayEase</span>
        </div>
        <p className="font-sans font-semibold text-gray-400 mb-4">
          Effortlessly manage, add, and track your funds. Welcome to a smarter
          way to handle your money.
        </p>
        <div>
          <button
            onClick={() => {
              signIn();
            }}
            className=" text-white bg-heheblu px-8 py-2 font-montserrat  border-2 rounded-lg "
          >
            Get Started!
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
