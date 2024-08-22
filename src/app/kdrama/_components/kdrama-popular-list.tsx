import { fetchPopularAnimeData } from "@/actions/consumet";
import CardCarouselList from "@/components/card-data/card-carousel-list";
import CardList from "@/components/card-data/card-list";
import { consumetAnimeObjectMapper } from "@/lib/object-mapper";
import { SearchParams, Tag } from "@/lib/types";
import { parseSearchParamInt } from "@/lib/utils";

export default async function KDramaPopularList({
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

  // const data = await fetchPopularAnimeData({ page: page, perPage });

  // if (!data) throw new Error("Failed to fetch (Anime List) data");

  // const tagList: Tag[] = [
  //   { name: "type", color: "secondary" },
  //   { name: "releaseDate", color: "success" },
  // ];
  // const animeList = consumetAnimeObjectMapper({
  //   animeList: data.results,
  //   tagList,
  //   isRanked: true,
  // });

  return (
    <>kdrama list</>
    // <CardList infoList={animeList} />
  );
}
