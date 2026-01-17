"use client";

// import { Menu } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import { useState } from "react";

export function MemberProfile() {
  return (
    <>
      <div className="m-auto h-fit w-4/5 rounded-md bg-card">
        <div className="mx-2 flex flex-wrap justify-center gap-y-5 py-10 lg:mx-10">
          <div className="mr-2 size-32 overflow-clip rounded-full bg-accent text-center lg:mr-10">
            profile picture
          </div>
          <div className="flex w-4/5 flex-col gap-2 rounded-md p-2.5 font-firaCode">
            <div className="font-jersey10 text-4xl">
              {" "}
              <div className="flex">
                <div className="min-w-fit">Jane Doe</div>
                <hr className="hidden lg:ml-5 lg:flex lg:w-full lg:self-center" />{" "}
              </div>{" "}
              <div className="font-firaCode text-lg"> they/them </div>
            </div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </div>
        </div>
      </div>
      <div className="m-auto min-h-80 w-4/5">
        <h2 className="mx-10 mt-5 font-jersey10 text-5xl">Projects</h2>
        <div className="m-auto flex justify-center p-5">
          <div className="max-w-min border">1</div>
          <div className="max-w-min border">2</div>
          <div className="max-w-min border">3</div>
        </div>
      </div>
    </>
  );
}
