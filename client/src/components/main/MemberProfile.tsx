import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

export type MemberProfileProject = {
  id: string;
  name: string;
  description?: string;
  href?: string;
};

export type MemberProfileData = {
  name: string;
  pronouns?: string;
  profilePictureUrl?: string;
};

type MemberProfileProps = {
  member: MemberProfileData;
  projects?: MemberProfileProject[];
};
// GO COPILOT GO
//(idk if this is good but i cbf)
function initialsFromName(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export function MemberProfile({ member, projects = [] }: MemberProfileProps) {
  const hasProjects = projects.length > 0;
  const initials = initialsFromName(member.name) || "?";

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-10">
      <div className="rounded-md border border-border/20 bg-card p-6">
        <div className="grid gap-6 md:grid-cols-[160px_1fr] md:items-start">
          <div className="flex items-start justify-center md:justify-start">
            <div className="relative h-36 w-36 overflow-hidden rounded-md border border-border/20 bg-muted">
              {member.profilePictureUrl ? (
                <Image
                  src={member.profilePictureUrl}
                  alt={`${member.name} profile picture`}
                  fill
                  sizes="144px"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center font-jersey10 text-5xl text-muted-foreground">
                  {initials}
                </div>
              )}
            </div>
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <h1 className="min-w-0 font-jersey10 text-4xl text-primary">
                {member.name}
              </h1>
              {member.pronouns ? (
                <span className="rounded-md bg-muted px-2 py-1 font-firaCode text-sm text-muted-foreground">
                  {member.pronouns}
                </span>
              ) : null}
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-border/20 pt-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-jersey10 text-3xl text-secondary">Projects</h2>
            <Link
              href="/members_page"
              className="font-firaCode text-sm text-primary underline-offset-4 hover:underline"
            >
              Back to members
            </Link>
          </div>

          {hasProjects ? (
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => {
                const content = (
                  <div className="rounded-md border border-border/20 bg-background p-4">
                    <div className="font-firaCode text-sm text-foreground">
                      {project.name}
                    </div>
                    {project.description ? (
                      <p className="mt-2 line-clamp-3 font-firaCode text-xs text-muted-foreground">
                        {project.description}
                      </p>
                    ) : null}
                  </div>
                );

                return project.href ? (
                  <Link
                    key={project.id}
                    href={project.href}
                    className={cn(
                      "block rounded-md outline-none ring-offset-background",
                      "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    )}
                  >
                    {content}
                  </Link>
                ) : (
                  <div key={project.id}>{content}</div>
                );
              })}
            </div>
          ) : (
            <p className="mt-4 font-firaCode text-sm text-muted-foreground">
              No projects yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
