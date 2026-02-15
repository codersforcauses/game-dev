import Image from "next/image";

import { ApiMember, useCommittee } from "@/hooks/useCommittee";

export default function AboutPage() {
  const { data: committee, isPending, error, isError } = useCommittee();

  const topRow: ApiMember[] = [];
  const bottomRow: ApiMember[] = [];
  //lists that will be populated with member objects in the committee
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
                Description of the clubs aims, why it exists, its mission, etc
                etc. Second paragraph here, a second paragraph would be pretty
                cool. The more info the better yippee!!
              </p>
              <p>
                Lorem ipsum dolor such and such I can&apos;t remember the rest.
              </p>
            </div>
          </div>
          <div className="relative aspect-[4/3] w-full flex-shrink-0 overflow-hidden rounded-2xl bg-light_2 md:w-96 lg:w-[32rem]">
            <div className="flex h-full w-full items-center justify-center">
              <Image
                src="/landing_placeholder.png"
                alt="/landing_placeholder.png"
                width={128}
                height={128}
                className="h-[90%] w-[90%]"
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

  if (isPending) {
    for (let i = 0; i < 8; i++) {
      if (i < 4) {
        topRow.push({
          name: "Loading...",
          pronouns: "",
          profile_picture: "/landing_placeholder.png",
          about: "",
        });
      } else {
        bottomRow.push({
          name: "Loading...",
          pronouns: "",
          profile_picture: "/landing_placeholder.png",
          about: "",
        });
      }
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
    for (let i = 0; i < 8; i++) {
      if (i < 4) {
        topRow.push(committee[i]);
      } else {
        bottomRow.push(committee[i]);
      }
    }
  }

  return (
    <main className="relative min-h-screen bg-background">
      {about}
      {/* Portraits Section - DARK - Full Width */}
      <section className="w-full bg-background px-6 py-10 pt-16 md:px-10">
        <div className="mx-auto max-w-6xl">
          {/* Top row - 4 Presidents */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            {topRow.map((member, idx) => (
              <div
                key={`top-${idx}`}
                className="flex flex-col items-start gap-0"
              >
                <div className="relative flex h-[11.25rem] w-[11.25rem] items-center justify-center bg-[url('/pixel-art-frame.svg')] bg-contain bg-center bg-no-repeat">
                  <Image
                    src={
                      member.profile_picture === null
                        ? "/landing_placeholder.png"
                        : member.profile_picture
                    }
                    alt="/landing_placeholder.png"
                    width={108}
                    height={108}
                    className="h-[7.25rem] w-[6.75rem]"
                  />
                </div>
                <div className="w-[11.25rem] pl-3 text-left font-firaCode text-[0.5rem] leading-tight">
                  <p className="inline-block bg-card px-2 py-1 text-white">
                    {member.name} {member.pronouns}
                  </p>
                  <p className="inline-block bg-card px-2 py-1 text-primary">
                    {roleOrder[idx]}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom row - 4 other roles */}
          <div className="mt-10 flex flex-wrap justify-center gap-6 md:gap-10">
            {bottomRow.map((member, idx) => (
              <div
                key={`bottom-${idx}`}
                className="flex flex-col items-start gap-0"
              >
                <div className="relative flex h-[11.25rem] w-[11.25rem] items-center justify-center bg-[url('/pixel-art-frame.svg')] bg-contain bg-center bg-no-repeat">
                  <Image
                    src={
                      member.profile_picture === null
                        ? "/landing_placeholder.png"
                        : member.profile_picture
                    }
                    alt="/landing_placeholder.png"
                    width={108}
                    height={108}
                    className="h-[7.25rem] w-[6.75rem]"
                  />
                </div>
                <div className="w-[11.25rem] pl-3 text-left font-firaCode text-[0.5rem] leading-tight">
                  <p className="inline-block bg-card px-2 py-1 text-white">
                    {member.name} {member.pronouns}
                  </p>
                  <p className="inline-block bg-card px-2 py-1 text-primary">
                    {roleOrder[4 + idx]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
