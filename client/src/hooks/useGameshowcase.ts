import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import api from "@/lib/api";

type Contributor = {
  name: string;
  role: string;
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

function getGameCoverUrl(
  game_cover_thumbnail: string | null | undefined,
): string {
  if (!game_cover_thumbnail) return "/game_dev_club_logo.svg";
  if (game_cover_thumbnail.startsWith("http")) return game_cover_thumbnail;
  // Use environment variable for Django backend base URL
  const apiBaseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";
  return `${apiBaseUrl}${game_cover_thumbnail}`;
}

function transformApiShowcaseGameToUi(data: ApiShowcaseGame): UiShowcaseGame {
  return {
    ...data,
    gameCover: getGameCoverUrl(data.game_cover_thumbnail),
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
