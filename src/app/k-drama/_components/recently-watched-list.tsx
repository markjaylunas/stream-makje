import { fetchAllEpisodeProgress } from "@/actions/anime-action";
import { fetchAllKdramaEpisodeProgress } from "@/actions/kdrama-action";
import { auth } from "@/auth";
import { default as CardWatchedCarouselList } from "@/components/card-data/card-watched-carousel-list";
import {
  consumetAnimeWatchedObjectMapper,
  consumetKdramaWatchedObjectMapper,
} from "@/lib/object-mapper";
import { SearchParams, Tag } from "@/lib/types";
import { parseSearchParamInt } from "@/lib/utils";

export default async function RecentlyWatchedList({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const page = parseSearchParamInt({
    value: searchParams?.page,
    defaultValue: 1,
  });
  const perPage = parseSearchParamInt({
    value: searchParams?.perPage,
    defaultValue: 24,
  });

  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) return null;

  const episodeProgressData = await fetchAllKdramaEpisodeProgress({
    userId,
    page,
    limit: perPage,
  });

  if (episodeProgressData.episodes.length <= 0) return null;

  const tagList: Tag[] = [
    { name: "episodeNumber", startContent: <span>Episode</span> },
  ];

  const mappedList = consumetKdramaWatchedObjectMapper({
    kdramaList: episodeProgressData.episodes,
    tagList,
  });

  return (
    <CardWatchedCarouselList
      viewMoreHref="/k-drama/history"
      infoList={mappedList}
    />
  );
}
