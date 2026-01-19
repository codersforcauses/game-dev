"use client";

import Image from "next/image";

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
  active: boolean;
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
      <div className="m-auto h-fit w-4/5 rounded-md bg-card">
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
              src="/frame.png"
              alt="golden pixel art frame around profile picture"
              className="z-10 mt-4 h-48 w-44"
            />
          </div>
          <div className="flex w-4/5 flex-col gap-2 rounded-md p-2.5 font-firaCode">
            <div className="font-jersey10 text-4xl">
              {" "}
              <div className="flex">
                <div className="min-w-fit">
                  <p>{member.name}</p>
                </div>
                <hr className="hidden lg:ml-5 lg:flex lg:w-full lg:self-center" />{" "}
              </div>{" "}
              <div className="font-firaCode text-lg">
                <p>{member.pronouns}</p>
              </div>
            </div>
            <p>{member.about}</p>
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
