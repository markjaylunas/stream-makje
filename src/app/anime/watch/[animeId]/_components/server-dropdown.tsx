"use client";

import { AWEpisodeServersSchema } from "@/api/aniwatch-validations";
import { SvgIcon } from "@/components/ui/svg-icons";
import { createURL } from "@/lib/utils";
import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { useParams, useSearchParams } from "next/navigation";

export type ServerOptionListType = {
  type: string;
  list: AWEpisodeServersSchema[];
}[];

type Props = {
  server: ServerOptionListType[0];
};

export default function ServerDropdown({ server }: Props) {
  const { animeId } = useParams<{
    animeId: string;
  }>();
  const searchParams = useSearchParams();
  const provider = searchParams.get("provider");
  const episodeId = searchParams.get("episodeId");
  const episodeNumber = searchParams.get("episodeNumber");
  return (
    <>
      <Dropdown placement="bottom-start" key={server.type}>
        <DropdownTrigger>
          <Button size="sm" variant="flat" endContent={<SvgIcon.chevronDown />}>
            {server.type.toUpperCase()}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          disallowEmptySelection
          aria-label="Stream server options"
          className="max-w-[300px]"
        >
          {server.list.map((stream) => (
            <DropdownItem
              href={createURL({
                path: `/anime/watch/${animeId}`,
                params: {
                  episodeId,
                  episodeNumber,
                  provider,
                  server: stream.serverName,
                  category: server.type,
                },
              })}
              key={stream.serverId}
            >
              {stream.serverName}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </>
  );
}
