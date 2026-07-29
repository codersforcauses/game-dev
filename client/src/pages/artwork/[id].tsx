import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ArrowLeft, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { Button } from "@/components/ui/button";
import ContributorsList from "@/components/ui/ContributorsList";
import { useRedirectOn404 } from "@/hooks/useRedirectOn404";
import api from "@/lib/api";
import { Art } from "@/types/art";

export default function ArtworkPage() {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: artwork,
    error,
    isLoading,
  } = useQuery<Art, AxiosError>({
    queryKey: ["art", id],
    queryFn: async () => {
      const response = await api.get<Art>(`/arts/${id}/`);
      return response.data;
    },
    enabled: !!id,
    retry: (failureCount, error) => {
      if (error?.response?.status === 404) {
        return false;
      }
      return failureCount < 3;
    },
  });

  useRedirectOn404(error);

  if (isLoading || !artwork)
    return (
      <div className="text-l flex flex-col items-center gap-16 space-y-4 p-20 md:text-lg">
        <Loader2 className="mr-2 h-16 w-16 animate-spin" />
        Fetching artwork..... If you get stuck here, please send us a message!
        :)
      </div>
    );

  return (
    <main className="mx-auto max-w-6xl px-6 py-16 pb-36 md:px-20">
      <Link href="/artwork">
        <Button size="leftIcon" className="mb-5">
          <ArrowLeft /> Back to Showcase
        </Button>
      </Link>
      <div className="flex flex-col gap-12 pt-6 lg:flex-row">
        <div className="flex-shrink-0">
          <Image
            src={artwork.media ?? "/game_dev_club_logo.svg"}
            alt="Artwork image"
            width={500}
            height={500}
            className="h-auto w-auto object-contain"
            priority={false}
          />
        </div>

        <div className="flex flex-col justify-start rounded-sm bg-neutral-1 px-10 py-6">
          <p className="justify-start font-jersey10 text-5xl text-accent">
            {artwork.name}
          </p>
          <p className="mb-6">{artwork.description}</p>

          <ContributorsList contributors={artwork.contributors} />
        </div>
      </div>
    </main>
  );
}
