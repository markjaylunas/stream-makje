import { fetchCountryMovieData } from "@/actions/consumet";
import { default as ButtonCarouselList } from "@/components/card-data/button-carousel-list";
import { CardDataProps } from "@/components/card-data/card-data";
import CardList from "@/components/card-data/card-list";
import Heading from "@/components/ui/heading";
import PageNavigation from "@/components/ui/page-navigation";
import { COUNTRY_LIST } from "@/lib/constants";
import { consumetMovieObjectMapper } from "@/lib/object-mapper";
import { SearchParams, Tag } from "@/lib/types";
import { parseSearchParamInt } from "@/lib/utils";
import { notFound } from "next/navigation";

export default async function CountryPage({
  searchParams,
  params,
}: {
  params: { countryId: string };
  searchParams?: SearchParams;
}) {
  const { countryId } = params;

  const country = COUNTRY_LIST.find(
    (country) => country.value.toLowerCase() === countryId.toLowerCase()
  );

  if (!country) return notFound();

  const page = parseSearchParamInt({
    value: searchParams?.page,
    defaultValue: 1,
  });

  const data = await fetchCountryMovieData({ country: countryId, page });
  if (!data) throw new Error("Failed to fetch (movie List) data");

  const tagList: Tag[] = [
    { name: "releaseDate", color: "secondary" },
    {
      name: "duration",
      color: "default",
    },
    {
      name: "season",
      color: "secondary",
    },
    {
      name: "latestEpisode",
      color: "default",
    },
  ];

  let movieList: CardDataProps[] = [];

  if (data) {
    movieList = consumetMovieObjectMapper({
      movieList: data.results,
      tagList,
    });
  }

  return (
    <main>
      <ButtonCarouselList
        selected={country.value}
        buttonList={COUNTRY_LIST}
        pathName="/movie/country"
      />

      <div className="max-w-screen-xl mx-auto p-4 mb-10">
        <div className="flex justify-between p-2">
          <Heading order="xl" className="text-gray-700 dark:text-gray-300">
            {`Country: ${country.name}`}
          </Heading>

          {movieList.length > 0 && (
            <div className="flex justify-center">
              <PageNavigation
                nextDisabled={!data.hasNextPage}
                prevDisabled={page <= 1}
              />
            </div>
          )}
        </div>
        <CardList infoList={movieList} />

        <div className="flex justify-end px-2 mt-2">
          <PageNavigation
            nextDisabled={!data.hasNextPage}
            prevDisabled={page <= 1}
          />
        </div>
      </div>
      <ButtonCarouselList
        selected={country.value}
        buttonList={COUNTRY_LIST}
        pathName="/movie/country"
      />
    </main>
  );
}
