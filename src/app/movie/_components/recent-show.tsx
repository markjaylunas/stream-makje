import {
  fetchRecentMoviesMovieData,
  fetchRecentShowsMovieData,
} from "@/actions/consumet";
import CardList from "@/components/card-data/card-list";
import { consumetMovieObjectMapper } from "@/lib/object-mapper";
import { Tag } from "@/lib/types";

export default async function RecentShowList() {
  const data = await fetchRecentShowsMovieData();

  if (!data) throw new Error("Failed to fetch (Anime List) data");

  const tagList: Tag[] = [
    { name: "season", color: "secondary" },
    {
      name: "latestEpisode",
      color: "default",
    },
  ];
  const animeList = consumetMovieObjectMapper({
    movieList: data,
    tagList,
  });

  return (
    <CardList
      infoList={animeList}
      className="max-w-screen-2xl mx-auto px-2 lg:px-8"
    />
  );
}
