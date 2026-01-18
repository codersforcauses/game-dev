import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import api from "@/lib/api";

type ApiMember = {
  name: string;
  about: string;
  pronouns: string;
  profile_picture?: string;
  active: boolean;
};

// return api member, import id number from router
export const useMember = (
  id: number,
  args?: Omit<UseQueryOptions<ApiMember>, "queryKey" | "queryFn">,
) => {
  return useQuery<ApiMember>({
    queryKey: ["member", id],
    queryFn: async () => {
      const res = await api.get(`/members/${id}/`);
      return res.data;
    },
    enabled: !!id,
    ...args,
  });
};
