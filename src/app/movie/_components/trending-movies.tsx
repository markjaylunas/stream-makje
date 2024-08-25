import { fetchTrendingMovieData } from "@/actions/consumet";
import CardCarouselList from "@/components/card-data/card-carousel-list";
import { CardDataProps } from "@/components/card-data/card-data";
import { consumetMovieObjectMapper } from "@/lib/object-mapper";
import { Tag } from "@/lib/types";

export default async function TrendingMovieList() {
  const data = await fetchTrendingMovieData({ type: "movie" });

  if (!data) throw new Error("Failed to fetch (trending movie list) data");

  const tagList: Tag[] = [
    { name: "releaseDate", color: "secondary" },
    {
      name: "duration",
      color: "default",
    },
  ];

  let mappedList: CardDataProps[] = [];

  if (data) {
    mappedList = consumetMovieObjectMapper({
      movieList: data,
      tagList,
    });
  }

  return <CardCarouselList infoList={mappedList} />;
}
