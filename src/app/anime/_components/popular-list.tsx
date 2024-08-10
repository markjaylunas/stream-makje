import { fetchPopularAnimeData } from "@/actions/consumet";
import {
  default as AnimeList,
  default as CardList,
} from "@/components/card-data/card-list";
import { metaAnimeObjectMapper } from "@/lib/object-mapper";
import { SearchParams } from "@/lib/types";

export default async function PopularList({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const page =
    typeof searchParams?.page === "string"
      ? parseInt(searchParams?.page) || 1
      : 1;

  const data = await fetchPopularAnimeData({ page: Number(page) || 1 });

  if (!data) throw new Error("Failed to fetch (Anime List) data");

  console.log(data);
  const animeList =
    metaAnimeObjectMapper(data.results, { isRanked: true }) || [];

  return <CardList infoList={animeList} />;
}
