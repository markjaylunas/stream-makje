import { fetchAllMovieEpisodeProgress } from "@/actions/movie-action";
import { auth } from "@/auth";
import CardWatchedList from "@/components/card-data/card-watched-list";
import Heading from "@/components/ui/heading";
import PageNavigation from "@/components/ui/page-navigation";
import { consumetMovieWatchedObjectMapper } from "@/lib/object-mapper";
import { DEFAULT_SIGNIN_PATH } from "@/lib/routes";
import { SearchParams, Tag } from "@/lib/types";
import { parseSearchParamInt } from "@/lib/utils";
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

  const episodeProgressData = await fetchAllMovieEpisodeProgress({
    userId,
    page,
    limit: perPage,
  });

  if (episodeProgressData.episodes.length <= 0) return null;

  const tagList: Tag[] = [
    { name: "episodeNumber", startContent: <span>Episode</span> },
  ];

  const mappedList = consumetMovieWatchedObjectMapper({
    movieList: episodeProgressData.episodes,
    tagList,
  });

  return (
    <main className="max-w-screen-xl min-h-screen mx-auto p-4 mb-10">
      <div className="flex justify-between p-2">
        <Heading order="xl" className="text-gray-700 dark:text-gray-300">
          History
        </Heading>

        {episodeProgressData.totalCount > 0 && (
          <div className="flex justify-center">
            <PageNavigation
              nextDisabled={page * perPage >= episodeProgressData.totalCount}
              prevDisabled={page <= 1}
            />
          </div>
        )}
      </div>

      <CardWatchedList infoList={mappedList} className="-ml-1" />

      <div className="flex justify-end px-2 mt-2">
        <PageNavigation
          nextDisabled={page * perPage >= episodeProgressData.totalCount}
          prevDisabled={page <= 1}
        />
      </div>
    </main>
  );
}
