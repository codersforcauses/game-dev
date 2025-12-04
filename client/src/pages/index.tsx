import { useState } from "react";

import { usePings } from "@/hooks/pings";
import { cn } from "@/lib/utils";

import { Button } from "../components/ui/button";

export default function Home() {
  const [clicked, setClicked] = useState(false);
  const { data, isLoading } = usePings({
    enabled: clicked,
  });

  return (
    <div className={cn("flex min-h-screen w-full flex-col bg-background")}>
      <main className="flex flex-1 flex-col items-center gap-6 px-6 py-12 md:px-12 lg:px-24">
        <div className="flex w-full max-w-4xl flex-col items-center gap-4 text-center">
          <h1 className="font-jersey10 text-4xl text-primary">Test title</h1>
          <h2 className="font-firaCode text-xl text-secondary">
            Test subtitle
          </h2>
          <Button onClick={() => setClicked(true)}>
            {isLoading ? "Loading" : "Ping"}
          </Button>
          <p>
            Response from server: <span>{data as string}</span>
          </p>
        </div>
      </main>
    </div>
  );
}
