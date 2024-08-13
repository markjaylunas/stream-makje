"use client";

import { AWEpisodeServersSchema } from "@/api/aniwatch-validations";
import { SvgIcon } from "@/components/ui/svg-icons";
import { Button } from "@nextui-org/button";
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
        <Button size="sm" variant="flat" endContent={<SvgIcon.chevronDown />}>
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
