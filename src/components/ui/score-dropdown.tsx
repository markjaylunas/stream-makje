"use client";

import { upsertWatchStatus } from "@/actions/action";
import { AnimeInsert, AnimeUserStatus } from "@/db/schema";
import { DEFAULT_SIGNIN_PATH } from "@/lib/routes";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";

import { Button } from "@nextui-org/button";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SvgIcon } from "./svg-icons";

type Props = {
  animeWatchStatus: AnimeUserStatus | null;
  anime: AnimeInsert;
  size?: "lg" | "sm" | "md" | undefined;
};

export default function ScoreDropdown({
  animeWatchStatus,
  anime,
  size,
}: Props) {
  const session = useSession();
  const userId = session?.data?.user?.id;
  const router = useRouter();
  const [userWatchStatus, setUserWatchStatus] =
    useState<AnimeUserStatus | null>(animeWatchStatus);
  const [isLoading, setIsLoading] = useState(false);

  const labelsMap: Record<string, string> = {
    "0": "0 - Not Rated",
    "1": "1 - Appalling",
    "2": "2 - Horrible",
    "3": "3 - Very Bad",
    "4": "4 - Bad",
    "5": "5 - Average",
    "6": "6 - Fine",
    "7": "7 - Good",
    "8": "8 - Very Good",
    "9": "9 - Great",
    "10": "10 - Masterpiece",
  };

  const selectedOptionValue: number = Array.from(
    userWatchStatus?.score ? [userWatchStatus?.score] : [0]
  )[0] as number;

  const handleSubmit = async (selected: Set<string>) => {
    if (!userId) {
      router.push(DEFAULT_SIGNIN_PATH);
      return;
    }
    setIsLoading(true);
    const score = parseInt(selected.values().next().value || "");
    if (!score) return;
    const upsertData = await upsertWatchStatus({
      animeInsert: anime,
      data: {
        id: userWatchStatus?.id || undefined,
        score,
        animeId: anime.id,
        userId,
      },
    });
    setUserWatchStatus(upsertData[0]);
    setIsLoading(false);
  };

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Button
          size={size}
          radius="md"
          variant={selectedOptionValue >= 1 ? "bordered" : "flat"}
          color={selectedOptionValue >= 1 ? "default" : "secondary"}
          isDisabled={isLoading}
        >
          {selectedOptionValue >= 1 ? (
            <>
              <SvgIcon.startFill className="size-4" />
              <span className="ml-1">{selectedOptionValue}</span>
            </>
          ) : (
            <>
              <SvgIcon.star className="size-4" />
              <span className="ml-1">Rate</span>
            </>
          )}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        disallowEmptySelection
        aria-label="Watch list options"
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
            <DropdownItem key={key.toString()}>
              {labelsMap[key as string]}
            </DropdownItem>
          ))}
      </DropdownMenu>
    </Dropdown>
  );
}
