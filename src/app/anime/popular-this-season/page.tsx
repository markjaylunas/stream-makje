import { searchAnime } from "@/actions/consumet";
import { CardDataProps } from "@/components/card-data/card-data";
import CardList from "@/components/card-data/card-list";
import PageNavigation from "@/components/ui/page-navigation";
import { consumetSearchAnimeObjectMapper } from "@/lib/object-mapper";
import { SearchParams, Tag } from "@/lib/types";
import { getSeasonAndYear, parseSearchParamInt } from "@/lib/utils";

export default async function PopularThisSeasonPage({
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
  const current = getSeasonAndYear("current");
  const data = await searchAnime({
    page,
    perPage,
    season: current.season,
    year: current.year,
  });

  if (!data) throw new Error("Failed to fetch (Anime List) data");

  const tagList: Tag[] = [
    { name: "type", color: "secondary" },
    {
      name: "totalEpisodes",
      color: "default",
      endContent: <span>EPs</span>,
    },
  ];

  let animeList: CardDataProps[] = [];

  if (data) {
    animeList = consumetSearchAnimeObjectMapper({
      searchData: data,
      tagList,
    });
  }

  return (
    <main className="max-w-screen-xl mx-auto p-4 mb-10">
      <CardList
        title="Popular This Season"
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
