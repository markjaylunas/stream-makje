"use client";

import { SvgIcon } from "@/components/ui/svg-icons";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { ServerDropdownProps } from "./server-option";

export default function ServerDropdown({ server }: ServerDropdownProps) {
  return (
    <Dropdown placement="bottom-start" key={server.type}>
      <DropdownTrigger>
        <Button
          radius="md"
          size="sm"
          variant="flat"
          endContent={<SvgIcon.chevronDown />}
        >
          {server.type.toUpperCase()}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        disallowEmptySelection
        aria-label="Stream server options"
        className="max-w-[300px]"
      >
        {server.list.map((stream) => (
          <DropdownItem href={stream.href} key={stream.href}>
            {stream.name}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
