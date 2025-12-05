import { useQuery } from "@tanstack/react-query";

import api from "@/lib/api";

type ApiEvent = {
  id: number;
  name: string;
  description: string;
  publicationDate: string;
  location: string;
  cover_image: string | null;
};

type UiEvent = {
  name: string;
  description: string;
  publicationDate: string;
  location: string;
  coverImage: string;
};

function transformApiEventToUiEvent(data: ApiEvent): UiEvent {
  return {
    name: data.name,
    description: data.description,
    publicationDate: data.publicationDate,
    location: data.location,
    coverImage: data.cover_image ?? "/game_dev_club_logo.svg",
  };
}

export function useEvent(eventId: string | string[] | undefined) {
  const id = typeof eventId === "string" ? eventId : eventId?.[0];

  return useQuery<ApiEvent, Error, UiEvent>({
    queryKey: ["events", id],
    queryFn: async () => {
      if (!id) throw new Error("Event ID is required");
      const response = await api.get<ApiEvent>(`/api/events/${id}/`);
      return response.data;
    },
    enabled: !!id,
    select: transformApiEventToUiEvent,
    retry: (failureCount, error) => {
      // Don't retry on 404 errors
      if (error && "response" in error) {
        const axiosError = error as { response?: { status?: number } };
        if (axiosError.response?.status === 404) {
          return false;
        }
      }
      return failureCount < 3;
    },
  });
}
