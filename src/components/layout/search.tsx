"use client";

import { searchAnime } from "@/actions/consumet";
import { consumetSearchAnimeObjectMapper } from "@/lib/object-mapper";
import { Tag } from "@/lib/types";
import { debounce } from "@/lib/utils";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
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
];

export default function Search() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [dataList, setDataList] = useState<CardDataProps[]>([]);

  const handleSearch = useCallback(
    debounce(async (query: string) => {
      const animeListData = await searchAnime({ query });
      if (!animeListData) return setDataList([]);
      const mappedList = consumetSearchAnimeObjectMapper({
        searchData: animeListData,
        tagList,
      });
      setDataList(mappedList);
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
        classNames={{ base: "max-w-xl" }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <Input
                  onValueChange={handleSearch}
                  classNames={{ base: "max-w-lg" }}
                  variant="underlined"
                  startContent={<SvgIcon.search />}
                />
              </ModalHeader>
              <ModalBody>
                <ul>
                  {dataList.map((data) => (
                    <li key={data.id}>
                      <a href={`/anime/info/${data.id}`}>{data.name}</a>
                    </li>
                  ))}
                </ul>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
