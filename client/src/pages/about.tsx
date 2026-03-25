import Image from "next/image";
import Link from "next/link";

import { ApiMember, useCommittee } from "@/hooks/useCommittee";

export default function AboutPage() {
  const { data: committee, isPending, error, isError } = useCommittee();

  const committeeList: ApiMember[] = [];
  //List that will be populated with member objects in the committee
  const roleOrder = [
    "President",
    "Vice President",
    "Secretary",
    "Treasurer",
    "Marketing",
    "Events OCM",
    "Projects OCM",
    "Fresher Rep",
  ];

  const about = (
    <>
      <div className="mx-auto max-w-6xl space-y-20 px-6 py-16 md:px-20">
        <section className="flex flex-col justify-between gap-12 md:flex-row md:gap-20">
          <div className="flex-1">
            <h1 className="mb-4 font-jersey10 text-5xl text-primary md:text-6xl">
              About Us
            </h1>
            <div className="mb-6 w-full border-t" aria-hidden="true" />
            <div className="space-y-4 font-sans text-base leading-relaxed text-white md:text-lg">
              <p>
                {/*>>Hardcoded description of the club to be altered<<*/}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur.
                {/*>>Hardcoded description of the club to be altered<<*/}
              </p>
            </div>
          </div>
          <div className="relative aspect-[4/3] w-full flex-shrink-0 overflow-hidden rounded-2xl bg-light_2 md:w-96 lg:w-[32rem]">
            <div className="flex h-full w-full items-center justify-center">
              <Image
                /*>>Hardcoded feature image to be altered.<<*/
                src="/landing_placeholder.png"
                /*>>Description of feature image - alter this alongside the feature image.<<*/
                alt="Placeholder Picture"
                fill={true}
              />
            </div>
          </div>
        </section>
      </div>
      {/* Our Committee Title Section - LIGHT - Full Width */}
      <section className="w-full bg-card px-6 py-6 md:px-10 md:py-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-jersey10 text-3xl text-light_2">Our Committee</h2>
        </div>
      </section>
    </>
  );

  function committeeImage(profilePic: string) {
    return (
      <div className="relative h-[8.75rem] w-[8.25rem] overflow-hidden">
        <Image
          src={profilePic === null ? "/landing_placeholder.png" : profilePic}
          alt="Placeholder Picture"
          fill
          className="object-cover object-center"
        />
      </div>
    );
  }

  function committeePortrait(committeeMember: ApiMember, id: number) {
    return (
      <>
        <div className="relative flex h-56 w-56 items-center justify-center bg-[url('/pixel-art-frame.svg')] bg-contain bg-center bg-no-repeat">
          {committeeMember.pk === 0 ? (
            committeeImage(committeeMember.profile_picture)
          ) : (
            <Link href={`/members/${committeeMember.pk}`}>
              {committeeImage(committeeMember.profile_picture)}
            </Link>
          )}
        </div>
        <div className="text-md max-w-56 pl-3 text-left font-firaCode leading-tight">
          <p className="inline-block text-white">
            <text className="inline-block bg-card px-2 py-1">
              {committeeMember.pk === 0 ? (
                <>{committeeMember.name}</>
              ) : (
                <Link href={`/members/${committeeMember.pk}`}>
                  {committeeMember.name}
                </Link>
              )}
            </text>
            <text className="inline-block bg-card px-2 py-1 empty:hidden">
              {committeeMember.pronouns}
            </text>
          </p>
          <p className="inline-block bg-card px-2 py-1 text-primary">
            {roleOrder[id]}
          </p>
        </div>
      </>
    );
  }

  if (isPending) {
    for (let i = 0; i < 8; i++) {
      committeeList.push({
        name: "Loading...",
        pronouns: "",
        profile_picture: "/landing_placeholder.png",
        about: "",
        pk: 0,
      });
    }
  } else if (isError) {
    const errorMessage =
      error?.response?.status === 404
        ? "Committee Members not found."
        : "Failed to load Committee Members.";

    return (
      <main className="relative min-h-screen bg-background">
        {about}
        <div className="mx-auto min-h-screen max-w-6xl px-6 py-16 md:px-20">
          <p className="text-red-500" role="alert">
            {errorMessage}
          </p>
        </div>
      </main>
    );
  } else {
    committeeList.push(...committee.slice(0, 8));
  }

  return (
    <main className="relative min-h-screen bg-background">
      {about}
      {/* Portraits Section - DARK - Full Width */}
      <section className="w-full bg-background px-6 py-10 pb-20 pt-16 md:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            {committeeList.map((member, idx) => (
              <div
                key={`top-${idx}`}
                className="flex flex-col items-start gap-0"
              >
                {committeePortrait(member, idx)}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
