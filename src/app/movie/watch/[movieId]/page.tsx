import { fetchMovieInfo } from "@/actions/consumet";
import { fetchMovieWatchStatus } from "@/actions/movie-action";
import { auth } from "@/auth";
import CardList from "@/components/card-data/card-list";
import Heading from "@/components/ui/heading";
import ScoreDropdown from "@/components/ui/score-dropdown";
import ShareButton from "@/components/ui/share-button";
import { SvgIcon } from "@/components/ui/svg-icons";
import WatchListDropdown from "@/components/ui/watchlist-dropdown";
import {
  consumetMovieInfoEpisodesObjectMapper,
  consumetMovieInfoObjectMapper,
  consumetMovieObjectMapper,
} from "@/lib/object-mapper";
import { EpisodeList, SearchParams, Tag } from "@/lib/types";
import { createURL, searchParamString } from "@/lib/utils";
import { Button, Skeleton, Spacer } from "@nextui-org/react";
import NextLink from "next/link";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";
import EpisodeListSection from "../../info/[movieId]/_components/episode-list-section";
import MovieServerSection from "./_components/movie-server-section";
import VideoStream from "./_components/video-stream";

export default async function EpisodePage({
  params,
  searchParams,
}: {
  params: { movieId: string };
  searchParams?: SearchParams;
}) {
  const { movieId } = params;

  const session = await auth();
  const userId = session?.user?.id;

  const episodeId = searchParamString({
    value: searchParams?.episodeId,
    defaultValue: undefined,
  });

  const episodeNumber = searchParamString({
    value: searchParams?.episodeNumber,
    defaultValue: "",
  });

  const server = searchParamString({
    value: searchParams?.server,
    defaultValue: undefined,
  });

  const [infoData, movieWatchStatus] = await Promise.all([
    fetchMovieInfo({ movieId }),
    userId ? fetchMovieWatchStatus({ userId, movieId }) : [],
  ]);

  if (!infoData) {
    notFound();
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

  const movieInfo = consumetMovieInfoObjectMapper(infoData);

  let episodeList: EpisodeList = {
    list: consumetMovieInfoEpisodesObjectMapper(infoData.episodes),
    totalEpisodes: infoData.episodes.length,
  };

  if (episodeId === "undefined" || !episodeId) {
    let episode = null;

    if (episodeNumber) {
      episode = episodeList.list.find(
        (episode) => episode.number === Number(episodeNumber)
      );
    } else {
      episode = episodeList.list[0];
    }
    if (!episode) return redirect(`/movie/info/${movieInfo.id}`);

    return redirect(
      createURL({
        path: `/movie/watch/${movieInfo.id}`,
        params: {
          episodeId: episode.episodeId,
          episodeNumber: episode.number,
        },
      })
    );
  }

  const hasEpisode = episodeList.list.length > 0;

  const episodeIndex = hasEpisode
    ? episodeList.list.findIndex(
        (episode) =>
          encodeURIComponent(episode.episodeId) ===
          encodeURIComponent(episodeId)
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
              server={server}
              movie={{
                id: movieId,
                image: movieInfo.poster,
                title: movieInfo.name,
                cover: movieInfo.cover || "",
              }}
              episode={{
                id: episodeId,
                title: episode?.title || "",
                image: episode?.image || null,
                number: Number(episodeNumber),
              }}
            />
          </Suspense>

          <div className="flex flex-col sm:flex-row justify-start sm:justify-between gap-2 mt-2 px-4 md:px-0">
            <Heading className="text-primary-500 text-lg sm:text-xl">
              {movieInfo.name}
            </Heading>
            <div className="flex justify-end flex-col flex-wrap items-center gap-2">
              <div className="flex gap-2 justify-end w-full">
                <Button
                  as={NextLink}
                  href={`/movie/info/${movieId}`}
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
              <div className="flex gap-2 justify-end w-full">
                <WatchListDropdown
                  size="sm"
                  contentType="movie"
                  watchStatus={
                    movieWatchStatus.length > 0 ? movieWatchStatus[0] : null
                  }
                  info={{
                    id: movieInfo.id || "",
                    title: movieInfo.name,
                    image: movieInfo.poster || "",
                    cover: movieInfo.cover || "",
                  }}
                />

                <ScoreDropdown
                  size="sm"
                  contentType="movie"
                  watchStatus={
                    movieWatchStatus.length > 0 ? movieWatchStatus[0] : null
                  }
                  info={{
                    id: movieInfo.id || "",
                    title: movieInfo.name,
                    image: movieInfo.poster || "",
                    cover: movieInfo.cover || "",
                  }}
                />
              </div>
            </div>
          </div>

          <Spacer className="h-2" />

          <Suspense fallback={<Skeleton className="w-full h-8 rounded-xl" />}>
            <MovieServerSection
              movieId={movieId}
              episodeId={episodeId}
              episodeNumber={episodeNumber || ""}
            />
          </Suspense>
        </div>

        <div className="col-span-full md:col-span-3 px-4 md:px-0">
          <EpisodeListSection
            episodeList={episodeList}
            currentEpisodeNumber={
              episodeNumber ? parseInt(episodeNumber) : undefined
            }
          />
        </div>
      </section>

      {movieRecommendations.list.length > 0 && (
        <section className="max-w-screen-2xl mx-auto mt-12 px-2 md:px-12">
          <Heading order="xl" className="text-gray-700 dark:text-gray-300">
            {movieRecommendations.name}
          </Heading>

          <CardList infoList={movieRecommendations.list} />
        </section>
      )}
    </>
  );
}
