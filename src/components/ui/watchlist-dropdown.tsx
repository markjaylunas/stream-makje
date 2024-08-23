"use client";

import { upsertWatchStatus } from "@/actions/anime-action";
import { upsertKdramaWatchStatus } from "@/actions/kdrama-action";
import {
  AnimeInsert,
  AnimeUserStatus,
  KdramaInsert,
  KdramaUserStatus,
  WatchStatus,
} from "@/db/schema";
import { DEFAULT_SIGNIN_PATH } from "@/lib/routes";
import { ContentType } from "@/lib/types";
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
  contentType: ContentType;
  watchStatus: AnimeUserStatus | KdramaUserStatus | null;
  info: AnimeInsert | KdramaInsert;
  size?: "lg" | "sm" | "md" | undefined;
};

export default function WatchListDropdown({
  contentType,
  info,
  watchStatus,
  size,
}: Props) {
  const session = useSession();
  const userId = session?.data?.user?.id;
  const router = useRouter();

  const [userWatchStatus, setUserWatchStatus] = useState<
    AnimeUserStatus | KdramaUserStatus | null
  >(watchStatus);
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

    if (contentType === "anime") {
      const upsertData = await upsertWatchStatus({
        animeInsert: info,
        data: {
          id: userWatchStatus?.id || undefined,
          status,
          animeId: info.id,
          userId,
        },
      });
      setUserWatchStatus(upsertData[0]);
    }
    if (contentType === "k-drama") {
      const upsertData = await upsertKdramaWatchStatus({
        kdramaInsert: info,
        data: {
          id: userWatchStatus?.id || undefined,
          status,
          kdramaId: info.id,
          userId,
        },
      });
      setUserWatchStatus(upsertData[0]);
    }

    setIsLoading(false);
  };

  return (
    <ButtonGroup variant="shadow" size={size}>
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
