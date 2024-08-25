"use client";

import { searchAnime, searchKdrama, searchMovie } from "@/actions/consumet";
import { ASContentTypeArray } from "@/lib/constants";
import {
  consumetKDramacoolObjectMapper,
  consumetMovieObjectMapper,
  consumetSearchAnimeObjectMapper,
} from "@/lib/object-mapper";
import { ASContentType, Status, Tag } from "@/lib/types";
import { debounce, toTitleCase } from "@/lib/utils";
import {
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
  Input,
  Listbox,
  ListboxItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Skeleton,
} from "@nextui-org/react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useCallback, useState } from "react";
import { CardDataProps } from "../card-data/card-data";
import { SvgIcon } from "../ui/svg-icons";

const tagList: Tag[] = [
  {
    name: "type",
  },
  {
    name: "releaseDate",
  },
  {
    name: "totalEpisodes",
  },
  {
    name: "seasons",
  },
];

export default function Search({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
}) {
  const pathname = usePathname();
  const defaultContentType = ASContentTypeArray.find(
    (v) => v === pathname.split("/")[1]
  );
  const [animeDataList, setAnimeDataList] = useState<CardDataProps[]>([]);
  const [kdramaDataList, setKdramaDataList] = useState<CardDataProps[]>([]);
  const [movieDataList, setMovieDataList] = useState<CardDataProps[]>([]);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [selectedContentType, setSelectedContentType] = useState(
    new Set([defaultContentType || "ALL"])
  );

  const selectedValue = Array.from(selectedContentType)
    .join(", ")
    .replaceAll("_", " ");

  const handleSearchAnime = async (q: string) => {
    const animeListData = await searchAnime({ query: q });
    if (!animeListData) return [];
    const mappedList = consumetSearchAnimeObjectMapper({
      searchData: animeListData,
      tagList,
    });
    return mappedList;
  };

  const handleSearchKdrama = async (q: string) => {
    const kdramaListData = await searchKdrama({ query: q });
    if (!kdramaListData) return [];
    const mappedList = consumetKDramacoolObjectMapper({
      kdramaList: kdramaListData.results,
    });
    return mappedList;
  };

  const handleSearchMovie = async (q: string) => {
    const movieListData = await searchMovie({ query: q });
    if (!movieListData) return [];
    const mappedList = consumetMovieObjectMapper({
      movieList: movieListData.results,
      tagList,
    });
    return mappedList;
  };

  const handleSearch = useCallback(
    debounce(async (q: string, contentType: string) => {
      try {
        setStatus("loading");

        if (contentType === "ANIME") {
          const dataList = await handleSearchAnime(q);

          setAnimeDataList(dataList);
          setKdramaDataList([]);
          setMovieDataList([]);
        } else if (contentType === "K-DRAMA") {
          const dataList = await handleSearchKdrama(q);

          setKdramaDataList(dataList);
          setAnimeDataList([]);
          setMovieDataList([]);
        } else if (contentType === "MOVIE") {
          const dataList = await handleSearchMovie(q);

          setMovieDataList(dataList);
          setAnimeDataList([]);
          setKdramaDataList([]);
        } else {
          const [animeMappedList, kdramaMappedList, movieMappedList] =
            await Promise.all([
              handleSearchAnime(q),
              handleSearchKdrama(q),
              handleSearchMovie(q),
            ]);

          setAnimeDataList(animeMappedList);
          setKdramaDataList(kdramaMappedList);
          setMovieDataList(movieMappedList);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setStatus("idle");
      }
    }, 300),
    []
  );

  const dataList = [...animeDataList, ...kdramaDataList, ...movieDataList];

  return (
    <>
      <Modal
        scrollBehavior="inside"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        hideCloseButton
        size="lg"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex gap-1">
                <Input
                  onValueChange={(v) => {
                    handleSearch(v, selectedValue);
                    setQuery(v);
                  }}
                  classNames={{ base: "max-w-lg" }}
                  variant="underlined"
                  startContent={<SvgIcon.search />}
                  autoFocus
                  placeholder="Search title..."
                  aria-label="Search title"
                />

                <Dropdown classNames={{ base: "w-fit" }}>
                  <DropdownTrigger>
                    <Button
                      variant="flat"
                      color="primary"
                      className="capitalize"
                    >
                      {toTitleCase(selectedValue.split("_").join(" "))}
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    aria-label="Single selection example"
                    variant="flat"
                    disallowEmptySelection
                    selectionMode="single"
                    selectedKeys={selectedContentType}
                    onSelectionChange={(selected) => {
                      if (selected instanceof Set) {
                        const value = Array.from(selected)
                          .join(", ")
                          .replaceAll("_", " ");
                        setSelectedContentType(
                          new Set([value as ASContentType])
                        );
                        handleSearch(query, value);
                      }
                    }}
                  >
                    <DropdownItem key="ALL">All</DropdownItem>
                    <DropdownItem key="ANIME">Anime</DropdownItem>
                    <DropdownItem key="K-DRAMA">K-drama</DropdownItem>
                    <DropdownItem key="MOVIE">Movie</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </ModalHeader>
              <ModalBody>
                <>
                  {query &&
                    status === "loading" &&
                    dataList.map((data) => (
                      <div className="flex flex-col gap-4" key={data.id}>
                        <Skeleton className="w-full h-9 rounded-lg" />
                        <div className="flex gap-2 px-3 size-full">
                          <Skeleton className="w-24 aspect-2/3 rounded-xl" />
                          <div className="flex flex-col justify-center gap-2 size-full mt-6">
                            <Skeleton className="h-7 w-2/3 rounded-lg" />
                            <Skeleton className="h-5 w-1/3 rounded-lg" />
                          </div>
                        </div>
                      </div>
                    ))}
                  {query && status === "idle" && dataList.length === 0 && (
                    <Chip
                      variant="bordered"
                      color="warning"
                      className="mx-auto py-4"
                    >
                      Nothing found.
                    </Chip>
                  )}

                  {(selectedValue === "ALL" || selectedValue === "ANIME") && (
                    <ResultList
                      dataList={animeDataList}
                      topContent={
                        <p className="bg-secondary-500/20 text-center rounded-lg py-2">
                          Anime
                        </p>
                      }
                    />
                  )}

                  {(selectedValue === "ALL" || selectedValue === "K-DRAMA") && (
                    <ResultList
                      dataList={kdramaDataList}
                      topContent={
                        <p className="bg-secondary-500/20 text-center rounded-lg py-2">
                          K-drama
                        </p>
                      }
                    />
                  )}

                  {(selectedValue === "ALL" || selectedValue === "MOVIE") && (
                    <ResultList
                      dataList={movieDataList}
                      topContent={
                        <p className="bg-secondary-500/20 text-center rounded-lg py-2">
                          Movie
                        </p>
                      }
                    />
                  )}
                </>
              </ModalBody>
              <ModalFooter>
                {query && dataList.length > 0 && (
                  <Button
                    as={NextLink}
                    href={`/search?q=${query}&contentType=${selectedValue}`}
                    onPress={onClose}
                    size="sm"
                    variant="light"
                    fullWidth
                  >
                    View More
                  </Button>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

function ResultList({
  dataList,
  topContent,
}: {
  dataList: CardDataProps[];
  topContent?: ReactNode;
}) {
  return (
    <Listbox aria-label="Search list" topContent={topContent} hideEmptyContent>
      {dataList.map((data) => {
        const type = data.tagList?.find((tag) => tag.name === "type")?.value;
        const releaseDate = data.tagList?.find(
          (tag) => tag.name === "releaseDate"
        )?.value;
        const totalEpisodes = data.tagList?.find(
          (tag) => tag.name === "totalEpisodes"
        )?.value;
        const seasons = data.tagList?.find(
          (tag) => tag.name === "seasons"
        )?.value;

        let description = "";
        if (type) description += `${type}`;
        if (releaseDate) description += ` • ${releaseDate}`;
        if (totalEpisodes) description += ` • ${totalEpisodes} Episode`;
        if (seasons)
          description += ` • ${seasons} Season${
            parseInt(`${seasons}`) > 1 ? "s" : ""
          }`;
        return (
          <ListboxItem
            href={data.href}
            classNames={{ title: "text-wrap line-clamp-2" }}
            startContent={
              <Image
                alt={data.name}
                src={data.image}
                isZoomed
                classNames={{
                  wrapper:
                    "z-0 w-24 aspect-2/3 mx-auto bg-blur-md flex items-center justify-center overflow-hidden",
                  img: "object-cover min-w-full min-h-full",
                }}
              />
            }
            description={<span>{description}</span>}
            key={data.id}
          >
            {data.name}
          </ListboxItem>
        );
      })}
    </Listbox>
  );
}
