import { fetchEpisodeByProviderData } from "@/actions/aniwatch";
import { fetchAnimeData } from "@/actions/consumet";
import CardList from "@/components/card-data/card-list";
import { Icons } from "@/components/ui/Icons";
import { ANIME_PROVIDER, ANIME_PROVIDER_LIST } from "@/lib/constants";
import {
  consumetAnimeInfoObjectMapper,
  consumetInfoAnimeObjectMapper,
} from "@/lib/object-mapper";
import { SearchParams, Tag } from "@/lib/types";
import { createURL, encodeEpisodeId, pickTitle } from "@/lib/utils";
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

  const infoData = await fetchAnimeData({ animeId });

  if (!infoData) {
    notFound();
  }

  const episodeList = await fetchEpisodeByProviderData({
    title: pickTitle(infoData.title),
    animeId,
    provider,
  });

  const animeInfo = consumetAnimeInfoObjectMapper(infoData);
  const { relations, recommendations } = infoData;

  const tagList: Tag[] = [
    { name: "type", color: "warning" },
    {
      name: "rating",
      color: "primary",
      startContent: <Icons.star className="size-3" />,
    },
  ];

  const animeCategoryList = [
    {
      name: "Relations",
      list: consumetInfoAnimeObjectMapper({ animeList: relations, tagList }),
    },
    {
      name: "Recommendations",
      list: consumetInfoAnimeObjectMapper({
        animeList: recommendations || [],
        tagList,
      }),
    },
  ].filter((category) => category.list.length > 0);

  const firstEpisode = episodeList.list[0];
  const latestEpisode = episodeList.list[episodeList.list.length - 1];
  const watchLink = createURL({
    path: `/anime/watch/${animeId}`,
    params: {
      episodeId: firstEpisode.episodeId,
      episodeNumber: `${firstEpisode.number}`,
      provider: `${provider}`,
    },
  });
  const latestLink = createURL({
    path: `/anime/watch/${animeId}`,
    params: {
      episodeId: latestEpisode.episodeId,
      episodeNumber: `${latestEpisode.number}`,
      provider: `${provider}`,
    },
  });

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

        <EpisodeListSection
          animeTitle={animeInfo.name}
          animeEpisodeList={episodeList}
        />
      </InfoSection>

      {animeCategoryList.map((category) => (
        <CardList
          title={category.name}
          infoList={category.list}
          key={category.name}
        />
      ))}
    </main>
  );
}
