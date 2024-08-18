import { searchAnime } from "@/actions/consumet";
import { CardDataProps } from "@/components/card-data/card-data";
import CardList from "@/components/card-data/card-list";
import MyPagination from "@/components/ui/my-pagination";
import {
  ASFormatArray,
  ASGenresArray,
  ASSeasonArray,
  ASSortArray,
  ASStatusArray,
} from "@/lib/constants";
import { consumetSearchAnimeObjectMapper } from "@/lib/object-mapper";
import {
  ASFormat,
  ASGenres,
  ASSeason,
  ASSort,
  ASStatus,
  SearchParams,
  Tag,
} from "@/lib/types";
import { Chip } from "@nextui-org/react";

export default async function SearchAnimeResultsPage({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const q = typeof searchParams?.q === "string" ? searchParams?.q : undefined;
  const page =
    typeof searchParams?.page === "string" ? parseInt(searchParams?.page) : 1;
  const perPage =
    typeof searchParams?.perPage === "string"
      ? parseInt(searchParams?.perPage)
      : 28;
  const year =
    typeof searchParams?.year === "string"
      ? parseInt(searchParams?.year)
      : undefined;
  const paramSeason =
    typeof searchParams?.season === "string" ? searchParams?.season : undefined;
  const paramFormat =
    typeof searchParams?.format === "string" ? searchParams?.format : undefined;
  const paramStatus =
    typeof searchParams?.status === "string" ? searchParams?.status : undefined;
  const paramGenres =
    typeof searchParams?.genres === "string" ? searchParams?.genres : undefined;
  const paramSort =
    typeof searchParams?.sort === "string" ? searchParams?.sort : undefined;

  const genres: ASGenres[] | undefined =
    paramGenres
      ?.split(",")
      .every((item) => ASGenresArray.includes(item as ASGenres)) &&
    paramGenres !== undefined
      ? (paramGenres.split(",") as ASGenres[])
      : undefined;

  const sort: ASSort[] | undefined =
    paramSort
      ?.split(",")
      .every((item) => ASSortArray.includes(item as ASSort)) &&
    paramSort !== undefined
      ? (paramSort.split(",") as ASSort[])
      : undefined;

  const season: ASSeason | undefined = ASSeasonArray.includes(
    paramSeason as ASSeason
  )
    ? (paramSeason as ASSeason)
    : undefined;

  const format: ASFormat | undefined = ASFormatArray.includes(
    paramFormat as ASFormat
  )
    ? (paramFormat as ASFormat)
    : undefined;

  const status: ASStatus | undefined = ASStatusArray.includes(
    paramStatus as ASStatus
  )
    ? (paramStatus as ASStatus)
    : undefined;

  const data = await searchAnime({
    query: q,
    page,
    perPage,
    year,
    season,
    format,
    status,
    genres,
    sort,
  });

  const tagList: Tag[] = [
    {
      name: "type",
      color: "secondary",
    },
    {
      name: "totalEpisodes",
      color: "default",
      endContent: <span>EPs</span>,
    },
    {
      name: "releaseDate",
      color: "success",
    },
  ];
  let mappedList: CardDataProps[] = [];

  if (data) {
    mappedList = consumetSearchAnimeObjectMapper({
      searchData: data,
      tagList,
    });
  }
  const hasAnime = mappedList.length > 0;

  return (
    <>
      {hasAnime && <CardList infoList={mappedList} />}

      {hasAnime && (
        <div className="flex justify-end px-2">
          <MyPagination
            hasNextPage={
              (data?.hasNextPage || false) && mappedList.length === perPage
            }
          />
        </div>
      )}
      {!hasAnime && (
        <Chip variant="bordered" color="warning">
          Nothing found!
        </Chip>
      )}
    </>
  );
}
