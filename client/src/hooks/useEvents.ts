import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import api from "@/lib/api";

type ApiEvent = {
  id: number;
  name: string;
  description: string;
  publicationDate: string;
  date: string;
  location: string;
  cover_image: string | null;
};

export type UiEvent = Omit<ApiEvent, "cover_image"> & {
  coverImage: string;
};

function transformApiEventToUiEvent(data: ApiEvent): UiEvent {
  return {
    ...data,
    coverImage: data.cover_image ?? "/game_dev_club_logo.svg",
  };
}

export type EventTypeFilter = "past" | "upcoming";

type PaginatedResponse<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

export type EventsPageData = {
  items: UiEvent[];
  count: number;
  next: string | null;
  previous: string | null;
};

type UseEventsParams = {
  type?: EventTypeFilter;
  page?: number;
  pageSize?: number;
};

export function useEvents({
  type = "upcoming",
  page = 1,
  pageSize,
}: UseEventsParams = {}) {
  return useQuery<PaginatedResponse<ApiEvent>, AxiosError, EventsPageData>({
    queryKey: ["events", type, page, pageSize ?? "default"],
    queryFn: async () => {
      const response = await api.get<PaginatedResponse<ApiEvent>>("/events/", {
        params: {
          type,
          page,
          ...(pageSize ? { page_size: pageSize } : {}),
        },
      });
      return response.data;
    },
    select: (data) => ({
      items: data.results.map(transformApiEventToUiEvent),
      count: data.count,
      next: data.next,
      previous: data.previous,
    }),
  });
}
