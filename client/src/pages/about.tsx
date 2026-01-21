import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { useCommittee } from "@/hooks/useCommittee";
import { useRouter } from "next/router";

export default function AboutPage() {
  //const router = useRouter();
  //const { id } = router.query;
  // don't know if necessary

  const { data: committee, isPending, error, isError } = useCommittee();

  const topRow: any[] = [];
  const bottomRow: any[] = [];
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

  if (isPending) {
    for (let i = 0; i < 8; i++) {
      if (i < 4) {
        topRow.push({ name: "Loading...", pronouns: "", role: "" });
      } else {
        bottomRow.push({ name: "Loading...", pronouns: "", role: "" });
      }
    }
  } else if (isError) {
    const errorMessage =
      error?.response?.status === 404
        ? "Committee Page not found."
        : "Failed to load Committee Page.";

    return (
      <main className="mx-auto min-h-screen max-w-6xl px-6 py-16 md:px-20">
        <p className="text-red-500" role="alert">
          {errorMessage}
        </p>
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
    <main className="min-h-screen bg-[#090A19]">
      <div className="mx-auto max-w-6xl space-y-20 px-6 py-16 md:px-20">
        <section className="flex flex-col justify-between gap-12 md:flex-row md:gap-20">
          <div className="flex-1">
            <h1 className="mb-4 font-jersey10 text-5xl text-[#9B9BDE] md:text-6xl">
              About Us
            </h1>
            <div
              className="mb-6 w-full border-t border-[#5E5ECC]"
              aria-hidden="true"
            />
            <div className="space-y-4 font-jersey10 text-base leading-relaxed text-white md:text-lg">
              <p>
                Description of the clubs aims, why it exists, its mission, etc
                etc. Second paragraph here, a second paragraph would be pretty
                cool. The more info the better yippee!!
              </p>
              <p>Lorem ipsum dolor such and such I can't remember the rest.</p>
            </div>
          </div>
          <div className="relative aspect-[4/3] w-full flex-shrink-0 overflow-hidden rounded-2xl bg-[#C5C5E8] md:w-96 lg:w-[512px]">
            <div className="flex h-full w-full items-center justify-center">
              <ImageIcon className="h-32 w-32 text-white/40" />
            </div>
          </div>
        </section>
      </div>

      {/* Our Committee Title Section - LIGHT - Full Width */}
      <section className="w-full bg-[#1B1F4C] px-6 py-6 md:px-10 md:py-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-jersey10 text-3xl text-white">Our Committee</h2>
        </div>
      </section>

      {/* Portraits Section - DARK - Full Width */}
      <section className="w-full bg-[#090A19] px-6 py-10 pt-16 md:px-10">
        <div className="mx-auto max-w-6xl">
          {/* Top row - 4 Presidents */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            {topRow.map((member, idx) => (
              <div
                key={`top-${idx}`}
                className="flex flex-col items-start gap-0"
              >
                <div
                  className="relative flex items-center justify-center bg-contain bg-center bg-no-repeat"
                  style={{
                    width: "180px",
                    height: "185px",
                    backgroundImage: "url('/frame.png')",
                  }}
                >
                  <Image
                    src={member.profile_picture}
                    alt=""
                    width={108}
                    height={1}
                    className="w-[106px] h-[106px] mb-3"
                  />
                </div>
                <div className="w-[180px] text-left font-firaCode text-[9px] leading-tight">
                  <p className="inline-block bg-[#1B1F4C] px-2 py-1 text-white">
                    {member.name} {member.pronouns}
                  </p>
                  <p className="inline-block bg-[#1B1F4C] px-2 py-1 text-[#9ca4fd]">
                    {roleOrder[idx]}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom row - 3 other roles */}
          <div className="mt-10 flex flex-wrap justify-center gap-6 md:gap-10">
            {bottomRow.map((member, idx) => (
              <div
                key={`bottom-${idx}`}
                className="flex flex-col items-start gap-0"
              >
                <div
                  className="relative flex items-center justify-center bg-contain bg-center bg-no-repeat"
                  style={{
                    width: "180px",
                    height: "185px",
                    backgroundImage: "url('/frame.png')",
                  }}
                >
                  <Image
                    src={member.profile_picture}
                    alt=""
                    width={108}
                    height={1}
                    className="w-[106px] h-[106px] mb-3"
                  />
                </div>
                <div className="w-[180px] text-left font-firaCode text-[9px] leading-tight">
                  <p className="inline-block bg-[#1B1F4C] px-2 py-1 text-white">
                    {member.name} {member.pronouns}
                  </p>
                  <p className="inline-block bg-[#1B1F4C] px-2 py-1 text-[#9ca4fd]">
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
