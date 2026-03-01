import Link from "next/link";

import { ArtContributor } from "@/types/art-contributor";

interface ContributorsListProps {
  contributors: ArtContributor[];
}

export default function ContributorsList({
  contributors,
}: ContributorsListProps) {
  if (contributors.length === 0) {
    return null;
  }

  return (
    <>
      <div className="font-jersey10 text-2xl text-accent">Contributors</div>
      <div className="relative flex flex-col gap-3">
        {contributors.map((contributor) => (
          <div key={contributor.id} className="mb-2">
            <Link
              href={`/members/${contributor.member_id}`}
              className="text-accent hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              {contributor.member_name}
            </Link>
            {" - "}
            <span>{contributor.role}</span>
          </div>
        ))}
      </div>
    </>
  );
}
