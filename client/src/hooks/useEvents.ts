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

type UiEvent = Omit<ApiEvent, "cover_image"> & {
  coverImage: string;
};

function transformApiEventToUiEvent(data: ApiEvent): UiEvent {
  return {
    ...data,
    coverImage: data.cover_image ?? "/game_dev_club_logo.svg",
  };
}

export type EventTypeFilter = "past" | "upcoming";

export function useEvents(type: EventTypeFilter = "upcoming") {
  return useQuery<ApiEvent[], AxiosError, UiEvent[]>({
    queryKey: ["events", type],
    queryFn: async () => {
      const response = await api.get<ApiEvent[]>("/events/", {
        params: { type },
      });
      return response.data;
    },
    select: (data) => data.map(transformApiEventToUiEvent),
  });
}
