import { fetchAllEpisodeProgress } from "@/actions/anime-action";
import { auth } from "@/auth";
import CardEmpty from "@/components/card-data/card-empty";
import CardSignIn from "@/components/card-data/card-sign-in";
import { default as CardWatchedCarouselList } from "@/components/card-data/card-watched-carousel-list";
import { consumetAnimeWatchedObjectMapper } from "@/lib/object-mapper";
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

  if (!userId) return <CardSignIn />;

  const episodeProgressData = await fetchAllEpisodeProgress({
    userId,
    page,
    limit: perPage,
  });

  if (episodeProgressData.totalCount === 0) return <CardEmpty />;

  const tagList: Tag[] = [
    { name: "episodeNumber", startContent: <span>Episode</span> },
  ];

  const mappedList = consumetAnimeWatchedObjectMapper({
    animeList: episodeProgressData.episodes,
    tagList,
  });

  const hasNextPage = episodeProgressData.totalCount > perPage;

  return (
    <CardWatchedCarouselList
      viewMoreHref={hasNextPage ? "/anime/history" : undefined}
      infoList={mappedList}
    />
  );
}
