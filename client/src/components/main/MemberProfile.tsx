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
      <div className="m-auto h-fit rounded-md bg-card">
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
              width={1200}
              height={1200}
              className="z-0 mt-4 h-48 w-44"
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
      <div className="m-auto min-h-80 w-11/12">
        <h2 className="mt-7 text-center font-jersey10 text-5xl">Projects</h2>
        <div className="m-auto my-5 flex flex-wrap justify-center gap-8">
          <div className="w-fit rounded-md p-5">
            <p className="mb-2 h-44 w-96 rounded-md bg-[#CED1FE] p-5 text-[#1B1F4C]">
              Image + Link to Project Here
            </p>
            <p className="font-firaCode text-xl font-semibold">
              {" "}
              Project Title{" "}
            </p>
            <p className="text-md line-clamp-1 font-firaCode text-[#9CA4FD]">
              {" "}
              Project description{" "}
            </p>
          </div>
          <div className="w-fit rounded-md p-5">
            <p className="mb-2 h-44 w-96 rounded-md bg-[#CED1FE] p-5 text-[#1B1F4C]">
              Image + Link to Project Here
            </p>
            <p className="font-firaCode text-xl font-semibold">
              {" "}
              Project Title{" "}
            </p>
            <p className="line-clamp-1 font-firaCode text-[#9CA4FD]">
              {" "}
              Project description{" "}
            </p>
          </div>
          <div className="w-fit rounded-md p-5">
            <p className="mb-2 h-44 w-96 rounded-md bg-[#CED1FE] p-5 text-[#1B1F4C]">
              Image + Link to Project Here
            </p>
            <p className="font-firaCode text-xl font-semibold">
              {" "}
              Project Title{" "}
            </p>
            <p className="line-clamp-1 font-firaCode text-[#9CA4FD]">
              {" "}
              Project description{" "}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
