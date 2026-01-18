import { useRouter } from "next/router";

import { useMember } from "@/hooks/useMember";

import { MemberProfile } from "../../components/main/MemberProfile";

export default function MemberPage() {
  const router = useRouter();
  const id = Number(router.query.id);
  const { data: member, isLoading } = useMember(id);

  if (isLoading) {
    return <p>Loading member...</p>;
  }
  if (!member) {
    return <p>Member not found</p>;
  }
  return <MemberProfile member={member} />;
}
