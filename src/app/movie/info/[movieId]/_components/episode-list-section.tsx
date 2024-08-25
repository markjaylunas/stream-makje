"use client";

import { SvgIcon } from "@/components/ui/svg-icons";
import { Episode, EpisodeList } from "@/lib/types";
import { cn, createURL } from "@/lib/utils";
import { Button } from "@nextui-org/button";
import { Chip, Listbox, ListboxItem } from "@nextui-org/react";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import NextLink from "next/link";
import { useParams } from "next/navigation";
import { MutableRefObject, useMemo, useRef, useState } from "react";

type Props = {
  episodeList: EpisodeList;
  episodeTitle?: string;
  currentEpisodeNumber?: number;
  className?: string;
};

export default function EpisodeListSection({
  episodeList,
  episodeTitle,
  currentEpisodeNumber,
  className,
}: Props) {
  const { movieId } = useParams<{
    movieId: string;
  }>();

  const ref = useRef<(HTMLDivElement | null)[]>([]);
  const [isListView, setIsListView] = useState(true);
  const [sort, setSort] = useState<"asc" | "desc">("asc");
  const sortedList = useMemo(
    () =>
      episodeList.list.sort((a, b) =>
        sort === "asc" ? a.number - b.number : b.number - a.number
      ),
    [sort, episodeList]
  );

  const description =
    currentEpisodeNumber &&
    `You are watching episode ${currentEpisodeNumber} of ${episodeList.totalEpisodes}`;

  if (episodeList.list.length <= 0)
    return (
      <Chip
        radius="lg"
        variant="flat"
        color="warning"
        className="w-full mx-auto h-fit px-8 py-4"
      >
        <h3 className="text-center text-xl font-bold text-warning">
          Episodes Coming Soon
        </h3>

        <p className="text-foreground-500 text-center text-pretty mt-2">
          This movie is set to captivate audiences with its intriguing storyline
          and unforgettable characters. Stay tuned for the release of upcoming
          episodes. Check back regularly for updates and be among the first to
          watch as the story unfolds!
        </p>
      </Chip>
    );

  return (
    <section className={cn("space-y-2 min-w-[300px]", className)}>
      {currentEpisodeNumber && (
        <p className="text-gray-500 line-clamp-3">{description}</p>
      )}
      <div className="flex justify-start gap-2">
        <Button
          onPress={() => setSort((v) => (v === "asc" ? "desc" : "asc"))}
          isIconOnly
          variant="bordered"
          startContent={
            sort === "asc" ? (
              <SvgIcon.sortAscending />
            ) : (
              <SvgIcon.sortDescending />
            )
          }
        />
        <Button
          onPress={() => setIsListView((v) => !v)}
          isIconOnly
          variant="bordered"
          startContent={isListView ? <SvgIcon.listOrdered /> : <SvgIcon.grid />}
        />
      </div>

      <ScrollShadow className="w-full max-h-[580px] pb-4 scrollbar-thin scrollbar-corner-transparent scrollbar-thumb-stone-600 scrollbar-track-stone-600/50 ">
        {isListView ? (
          <EpisodeListView
            currentEpisodeNumber={currentEpisodeNumber}
            episodeRef={ref}
            list={sortedList}
            movieId={movieId}
          />
        ) : (
          <EpisodeGridView
            currentEpisodeNumber={currentEpisodeNumber}
            episodeRef={ref}
            list={sortedList}
            movieId={movieId}
          />
        )}
      </ScrollShadow>
    </section>
  );
}

const EpisodeListView = ({
  list,
  currentEpisodeNumber,
  episodeRef,
  movieId,
}: {
  list: Episode[];
  currentEpisodeNumber?: number;
  episodeRef: MutableRefObject<(HTMLDivElement | null)[]>;
  movieId: string;
}) => (
  <Listbox
    aria-label="Single selection example"
    variant="flat"
    disallowEmptySelection
    selectionMode="single"
    emptyContent={<></>}
  >
    {list.map((episode, episodeIdx) => (
      <ListboxItem
        startContent={episode.number}
        color={episode.isFiller ? "warning" : "primary"}
        textValue={episode.title || `${episode.number}`}
        href={createURL({
          path: `/movie/watch/${movieId}`,
          params: {
            episodeId: episode.episodeId,
            episodeNumber: `${episode.number}`,
          },
        })}
        className={cn("pl-2")}
        endContent={
          episode.number === currentEpisodeNumber ? (
            <SvgIcon.playFill className="size-3" />
          ) : (
            ""
          )
        }
        key={episode.episodeId}
      >
        <div
          ref={(el) => {
            episodeRef.current[episodeIdx] = el;
          }}
        >
          <span className="text-wrap line-clamp-1">{episode.title}</span>
        </div>
      </ListboxItem>
    ))}
  </Listbox>
);

const EpisodeGridView = ({
  list,
  currentEpisodeNumber,
  episodeRef,
  movieId,
}: {
  list: Episode[];
  currentEpisodeNumber?: number;
  episodeRef: MutableRefObject<(HTMLDivElement | null)[]>;
  movieId: string;
}) => (
  <div className="flex flex-wrap justify-start flex-grow gap-2 mx-auto">
    {list.map((episode, episodeIdx) => (
      <Button
        as={NextLink}
        href={createURL({
          path: `/anime/watch/${movieId}`,
          params: {
            episodeId: episode.episodeId,
            episodeNumber: `${episode.number}`,
          },
        })}
        variant="flat"
        color="primary"
        startContent={
          currentEpisodeNumber === episode.number && (
            <SvgIcon.playFill className="size-3" />
          )
        }
        isIconOnly
        key={episode.episodeId}
      >
        <div
          ref={(el) => {
            episodeRef.current[episodeIdx] = el;
          }}
        >
          {episode.number === currentEpisodeNumber ? (
            <SvgIcon.playFill />
          ) : (
            episode.number
          )}
        </div>
      </Button>
    ))}
  </div>
);
