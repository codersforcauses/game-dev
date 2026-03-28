import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import api from "@/lib/api";

type Contributor = {
  name: string;
  role: string;
  social_media?: {
    socialMediaName: string;
    link: string;
    socialMediaUserName: string;
  }[];
};

type ApiShowcaseGame = {
  game_id: number;
  game_name: string;
  description: string;
  game_description: string;
  contributors: Contributor[];
  game_cover_thumbnail?: string | null;
};

type UiShowcaseGame = Omit<ApiShowcaseGame, "game_cover_thumbnail"> & {
  gameCover: string;
};

function transformApiShowcaseGameToUi(data: ApiShowcaseGame): UiShowcaseGame {
  return {
    ...data,
    gameCover: data.game_cover_thumbnail ?? "/game_dev_club_logo.svg",
  };
}

export function useGameshowcase() {
  return useQuery<ApiShowcaseGame[], AxiosError, UiShowcaseGame[]>({
    queryKey: ["showcaseGames"],
    queryFn: async () => {
      const res = await api.get<ApiShowcaseGame[]>("/gameshowcase/");
      return res.data;
    },
    select: (data) => data.map(transformApiShowcaseGameToUi),
    retry: (failureCount, error) => {
      if (error?.response?.status === 404) return false;
      return failureCount < 3;
    },
  });
}
