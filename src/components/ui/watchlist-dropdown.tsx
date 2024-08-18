"use client";

import { upsertWatchStatus } from "@/actions/action";
import { AnimeInsert, AnimeUserStatus, WatchStatus } from "@/db/schema";
import { DEFAULT_SIGNIN_PATH } from "@/lib/routes";
import {
  Button,
  ButtonGroup,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SvgIcon } from "./svg-icons";

type Status = WatchStatus | "null";

type Props = {
  animeWatchStatus: AnimeUserStatus | null;
  anime: AnimeInsert;
};

export default function WatchListDropdown({ animeWatchStatus, anime }: Props) {
  const session = useSession();
  const userId = session?.data?.user?.id;
  const router = useRouter();

  const [userWatchStatus, setUserWatchStatus] =
    useState<AnimeUserStatus | null>(animeWatchStatus);
  const [isLoading, setIsLoading] = useState(false);

  const labelsMap: Record<Status, string> = {
    null: "Add to Watchlist",
    WATCHING: "Watching",
    COMPLETED: "Completed",
    ON_HOLD: "On-Hold",
    DROPPED: "Dropped",
    PLAN_TO_WATCH: "Plan to Watch",
  };

  const selectedOptionValue: WatchStatus = Array.from(
    userWatchStatus?.status ? [userWatchStatus?.status] : ["null"]
  )[0] as WatchStatus;

  const isNull = labelsMap[selectedOptionValue] === labelsMap["null"];

  const handleSubmit = async (selected: Set<string>) => {
    if (!userId) {
      router.push(DEFAULT_SIGNIN_PATH);
      return;
    }
    setIsLoading(true);
    const status = selected.values().next().value as WatchStatus;
    const upsertData = await upsertWatchStatus({
      animeInsert: anime,
      data: {
        id: userWatchStatus?.id || undefined,
        status,
        animeId: anime.id,
        userId,
      },
    });
    setUserWatchStatus(upsertData[0]);
    setIsLoading(false);
  };

  return (
    <ButtonGroup variant="shadow" size="sm">
      <Button
        variant={isNull ? "flat" : "bordered"}
        color={isNull ? "primary" : "default"}
        disabled={!isNull}
        isLoading={isLoading}
        radius="md"
        onPress={() => {
          const value = new Set(["WATCHING"]);
          isNull ? handleSubmit(value) : null;
        }}
      >
        {labelsMap[selectedOptionValue]}
      </Button>
      <Dropdown placement="bottom-end">
        <DropdownTrigger disabled={isNull}>
          <Button
            color={isNull ? "default" : "primary"}
            variant={isNull ? "flat" : "bordered"}
            isDisabled={isNull || isLoading}
            radius="md"
            isIconOnly
          >
            <SvgIcon.chevronDown />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          disallowEmptySelection
          aria-label="Watch list options"
          selectedKeys={selectedOptionValue}
          selectionMode="single"
          onSelectionChange={(selected) => {
            if (selected instanceof Set) {
              handleSubmit(selected as Set<string>);
            }
          }}
          className="max-w-[300px]"
        >
          {Object.keys(labelsMap)
            .slice(1)
            .map((key) => (
              <DropdownItem key={key}>
                {labelsMap[key as WatchStatus]}
              </DropdownItem>
            ))}
        </DropdownMenu>
      </Dropdown>
    </ButtonGroup>
  );
}
