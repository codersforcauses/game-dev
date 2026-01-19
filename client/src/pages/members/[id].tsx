import { useRouter } from "next/router";

import { useMember } from "@/hooks/useMember";

import { MemberProfile } from "../../components/main/MemberProfile";

export default function MemberPage() {
  const router = useRouter();
  const id = Number(router.query.id);
  const { data: member, isLoading, isError } = useMember(id);

  if (isLoading) {
    return <p>Loading member...</p>;
  }

  // currently displays member not found but can be improved with routing to 404 page (issue #46) :)
  //
  if (isError || !member) {
    return <p>Member not found</p>;
  }

  return <MemberProfile member={member} />;
}
