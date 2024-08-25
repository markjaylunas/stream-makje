"use client";

import { upsertWatchStatus } from "@/actions/anime-action";
import {
  AnimeInsert,
  AnimeUserStatus,
  KdramaInsert,
  KdramaUserStatus,
  MovieUserStatus,
} from "@/db/schema";
import { DEFAULT_SIGNIN_PATH } from "@/lib/routes";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";

import { Button } from "@nextui-org/button";

import { upsertKdramaWatchStatus } from "@/actions/kdrama-action";
import { upsertMovieWatchStatus } from "@/actions/movie-action";
import { ContentType } from "@/lib/types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SvgIcon } from "./svg-icons";

type Props = {
  contentType: ContentType;
  watchStatus: AnimeUserStatus | KdramaUserStatus | MovieUserStatus | null;
  info: AnimeInsert | KdramaInsert;
  size?: "lg" | "sm" | "md" | undefined;
};

export default function ScoreDropdown({
  contentType,
  info,
  watchStatus,
  size,
}: Props) {
  const session = useSession();
  const userId = session?.data?.user?.id;
  const router = useRouter();
  const [userWatchStatus, setUserWatchStatus] = useState<
    AnimeUserStatus | KdramaUserStatus | MovieUserStatus | null
  >(watchStatus);
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
    if (contentType === "anime") {
      const upsertData = await upsertWatchStatus({
        animeInsert: info,
        data: {
          id: userWatchStatus?.id || undefined,
          score,
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
          score,
          kdramaId: info.id,
          userId,
        },
      });
      setUserWatchStatus(upsertData[0]);
    }
    if (contentType === "movie") {
      const upsertData = await upsertMovieWatchStatus({
        movieInsert: info,
        data: {
          id: userWatchStatus?.id || undefined,
          score,
          movieId: info.id,
          userId,
        },
      });
      setUserWatchStatus(upsertData[0]);
    }
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
