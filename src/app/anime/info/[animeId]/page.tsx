import { fetchWatchStatus } from "@/actions/action";
import { fetchEpisodeByProviderData } from "@/actions/aniwatch";
import { fetchAnimeData } from "@/actions/consumet";
import { auth } from "@/auth";
import CardList from "@/components/card-data/card-list";
import Heading from "@/components/ui/heading";
import { SvgIcon } from "@/components/ui/svg-icons";
import { ANIME_PROVIDER } from "@/lib/constants";
import {
  consumetAnimeInfoObjectMapper,
  consumetInfoAnimeObjectMapper,
} from "@/lib/object-mapper";
import { EpisodeList, SearchParams, Tag } from "@/lib/types";
import { createURL, pickTitle } from "@/lib/utils";
import { Button, ButtonGroup, Spacer } from "@nextui-org/react";
import NextLink from "next/link";
import { notFound, redirect } from "next/navigation";
import EpisodeListSection from "./_components/episode-list-section";
import InfoSection from "./_components/info-section";

export default async function InfoPage({
  params,
  searchParams,
}: {
  params: { animeId: string };
  searchParams?: SearchParams;
}) {
  const { animeId } = params;

  const session = await auth();
  const userId = session?.user?.id;

  const provider =
    typeof searchParams?.provider === "string"
      ? searchParams?.provider === ANIME_PROVIDER.P2
        ? ANIME_PROVIDER.P2
        : ANIME_PROVIDER.P1
      : ANIME_PROVIDER.P1;

  const toWatch =
    typeof searchParams?.watch === "string"
      ? Boolean(searchParams?.watch) || false
      : false;

  const toLatest =
    typeof searchParams?.latest === "string"
      ? Boolean(searchParams?.latest) || false
      : false;

  const [infoData, animeWatchStatus] = await Promise.all([
    fetchAnimeData({ animeId }),
    userId ? fetchWatchStatus({ userId, animeId }) : [],
  ]);

  if (!infoData) {
    notFound();
  }

  let episodeList: EpisodeList = {
    list: [],
    totalEpisodes: 0,
  };
  if (infoData.status !== "Not yet aired") {
    episodeList = await fetchEpisodeByProviderData({
      title: pickTitle(infoData.title),
      animeId,
      provider,
    });
  }

  const animeInfo = consumetAnimeInfoObjectMapper(infoData);
  const { relations, recommendations } = infoData;

  const tagList: Tag[] = [
    { name: "type", color: "secondary" },
    {
      name: "rating",
      color: "primary",
      startContent: <SvgIcon.star className="size-3" />,
    },
  ];

  const animeRelations = {
    name: "Relations",
    list: consumetInfoAnimeObjectMapper({ animeList: relations, tagList }),
  };

  const animeRecommendations = {
    name: "Recommendations",
    list: consumetInfoAnimeObjectMapper({
      animeList: recommendations || [],
      tagList,
    }),
  };

  const firstEpisode = episodeList.list[0];
  const latestEpisode = episodeList.list[episodeList.list.length - 1];
  let watchLink = "";
  let latestLink = "";
  if (firstEpisode) {
    watchLink = createURL({
      path: `/anime/watch/${animeId}`,
      params: {
        episodeId: firstEpisode.episodeId,
        episodeNumber: `${firstEpisode.number}`,
        provider: `${provider}`,
      },
    });
  }

  if (firstEpisode) {
    latestLink = createURL({
      path: `/anime/watch/${animeId}`,
      params: {
        episodeId: latestEpisode.episodeId,
        episodeNumber: `${latestEpisode.number}`,
        provider: `${provider}`,
      },
    });
  }

  if (toWatch && watchLink) redirect(watchLink);
  if (toLatest && latestLink) redirect(latestLink);

  return (
    <main className="relative mb-12">
      <InfoSection anime={animeInfo} animeWatchStatus={animeWatchStatus}>
        <div className="flex flex-col md:flex-row justify-between items-end gap-2">
          {Boolean(watchLink) && Boolean(latestLink) && (
            <ButtonGroup color="primary" size="lg" className="sm:w-fit w-full">
              <Button
                as={NextLink}
                href={watchLink || ""}
                variant="shadow"
                className="font-semibold w-full"
                isDisabled={watchLink === null}
              >
                Watch Now
              </Button>
              <Button
                as={NextLink}
                href={latestLink || ""}
                variant="bordered"
                className="font-semibold w-full"
                isDisabled={latestLink === null}
              >
                Latest
              </Button>
            </ButtonGroup>
          )}
        </div>

        <EpisodeListSection
          animeTitle={animeInfo.name}
          animeEpisodeList={episodeList}
        />
      </InfoSection>

      <Spacer className="h-12" />

      {animeRelations.list.length > 0 && (
        <section className="max-w-screen-2xl mx-auto mt-12 px-2 md:px-12">
          <Heading order="xl" className="text-gray-700 dark:text-gray-300">
            {animeRelations.name}
          </Heading>

          <CardList infoList={animeRelations.list} />
        </section>
      )}

      <Spacer className="h-12" />

      {animeRecommendations.list.length > 0 && (
        <section className="max-w-screen-2xl mx-auto mt-12 px-2 md:px-12">
          <Heading order="xl" className="text-gray-700 dark:text-gray-300">
            {animeRecommendations.name}
          </Heading>

          <CardList infoList={animeRecommendations.list} />
        </section>
      )}
    </main>
  );
}
