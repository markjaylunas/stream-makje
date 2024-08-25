import { fetchRecentMoviesMovieData } from "@/actions/consumet";
import CardList from "@/components/card-data/card-list";
import { consumetMovieObjectMapper } from "@/lib/object-mapper";
import { Tag } from "@/lib/types";

export default async function RecentMovieList() {
  const data = await fetchRecentMoviesMovieData();

  if (!data) throw new Error("Failed to fetch (RecentMovieList) data");

  const tagList: Tag[] = [
    { name: "releaseDate", color: "secondary" },
    {
      name: "duration",
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
