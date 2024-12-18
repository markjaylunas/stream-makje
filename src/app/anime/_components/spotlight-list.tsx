import { fetchTrendingAnimeData } from "@/actions/consumet";
import CardSpotlight from "@/components/card-data/card-spotlight";
import { SvgIcon } from "@/components/ui/svg-icons";
import { consumetAnimeObjectMapper } from "@/lib/object-mapper";
import { SearchParams, Tag } from "@/lib/types";
import { parseSearchParamInt } from "@/lib/utils";

export default async function SpotlightList({
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

  const data = await fetchTrendingAnimeData({ page, perPage });

  if (!data) throw new Error("Failed to fetch (Anime List) data");

  const tagList: Tag[] = [
    { name: "type", color: "secondary" },
    { name: "releaseDate", color: "success" },
    {
      name: "rating",
      color: "primary",
      startContent: <SvgIcon.startFill className="size-3" />,
    },
    {
      name: "totalEpisodes",
      color: "warning",
      startContent: <SvgIcon.closedCaption className="size-3" />,
    },
    {
      name: "duration",
      endContent: <span>m</span>,
    },
  ];
  const animeList = consumetAnimeObjectMapper({
    animeList: data.results,
    tagList,
    isRanked: true,
  });
  return (
    <section className="">
      <CardSpotlight infoList={animeList} />
    </section>
  );
}
