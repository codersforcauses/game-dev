import { useQueries, UseQueryResult } from "@tanstack/react-query";
import { AxiosError } from "axios";

import api from "@/lib/api";

// unused fields are ommitted because I'm lazy
export type GameData = {
  game_id: number;
  role: string;
  game_data: {
    name: string;
    description: string;
    thumbnail: string | null;
  };
};

export type ArtData = {
  art_id: number;
  artwork_data: {
    name: string;
    description: string;
    media: string | null;
  };
};

type UseContributorResult = {
  gamesRes: UseQueryResult<GameData[], AxiosError>;
  artRes: UseQueryResult<ArtData[], AxiosError>;
};

export const useContributor = (
  member: number | string[] | undefined,
): UseContributorResult => {
  const [gamesRes, artRes] = useQueries({
    queries: [
      {
        queryKey: ["gamecontributor", member],
        queryFn: async () => {
          const response = await api.get(`/games/contributor/${member}/`);
          return response.data;
        },
        enabled: !!member,
      },
      {
        queryKey: ["artcontributor", member],
        queryFn: async () => {
          const response = await api.get(`/arts/contributor/${member}/`);
          return response.data;
        },
      },
    ],
  }) as [
    UseQueryResult<GameData[], AxiosError>,
    UseQueryResult<ArtData[], AxiosError>,
  ];
  return { gamesRes, artRes };
};
