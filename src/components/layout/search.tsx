"use client";

import { searchAnime } from "@/actions/consumet";
import { consumetSearchAnimeObjectMapper } from "@/lib/object-mapper";
import { Status, Tag } from "@/lib/types";
import { cn, debounce } from "@/lib/utils";
import {
  Button,
  Chip,
  Image,
  Input,
  Kbd,
  Listbox,
  ListboxItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Skeleton,
  useDisclosure,
} from "@nextui-org/react";
import NextLink from "next/link";
import { useCallback, useState } from "react";
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

export default function Search() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [dataList, setDataList] = useState<CardDataProps[]>([]);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const handleSearch = useCallback(
    debounce(async (q: string) => {
      try {
        setStatus("loading");
        const animeListData = await searchAnime({ query: q });
        if (!animeListData) return setDataList([]);
        const mappedList = consumetSearchAnimeObjectMapper({
          searchData: animeListData,
          tagList,
        });
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
      <Button
        variant="light"
        onPress={onOpen}
        startContent={<SvgIcon.search />}
        isIconOnly
      />
      <Modal
        scrollBehavior="inside"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        hideCloseButton
        size="xs"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            <Input
              onValueChange={(v) => {
                handleSearch(v);
                setQuery(v);
              }}
              classNames={{ base: "max-w-lg" }}
              variant="underlined"
              startContent={<SvgIcon.search />}
              placeholder="Search title..."
              aria-label="Search title"
            />
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
                  return (
                    <ListboxItem
                      href={`/anime/info/${data.id}`}
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
                          {`${type}`}&nbsp;&#183;&nbsp;{`${releaseDate}`}
                          &nbsp;&#183;&nbsp;{`${totalEpisodes}`}&nbsp;Episode
                          {Number(totalEpisodes) || 0 > 1 ? "s" : ""}
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
                size="sm"
                variant="light"
                fullWidth
              >
                View More
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
