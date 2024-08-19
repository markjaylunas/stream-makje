import Heading from "@/components/ui/heading";
import { ReadMore } from "@/components/ui/read-more";
import ScoreDropdown from "@/components/ui/score-dropdown";
import WatchListDropdown from "@/components/ui/watchlist-dropdown";
import { AnimeUserStatus } from "@/db/schema";
import { AnimeInfo } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Button } from "@nextui-org/button";
import NextLink from "next/link";
import { ReactNode } from "react";
import InfoCover from "./info-cover";
import PosterMoreInfo from "./poster-more-info";

type Props = {
  anime: AnimeInfo;
  className?: string;
  children?: ReactNode;
  animeWatchStatus: AnimeUserStatus[];
};

export default function InfoSection({
  anime,
  className,
  children,
  animeWatchStatus,
}: Props) {
  return (
    <section className="relative">
      <InfoCover
        title={anime.name}
        cover={anime.cover}
        backupCover={anime.poster}
      />

      <section className="max-w-7xl z-0 px-4 sm:mx-auto -mt-16 sm:-mt-40 flex justify-start items-center sm:items-start flex-col sm:flex-row gap-6 sm:gap-12 ">
        <div className="space-y-2 z-10">
          <Heading
            className="block sm:hidden mx-8 text-center mt-5 text-shadow text-shadow-black text-shadow-x-1 text-shadow-y-1"
            order={"2xl"}
          >
            {anime.name}
          </Heading>

          <h3 className="flex sm:hidden text-xs mx-8 text-center mb-5 text-gray-400">
            {Array.from(new Set([anime.synonyms])).join(" | ")}
          </h3>
        </div>

        <PosterMoreInfo anime={anime} />

        <div className="flex z-10 flex-col gap-6">
          <section className={cn("space-y-6", className)}>
            <Heading className="hidden sm:block" order={"6xl"}>
              {anime.name}
            </Heading>
            <h2 className="hidden sm:block text-xs text-foreground-500">
              {Array.from(new Set([anime.synonyms])).join(" | ")}
            </h2>

            <div className="flex justify-start gap-2">
              <ScoreDropdown
                animeWatchStatus={
                  animeWatchStatus.length > 0 ? animeWatchStatus[0] : null
                }
                anime={{
                  id: anime.id || "",
                  title: anime.name,
                  image: anime.poster || "",
                  cover: anime.cover || "",
                }}
              />

              <WatchListDropdown
                animeWatchStatus={
                  animeWatchStatus.length > 0 ? animeWatchStatus[0] : null
                }
                anime={{
                  id: anime.id || "",
                  title: anime.name,
                  image: anime.poster || "",
                  cover: anime.cover || "",
                }}
              />
            </div>

            {anime.genres && (
              <div className="flex flex-wrap gap-2">
                {anime.genres.map((genre) => (
                  <Button
                    as={NextLink}
                    href={`/anime/genre/${genre}`}
                    key={genre}
                    color="secondary"
                    variant="bordered"
                    radius="full"
                    size="sm"
                  >
                    {genre}
                  </Button>
                ))}
              </div>
            )}

            <ReadMore
              className="indent-8 text-justify"
              text={
                anime.description ? `${anime.description}` : "No description"
              }
            />
          </section>

          {children}
        </div>
      </section>
    </section>
  );
}
