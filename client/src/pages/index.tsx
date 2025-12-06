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
    <div className={cn("flex min-h-screen flex-col items-center gap-4 p-24")}>
      <h1 className="font-jersey10 text-4xl text-primary">Test title</h1>
      <h2 className="font-firaCode text-xl text-secondary">Test subtitle</h2>
      <Button onClick={() => setClicked(true)}>
        {isLoading ? "Loading" : "Ping"}
      </Button>
      <p>
        Response from server: <span>{data as string}</span>
      </p>
    </div>
  );
}
