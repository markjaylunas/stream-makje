import { fetchWatchStatus } from "@/actions/anime-action";
import { fetchEpisodeByProviderData } from "@/actions/aniwatch";
import { fetchAnimeData } from "@/actions/consumet";
import { auth } from "@/auth";
import CardImageCarouselList from "@/components/card-data/card-image-carousel-list";
import CardList from "@/components/card-data/card-list";
import Heading from "@/components/ui/heading";
import ListSectionWrapper from "@/components/ui/list-section-wrapper";
import ScoreDropdown from "@/components/ui/score-dropdown";
import ShareButton from "@/components/ui/share-button";
import { SvgIcon } from "@/components/ui/svg-icons";
import WatchListDropdown from "@/components/ui/watchlist-dropdown";
import { ANIME_PROVIDER } from "@/lib/constants";
import {
  consumetAnimeInfoObjectMapper,
  consumetInfoAnimeObjectMapper,
} from "@/lib/object-mapper";
import { EpisodeList, SearchParams, Tag } from "@/lib/types";
import { createURL, parseSearchParamInt, pickTitle } from "@/lib/utils";
import { Button, Skeleton, Spacer } from "@nextui-org/react";
import NextLink from "next/link";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";
import EpisodeListSection from "../../info/[animeId]/_components/episode-list-section";
import AnimeServerSection from "./_components/anime-server-section";
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
      ? encodeURIComponent(searchParams?.episodeId || "") || undefined
      : undefined;

  const episodeNumber = parseSearchParamInt({
    value: searchParams?.episodeNumber,
    defaultValue: 0,
  });

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

  let episodeList: EpisodeList = {
    list: [],
    totalEpisodes: 0,
  };

  if (infoData.status !== "Not yet aired") {
    episodeList = await fetchEpisodeByProviderData({
      title: infoData.title,
      animeId,
      provider,
    });
  } else {
    redirect(`/anime/info/${animeId}`);
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

  let episodeIndex = 0;

  if (episodeId) {
    episodeIndex = episodeList.list.findIndex(
      (episode) => episode.episodeId === episodeId
    );
  } else if (!episodeId && episodeNumber) {
    episodeIndex = episodeList.list.findIndex(
      (episode) => episode.number === episodeNumber
    );
  }

  if (episodeIndex < 0) episodeIndex = 0;

  const episode = episodeList.list[episodeIndex];

  if (!episode) return redirect(`/anime/info/${animeInfo.id}`);

  return (
    <>
      <section className="grid grid-cols-10 gap-4 w-full md:px-14">
        <div className="col-span-full md:col-span-7 ">
          <Suspense
            fallback={<Skeleton className=" w-full aspect-video rounded-xl" />}
          >
            <VideoStream
              provider={{
                name: provider,
                episodeId: episode.episodeId,
              }}
              anime={{
                id: animeId,
                image: animeInfo.poster,
                title: animeInfo.name,
                cover: animeInfo.cover || "",
              }}
              episode={{
                id: episode.episodeId,
                title: episode?.title || "",
                image: episode?.image || null,
                number: Number(episode.number),
              }}
              category={category}
              server={server}
            />
          </Suspense>

          <div className="flex flex-col justify-center gap-2 mt-2 px-4 md:px-0">
            <Heading className="text-primary-500 text-lg sm:text-xl">
              {animeInfo.name}
            </Heading>
            <div className="flex gap-2 justify-between w-full flex-wrap">
              <div className="flex gap-2">
                <Button
                  as={NextLink}
                  href={`/anime/info/${animeId}`}
                  startContent={<SvgIcon.information />}
                  size="sm"
                  radius="md"
                  variant="flat"
                >
                  More Info
                </Button>

                <ShareButton radius="md" size="sm" variant="flat">
                  Share
                </ShareButton>
              </div>
              <div className="flex gap-2">
                <WatchListDropdown
                  contentType="anime"
                  watchStatus={
                    animeWatchStatus.length > 0 ? animeWatchStatus[0] : null
                  }
                  info={{
                    id: animeId,
                    title: pickTitle(infoData.title),
                    image: infoData.image || "",
                    cover: infoData.cover || "",
                  }}
                  size="sm"
                />
                <ScoreDropdown
                  contentType="anime"
                  watchStatus={
                    animeWatchStatus.length > 0 ? animeWatchStatus[0] : null
                  }
                  info={{
                    id: animeId,
                    title: pickTitle(infoData.title),
                    image: infoData.image || "",
                    cover: infoData.cover || "",
                  }}
                  size="sm"
                />
              </div>
            </div>
          </div>

          <Spacer className="h-2" />

          <Suspense fallback={<Skeleton className="w-full h-8 rounded-xl" />}>
            <AnimeServerSection
              animeId={animeId}
              provider={provider}
              episodeId={episode.episodeId}
            />
          </Suspense>
        </div>

        <div className="col-span-full md:col-span-3 px-4 md:px-0">
          <EpisodeListSection
            animeEpisodeList={episodeList}
            animeTitle={infoData.title}
            episodeTitle={episode?.title || ""}
            currentEpisodeNumber={episode.number}
          />
        </div>
      </section>

      {Boolean(animeInfo.characters) && (
        <>
          <Spacer className="h-12" />

          <ListSectionWrapper title="Characters">
            <CardImageCarouselList imageList={animeInfo.characters || []} />
          </ListSectionWrapper>
        </>
      )}

      <Spacer className="h-6" />

      {relationList.list.length > 0 && (
        <section className="max-w-screen-2xl mx-auto mt-12 px-2 md:px-12">
          <Heading order="xl" className="text-gray-700 dark:text-gray-300">
            {relationList.name}
          </Heading>

          <CardList infoList={relationList.list} />
        </section>
      )}

      <Spacer className="h-6" />

      {recommendationList.list.length > 0 && (
        <section className="max-w-screen-2xl mx-auto mt-12 px-2 md:px-12">
          <Heading order="xl" className="text-gray-700 dark:text-gray-300">
            {recommendationList.name}
          </Heading>

          <CardList infoList={recommendationList.list} />
        </section>
      )}
    </>
  );
}
