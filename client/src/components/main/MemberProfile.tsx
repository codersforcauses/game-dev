"use client";

import { Sparkles } from "lucide-react";
import Image from "next/image";

import MemberProjectSection from "../ui/MemberProjectSection";

// unused atm, as the member isnt linked a project on the backend
/* export type MemberProfileProject = {
  id: string;
  name: string;
  description?: string;
  href?: string;
}; */

export type MemberProfileData = {
  name: string;
  about: string;
  pronouns?: string;
  profile_picture?: string;
};

type MemberProfileProps = {
  member: MemberProfileData;
  //projects?: MemberProfileProject[];
};

function initialsFromName(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export function MemberProfile({ member }: MemberProfileProps) {
  const initials = initialsFromName(member.name);

  return (
    <>
      <div className="m-auto h-fit bg-card text-light_2">
        <div className="mx-2 flex flex-wrap items-center justify-center gap-y-5 py-7 lg:mx-10">
          <div className="grid grid-cols-1 grid-rows-1 items-center justify-items-center lg:mr-6">
            <div className="absolute size-32 overflow-clip bg-accent text-center">
              {member.profile_picture ? (
                <Image
                  src={member.profile_picture}
                  alt={`${member.name} profile picture`}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center font-jersey10 text-5xl text-muted-foreground">
                  {initials}
                </div>
              )}
            </div>
            <Image
              src="/frame.svg"
              alt="golden pixel art frame around profile picture"
              width={176}
              height={192}
              className="z-0 h-48 w-44"
            />
          </div>
          <div className="flex w-4/5 flex-col gap-2 rounded-md p-2.5 font-firaCode">
            <div className="flex">
              <p className="min-w-fit font-jersey10 text-4xl">{member.name}</p>
              <hr className="ml-5 hidden w-full self-center border-light_2 lg:flex" />
            </div>
            <p className="text-lg">{member.pronouns}</p>
            <p>{member.about}</p>
          </div>
        </div>
      </div>
      <div className="m-auto min-h-80 w-11/12">
        <h2 className="mt-7 flex justify-center text-center font-jersey10 text-5xl">
          Projects{" "}
          <Sparkles size={32} className="ml-2 self-center text-yellow-300" />
        </h2>
        <MemberProjectSection id={window.location.pathname.slice(9)} />
      </div>
    </>
  );
}
