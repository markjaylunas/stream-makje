import { fetchPopularAnimeData } from "@/actions/consumet";
import CardList from "@/components/card-data/card-list";
import PageNavigation from "@/components/ui/page-navigation";
import { consumetAnimeObjectMapper } from "@/lib/object-mapper";
import { SearchParams, Tag } from "@/lib/types";
import { parseSearchParamInt } from "@/lib/utils";

export default async function MostPopularPage({
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

  const data = await fetchPopularAnimeData({ page: page, perPage });

  if (!data) throw new Error("Failed to fetch (Anime List) data");

  const tagList: Tag[] = [
    { name: "type", color: "secondary" },
    { name: "releaseDate", color: "success" },
  ];
  const animeList = consumetAnimeObjectMapper({
    animeList: data.results,
    tagList,
    isRanked: true,
  });

  return (
    <main className="max-w-screen-xl mx-auto p-4 mb-10">
      <CardList
        title="Most Popular"
        infoList={animeList}
        className="-ml-1"
        endContent={
          animeList.length > 0 && (
            <div className="flex justify-center">
              <PageNavigation
                nextDisabled={
                  (!data?.hasNextPage || true) && animeList.length !== perPage
                }
                prevDisabled={page <= 1}
              />
            </div>
          )
        }
      />

      <div className="flex justify-end px-2 mt-2">
        <PageNavigation
          nextDisabled={
            (!data?.hasNextPage || true) && animeList.length !== perPage
          }
          prevDisabled={page <= 1}
        />
      </div>
    </main>
  );
}