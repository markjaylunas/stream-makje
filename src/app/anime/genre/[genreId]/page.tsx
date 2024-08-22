import { searchAnime } from "@/actions/consumet";
import { CardDataProps } from "@/components/card-data/card-data";
import CardList from "@/components/card-data/card-list";
import GenreCarouselList from "@/components/card-data/genre-carousel-list";
import Heading from "@/components/ui/heading";
import PageNavigation from "@/components/ui/page-navigation";
import { genreList } from "@/lib/constants";
import { consumetSearchAnimeObjectMapper } from "@/lib/object-mapper";
import { ASGenres, SearchParams, Tag } from "@/lib/types";
import { getSeasonAndYear, parseSearchParamInt } from "@/lib/utils";
import { notFound } from "next/navigation";

export default async function GenrePage({
  searchParams,
  params,
}: {
  params: { genreId: string };
  searchParams?: SearchParams;
}) {
  const { genreId } = params;
  if (!genreList.includes(genreId)) return notFound();
  const page = parseSearchParamInt({
    value: searchParams?.page,
    defaultValue: 1,
  });
  const perPage = parseSearchParamInt({
    value: searchParams?.perPage,
    defaultValue: 28,
  });

  const data = await searchAnime({
    page,
    perPage,
    genres: [genreId as ASGenres],
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

  let animeList: CardDataProps[] = [];

  if (data) {
    animeList = consumetSearchAnimeObjectMapper({
      searchData: data,
      tagList,
    });
  }
  return (
    <main>
      <div className="max-w-screen-xl mx-auto p-4 mb-10">
        <div className="flex justify-between p-2">
          <Heading order="xl" className="text-gray-700 dark:text-gray-300">
            {`Genre: ${genreId}`}
          </Heading>

          {animeList.length > 0 && (
            <div className="flex justify-center">
              <PageNavigation
                nextDisabled={
                  (!data?.hasNextPage || true) && animeList.length !== perPage
                }
                prevDisabled={page <= 1}
              />
            </div>
          )}
        </div>
        <CardList infoList={animeList} />

        <div className="flex justify-end px-2 mt-2">
          <PageNavigation
            nextDisabled={
              (!data?.hasNextPage || true) && animeList.length !== perPage
            }
            prevDisabled={page <= 1}
          />
        </div>
      </div>

      <GenreCarouselList genreList={genreList} pathName="/anime/genre" />
    </main>
  );
}
