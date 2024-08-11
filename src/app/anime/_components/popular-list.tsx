import { fetchPopularAnimeData } from "@/actions/consumet";
import { default as CardList } from "@/components/card-data/card-list";
import { consumetAnimeObjectMapper } from "@/lib/object-mapper";
import { SearchParams, Tag } from "@/lib/types";

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

  const tagList: Tag[] = [
    { name: "type", color: "warning" },
    { name: "releaseDate", color: "success" },
  ];
  const animeList = consumetAnimeObjectMapper({
    animeList: data.results,
    tagList,
    isRanked: true,
  });

  return <CardList title="Popular" infoList={animeList} />;
}
