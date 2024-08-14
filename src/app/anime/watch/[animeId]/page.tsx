import { fetchEpisodeByProviderData } from "@/actions/aniwatch";
import { fetchAnimeData } from "@/actions/consumet";
import CardList from "@/components/card-data/card-list";
import Heading from "@/components/ui/heading";
import { SvgIcon } from "@/components/ui/svg-icons";
import Text from "@/components/ui/text";
import { ANIME_PROVIDER } from "@/lib/constants";
import {
  consumetAnimeInfoObjectMapper,
  consumetInfoAnimeObjectMapper,
} from "@/lib/object-mapper";
import { SearchParams, Tag } from "@/lib/types";
import { encodeEpisodeId, pickTitle } from "@/lib/utils";
import { Button, Skeleton, Spacer } from "@nextui-org/react";
import NextLink from "next/link";
import { notFound } from "next/navigation";
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

  const episodeId =
    typeof searchParams?.episodeId === "string"
      ? searchParams?.episodeId || ""
      : "";
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

  const [infoData] = await Promise.all([fetchAnimeData({ animeId })]);
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

  const tagList: Tag[] = [
    { name: "type", color: "warning" },
    {
      name: "rating",
      color: "primary",
      startContent: <SvgIcon.star className="size-3" />,
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
      <section className="grid grid-cols-10 gap-4 w-full md:px-4 ">
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
            />
          </Suspense>

          <div className="flex justify-start md:justify-between gap-2 flex-wrap">
            <Heading className="text-primary-500 px-4 sm:px-0">
              {animeInfo.name}
            </Heading>
            <Button
              as={NextLink}
              href={`/anime/info/${animeId}`}
              startContent={<SvgIcon.information />}
              size="sm"
            >
              Info
            </Button>

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
            currentEpisodeNumber={episodeNumber}
          />
        </div>
      </section>

      {animeCategoryList.map((category) => (
        <CardList
          title={category.name}
          infoList={category.list}
          key={category.name}
          className="px-2"
        />
      ))}
    </>
  );
}
