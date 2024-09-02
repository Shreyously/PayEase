"use client";

interface Appbartype {
  user?: {
    name?: string | null;
  };
  onSignin: any;
  onSignout: any;
}

import { useState } from "react";
import { Button } from "./button";
import { useRouter } from "next/navigation";
export function Appbar({ user, onSignin, onSignout }: Appbartype) {
  const [smallScreen, setSmallScreen] = useState(false);
  const router = useRouter();


  
  return (
    <div className="flex items-center justify-between border-b   py-3 ">
      <div className="text-4xl  text-Myblue pl-6 lg:pl-36 font-bold content-center">
        PayEase
      </div>
      <div className="flex px-6 lg:pr-72">
        <div className="">
          <Button onClick={user ? onSignout : onSignin}>
            {user ? "Logout" : "Log in"}
          </Button>
          {user ? (
            <div
              onClick={() => {
                setSmallScreen(!smallScreen);
              }}
              className=" cursor-pointer lg:hidden"
            >
              {BurgerMenu()}
            </div>
          ) : (
            <button
              onClick={() => {
                onSignin();
              }}
              className="lg:hidden text-white bg-black px-8 py-2 font-montserrat  border-2 rounded-lg "
            >
              Log in
            </button>
          )}
          {smallScreen && (
            <div className=" lg:hidden fixed inset-0 bg-gradient-to-b from-blue-100 to-white  ">
              <div className="flex justify-end p-6">
                <button
                  onClick={() => {
                    setSmallScreen(!smallScreen);
                  }}
                  className="text-black hover:scale-125"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
              </div>
              <div className=" px-2 mt-16 font-rubikone text-center text-black   text-2xl">
                <div
                  onClick={() => {
                    setSmallScreen(!smallScreen);
                    router.push("/home");
                  }}
                  className="cursor-pointer hover:bg-Myblue my-1 hover:text-white  py-1 hover:scale-125"
                >
                  Home
                </div>
                <div
                  onClick={() => {
                    setSmallScreen(!smallScreen);
                    router.push("/topup");
                  }}
                  className="cursor-pointer hover:bg-Myblue  my-1 py-1 hover:scale-125 hover:text-white "
                >
                  Topup wallet
                </div>
                <div
                  onClick={() => {
                    setSmallScreen(!smallScreen);
                    router.push("/moneyTransfer");
                  }}
                  className="cursor-pointer hover:bg-Myblue hover:scale-125 my-1 hover:text-white py-1"
                >
                  Transfer money
                </div>
                <div
                  className="cursor-pointer hover:bg-Myblue my-1 py-1 hover:text-white hover:scale-125 "
                  onClick={user ? onSignout : onSignin}
                >
                  {" "}
                  {user ? "Logout" : "Login"}{" "}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

//  svg from HeroIcons //
function BurgerMenu() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-7 "
    >
      <path
        fill-rule="evenodd"
        d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
        clip-rule="evenodd"
      />
    </svg>
  );
}
