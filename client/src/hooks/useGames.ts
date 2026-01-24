import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import api from "@/lib/api";

type Contributor = {
  member_id: number;
  name: string;
  role: string;
};

type ApiGame = {
  name: string;
  description: string;
  completion: number;
  active: boolean;
  hostURL: string;
  // TO DO: Add support for no itchEmbedID for non-itch games
  itchEmbedID: string;
  thumbnail: string | null;
  event: number | null;
  contributors: Contributor[];
};

type UiGame = Omit<ApiGame, "thumbnail"> & {
  gameCover: string;
};

/**
 * Normalizes Next.js router query parameter to a single string ID.
 * Handles both string and array formats from dynamic routes.
 */
function normalizeGameId(
  gameId: string | string[] | undefined,
): string | undefined {
  if (!gameId) return undefined;
  return typeof gameId === "string" ? gameId : gameId[0];
}

function transformApiGameToUiGame(data: ApiGame): UiGame {
  return {
    ...data,
    gameCover: data.thumbnail ?? "/game_dev_club_logo.svg",
  };
}

/**
 * Custom hook to fetch a single game by ID.
 *
 * @param gameId - game ID from Next.js router query (can be string, string[], or undefined)
 * @returns React Query result with transformed UI game data
 *
 * @example
 * ```tsx
 * const { id } = router.query;
 * const { data: game, isPending, error } = useGame(id);
 * ```
 */
export function useGame(gameId: string | string[] | undefined) {
  const id = normalizeGameId(gameId);

  return useQuery<ApiGame, AxiosError, UiGame>({
    queryKey: ["games", id],
    queryFn: async () => {
      if (!id) {
        throw new Error("Game ID is required");
      }
      const response = await api.get<ApiGame>(`/games/${id}/`);
      return response.data;
    },
    enabled: !!id,
    select: transformApiGameToUiGame,
    retry: (failureCount, error) => {
      if (error!.response?.status === 404) {
        return false;
      }
      return failureCount < 3;
    },
  });
}
