import Image from "next/image";
import Link from "next/link";
import React from "react";

import { useGameshowcase } from "@/hooks/useGameshowcase";

export default function HomePage() {
  const { data: showcases, isPending, isError, error } = useGameshowcase();

  if (isPending) {
    return (
      <main className="mx-auto min-h-screen max-w-7xl px-6 py-16">
        <p>Loading games...</p>
      </main>
    );
  }

  if (isError) {
    const errorMessage =
      error?.response?.status === 404
        ? "Games not found."
        : "Failed to Load Games";
    return (
      <main className="mx-auto min-h-screen max-w-7xl px-6 py-16">
        <p className="text-red-500" role="alert">
          {errorMessage}
        </p>
      </main>
    );
  }

  return (
    <>
      <div
        className="mb-10 w-screen px-4 py-6"
        style={{
          background: "#23255A",
          marginLeft: "calc(50% - 50vw)",
          marginRight: "calc(50% - 50vw)",
        }}
      >
        <h1
          className="text-left font-jersey10 text-4xl font-bold text-primary"
          style={{ marginLeft: "10%" }}
        >
          Game Showcase
        </h1>
      </div>
      <main className="mx-auto min-h-screen max-w-7xl px-6 py-16">
        {!showcases || showcases.length === 0 ? (
          <p>No games available.</p>
        ) : (
          <div className="flex flex-col gap-16">
            {showcases.map((showcase, idx) => (
              <React.Fragment key={showcase.game_name + idx}>
                <div
                  className={`flex flex-col gap-8 rounded-xl p-8 ${idx % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}
                >
                  {/* Left: Cover Image */}
                  <div className="bg-logo-blue-1 flex min-h-[400px] min-w-[350px] max-w-[600px] flex-1 items-center justify-center overflow-hidden rounded-xl">
                    {showcase.gameCover ? (
                      <Image
                        src={showcase.gameCover}
                        alt={showcase.game_name + " cover"}
                        width={600}
                        height={350}
                        className="h-full w-full object-cover"
                        priority
                      />
                    ) : (
                      <div className="flex h-full w-full flex-col items-center justify-center">
                        <svg
                          width="80"
                          height="80"
                          className="fill-neutral-1"
                          viewBox="0 0 24 24"
                        >
                          <path d="M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2ZM5 5h14v10.17l-3.88-3.88a2 2 0 0 0-2.83 0L5 19V5Zm0 14v-.17l6.59-6.59a1 1 0 0 1 1.41 0L19 19H5Z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  {/* Right: Details */}
                  <div className="flex flex-1 flex-col justify-between rounded-lg border-2 border-solid border-neutral_3 p-8 shadow-lg">
                    <div>
                      {/* Title of the game */}
                      <h2 className="mb-4 font-jersey10 text-3xl font-bold tracking-wide text-primary">
                        <Link
                          href={
                            showcase.game_id
                              ? `/games/${showcase.game_id}`
                              : "#"
                          }
                        >
                          <span className="cursor-pointer hover:underline">
                            {showcase.game_name}
                          </span>
                        </Link>
                      </h2>
                      {/* Comments from committes */}
                      <p className="mb-6 text-lg text-foreground">
                        {showcase.description}
                      </p>
                      <h3 className="mb-2 text-xl font-bold text-primary">
                        Contributors
                      </h3>
                      <ul className="mb-4">
                        {showcase.contributors.map((contributor, cidx) => (
                          <li
                            key={contributor.name + cidx}
                            className="mb-2 flex items-center gap-4"
                          >
                            <span className="font-semibold text-foreground">
                              {contributor.name}
                            </span>
                            <span
                              className="text-foreground"
                              style={{ marginLeft: 20 }}
                            >
                              - {contributor.role}
                            </span>
                            {/* Social icons placeholder */}
                            {/* TODO: Add actual links */}
                            <span className="flex gap-2 text-primary">
                              {/* Facebook icon */}
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                              >
                                <path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.326 24h11.495v-9.294H9.691v-3.622h3.13V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0" />
                              </svg>
                              {/* Instagram icon */}
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                              >
                                <path d="M17 2H7a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5Zm3 15a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v10ZM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 8a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm4.5-8A1.5 1.5 0 1 0 16.5 8 1.5 1.5 0 0 0 16.5 7Z" />
                              </svg>
                              {/* Github icon */}
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                              >
                                <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.157-1.11-1.465-1.11-1.465-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .268.18.579.688.481C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z" />
                              </svg>
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="mx-auto mt-4 w-full max-w-[1280px] px-8 text-base text-light_2">
                  {showcase.game_description}
                </div>
              </React.Fragment>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
