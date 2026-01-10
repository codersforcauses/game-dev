import { Check, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/router";

import { useMember } from "@/hooks/useMember";

const ActiveBadge = () => {
  return (
    <div className="align-centre flex w-fit gap-1 rounded-lg bg-green-800 py-1 pe-3 ps-2">
      <Check />
      <p>active</p>
    </div>
  );
};

const InactiveBadge = () => {
  return (
    <div className="align-centre flex w-fit gap-1 rounded-lg bg-red-800 py-1 pe-3 ps-2">
      <X />
      <p>inactive</p>
    </div>
  );
};

export default function MemberPage() {
  const router = useRouter();
  const memberId = router.query.id as string;

  const { data: member, isPending, error } = useMember(parseInt(memberId));

  if (isPending) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-16 md:px-20">
        <p>Loading event...</p>
      </div>
    );
  }
  if (error) {
    return (
      <main className="mx-auto max-w-6xl px-6 py-16 md:px-20">
        <p className="text-red-500">Failed to load event.</p>
      </main>
    );
  }
  if (!member) {
    return (
      <main className="mx-auto max-w-6xl px-6 py-16 md:px-20">
        <p>No event data available.</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-16 md:px-20">
      <div className="flex gap-12">
        <Image
          src={member.profile_picture}
          alt={`Cover image for ${member.name}`}
          height={200}
          width={200}
          onError={(e) => {
            // Fallback to default image if load fails
            e.currentTarget.src = "/game_dev_club_logo.svg";
          }}
          className="rounded-full"
        />
        <div className="flex flex-col gap-4">
          <p className="font-jersey10 text-3xl">
            {member.name}{" "}
            <span className="font-firaCode text-sm text-primary">
              ({member.pronouns})
            </span>
          </p>
          {member.active ? <ActiveBadge /> : <InactiveBadge />}
          <p>{member.about}</p>
        </div>
      </div>
    </main>
  );
}
