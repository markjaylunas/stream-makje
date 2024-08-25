import { searchAnime, searchMovieGenre } from "@/actions/consumet";
import ButtonCarouselList from "@/components/card-data/button-carousel-list";
import { CardDataProps } from "@/components/card-data/card-data";
import CardList from "@/components/card-data/card-list";
import Heading from "@/components/ui/heading";
import PageNavigation from "@/components/ui/page-navigation";
import {
  GENRE_BUTTON_LIST,
  genreList,
  MOVIE_GENRE_BUTTON_LIST,
  MovieGenresArray,
} from "@/lib/constants";
import {
  consumetMovieObjectMapper,
  consumetSearchAnimeObjectMapper,
} from "@/lib/object-mapper";
import { ASGenres, SearchParams, Tag } from "@/lib/types";
import { parseSearchParamInt } from "@/lib/utils";
import { notFound } from "next/navigation";

export default async function GenrePage({
  searchParams,
  params,
}: {
  params: { genreId: string };
  searchParams?: SearchParams;
}) {
  const { genreId } = params;
  const parsedGenre =
    genreId.toLowerCase() === "sci-fi" ? "science-fiction" : genreId;
  const genre = MOVIE_GENRE_BUTTON_LIST.find((v) => v.value === parsedGenre);
  if (!genre) return notFound();
  const page = parseSearchParamInt({
    value: searchParams?.page,
    defaultValue: 1,
  });

  const data = await searchMovieGenre({
    page,
    genreId: genre.value,
  });

  if (!data) throw new Error("Failed to fetch (Anime List) data");

  const tagList: Tag[] = [
    { name: "type", color: "secondary" },
    {
      name: "releaseDate",
      color: "default",
    },
    {
      name: "season",
      color: "default",
    },
  ];

  let mappedList: CardDataProps[] = [];

  if (data) {
    mappedList = consumetMovieObjectMapper({
      movieList: data.results,
      tagList,
    });
  }

  return (
    <main>
      <ButtonCarouselList
        buttonList={MOVIE_GENRE_BUTTON_LIST}
        pathName="/movie/genre"
        selected={genre.value}
      />

      <div className="max-w-screen-xl mx-auto p-4 mb-10">
        <div className="flex justify-between p-2">
          <Heading order="xl" className="text-gray-700 dark:text-gray-300">
            {`Genre: ${genre.name}`}
          </Heading>

          {mappedList.length > 0 && (
            <div className="flex justify-center">
              <PageNavigation
                nextDisabled={!data.hasNextPage}
                prevDisabled={page <= 1}
              />
            </div>
          )}
        </div>
        <CardList infoList={mappedList} />

        <div className="flex justify-end px-2 mt-2">
          <PageNavigation
            nextDisabled={!data.hasNextPage}
            prevDisabled={page <= 1}
          />
        </div>
      </div>

      <ButtonCarouselList
        selected={genreId}
        buttonList={MOVIE_GENRE_BUTTON_LIST}
        pathName="/movie/genre"
      />
    </main>
  );
}
