import { fetchPopularAnimeData } from "@/actions/consumet";
import CardCarouselList from "@/components/card-data/card-carousel-list";
import { consumetAnimeObjectMapper } from "@/lib/object-mapper";
import { SearchParams, Tag } from "@/lib/types";
import { parseSearchParamInt } from "@/lib/utils";

export default async function PopularList({
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

  const data = await fetchPopularAnimeData({ page: page, perPage });

  if (!data) throw new Error("Failed to fetch (Anime List) data");

  const tagList: Tag[] = [
    { name: "type", color: "warning" },
    { name: "releaseDate", color: "success" },
  ];
  const animeList = consumetAnimeObjectMapper({
    animeList: data.results,
    tagList,
    isRanked: true,
  });

  return (
    <section>
      <CardCarouselList title="Popular" infoList={animeList} />
    </section>
  );
}
