import { fetchAiringScheduleAnimeData } from "@/actions/consumet";
import CardList from "@/components/card-data/card-list";
import Heading from "@/components/ui/heading";
import PageNavigation from "@/components/ui/page-navigation";
import { consumetAnimeObjectMapper } from "@/lib/object-mapper";
import { SearchParams, Tag } from "@/lib/types";
import { parseSearchParamInt } from "@/lib/utils";

export default async function AiringSchedulesPage({
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

  const data = await fetchAiringScheduleAnimeData({ page: page, perPage });

  if (!data) throw new Error("Failed to fetch (Anime List) data");

  const tagList: Tag[] = [
    { name: "type", color: "secondary" },
    {
      name: "episode",
      color: "default",
      startContent: <span>Episode </span>,
    },
    { name: "airingAt", color: "primary", isCentered: true },
  ];

  const animeList = consumetAnimeObjectMapper({
    animeList: data.results,
    tagList,
  });

  return (
    <main className="max-w-screen-xl mx-auto p-4 mb-10">
      <div className="flex justify-between p-2">
        <Heading order="xl" className="text-gray-700 dark:text-gray-300">
          Airing Schedules
        </Heading>

        {animeList.length > 0 && (
          <div className="flex justify-center">
            <PageNavigation
              nextDisabled={
                (!data?.hasNextPage || true) && animeList.length !== perPage
              }
              prevDisabled={page <= 1}
            />
          </div>
        )}
      </div>

      <CardList infoList={animeList} />

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
