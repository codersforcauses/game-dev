import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import api from "@/lib/api";

type ApiContributorGameData = {
  name: string;
  thumbnail: string;
  description: string;
};

type ApiContributorGamesList = {
  game_id: number;
  role: string;
  game_data: ApiContributorGameData;
};

export const useContributor = (member: string | string[] | undefined) => {
  return useQuery<ApiContributorGamesList[], AxiosError>({
    queryKey: ["contributor", member],
    queryFn: async () => {
      const response = await api.get(`/games/contributor/${member}/`);
      return response.data;
    },
    enabled: !!member,
  });
};
