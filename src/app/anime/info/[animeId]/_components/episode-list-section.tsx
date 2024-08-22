"use client";

import { fetchEpisodeByProviderData } from "@/actions/aniwatch";
import { SvgIcon } from "@/components/ui/svg-icons";
import { ANIME_PROVIDER, ANIME_PROVIDER_LIST } from "@/lib/constants";
import { AnimeProviders, Episode, EpisodeList, Status } from "@/lib/types";
import { cn, createURL } from "@/lib/utils";
import { Button } from "@nextui-org/button";
import {
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Listbox,
  ListboxItem,
  Skeleton,
} from "@nextui-org/react";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import NextLink from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { HTMLProps, MutableRefObject, useMemo, useRef, useState } from "react";

type Props = {
  animeEpisodeList: EpisodeList;
  animeTitle: string;
  episodeTitle?: string;
  currentEpisodeNumber?: number;
  className?: string;
};

export default function EpisodeListSection({
  animeTitle,
  animeEpisodeList,
  episodeTitle,
  currentEpisodeNumber,
  className,
}: Props) {
  const searchParams = useSearchParams();
  const paramProvider = searchParams.get("provider");
  const provider =
    typeof paramProvider === "string"
      ? paramProvider === ANIME_PROVIDER.P2
        ? ANIME_PROVIDER.P2
        : ANIME_PROVIDER.P1
      : ANIME_PROVIDER.P1;

  const { animeId } = useParams<{
    animeId: string;
  }>();

  const ref = useRef<(HTMLDivElement | null)[]>([]);
  const [isListView, setIsListView] = useState(true);
  const [episodeListData, setEpisodeListData] = useState(animeEpisodeList);
  const [status, setStatus] = useState<Status>("idle");
  const [selectedProvider, setSelectedProvider] = useState(new Set([provider]));
  const [sort, setSort] = useState<"asc" | "desc">("asc");
  const sortedList = useMemo(
    () =>
      episodeListData.list.sort((a, b) =>
        sort === "asc" ? a.number - b.number : b.number - a.number
      ),
    [sort, episodeListData]
  );

  const { totalEpisodes } = episodeListData;
  const description =
    currentEpisodeNumber &&
    `You are watching episode ${currentEpisodeNumber} of ${
      episodeListData.totalEpisodes
    } ${Boolean(episodeTitle) && " - " + episodeTitle}`;

  const descriptionsMap = {
    provider_1: "Watch anime with subs, dubs, and various subtitles.",
    provider_2: "Watch anime with English embedded subs only.",
  };

  const labelsMap = {
    provider_1: "Provider 1",
    provider_2: "Provider 2",
  };

  const handleChangeProvider = async (provider: AnimeProviders) => {
    if (!animeId) return;
    try {
      setStatus("loading");
      const newEpisodeList = await fetchEpisodeByProviderData({
        animeId,
        provider,
        title: animeTitle,
      });

      if (newEpisodeList) setEpisodeListData(newEpisodeList);
      const params = new URLSearchParams(searchParams);
      if (provider) {
        params.set("provider", provider);
      } else {
        params.delete(provider);
      }

      window.history.pushState(null, "", `?${params.toString()}`);
    } catch (error) {
      console.log(error);
      setStatus("error");
    } finally {
      setStatus("idle");
    }
  };

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
          isDisabled={status === "loading"}
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
          isDisabled={status === "loading"}
          startContent={isListView ? <SvgIcon.listOrdered /> : <SvgIcon.grid />}
        />

        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Button
              isDisabled={status === "loading"}
              endContent={<SvgIcon.chevronDown />}
              variant="bordered"
              color="warning"
            >
              {labelsMap[provider] || ANIME_PROVIDER.P1}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            disallowEmptySelection
            aria-label="Provider Options"
            selectedKeys={selectedProvider}
            selectionMode="single"
            onSelectionChange={(keySet) => {
              const keyArray = Array.from(keySet);
              const key = keyArray[0];
              setSelectedProvider(new Set([key as AnimeProviders]));
              handleChangeProvider(`${key}` as AnimeProviders);
            }}
            className="max-w-[300px]"
          >
            <DropdownItem
              key="provider_1"
              description={descriptionsMap["provider_1"]}
            >
              {labelsMap["provider_1"]}
            </DropdownItem>
            <DropdownItem
              key="provider_2"
              description={descriptionsMap["provider_2"]}
            >
              {labelsMap["provider_2"]}
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>

      {episodeListData.list.length <= 0 && (
        <NoEpisodesFound provider={provider} />
      )}

      <ScrollShadow className="w-full max-h-[580px] pb-4 scrollbar-thin scrollbar-corner-transparent scrollbar-thumb-stone-600 scrollbar-track-stone-600/50 ">
        {status === "loading" ? (
          <EpisodeViewSkeleton
            type={isListView ? "list" : "grid"}
            count={totalEpisodes}
          />
        ) : isListView ? (
          <EpisodeListView
            currentEpisodeNumber={currentEpisodeNumber}
            episodeRef={ref}
            list={sortedList}
            provider={provider}
            animeId={animeId}
          />
        ) : (
          <EpisodeGridView
            currentEpisodeNumber={currentEpisodeNumber}
            episodeRef={ref}
            list={sortedList}
            provider={provider}
            animeId={animeId}
          />
        )}
      </ScrollShadow>
    </section>
  );
}

const NoEpisodesFound = ({ provider }: { provider: AnimeProviders }) => {
  const currentProvider: AnimeProviders =
    provider === "provider_1" ? ANIME_PROVIDER_LIST[0] : ANIME_PROVIDER_LIST[1];
  const otherProvider: AnimeProviders =
    provider === "provider_1" ? ANIME_PROVIDER_LIST[1] : ANIME_PROVIDER_LIST[0];
  return (
    <Chip
      radius="lg"
      variant="flat"
      color="warning"
      className="w-full mx-auto h-fit px-8 py-4"
    >
      <h3 className="text-center text-xl font-bold text-warning">
        No Episodes found
      </h3>
      <p className="text-foreground-500 text-center text-pretty mt-2">
        No episodes in {currentProvider.split("_").join(" ").toUpperCase()}?
        Try&nbsp;
        <span className="text-primary-500">
          &ldquo;{otherProvider.split("_").join(" ").toUpperCase()}&ldquo; ⬆️.
        </span>
      </p>
    </Chip>
  );
};

const EpisodeListView = ({
  list,
  provider,
  currentEpisodeNumber,
  episodeRef,
  animeId,
}: {
  provider: AnimeProviders;
  list: Episode[];
  currentEpisodeNumber?: number;
  episodeRef: MutableRefObject<(HTMLDivElement | null)[]>;
  animeId: string;
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
          path: `/anime/watch/${animeId}`,
          params: {
            episodeId: episode.episodeId,
            episodeNumber: `${episode.number}`,
            provider: `${provider}`,
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
  provider,
  list,
  currentEpisodeNumber,
  episodeRef,
  animeId,
}: {
  provider: AnimeProviders;
  list: Episode[];
  currentEpisodeNumber?: number;
  episodeRef: MutableRefObject<(HTMLDivElement | null)[]>;
  animeId: string;
}) => (
  <div className="flex flex-wrap justify-start flex-grow gap-2 mx-auto">
    {list.map((episode, episodeIdx) => (
      <Button
        as={NextLink}
        href={createURL({
          path: `/anime/watch/${animeId}`,
          params: {
            episodeId: episode.episodeId,
            episodeNumber: `${episode.number}`,
            provider: `${provider}`,
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

const EpisodeViewSkeleton = ({
  count = 1,
  type,
  className,
  ...props
}: { count?: number; type: "list" | "grid" } & HTMLProps<HTMLDivElement>) => (
  <div
    className={cn(
      type === "list" && "flex flex-col gap-2 w-full h-fit pr-2",
      type === "grid" && "flex flex-wrap justify-start flex-grow gap-2 mx-auto"
    )}
    {...props}
  >
    {Array.from(Array(Math.min(Math.max(count, 1), 100)).keys()).map(
      (skeleton) => (
        <Skeleton
          key={skeleton}
          className={cn(
            "rounded-lg",
            type === "list" && "w-full h-9",
            type === "grid" && "size-10",
            className
          )}
        />
      )
    )}
  </div>
);
