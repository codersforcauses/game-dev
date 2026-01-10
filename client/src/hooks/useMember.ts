import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

import api from "@/lib/api";

type MemberDetails = {
  name: string;
  active: boolean;
  profile_picture: string;
  about: string;
  pronouns: string;
};

export const useMember = (
  userId: number,
  args?: Omit<
    UseQueryOptions<MemberDetails, AxiosError>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery<MemberDetails, AxiosError>({
    ...args,
    queryKey: ["member", userId],
    queryFn: () => api.get(`/members/${userId}/`).then((res) => res.data),
  });
};
