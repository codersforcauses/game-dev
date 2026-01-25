import { useQuery } from "@tanstack/react-query";

import api from "@/lib/api";

type ApiMember = {
  name: string;
  about: string;
  pronouns?: string;
  profile_picture?: string;
};

// return api member, import id number from router
export const useMember = (id?: number) => {
  return useQuery<ApiMember>({
    queryKey: ["member", id],
    queryFn: async () => {
      const response = await api.get(`/members/${id}/`);
      return response.data;
    },
    enabled: Number.isFinite(id),
  });
};
