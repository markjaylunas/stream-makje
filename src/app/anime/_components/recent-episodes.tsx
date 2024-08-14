import { fetchRecentEpisodesAnimeData } from "@/actions/consumet";
import CardList from "@/components/card-data/card-list";
import { consumetAnimeObjectMapper } from "@/lib/object-mapper";
import { SearchParams, Tag } from "@/lib/types";
import { parseSearchParamInt } from "@/lib/utils";

export default async function RecentEpisodeList({
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
    defaultValue: 14,
  });

  const data = await fetchRecentEpisodesAnimeData({ page: page, perPage });

  if (!data) throw new Error("Failed to fetch (Anime List) data");

  const tagList: Tag[] = [
    { name: "type", color: "secondary" },
    {
      name: "episodeNumber",
      color: "default",
      startContent: <span>Episode </span>,
    },
  ];
  const animeList = consumetAnimeObjectMapper({
    animeList: data.results,
    tagList,
  });

  return (
    <section className="max-w-screen-2xl mx-auto  px-2 lg:px-8">
      <CardList title="Recent Episodes" infoList={animeList} />
    </section>
  );
}
