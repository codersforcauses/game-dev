import { useRouter } from "next/router";

import { useMember } from "@/hooks/useMember";

import { MemberProfile } from "../../components/main/MemberProfile";

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

export default function MemberPage() {
  const router = useRouter();
  const id = normaliseId(router.query.id);

  const {
    data: member,
    isPending,
    isError,
  } = useMember(router.isReady ? id : undefined);

  if (isPending) {
    return null;
  }

  if (isError || !member) {
    return <p>Member not found</p>;
  }

  return <MemberProfile member={member} />;
}
