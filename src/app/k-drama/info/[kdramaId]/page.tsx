import { fetchKdramaInfo } from "@/actions/consumet";
import InfoSection from "@/app/anime/info/[animeId]/_components/info-section";
import {
  consumetKdramaInfoEpisodesObjectMapper,
  consumetKDramaInfoObjectMapper,
} from "@/lib/object-mapper";
import { EpisodeList, SearchParams } from "@/lib/types";
import { createURL } from "@/lib/utils";
import { Button, ButtonGroup } from "@nextui-org/react";
import NextLink from "next/link";
import { notFound, redirect } from "next/navigation";
import EpisodeListSection from "./_components/episode-list-section";

export default async function InfoPage({
  params,
  searchParams,
}: {
  params: { kdramaId: string };
  searchParams?: SearchParams;
}) {
  const { kdramaId } = params;

  // const session = await auth();
  // const userId = session?.user?.id;

  const toWatch =
    typeof searchParams?.watch === "string"
      ? Boolean(searchParams?.watch) || false
      : false;

  const toLatest =
    typeof searchParams?.latest === "string"
      ? Boolean(searchParams?.latest) || false
      : false;

  const [
    infoData,
    // kdramaWatchStatus
  ] = await Promise.all([
    fetchKdramaInfo({ kdramaId }),
    // userId ? fetchWatchStatus({ userId, animeId }) : [],
  ]);

  if (!infoData) {
    notFound();
  }

  let episodeList: EpisodeList = {
    list: consumetKdramaInfoEpisodesObjectMapper(infoData.episodes),
    totalEpisodes: infoData.episodes.length,
  };

  const animeInfo = consumetKDramaInfoObjectMapper(infoData);

  const firstEpisode = episodeList.list[0];
  const latestEpisode =
    episodeList.list.length > 1
      ? episodeList.list[episodeList.list.length - 1]
      : null;

  let watchLink = "";
  let latestLink = "";

  if (firstEpisode) {
    watchLink = createURL({
      path: `/k-drama/watch/${kdramaId}`,
      params: {
        episodeId: firstEpisode.episodeId,
        episodeNumber: `${firstEpisode.number}`,
      },
    });
  }

  if (latestEpisode) {
    latestLink = createURL({
      path: `/k-drama/watch/${kdramaId}`,
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
        anime={animeInfo}
        animeWatchStatus={[]}
        isGenreLinkDisabled={true}
      >
        <div className="flex flex-col md:flex-row justify-between items-end gap-2">
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
    </main>
  );
}
