import { fetchCountryMovieData } from "@/actions/consumet";
import CardCarouselList from "@/components/card-data/card-carousel-list";
import { consumetMovieObjectMapper } from "@/lib/object-mapper";
import { SearchParams, Tag } from "@/lib/types";
import { searchParamString } from "@/lib/utils";

export default async function CountryMovieList({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const country = searchParamString({
    value: searchParams?.country,
    defaultValue: "us",
  });

  const data = await fetchCountryMovieData({ country });

  if (!data) throw new Error("Failed to fetch (CountryMovieList) data");

  const tagList: Tag[] = [
    { name: "releaseDate", color: "secondary" },
    {
      name: "duration",
      color: "default",
    },
  ];

  const mappedList = consumetMovieObjectMapper({
    movieList: data.results,
    tagList,
  });

  return (
    <CardCarouselList
      infoList={mappedList}
      viewMoreHref={data.hasNextPage ? `/movie/country/${country}` : undefined}
    />
  );
}
