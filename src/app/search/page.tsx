import { searchAnime, searchKdrama, searchMovie } from "@/actions/consumet";
import { CardDataProps } from "@/components/card-data/card-data";
import CardList from "@/components/card-data/card-list";
import PageNavigation from "@/components/ui/page-navigation";
import {
  ASContentTypeArray,
  ASFormatArray,
  ASGenresArray,
  ASSeasonArray,
  ASSortArray,
  ASStatusArray,
} from "@/lib/constants";
import {
  consumetKDramacoolObjectMapper,
  consumetMovieObjectMapper,
  consumetSearchAnimeObjectMapper,
} from "@/lib/object-mapper";
import {
  ASContentType,
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
  const paramContentType =
    typeof searchParams?.contentType === "string"
      ? searchParams?.contentType
      : undefined;

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

  const contentType: ASContentType | undefined = ASContentTypeArray.includes(
    paramContentType as ASContentType
  )
    ? (paramContentType as ASContentType)
    : undefined;

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

  const handleSearchAnime = async () => {
    const animeListData = await searchAnime({
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
    if (!animeListData) return [];
    const mappedList = consumetSearchAnimeObjectMapper({
      searchData: animeListData,
      tagList,
    });
    return mappedList;
  };

  const handleSearchKdrama = async () => {
    const kdramaListData = await searchKdrama({ query: q || "", page });
    if (!kdramaListData) return [];
    const mappedList = consumetKDramacoolObjectMapper({
      kdramaList: kdramaListData.results,
    });
    return mappedList;
  };

  const handleSearchMovie = async () => {
    const movieListData = await searchMovie({
      query: q || "",
      page,
    });
    if (!movieListData) return [];
    const mappedList = consumetMovieObjectMapper({
      movieList: movieListData.results,
      tagList,
    });
    return mappedList;
  };

  let dataList: CardDataProps[] = [];

  if (contentType === "ANIME") {
    dataList = await handleSearchAnime();
  } else if (contentType === "K-DRAMA") {
    dataList = await handleSearchKdrama();
  } else if (contentType === "MOVIE") {
    dataList = await handleSearchMovie();
  } else {
    const [animeMappedList, kdramaMappedList, movieMappedList] =
      await Promise.all([
        handleSearchAnime(),
        handleSearchKdrama(),
        handleSearchMovie(),
      ]);
    dataList = [...animeMappedList, ...kdramaMappedList, ...movieMappedList];
  }

  const hasAnime = dataList.length > 0;

  return (
    <>
      {!hasAnime && (
        <Chip variant="bordered" color="warning">
          Nothing found!
        </Chip>
      )}
      {hasAnime && <CardList infoList={dataList} />}
      <div className="flex justify-end px-2 mt-2">
        <PageNavigation nextDisabled={false} prevDisabled={page <= 1} />
      </div>
    </>
  );
}
