import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import api from "@/lib/api";

type ApiMember = {
  name: string;
  about: string;
  pronouns: string;
  profile_picture: string;
};

// return an api member type
export const useMember = (
  id: number,
  args?: Omit<UseQueryOptions<ApiMember>, "queryKey" | "queryFn">,
) => {
  return useQuery<ApiMember>({
    queryKey: ["member", id],
    queryFn: () => {
      return api.get(`/members/${id}/`).then((res) => res.data);
    },
    enabled: !!id,
    ...args,
  });
};
