import Heading from "@/components/ui/heading";
import { ReadMore } from "@/components/ui/read-more";
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
};

export default function InfoSection({ anime, className, children }: Props) {
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
            className="block sm:hidden mx-8 text-center mt-5"
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

            {anime.genres && (
              <div className="flex flex-wrap gap-2">
                {anime.genres.map((genre) => (
                  <Button
                    as={NextLink}
                    href={`/s1/genre?genres=[${genre}]`}
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
