import { fetchKdramaInfo } from "@/actions/consumet";
import { fetchKdramaWatchStatus } from "@/actions/kdrama-action";
import { auth } from "@/auth";
import CardImageCarouselList from "@/components/card-data/card-image-carousel-list";
import Heading from "@/components/ui/heading";
import ListSectionWrapper from "@/components/ui/list-section-wrapper";
import ScoreDropdown from "@/components/ui/score-dropdown";
import ShareButton from "@/components/ui/share-button";
import { SvgIcon } from "@/components/ui/svg-icons";
import WatchListDropdown from "@/components/ui/watchlist-dropdown";
import {
  consumetKdramaInfoEpisodesObjectMapper,
  consumetKDramaInfoObjectMapper,
} from "@/lib/object-mapper";
import { EpisodeList, SearchParams } from "@/lib/types";
import { createURL } from "@/lib/utils";
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

  const [infoData, kdramaWatchStatus] = await Promise.all([
    fetchKdramaInfo({ kdramaId }),
    userId ? fetchKdramaWatchStatus({ userId, kdramaId }) : [],
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

          <div className="flex flex-col justify-center gap-2 mt-2 px-4 md:px-0">
            <Heading className="text-primary-500 text-lg sm:text-xl">
              {kdramaInfo.name}
            </Heading>
            <div className="flex gap-2 justify-between w-full flex-wrap">
              <div className="flex gap-2">
                <Button
                  as={NextLink}
                  href={`/k-drama/info/${kdramaId}`}
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
                  size="sm"
                  contentType="k-drama"
                  watchStatus={
                    kdramaWatchStatus.length > 0 ? kdramaWatchStatus[0] : null
                  }
                  info={{
                    id: kdramaInfo.id || "",
                    title: kdramaInfo.name,
                    image: kdramaInfo.poster || "",
                    cover: kdramaInfo.cover || "",
                  }}
                />

                <ScoreDropdown
                  size="sm"
                  contentType="k-drama"
                  watchStatus={
                    kdramaWatchStatus.length > 0 ? kdramaWatchStatus[0] : null
                  }
                  info={{
                    id: kdramaInfo.id || "",
                    title: kdramaInfo.name,
                    image: kdramaInfo.poster || "",
                    cover: kdramaInfo.cover || "",
                  }}
                />
              </div>
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

      {Boolean(kdramaInfo.characters) && (
        <>
          <Spacer className="h-12" />

          <ListSectionWrapper title="Characters">
            <CardImageCarouselList imageList={kdramaInfo.characters || []} />
          </ListSectionWrapper>
        </>
      )}
    </>
  );
}
