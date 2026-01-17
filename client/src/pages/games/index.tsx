import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type Contributor = {
  name: string;
  role: string;
};

type ShowcaseGame = {
  game_id: number;
  game_name: string;
  description: string;
  game_description: string;
  contributors: Contributor[];
  game_cover_thumbnail?: string;
};

export default function HomePage() {
  const [showcases, setShowcases] = useState<ShowcaseGame[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/gameshowcaseAPI/")
      .then((res) => res.json())
      .then((data: ShowcaseGame[]) => {
        setShowcases(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <main className="mx-auto min-h-screen max-w-7xl px-6 py-16">
        <p>Loading games...</p>
      </main>
    );
  }

  return (
    <>
      <main className="mx-auto min-h-screen max-w-7xl px-6 py-16">
        <h1 className="mb-10 font-jersey10 text-4xl font-bold">
          Games Showcase
        </h1>

        {showcases.length === 0 ? (
          <p>No games available.</p>
        ) : (
          <div className="flex flex-col gap-16">
            {showcases.map((showcase, idx) => (
              <React.Fragment key={showcase.game_name + idx}>
                <div className="flex flex-col gap-8 rounded-xl bg-[#232345] p-8 lg:flex-row">
                  {/* Left: Cover Image */}
                  <div className="flex min-h-[400px] min-w-[350px] max-w-[600px] flex-1 items-center justify-center rounded-lg bg-[#c3c3f5]">
                    {showcase.game_cover_thumbnail ? (
                      <Image
                        src={showcase.game_cover_thumbnail}
                        alt={showcase.game_name + " cover"}
                        width={600}
                        height={350}
                        className="max-h-[350px] max-w-full rounded-lg object-contain"
                        style={{ width: "100%", height: "auto" }}
                        priority
                      />
                    ) : (
                      <div className="flex h-full w-full flex-col items-center justify-center">
                        <svg
                          width="80"
                          height="80"
                          fill="#232345"
                          viewBox="0 0 24 24"
                        >
                          <path d="M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2ZM5 5h14v10.17l-3.88-3.88a2 2 0 0 0-2.83 0L5 19V5Zm0 14v-.17l6.59-6.59a1 1 0 0 1 1.41 0L19 19H5Z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  {/* Right: Details */}
                  <div className="flex flex-1 flex-col justify-between rounded-lg border border-[#3a3a6a] bg-[#19192e] p-8">
                    <div>
                      {/* Title of the game */}
                      <h2 className="mb-4 font-jersey10 text-3xl font-bold tracking-wide text-[#9ca4fd]">
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
                      <p className="mb-6 text-lg text-gray-200">
                        {showcase.description}
                      </p>
                      <h3 className="mb-2 text-xl font-bold text-[#9ca4fd]">
                        Contributors
                      </h3>
                      <ul className="mb-4">
                        {showcase.contributors.map((contributor, cidx) => (
                          <li
                            key={contributor.name + cidx}
                            className="mb-2 flex items-center gap-4"
                          >
                            <span className="font-semibold text-gray-100">
                              {contributor.name}
                            </span>
                            <span className="text-gray-400">
                              – {contributor.role}
                            </span>
                            {/* Social icons placeholder */}
                            <span className="ml-auto flex gap-2">
                              <svg
                                width="24"
                                height="24"
                                fill="#9ca4fd"
                                viewBox="0 0 24 24"
                              >
                                <path d="M17 2H7a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5Zm3 15a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v10ZM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 8a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm4.5-8A1.5 1.5 0 1 0 16.5 8 1.5 1.5 0 0 0 16.5 7Z" />
                              </svg>
                              <svg
                                width="24"
                                height="24"
                                fill="#9ca4fd"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.34 3.608 1.314.974.974 1.252 2.241 1.314 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.34 2.633-1.314 3.608-.974.974-2.241 1.252-3.608 1.314-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.34-3.608-1.314-.974-.974-1.252-2.241-1.314-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.34-2.633 1.314-3.608C4.521 2.573 5.788 2.295 7.154 2.233 8.42 2.175 8.8 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.771.131 4.659.414 3.678 1.395 2.697 2.376 2.414 3.488 2.355 4.769 2.297 6.049 2.284 6.459 2.284 12c0 5.541.013 5.951.071 7.231.059 1.281.342 2.393 1.323 3.374.981.981 2.093 1.264 3.374 1.323C8.332 23.987 8.741 24 12 24s3.668-.013 4.948-.072c1.281-.059 2.393-.342 3.374-1.323.981-.981 1.264-2.093 1.323-3.374.058-1.28.071-1.69.071-7.231 0-5.541-.013-5.951-.071-7.231-.059-1.281-.342-2.393-1.323-3.374-.981-.981-2.093-1.264-3.374-1.323C15.668.013 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z" />
                              </svg>
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="mx-auto mt-4 max-w-5xl text-base text-gray-300">
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
