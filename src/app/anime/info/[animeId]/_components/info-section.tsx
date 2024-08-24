import Heading from "@/components/ui/heading";
import { ReadMore } from "@/components/ui/read-more";
import ScoreDropdown from "@/components/ui/score-dropdown";
import ShareButton from "@/components/ui/share-button";
import WatchListDropdown from "@/components/ui/watchlist-dropdown";
import { AnimeUserStatus, KdramaUserStatus } from "@/db/schema";
import { ContentType, Info } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Button } from "@nextui-org/button";
import NextLink from "next/link";
import { ReactNode } from "react";
import InfoCover from "./info-cover";
import PosterMoreInfo from "./poster-more-info";

type Props = {
  contentType: ContentType;
  info: Info;
  className?: string;
  children?: ReactNode;
  watchStatus: AnimeUserStatus[] | KdramaUserStatus[];
  isGenreLinkDisabled?: boolean;
};

export default function InfoSection({
  contentType,
  info,
  className,
  children,
  watchStatus,
  isGenreLinkDisabled = false,
}: Props) {
  return (
    <section className="relative">
      <InfoCover
        title={info.name}
        cover={info.cover}
        backupCover={info.poster}
      />

      <section className="max-w-7xl z-0 px-4 sm:mx-auto -mt-16 sm:-mt-40 flex justify-start items-center sm:items-start flex-col sm:flex-row gap-6 sm:gap-12 ">
        <div className="space-y-2 z-10">
          <Heading
            className="block sm:hidden mx-8 text-center mt-5 text-shadow text-shadow-black text-shadow-x-1 text-shadow-y-1"
            order={"2xl"}
          >
            {info.name}
          </Heading>

          <h3 className="flex sm:hidden text-xs mx-8 text-center mb-5 text-gray-400">
            {Array.from(new Set([info.synonyms])).join(" | ")}
          </h3>
        </div>

        <PosterMoreInfo info={info} />

        <div className="flex z-10 flex-col gap-6">
          <section className={cn("space-y-6", className)}>
            <Heading className="hidden sm:block" order={"6xl"}>
              {info.name}
            </Heading>
            <h2 className="hidden sm:block text-xs text-foreground-500">
              {Array.from(new Set([info.synonyms])).join(" | ")}
            </h2>

            <div className="flex justify-start gap-2 flex-wrap">
              <ScoreDropdown
                contentType={contentType}
                watchStatus={watchStatus.length > 0 ? watchStatus[0] : null}
                info={{
                  id: info.id || "",
                  title: info.name,
                  image: info.poster || "",
                  cover: info.cover || "",
                }}
              />

              <WatchListDropdown
                contentType={contentType}
                watchStatus={watchStatus.length > 0 ? watchStatus[0] : null}
                info={{
                  id: info.id || "",
                  title: info.name,
                  image: info.poster || "",
                  cover: info.cover || "",
                }}
              />

              <ShareButton variant="flat">Share</ShareButton>
            </div>

            {info.genres && (
              <div className="flex flex-wrap gap-2">
                {info.genres.map((genre) => (
                  <Button
                    as={!isGenreLinkDisabled ? NextLink : undefined}
                    href={
                      !isGenreLinkDisabled
                        ? `/${contentType}/genre/${genre}`
                        : undefined
                    }
                    key={genre}
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
              text={info.description ? `${info.description}` : "No description"}
            />
          </section>

          {children}
        </div>
      </section>
    </section>
  );
}
