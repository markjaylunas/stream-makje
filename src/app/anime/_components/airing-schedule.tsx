import { fetchAiringScheduleAnimeData } from "@/actions/consumet";
import CardCarouselList from "@/components/card-data/card-carousel-list";
import { consumetAnimeObjectMapper } from "@/lib/object-mapper";
import { SearchParams, Tag } from "@/lib/types";
import { parseSearchParamInt } from "@/lib/utils";

export default async function AiringScheduleList({
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
    <section>
      <CardCarouselList title="Airing Schedules" infoList={animeList} />
    </section>
  );
}
