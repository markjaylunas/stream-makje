import { fetchAllEpisodeProgress } from "@/actions/action";
import { searchAnime } from "@/actions/consumet";
import { auth } from "@/auth";
import { CardDataProps } from "@/components/card-data/card-data";
import CardList from "@/components/card-data/card-list";
import CardWatchedList from "@/components/card-data/card-watched-list";
import PageNavigation from "@/components/ui/page-navigation";
import {
  consumetAnimeWatchedObjectMapper,
  consumetSearchAnimeObjectMapper,
} from "@/lib/object-mapper";
import { DEFAULT_SIGNIN_PATH } from "@/lib/routes";
import { SearchParams, Tag } from "@/lib/types";
import { getSeasonAndYear, parseSearchParamInt } from "@/lib/utils";
import { redirect } from "next/navigation";

export default async function HistoryPage({
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
    defaultValue: 28,
  });

  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) return redirect(DEFAULT_SIGNIN_PATH);

  const episodeProgressData = await fetchAllEpisodeProgress({
    userId,
    page,
    limit: perPage,
  });

  if (episodeProgressData.episodes.length <= 0) return null;

  const tagList: Tag[] = [
    { name: "episodeNumber", startContent: <span>Episode</span> },
  ];

  const mappedList = consumetAnimeWatchedObjectMapper({
    animeList: episodeProgressData.episodes,
    tagList,
  });

  return (
    <main className="max-w-screen-xl mx-auto p-4 mb-10">
      <CardWatchedList
        title="History"
        infoList={mappedList}
        className="-ml-1"
        endContent={
          episodeProgressData.totalCount > 0 && (
            <div className="flex justify-center">
              <PageNavigation
                nextDisabled={page * perPage >= episodeProgressData.totalCount}
                prevDisabled={page <= 1}
              />
            </div>
          )
        }
      />

      <div className="flex justify-end px-2 mt-2">
        <PageNavigation
          nextDisabled={page * perPage >= episodeProgressData.totalCount}
          prevDisabled={page <= 1}
        />
      </div>
    </main>
  );
}
