import { fetchAnimeData, fetchEpisodeData } from "@/actions/consumet";
import CardList from "@/components/card-data/card-list";
import Heading from "@/components/ui/heading";
import {
  consumetAnimeInfoEpisodesObjectMapper,
  consumetAnimeInfoObjectMapper,
  consumetInfoAnimeObjectMapper,
} from "@/lib/object-mapper";
import {
  AnimeInfo,
  AnimeProviders,
  CardCategory,
  EpisodeList,
  SearchParams,
} from "@/lib/types";
import { encodeEpisodeId } from "@/lib/utils";
import { Button, ButtonGroup } from "@nextui-org/react";
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

  const server =
    typeof searchParams?.server === "string"
      ? searchParams?.server || null
      : null;

  const toWatch =
    typeof searchParams?.watch === "string"
      ? Boolean(searchParams?.watch) || false
      : false;

  const toLatest =
    typeof searchParams?.latest === "string"
      ? Boolean(searchParams?.latest) || false
      : false;

  let animeCategoryList: CardCategory[] = [];
  let episodeList: EpisodeList = {
    list: [],
    totalEpisodes: 0,
  };

  let animeInfo: AnimeInfo | null = null;

  const [infoData, episodeData] = await Promise.all([
    fetchAnimeData({ animeId }),
    fetchEpisodeData({
      animeId,
      provider: server ? (server as AnimeProviders) : "zoro",
    }),
  ]);
  if (!infoData) {
    notFound();
  }

  const { relations, recommendations } = infoData;

  animeInfo = consumetAnimeInfoObjectMapper(infoData);
  const mappedEpisodeList = consumetAnimeInfoEpisodesObjectMapper(
    episodeData || []
  );

  episodeList = {
    list: mappedEpisodeList,
    totalEpisodes: episodeData ? infoData.totalEpisodes || 0 : 0,
  };

  animeCategoryList = [
    {
      name: "Related",
      list: consumetInfoAnimeObjectMapper(relations || []),
    },
    {
      name: "Recommendation",
      list: consumetInfoAnimeObjectMapper(recommendations || []),
    },
  ].filter((category) => category.list.length > 0);

  if (!animeInfo) notFound();

  const firstEpisode = episodeList.list[0];
  const latestEpisode = episodeList.list[episodeList.list.length - 1];
  const watchLink = firstEpisode
    ? `/anime/info/${animeId}/watch?episodeId=${encodeEpisodeId(
        firstEpisode.episodeId
      )}&episodeNumber=${firstEpisode.number}`
    : null;
  const latestLink = latestEpisode
    ? `/anime/info/${animeId}/watch?episodeId=${encodeEpisodeId(
        latestEpisode.episodeId
      )}&episodeNumber=${latestEpisode.number}`
    : null;

  if (toWatch && watchLink) redirect(watchLink);
  if (toLatest && latestLink) redirect(latestLink);

  return (
    <main className="relative mb-12">
      <InfoSection anime={animeInfo}>
        {Boolean(watchLink) && Boolean(latestLink) && (
          <ButtonGroup className="sm:w-fit w-full">
            <Button
              as={NextLink}
              href={watchLink || ""}
              size="lg"
              color="primary"
              className="text-xl font-semibold w-full"
              isDisabled={watchLink === null}
            >
              Watch Now
            </Button>
            <Button
              as={NextLink}
              href={latestLink || ""}
              size="lg"
              color="primary"
              variant="bordered"
              className="text-xl font-semibold w-full"
              isDisabled={latestLink === null}
            >
              Latest
            </Button>
          </ButtonGroup>
        )}

        <EpisodeListSection animeEpisodeList={episodeList} />
      </InfoSection>

      {animeCategoryList.map((category) => (
        <section
          className="max-w-7xl px-4 sm:mx-auto space-y-2 mt-4 sm:mt-8"
          key={category.name}
        >
          <Heading order="xl" className="text-gray-700 dark:text-gray-300 mb-2">
            {category.name}
          </Heading>
          <CardList infoList={category.list} />
        </section>
      ))}
    </main>
  );
}
