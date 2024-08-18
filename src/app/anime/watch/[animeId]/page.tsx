import { fetchWatchStatus } from "@/actions/action";
import { fetchEpisodeByProviderData } from "@/actions/aniwatch";
import { fetchAnimeData } from "@/actions/consumet";
import { auth } from "@/auth";
import CardCarouselList from "@/components/card-data/card-carousel-list";
import CardList from "@/components/card-data/card-list";
import Heading from "@/components/ui/heading";
import ScoreDropdown from "@/components/ui/score-dropdown";
import { SvgIcon } from "@/components/ui/svg-icons";
import Text from "@/components/ui/text";
import WatchListDropdown from "@/components/ui/watchlist-dropdown";
import { ANIME_PROVIDER } from "@/lib/constants";
import {
  consumetAnimeInfoObjectMapper,
  consumetInfoAnimeObjectMapper,
} from "@/lib/object-mapper";
import { SearchParams, Tag } from "@/lib/types";
import { createURL, encodeEpisodeId, pickTitle } from "@/lib/utils";
import { Button, Skeleton, Spacer } from "@nextui-org/react";
import NextLink from "next/link";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";
import EpisodeListSection from "../../info/[animeId]/_components/episode-list-section";
import Control from "./_components/control";
import VideoStream from "./_components/video-stream";

export default async function EpisodePage({
  params,
  searchParams,
}: {
  params: { animeId: string };
  searchParams?: SearchParams;
}) {
  const { animeId } = params;

  const session = await auth();
  const userId = session?.user?.id;

  const episodeId =
    typeof searchParams?.episodeId === "string"
      ? searchParams?.episodeId || undefined
      : undefined;

  const episodeNumber =
    typeof searchParams?.episodeNumber === "string"
      ? searchParams?.episodeNumber || ""
      : "";

  const provider =
    typeof searchParams?.provider === "string"
      ? searchParams?.provider === ANIME_PROVIDER.P2
        ? ANIME_PROVIDER.P2
        : ANIME_PROVIDER.P1
      : ANIME_PROVIDER.P1;

  const server =
    typeof searchParams?.server === "string" ? searchParams?.server : "hd-1";

  const category =
    typeof searchParams?.category === "string" ? searchParams?.category : "sub";

  const [infoData, animeWatchStatus] = await Promise.all([
    fetchAnimeData({ animeId }),
    userId ? fetchWatchStatus({ userId, animeId }) : [],
  ]);

  if (!infoData) {
    notFound();
  }

  const animeInfo = consumetAnimeInfoObjectMapper(infoData);
  const { relations, recommendations } = infoData;

  const [episodeList] = await Promise.all([
    await fetchEpisodeByProviderData({
      title: pickTitle(infoData.title),
      animeId,
      provider,
    }),
  ]);

  if (episodeId === "undefined" || !episodeId) {
    let episode = null;

    if (episodeNumber) {
      episode = episodeList.list.find(
        (episode) => episode.number === Number(episodeNumber)
      );
    } else {
      episode = episodeList.list[0];
    }
    if (!episode) return redirect(`/anime/info/${animeInfo.id}`);

    return redirect(
      createURL({
        path: `/anime/watch/${animeInfo.id}`,
        params: {
          episodeId: episode.episodeId,
          episodeNumber: episode.number,
          provider: provider,
        },
      })
    );
  }
  const tagList: Tag[] = [
    { name: "type", color: "secondary" },
    {
      name: "rating",
      color: "primary",
      startContent: <SvgIcon.star className="size-3" />,
    },
  ];

  const relationList = {
    name: "Relations",
    list: consumetInfoAnimeObjectMapper({ animeList: relations, tagList }),
  };

  const recommendationList = {
    name: "Recommendations",
    list: consumetInfoAnimeObjectMapper({
      animeList: recommendations || [],
      tagList,
    }),
  };

  const hasEpisode = episodeList.list.length > 0;
  const episodeIndex = hasEpisode
    ? episodeList.list.findIndex(
        (episode) =>
          encodeEpisodeId(episode.episodeId) === encodeEpisodeId(episodeId)
      )
    : 1;
  const episode = hasEpisode ? episodeList.list[episodeIndex] : null;

  return (
    <>
      <section className="grid grid-cols-10 gap-4 w-full md:px-14">
        <div className="col-span-full md:col-span-7 ">
          <Suspense
            fallback={<Skeleton className=" w-full aspect-video rounded-xl" />}
          >
            <VideoStream
              provider={provider}
              animeImage={animeInfo.poster}
              episodeImage={episode?.image || ""}
              episodeTitle={episode?.title || ""}
              episodeId={episodeId}
              category={category}
              server={server}
            />
          </Suspense>

          <div className="flex flex-col sm:flex-row justify-start sm:justify-between gap-2 mt-2 px-4 sm:px-0">
            <Heading className="text-primary-500 text-lg sm:text-xl">
              {animeInfo.name}
            </Heading>
            <div className="flex justify-start items-center gap-2">
              <Button
                as={NextLink}
                href={`/anime/info/${animeId}`}
                startContent={<SvgIcon.information />}
                size="sm"
                radius="md"
              >
                More Info
              </Button>
              <WatchListDropdown
                animeWatchStatus={
                  animeWatchStatus.length > 0 ? animeWatchStatus[0] : null
                }
                anime={{
                  id: animeId,
                  title: pickTitle(infoData.title),
                  image: infoData.image || "",
                  cover: infoData.cover || "",
                }}
              />
              <ScoreDropdown
                animeWatchStatus={
                  animeWatchStatus.length > 0 ? animeWatchStatus[0] : null
                }
                anime={{
                  id: animeId,
                  title: pickTitle(infoData.title),
                  image: infoData.image || "",
                  cover: infoData.cover || "",
                }}
              />
            </div>

            {/* <span>score</span>
          <span>status</span> */}
          </div>

          <Spacer className="h-2" />

          <Control animeId={animeId} episodeId={episodeId} />
        </div>

        <div className="col-span-full md:col-span-3 px-4 md:px-0">
          <EpisodeListSection
            animeEpisodeList={episodeList}
            animeTitle={animeInfo.name}
            episodeTitle={episode?.title || ""}
            currentEpisodeNumber={
              episodeNumber ? parseInt(episodeNumber) : undefined
            }
          />
        </div>
      </section>

      <Spacer className="h-6" />

      {relationList.list.length > 0 && (
        <CardCarouselList
          title={relationList.name}
          infoList={relationList.list}
          key={relationList.name}
          className="-ml-1 md:ml-4"
        />
      )}

      <Spacer className="h-6" />

      {recommendationList.list.length > 0 && (
        <CardList
          title={recommendationList.name}
          infoList={recommendationList.list}
          key={recommendationList.name}
          className="px-2 md:px-12"
        />
      )}
    </>
  );
}
