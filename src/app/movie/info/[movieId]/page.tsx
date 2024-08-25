import { fetchMovieInfo } from "@/actions/consumet";
import { fetchMovieWatchStatus } from "@/actions/movie-action";
import InfoSection from "@/app/anime/info/[animeId]/_components/info-section";
import { auth } from "@/auth";
import CardImageCarouselList from "@/components/card-data/card-image-carousel-list";
import CardList from "@/components/card-data/card-list";
import Heading from "@/components/ui/heading";
import ListSectionWrapper from "@/components/ui/list-section-wrapper";
import {
  consumetMovieInfoEpisodesObjectMapper,
  consumetMovieInfoObjectMapper,
  consumetMovieObjectMapper,
} from "@/lib/object-mapper";
import { EpisodeList, SearchParams, Tag } from "@/lib/types";
import { createURL } from "@/lib/utils";
import { Button, ButtonGroup, Spacer } from "@nextui-org/react";
import NextLink from "next/link";
import { notFound, redirect } from "next/navigation";
import EpisodeListSection from "./_components/episode-list-section";

export default async function InfoPage({
  params,
  searchParams,
}: {
  params: { movieId: string };
  searchParams?: SearchParams;
}) {
  const { movieId } = params;

  const session = await auth();
  const userId = session?.user?.id;

  const toWatch =
    typeof searchParams?.watch === "string"
      ? Boolean(searchParams?.watch) || false
      : false;

  const toLatest =
    typeof searchParams?.latest === "string"
      ? Boolean(searchParams?.latest) || false
      : false;

  const [infoData, movieWatchStatus] = await Promise.all([
    fetchMovieInfo({ movieId }),
    userId ? fetchMovieWatchStatus({ userId, movieId }) : [],
  ]);

  if (!infoData) {
    return notFound();
  }

  const { recommendations } = infoData;

  const tagList: Tag[] = [
    { name: "type", color: "secondary" },
    {
      name: "duration",
      color: "default",
      endContent: <span>m</span>,
    },
  ];

  const movieRecommendations = {
    name: "Recommendations",
    list: consumetMovieObjectMapper({
      movieList: recommendations || [],
      tagList,
    }),
  };

  let episodeList: EpisodeList = {
    list: consumetMovieInfoEpisodesObjectMapper(infoData.episodes),
    totalEpisodes: infoData.episodes.length,
  };

  const movieInfo = consumetMovieInfoObjectMapper(infoData);

  const firstEpisode = episodeList.list[0];
  const latestEpisode =
    episodeList.list.length > 1
      ? episodeList.list[episodeList.list.length - 1]
      : null;

  let watchLink = "";
  let latestLink = "";

  if (firstEpisode) {
    watchLink = createURL({
      path: `/movie/watch/${movieId}`,
      params: {
        episodeId: firstEpisode.episodeId,
        episodeNumber: `${firstEpisode.number}`,
      },
    });
  }

  if (latestEpisode) {
    latestLink = createURL({
      path: `/movie/watch/${movieId}`,
      params: {
        episodeId: latestEpisode.episodeId,
        episodeNumber: `${latestEpisode.number}`,
      },
    });
  }

  if (toWatch && watchLink) redirect(watchLink);
  if (toLatest && latestLink) redirect(latestLink);

  return (
    <main className="relative mb-12">
      <InfoSection
        contentType="movie"
        info={movieInfo}
        watchStatus={movieWatchStatus}
      >
        <div className="flex flex-col md:flex-row justify-between items-end gap-2 space-y-6">
          {Boolean(watchLink) && (
            <ButtonGroup color="primary" size="lg" className="sm:w-fit w-full">
              <Button
                as={NextLink}
                href={watchLink}
                variant="shadow"
                className="font-semibold w-full"
              >
                Watch Now
              </Button>
              {Boolean(latestLink) && (
                <Button
                  as={NextLink}
                  href={latestLink}
                  variant="bordered"
                  className="font-semibold w-full"
                >
                  Latest
                </Button>
              )}
            </ButtonGroup>
          )}
        </div>

        <EpisodeListSection episodeList={episodeList} />
      </InfoSection>

      {Boolean(movieInfo.characters) && (
        <>
          <Spacer className="h-12" />

          <ListSectionWrapper title="Characters">
            <CardImageCarouselList imageList={movieInfo.characters || []} />
          </ListSectionWrapper>
        </>
      )}

      {movieRecommendations.list.length > 0 && (
        <section className="max-w-screen-2xl mx-auto mt-12 px-2 md:px-12">
          <Heading order="xl" className="text-gray-700 dark:text-gray-300">
            {movieRecommendations.name}
          </Heading>

          <CardList infoList={movieRecommendations.list} />
        </section>
      )}
    </main>
  );
}
