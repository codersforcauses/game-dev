"use client";

import { useRouter } from "next/router";

import { useMember } from "@/hooks/useMember";

// import { Menu } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import { useState } from "react";

export function MemberProfile() {
  const router = useRouter();
  const id = Number(router.query.id);
  const { data: member, isLoading } = useMember(id);

  if (isLoading) {
    return <p>Loading member...</p>;
  }

  if (!member) {
    return <p>Member not found</p>;
  }
  return (
    <>
      <div className="m-auto min-h-80 w-4/5 bg-primary">
        <h1>hi</h1>
        <div className="mx-2 flex flex-wrap justify-center gap-y-5 lg:mx-10 lg:justify-start">
          <div className="mx-2 h-20 w-20 rounded-full bg-accent text-center lg:mx-10">
            profile picture
          </div>
          <div className="w-4/5 bg-muted p-2.5">
            <br />
            About
          </div>
        </div>
        <h2 className="mx-10 mt-5">Projects</h2>
        <div className="m-auto flex justify-center p-5">
          <div className="max-w-min border">1</div>
          <div className="max-w-min border">2</div>
          <div className="max-w-min border">3</div>
        </div>
      </div>
    </>
  );
}
