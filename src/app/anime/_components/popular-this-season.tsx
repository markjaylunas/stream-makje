import { searchAnime } from "@/actions/consumet";
import CardCarouselList from "@/components/card-data/card-carousel-list";
import { CardDataProps } from "@/components/card-data/card-data";
import { consumetSearchAnimeObjectMapper } from "@/lib/object-mapper";
import { SearchParams, Tag } from "@/lib/types";
import { getSeasonAndYear, parseSearchParamInt } from "@/lib/utils";

export default async function PopularThisSeasonList({
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

  let mappedList: CardDataProps[] = [];

  if (data) {
    mappedList = consumetSearchAnimeObjectMapper({
      searchData: data,
      tagList,
    });
  }

  return (
    <CardCarouselList
      viewMoreHref="/anime/popular-this-season"
      infoList={mappedList}
    />
  );
}
