"use client";

import { Palette, Sparkles } from "lucide-react";
import Image from "next/image";
import { SocialIcon } from "react-social-icons";

import MemberProjectSection from "../ui/MemberProjectSection";

export type MemberProfileData = {
  name: string;
  about: string;
  pronouns?: string;
  profile_picture?: string;
  social_media?: {
    link: string;
    socialMediaUserName: string;
  }[];
};

type MemberProfileProps = {
  member: MemberProfileData;
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
                  <p className="mb-2"> {initials} </p>
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
            <div className="flex items-center gap-2">
              {member.social_media && member.social_media.length > 0 && (
                <div className="w-full">
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    {member.social_media.map((sm) => (
                      <span
                        key={sm.link}
                        className="ml-2 flex items-center gap-1"
                      >
                        <SocialIcon
                          url={sm.link}
                          style={{ height: 24, width: 24 }}
                        />
                        <a
                          href={sm.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-firaCode text-base underline hover:text-primary"
                        >
                          {sm.socialMediaUserName}
                        </a>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              <p className="text-lg">{member.pronouns}</p>
            </div>

            <p>{member.about}</p>
          </div>
        </div>
      </div>
      <div className="m-auto mb-10 min-h-80 w-11/12">
        <h2 className="mt-7 flex justify-center text-center font-jersey10 text-5xl">
          Games
          <Sparkles size={32} className="ml-2 self-center text-yellow-300" />
        </h2>
        <MemberProjectSection id={window.location.pathname.slice(9)} />
        <h2 className="mt-7 flex justify-center text-center font-jersey10 text-5xl">
          Artwork
          <Palette size={32} className="ml-2 self-center text-yellow-300" />
        </h2>
      </div>
    </>
  );
}
