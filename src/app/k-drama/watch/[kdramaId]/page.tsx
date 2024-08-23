import { fetchKdramaInfo } from "@/actions/consumet";
import Heading from "@/components/ui/heading";
import { SvgIcon } from "@/components/ui/svg-icons";
import {
  consumetKdramaInfoEpisodesObjectMapper,
  consumetKDramaInfoObjectMapper,
} from "@/lib/object-mapper";
import { EpisodeList, SearchParams } from "@/lib/types";
import { createURL, encodeEpisodeId } from "@/lib/utils";
import { Button, Skeleton, Spacer } from "@nextui-org/react";
import NextLink from "next/link";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";
import EpisodeListSection from "../../info/[kdramaId]/_components/episode-list-section";
import VideoStream from "./_components/video-stream";

export default async function EpisodePage({
  params,
  searchParams,
}: {
  params: { kdramaId: string };
  searchParams?: SearchParams;
}) {
  const { kdramaId } = params;

  // const session = await auth();
  // const userId = session?.user?.id;

  const episodeId =
    typeof searchParams?.episodeId === "string"
      ? searchParams?.episodeId || undefined
      : undefined;

  const episodeNumber =
    typeof searchParams?.episodeNumber === "string"
      ? searchParams?.episodeNumber || ""
      : "";

  const [
    infoData,
    // animeWatchStatus
  ] = await Promise.all([
    fetchKdramaInfo({ kdramaId }),
    // userId ? fetchWatchStatus({ userId, animeId }) : [],
  ]);

  if (!infoData) {
    notFound();
  }

  const kdramaInfo = consumetKDramaInfoObjectMapper(infoData);

  let episodeList: EpisodeList = {
    list: consumetKdramaInfoEpisodesObjectMapper(infoData.episodes),
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
    if (!episode) return redirect(`/k-drama/info/${kdramaInfo.id}`);

    return redirect(
      createURL({
        path: `/k-drama/watch/${kdramaInfo.id}`,
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
              kdrama={{
                id: kdramaId,
                image: kdramaInfo.poster,
                title: kdramaInfo.name,
                cover: kdramaInfo.cover || "",
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
              {kdramaInfo.name}
            </Heading>
            <div className="flex justify-start items-center gap-2">
              <Button
                as={NextLink}
                href={`/k-drama/info/${kdramaId}`}
                startContent={<SvgIcon.information />}
                size="sm"
                radius="md"
              >
                More Info
              </Button>
              {/* <WatchListDropdown
                animeWatchStatus={
                  animeWatchStatus.length > 0 ? animeWatchStatus[0] : null
                }
                anime={{
                  id: animeId,
                  title: pickTitle(infoData.title),
                  image: infoData.image || "",
                  cover: infoData.cover || "",
                }}
                size="sm"
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
                size="sm"
              /> */}
            </div>
          </div>

          <Spacer className="h-2" />
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

      <Spacer className="h-6" />
    </>
  );
}
