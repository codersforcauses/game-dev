"use client";

import Image from "next/image";
import { useRouter } from "next/router";
import { SocialIcon } from "react-social-icons";

import MemberProjectSection from "@/components/ui/MemberProjectSection";
import { useContributor } from "@/hooks/useContributor";
import { useMember } from "@/hooks/useMember";
// hook assumes correct input, page sanitises to correct type
function normaliseId(id: string | string[] | number | undefined) {
  if (typeof id === "number" && Number.isFinite(id)) {
    return id;
  }

  if (typeof id === "string") {
    const parsed = Number(id);
    return Number.isFinite(parsed) ? parsed : undefined;
  }

  return undefined;
}

export type MemberProfileData = {
  name: string;
  about: string;
  pronouns?: string;
  profile_picture?: string;
  social_media?: {
    link: string;
    socialMediaUserName: string;
  }[];
  pk: number;
};

function initialsFromName(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export default function MemberPage() {
  const router = useRouter();
  const id = normaliseId(router.query.id);

  const {
    data: member,
    isPending,
    isError,
  } = useMember(router.isReady ? id : undefined);
  const { gamesRes, artRes } = useContributor(id);

  if (!router.isReady || id === undefined) {
    return null;
  }

  if (isPending) {
    return null;
  }

  if (isError || !member) {
    return <p>Member not found</p>;
  }
  const games = gamesRes.data;
  const art = artRes.data;
  if (gamesRes.isError || !games || artRes.isError || !art) {
    const errorMessage =
      gamesRes.error?.response?.status === 404
        ? "Games not found."
        : "Failed to Load Games";
    return (
      <div className="mx-auto min-h-screen max-w-7xl px-6 py-16">
        <p
          className="my-10 text-center font-firaCode text-lg text-red-500"
          role="alert"
        >
          {errorMessage}
        </p>
      </div>
    );
  }

  const initials = initialsFromName(member.name);
  return (
    <>
      <div className="m-auto h-fit bg-card text-light-2">
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
              src="/pixel-art-frame.svg"
              alt="golden pixel art frame around profile picture"
              width={200}
              height={200}
              className="z-10"
            />
          </div>
          <div className="flex w-4/5 flex-col gap-2 rounded-md p-2.5 font-firaCode">
            <div className="flex">
              <p className="min-w-fit font-jersey10 text-4xl">{member.name}</p>
              <hr className="ml-5 hidden w-full self-center border-light-2 lg:flex" />
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
        <MemberProjectSection games={games} art={art} />
      </div>
    </>
  );
}
