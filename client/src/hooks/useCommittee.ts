import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import api from "@/lib/api";

export type ApiMember = {
  name: string;
  profile_picture: string;
  pronouns: string;
  about: string;
  social_media?: {
    link: string;
    socialMediaUserName: string;
  }[];
  pk: number;
};

export function useCommittee() {
  return useQuery<ApiMember[], AxiosError>({
    queryKey: ["role"],
    queryFn: async () => {
      const response = await api.get<ApiMember[]>("/about/");
      console.log(response.data);
      return response.data;
    },
    retry: (failureCount, error) => {
      if (error?.response?.status === 404) {
        return false;
      }
      return failureCount < 3;
    },
  });
}
