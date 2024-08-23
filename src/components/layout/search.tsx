"use client";

import { searchAnime, searchKdrama } from "@/actions/consumet";
import {
  consumetKDramacoolObjectMapper,
  consumetSearchAnimeObjectMapper,
} from "@/lib/object-mapper";
import { Status, Tag } from "@/lib/types";
import { debounce } from "@/lib/utils";
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
import { useCallback, useMemo, useState } from "react";
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
];

const categoryList = ["anime", "k-drama"];

export default function Search({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
}) {
  const pathname = usePathname();
  const defaultCategory = categoryList.find(
    (v) => v === pathname.split("/")[1]
  );
  const [dataList, setDataList] = useState<CardDataProps[]>([]);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [selectedCategory, setSelectedCategory] = useState(
    new Set([defaultCategory || "all"])
  );

  const selectedValue = Array.from(selectedCategory)
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

  const handleSearch = useCallback(
    debounce(async (q: string, category: string) => {
      try {
        setStatus("loading");
        let mappedList: CardDataProps[] = [];

        if (category === "anime") mappedList = await handleSearchAnime(q);
        else if (category === "k-drama")
          mappedList = await handleSearchKdrama(q);
        else {
          const [animeMappedList, kdramaMappedList] = await Promise.all([
            handleSearchAnime(q),
            handleSearchKdrama(q),
          ]);
          mappedList = [...animeMappedList, ...kdramaMappedList];
        }
        setDataList(mappedList);
      } catch (error) {
        console.log(error);
      } finally {
        setStatus("idle");
      }
    }, 300),
    []
  );

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
                      {selectedValue}
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    aria-label="Single selection example"
                    variant="flat"
                    disallowEmptySelection
                    selectionMode="single"
                    selectedKeys={selectedCategory}
                    onSelectionChange={(selected) => {
                      if (selected instanceof Set) {
                        const value = Array.from(selected)
                          .join(", ")
                          .replaceAll("_", " ");
                        setSelectedCategory(new Set([value]));
                        handleSearch(query, value);
                      }
                    }}
                  >
                    <DropdownItem key="all">All</DropdownItem>
                    <DropdownItem key="k-drama">K-drama</DropdownItem>
                    <DropdownItem key="anime">Anime</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </ModalHeader>
              <ModalBody>
                <>
                  {query &&
                    status === "loading" &&
                    dataList.map((data) => (
                      <div className="flex gap-2 px-3 size-full" key={data.id}>
                        <Skeleton className="w-24 aspect-2/3 rounded-xl" />
                        <div className="flex flex-col justify-center gap-2 size-full mt-6">
                          <Skeleton className="h-7 w-2/3 rounded-lg" />
                          <Skeleton className="h-5 w-1/3 rounded-lg" />
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
                  <Listbox aria-label="Search list" hideEmptyContent>
                    {dataList.map((data) => {
                      const type = data.tagList?.find(
                        (tag) => tag.name === "type"
                      )?.value;
                      const releaseDate = data.tagList?.find(
                        (tag) => tag.name === "releaseDate"
                      )?.value;
                      const totalEpisodes = data.tagList?.find(
                        (tag) => tag.name === "totalEpisodes"
                      )?.value;

                      let description = "";
                      if (type) description += `${type}`;
                      if (releaseDate) description += ` • ${releaseDate}`;
                      if (totalEpisodes)
                        description += ` • ${totalEpisodes} Episode`;
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
                          description={
                            <span>
                              {description}
                              {/* {`${type}`}&nbsp;&#183;&nbsp;{`${releaseDate}`}
                              &nbsp;&#183;&nbsp;{`${totalEpisodes}`}
                              &nbsp;Episode
                              {Number(totalEpisodes) || 0 > 1 ? "s" : ""} */}
                            </span>
                          }
                          key={data.id}
                        >
                          {data.name}
                        </ListboxItem>
                      );
                    })}
                  </Listbox>
                </>
              </ModalBody>
              <ModalFooter>
                {query && dataList.length > 0 && (
                  <Button
                    as={NextLink}
                    href={`/search?q=${query}`}
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
