"use client";

import { fetchEpisodeByProviderData } from "@/actions/aniwatch";
import { fetchEpisodeData } from "@/actions/consumet";
import { Icons } from "@/components/ui/Icons";
import { ASProviderArray } from "@/lib/constants";
import { consumetAnimeInfoEpisodesObjectMapper } from "@/lib/object-mapper";
import {
  AnimeProviders,
  ASProvider,
  Episode,
  EpisodeList,
  Status,
} from "@/lib/types";
import { cn, createURL, encodeEpisodeId } from "@/lib/utils";
import { Button, ButtonGroup } from "@nextui-org/button";
import {
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Listbox,
  ListboxItem,
  Skeleton,
} from "@nextui-org/react";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import NextLink from "next/link";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import {
  HTMLProps,
  MutableRefObject,
  ReactElement,
  useMemo,
  useRef,
  useState,
} from "react";

type Props = {
  animeEpisodeList: EpisodeList;
  animeTitle: string;
  className?: string;
};

export default function EpisodeListSection({
  animeTitle,
  animeEpisodeList,
  className,
}: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const paramProvider = searchParams.get("provider");

  const provider: AnimeProviders = ASProviderArray.includes(
    paramProvider as ASProvider
  )
    ? (paramProvider as ASProvider)
    : "gogoanime";

  const { animeId } = useParams<{
    animeId: string;
  }>();

  const ref = useRef<(HTMLDivElement | null)[]>([]);
  const [isListView, setIsListView] = useState(true);
  const [spotlightEpisodeNumber, setSpotlightEpisodeNumber] =
    useState<number>(-1);
  const [episodeListData, setEpisodeListData] = useState(animeEpisodeList);
  const [status, setStatus] = useState<Status>("idle");
  const [selectedProvider, setSelectedProvider] = useState(new Set([provider]));

  const selectedProviderValue = useMemo(
    () => Array.from(selectedProvider).join(", ").replaceAll("_", " "),
    [selectedProvider]
  );
  // const handleEpisodeSearchChange = useDebouncedCallback((value: string) => {
  //   const episodeNumber = parseInt(value, 10);
  //   const episodeIndex = list.findIndex(
  //     (episode) => episode.number === episodeNumber
  //   );
  //   setspotlightEpisodeNumber(episodeNumber);

  //   if (episodeIndex !== -1 && episodeRefs.current[episodeIndex]) {
  //     episodeRefs.current[episodeIndex]?.scrollIntoView({
  //       behavior: "smooth",
  //       block: "center",
  //     });
  //   }
  //   return value;
  // }, 500);

  if (animeEpisodeList.list.length <= 0) return <UpcomingAnimeChip />;

  const { list, totalEpisodes } = episodeListData;

  let activeEpisodeNumber = -1;
  // let prevEpisode: Episode | null = null;
  // let nextEpisode: Episode | null = null;
  // let title = "";
  // if (episodeSlug && episodeSlug.length > 0) {
  //   activeEpisodeNumber = parseInt(episodeSlug[1]);
  //   const episodeIndex = list.findIndex(
  //     (episode) => episode.number === activeEpisodeNumber
  //   );
  //   title = `You are watching episode ${activeEpisodeNumber} of ${totalEpisodes}  ${
  //     list[episodeIndex].title ? `- ${list[episodeIndex].title}` : ""
  //   }`;

  //   prevEpisode = list[episodeIndex - 1];
  //   nextEpisode = list[episodeIndex + 1];
  // }

  // const meltCDString = "U+1FAE0";
  // const meltCD = parseInt(meltCDString.replace("U+", ""), 16);
  // const meltCharacter = String.fromCodePoint(meltCD);

  // const saluteCDString = "U+1FAE1";
  // const saluteCD = parseInt(saluteCDString.replace("U+", ""), 16);
  // const saluteCharacter = String.fromCodePoint(saluteCD);

  const descriptionsMap = {
    aniwatch: "Watch anime with subs, dubs, and various subtitles.",
    gogoanime: "Watch anime with English subs only.",
  };

  const labelsMap = {
    aniwatch: "Aniwatch",
    gogoanime: "Gogoanime",
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
      replace(`${pathname}?${params.toString()}`);
    } catch (error) {
      console.log(error);
      setStatus("error");
    } finally {
      setStatus("idle");
    }
  };
  return (
    <section className={cn("space-y-3 min-w-[300px]", className)}>
      {/* {activeEpisodeNumber && (
        <p className="text-gray-500 line-clamp-2 text-tiny">{title}</p>
      )} */}
      <div className="flex justify-start gap-3">
        <Button
          onPress={() => setIsListView((v) => !v)}
          isIconOnly
          variant="bordered"
          isDisabled={status === "loading"}
          startContent={isListView ? <Icons.listOrdered /> : <Icons.grid />}
        />

        <Input
          isDisabled={status === "loading"}
          type="number"
          aria-label="search episode number"
          startContent={<Icons.search />}
          className="max-w-32"
          placeholder="Episode #"
          // onValueChange={handleEpisodeSearchChange}
        />
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Button
              isDisabled={status === "loading"}
              endContent={<Icons.chevronDown />}
              variant="shadow"
              color="primary"
            >
              {selectedProviderValue.toUpperCase()}
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
              key="aniwatch"
              description={descriptionsMap["aniwatch"]}
            >
              {labelsMap["aniwatch"]}
            </DropdownItem>
            <DropdownItem
              key="gogoanime"
              description={descriptionsMap["gogoanime"]}
            >
              {labelsMap["gogoanime"]}
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        {/* {activeEpisodeNumber > 0 && (
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
        )} */}
      </div>
      <ScrollShadow className="w-full max-h-[400px] pb-4 scrollbar-thin scrollbar-corner-transparent scrollbar-thumb-stone-600 scrollbar-track-stone-600/50 ">
        {status === "loading" ? (
          <EpisodeViewSkeleton
            type={isListView ? "list" : "grid"}
            count={totalEpisodes}
          />
        ) : isListView ? (
          <EpisodeListView
            animeTitle={animeTitle}
            activeEpisodeNumber={activeEpisodeNumber}
            spotlightEpisodeNumber={spotlightEpisodeNumber}
            episodeRef={ref}
            list={list}
            provider={provider}
          />
        ) : (
          <EpisodeGridView
            animeTitle={animeTitle}
            activeEpisodeNumber={activeEpisodeNumber}
            spotlightEpisodeNumber={spotlightEpisodeNumber}
            episodeRef={ref}
            list={list}
            provider={provider}
          />
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

const EpisodeListView = ({
  list,
  provider,
  activeEpisodeNumber,
  spotlightEpisodeNumber,
  episodeRef,
  animeTitle,
}: {
  provider: AnimeProviders;
  list: Episode[];
  spotlightEpisodeNumber: number;
  activeEpisodeNumber: number;
  episodeRef: MutableRefObject<(HTMLDivElement | null)[]>;
  animeTitle: string;
}) => (
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
        href={createURL({
          path: "/anime/watch",
          params: {
            episodeId: episode.episodeId,
            episodeNumber: `${episode.number}`,
            provider: `${provider}`,
            animeTitle: `${animeTitle}`,
          },
        })}
        className={cn(
          "pl-2",
          spotlightEpisodeNumber === episode.number && "text-secondary-500"
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
  animeTitle,
  activeEpisodeNumber,
  spotlightEpisodeNumber,
  episodeRef,
}: {
  provider: AnimeProviders;
  animeTitle: string;
  list: Episode[];
  spotlightEpisodeNumber: number;
  activeEpisodeNumber: number;
  episodeRef: MutableRefObject<(HTMLDivElement | null)[]>;
}) => (
  <div className="flex flex-wrap justify-start flex-grow gap-2 mx-auto">
    {list.map((episode, episodeIdx) => (
      <Button
        as={NextLink}
        href={createURL({
          path: "/anime/watch",
          params: {
            episodeId: episode.episodeId,
            episodeNumber: `${episode.number}`,
            provider: `${provider}`,

            animeTitle: `${animeTitle}`,
          },
        })}
        variant={episode.number === spotlightEpisodeNumber ? "shadow" : "flat"}
        color="primary"
        isIconOnly
        key={episode.episodeId}
      >
        <div
          ref={(el) => {
            episodeRef.current[episodeIdx] = el;
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
