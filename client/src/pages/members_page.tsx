import { MemberProfile } from "../components/main/MemberProfile";

export default function MemberPage() {
  return (
    <MemberProfile
      member={{
        name: "Jane Doe",
        pronouns: "she/her",
      }}
      projects={[
        {
          id: "project-1",
          name: "Project 1",
          description: "A small description of the project.",
          href: "/projects/project-1",
        },
        {
          id: "project-2",
          name: "Project 2",
          description: "Another project highlight.",
          href: "/projects/project-2",
        },
      ]}
    />
  );
}
