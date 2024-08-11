"use client";

import { Icons } from "@/components/ui/Icons";
import { Episode, EpisodeList } from "@/lib/types";
import { cn, encodeEpisodeId } from "@/lib/utils";
import { Button, ButtonGroup } from "@nextui-org/button";
import { Chip, Input, Listbox, ListboxItem } from "@nextui-org/react";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import NextLink from "next/link";
import { useParams } from "next/navigation";
import { useRef, useState } from "react";

type Props = {
  animeEpisodeList: EpisodeList;
  className?: string;
};

export default function EpisodeListSection({
  animeEpisodeList,
  className,
}: Props) {
  const { serverId, animeId, episodeSlug } = useParams<{
    animeId: string;
    serverId: string;
    episodeSlug: string[];
  }>();

  const episodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isListView, setIsListView] = useState(true);
  const [episodeSpotlight, setEpisodeSpotlight] = useState<number>(-1);

  // const handleEpisodeSearchChange = useDebouncedCallback((value: string) => {
  //   const episodeNumber = parseInt(value, 10);
  //   const episodeIndex = list.findIndex(
  //     (episode) => episode.number === episodeNumber
  //   );
  //   setEpisodeSpotlight(episodeNumber);

  //   if (episodeIndex !== -1 && episodeRefs.current[episodeIndex]) {
  //     episodeRefs.current[episodeIndex]?.scrollIntoView({
  //       behavior: "smooth",
  //       block: "center",
  //     });
  //   }
  //   return value;
  // }, 500);

  if (animeEpisodeList.list.length <= 0) return <UpcomingAnimeChip />;

  const { list, totalEpisodes } = animeEpisodeList;

  let activeEpisodeNumber = -1;
  let prevEpisode: Episode | null = null;
  let nextEpisode: Episode | null = null;
  let title = "";
  if (episodeSlug && episodeSlug.length > 0) {
    activeEpisodeNumber = parseInt(episodeSlug[1]);
    const episodeIndex = list.findIndex(
      (episode) => episode.number === activeEpisodeNumber
    );
    title = `You are watching episode ${activeEpisodeNumber} of ${totalEpisodes}  ${
      list[episodeIndex].title ? `- ${list[episodeIndex].title}` : ""
    }`;

    prevEpisode = list[episodeIndex - 1];
    nextEpisode = list[episodeIndex + 1];
  }

  const meltCDString = "U+1FAE0";
  const meltCD = parseInt(meltCDString.replace("U+", ""), 16);
  const meltCharacter = String.fromCodePoint(meltCD);

  const saluteCDString = "U+1FAE1";
  const saluteCD = parseInt(saluteCDString.replace("U+", ""), 16);
  const saluteCharacter = String.fromCodePoint(saluteCD);

  return (
    <section className={cn("space-y-3 min-w-[300px]", className)}>
      {activeEpisodeNumber && (
        <p className="text-gray-500 line-clamp-2 text-tiny">{title}</p>
      )}
      <div className="flex justify-start gap-3">
        <Button
          onPress={() => setIsListView((v) => !v)}
          isIconOnly
          variant="bordered"
          startContent={isListView ? <Icons.listOrdered /> : <Icons.grid />}
        />

        <Input
          type="number"
          aria-label="search episode number"
          startContent={<Icons.search />}
          className="max-w-32"
          placeholder="Episode #"
          // onValueChange={handleEpisodeSearchChange}
        />

        {activeEpisodeNumber > 0 && (
          <ButtonGroup variant="bordered">
            <Button
              as={NextLink}
              href={
                prevEpisode
                  ? `/${serverId}/info/${animeId}/watch/${encodeEpisodeId(
                      prevEpisode.episodeId
                    )}/${prevEpisode.number}`
                  : ""
              }
              isDisabled={!Boolean(prevEpisode)}
              startContent={<Icons.chevronDoubleLeft />}
            >
              {prevEpisode ? prevEpisode.number : saluteCharacter}
            </Button>
            <Button
              as={NextLink}
              href={
                nextEpisode
                  ? `/${serverId}/info/${animeId}/watch/${encodeEpisodeId(
                      nextEpisode.episodeId
                    )}/${nextEpisode.number}`
                  : ""
              }
              isDisabled={!Boolean(nextEpisode)}
              endContent={<Icons.chevronDoubleRight />}
            >
              {nextEpisode ? nextEpisode.number : meltCharacter}
            </Button>
          </ButtonGroup>
        )}
      </div>
      <ScrollShadow className="w-full max-h-[400px] scrollbar-thin scrollbar-corner-transparent scrollbar-thumb-stone-600 scrollbar-track-stone-600/50 ">
        {isListView ? (
          <Listbox
            aria-label="Single selection example"
            variant="flat"
            disallowEmptySelection
            selectionMode="single"
          >
            {list.map((episode, episodeIdx) => (
              <ListboxItem
                startContent={episode.number}
                color={episode.isFiller ? "warning" : "primary"}
                textValue={episode.title || `${episode.number}`}
                href={`/${serverId}/info/${animeId}/watch/${encodeEpisodeId(
                  episode.episodeId
                )}/${episode.number}`}
                className={cn(
                  "pl-2",
                  episodeSpotlight === episode.number && "text-secondary-500"
                )}
                endContent={
                  episode.number === activeEpisodeNumber ? (
                    <Icons.playFill className="size-3" />
                  ) : (
                    ""
                  )
                }
                key={episode.episodeId}
              >
                <div
                  ref={(el) => {
                    episodeRefs.current[episodeIdx] = el;
                  }}
                >
                  <span className="text-wrap line-clamp-1">
                    {episode.title}
                  </span>
                </div>
              </ListboxItem>
            ))}
          </Listbox>
        ) : (
          <div className="flex flex-wrap justify-start flex-grow gap-2 mx-auto">
            {list.map((episode, episodeIdx) => (
              <Button
                as={NextLink}
                href={`/${serverId}/info/${animeId}/watch/${encodeEpisodeId(
                  episode.episodeId
                )}/${episode.number}`}
                variant={
                  episode.number === episodeSpotlight ? "shadow" : "flat"
                }
                color="primary"
                key={episode.episodeId}
                isIconOnly
              >
                <div
                  ref={(el) => {
                    episodeRefs.current[episodeIdx] = el;
                  }}
                >
                  {episode.number === activeEpisodeNumber ? (
                    <Icons.playFill />
                  ) : (
                    episode.number
                  )}
                </div>
              </Button>
            ))}
          </div>
        )}
      </ScrollShadow>
    </section>
  );
}

const UpcomingAnimeChip = () => (
  <Chip radius="lg" variant="flat" className="w-full mx-auto h-fit px-8 py-4">
    <h3 className="text-center text-2xl font-bold text-warning">
      Upcoming Anime
    </h3>
    <p className="text-foreground-500 text-center text-pretty mt-2">
      This anime hasn&apos;t been released yet so no episodes are available. Add
      it to your{" "}
      <span className="text-secondary-500">&ldquo;Watchlist&ldquo;</span> to get
      notified when it&apos;s out!
    </p>
  </Chip>
);
