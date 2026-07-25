import { useQuery } from "@tanstack/react-query";

import api from "@/lib/api";

type ApiMember = {
  name: string;
  about: string;
  pronouns?: string;
  profile_picture?: string;
  social_media?: {
    link: string;
    socialMediaUserName: string;
  }[];
  pk: number;
};
// should be called strictly with member's integer uuid.
export function useMember(id: number | undefined) {
  return useQuery<ApiMember>({
    queryKey: ["member", id],
    queryFn: async () => {
      const response = await api.get(`/members/${id}/`);
      return response.data;
    },
    enabled: Number.isFinite(id),
  });
}
