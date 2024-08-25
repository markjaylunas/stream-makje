import { searchMovieGenre } from "@/actions/consumet";
import { CardDataProps } from "@/components/card-data/card-data";
import CardList from "@/components/card-data/card-list";
import GenreCarouselList from "@/components/card-data/genre-carousel-list";
import Heading from "@/components/ui/heading";
import PageNavigation from "@/components/ui/page-navigation";
import { MovieGenresArray } from "@/lib/constants";
import { consumetMovieObjectMapper } from "@/lib/object-mapper";
import { ASGenres, SearchParams, Tag } from "@/lib/types";
import { parseSearchParamInt, toTitleCase } from "@/lib/utils";
import { notFound } from "next/navigation";

export default async function GenrePage({
  searchParams,
  params,
}: {
  params: { genreId: string };
  searchParams?: SearchParams;
}) {
  const { genreId } = params;
  const parsedGenre = genreId.split(" ").join("-").toLowerCase();
  const genre = genreId === "Sci-Fi" ? "science-fiction" : parsedGenre;
  if (!MovieGenresArray.includes(genre)) return notFound();

  const page = parseSearchParamInt({
    value: searchParams?.page,
    defaultValue: 1,
  });

  const data = await searchMovieGenre({
    page,
    genreId: genre,
  });

  if (!data) throw new Error("Failed to fetch (Anime List) data");

  const tagList: Tag[] = [
    { name: "type", color: "secondary" },
    {
      name: "releaseDate",
      color: "default",
    },
  ];

  let animeList: CardDataProps[] = [];

  if (data) {
    animeList = consumetMovieObjectMapper({
      movieList: data.results,
      tagList,
    });
  }
  return (
    <main>
      <GenreCarouselList genreList={MovieGenresArray} pathName="/movie/genre" />
      <div className="max-w-screen-xl mx-auto p-4 mb-10">
        <div className="flex justify-between p-2">
          <Heading order="xl" className="text-gray-700 dark:text-gray-300">
            {`Genre: ${genre
              .split("-")
              .map((v) => toTitleCase(v))
              .join(" ")}`}
          </Heading>

          {animeList.length > 0 && (
            <div className="flex justify-center">
              <PageNavigation
                nextDisabled={!data.hasNextPage}
                prevDisabled={page <= 1}
              />
            </div>
          )}
        </div>
        <CardList infoList={animeList} />

        <div className="flex justify-end px-2 mt-2">
          <PageNavigation
            nextDisabled={!data.hasNextPage}
            prevDisabled={page <= 1}
          />
        </div>
      </div>

      <GenreCarouselList genreList={MovieGenresArray} pathName="/movie/genre" />
    </main>
  );
}
