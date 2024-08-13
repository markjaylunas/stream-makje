"use client";

import { AWEpisodeServersSchema } from "@/api/aniwatch-validations";
import { Icons } from "@/components/ui/Icons";
import Text from "@/components/ui/text";
import { cn } from "@/lib/utils";
import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";

export type ServerOptionListType = {
  type: string;
  list: AWEpisodeServersSchema[];
}[];

type Props = {
  server: ServerOptionListType[0];
};

export default function ServerDropdown({ server }: Props) {
  return (
    <Dropdown placement="bottom-start" key={server.type}>
      <DropdownTrigger>
        <Button size="sm" variant="flat" endContent={<Icons.chevronDown />}>
          {server.type.toUpperCase()}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        disallowEmptySelection
        aria-label="Raw server options"
        className="max-w-[300px]"
      >
        {server.list.map((stream) => (
          <DropdownItem key={stream.serverId}>{stream.serverName}</DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
