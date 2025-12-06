import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import api from "@/lib/api";

type ApiEvent = {
  id: number;
  name: string;
  description: string;
  publicationDate: string;
  date: string;
  startTime: string | null;
  location: string;
  cover_image: string | null;
};

type UiEvent = {
  name: string;
  description: string;
  publicationDate: string;
  date: string;
  startTime?: string | null;
  location: string;
  coverImage: string;
};

/**
 * Normalizes Next.js router query parameter to a single string ID.
 * Handles both string and array formats from dynamic routes.
 */
function normalizeEventId(
  eventId: string | string[] | undefined,
): string | undefined {
  if (!eventId) return undefined;
  return typeof eventId === "string" ? eventId : eventId[0];
}

function transformApiEventToUiEvent(data: ApiEvent): UiEvent {
  return {
    name: data.name,
    description: data.description,
    publicationDate: data.publicationDate,
    date: data.date,
    startTime: data.startTime,
    location: data.location,
    coverImage: data.cover_image ?? "/game_dev_club_logo.svg",
  };
}

/**
 * Custom hook to fetch a single event by ID.
 *
 * @param eventId - Event ID from Next.js router query (can be string, string[], or undefined)
 * @returns React Query result with transformed UI event data
 *
 * @example
 * ```tsx
 * const { id } = router.query;
 * const { data: event, isPending, error } = useEvent(id);
 * ```
 */
export function useEvent(eventId: string | string[] | undefined) {
  const id = normalizeEventId(eventId);

  return useQuery<ApiEvent, AxiosError, UiEvent>({
    queryKey: ["events", id],
    queryFn: async () => {
      if (!id) {
        throw new Error("Event ID is required");
      }
      const response = await api.get<ApiEvent>(`/events/${id}/`);
      return response.data;
    },
    enabled: !!id,
    select: transformApiEventToUiEvent,
    retry: (failureCount, error) => {
      // Don't retry on 404 errors (event not found)
      if (error?.response?.status === 404) {
        return false;
      }
      // Retry up to 3 times for other errors
      return failureCount < 3;
    },
  });
}
