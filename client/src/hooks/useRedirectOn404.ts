import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";

export function useRedirectOn404(error?: AxiosError | null) {
  const router = useRouter();
  useEffect(() => {
    if (error?.response?.status == 404) router.push("/404");
  }, [error, router]);
}
