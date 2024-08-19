"use client";

import { cn } from "@/lib/utils";
import { Button, ButtonGroup } from "@nextui-org/button";
import { Card, CardFooter } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import { Image } from "@nextui-org/image";
import { MediaPlayerInstance, useMediaState } from "@vidstack/react";
import moment from "moment";
import NextLink from "next/link";
import { useRef, useState } from "react";
import { SvgIcon } from "../ui/svg-icons";
import SpotlightVideoPlayer from "../video-player/spotlight-video-player";
import { CardDataProps } from "./card-data";

type Navigate = "canPrev" | "canBoth" | "canNext";

type Props = {
  infoList: CardDataProps[];
};

export default function CardSpotlight({ infoList }: Props) {
  let player = useRef<MediaPlayerInstance>(null);
  const isPlaying = useMediaState("playing", player);
  const canPlay = useMediaState("canPlay", player);

  const [spotlight, setSpotlight] = useState<CardDataProps>(infoList[0]);
  const [isMuted, setIsMuted] = useState(true);
  const [canNavigate, setCanNavigate] = useState<Navigate>("canNext");

  const handlePlayerButton = () => {
    if (!canPlay) return;
    if (isPlaying) {
      setIsMuted((v) => !v);
    } else {
      player.current?.play();
    }
  };

  const handleNavigate = (goto: "next" | "prev") => {
    const currentIndex = infoList.findIndex((info) => info.id === spotlight.id);
    const newSpotlight =
      infoList[goto === "next" ? currentIndex + 1 : currentIndex - 1];
    const newIndex = infoList.findIndex((info) => info.id === newSpotlight.id);
    const next = infoList[newIndex + 1];
    const prev = infoList[newIndex - 1];
    let nav: Navigate = "canBoth";
    if (next && !prev) {
      nav = "canNext";
    }
    if (!next && prev) {
      nav = "canPrev";
    }
    setCanNavigate(nav);
    if (newSpotlight) {
      setSpotlight(newSpotlight);
    }
  };

  return (
    <Card
      shadow="none"
      radius="none"
      className="relative transition-all delay-75 ease-soft-spring h-full w-full bg-blue-500 aspect-square sm:aspect-16/8 select-none overflow-hidden"
    >
      <div
        className={cn(
          "absolute z-10 w-[101%] h-[101%] bg-gradient-to-t from-white dark:from-black via-white/10 dark:via-black/10 to-transparent from-[5%] via-[30%]",
          isPlaying && "hidden md:inline-block"
        )}
      />
      <div
        className={cn(
          " absolute z-10 w-[101%] h-[101%] bg-gradient-to-tr from-white dark:from-black  to-transparent from-[5%] via-[30%]",
          canPlay
            ? "via-white/5 dark:via-black/5"
            : "via-white/90 dark:via-black/90",
          isPlaying && "hidden md:inline-block"
        )}
      />
      <div
        className={cn(
          "absolute z-10 w-[101%] h-[101%] bg-gradient-to-r from-white dark:from-black via-white/10 dark:via-black/10 to-transparent from-[0 %] via-[30%]",
          isPlaying && "hidden md:inline-block"
        )}
      />

      {spotlight.trailer && (
        <div className="absolute bg-black h-full w-full ">
          <div className="relative">
            <SpotlightVideoPlayer
              isMuted={isMuted}
              src={`https://www.youtube.com/watch?v=${spotlight.trailer?.id}`}
              player={player}
              className="mt-16 sm:-mt-16"
            />
            <div className="absolute z-0 top-0 w-[101%] h-[101%] bg-gradient-to-r from-white dark:from-black via-white/10 dark:via-black/5 to-transparent from-[0%] via-[20%]" />
            <div className="absolute z-0 top-0 w-[101%] h-[101%] bg-gradient-to-b from-white dark:from-black via-white/5 dark:via-black/10 to-transparent from-[5%] via-[20%]" />
            <div className="absolute z-0 top-0 w-[101%] h-[101%] bg-gradient-to-t from-white dark:from-black via-white/5 dark:via-black/10 to-transparent from-[10%] via-[20%]" />
            <div className="absolute z-0 top-0 w-[101%] h-[101%] bg-gradient-to-l from-white dark:from-black via-white/5 dark:via-black/10 to-transparent from-[0%] via-[20%]" />
          </div>
        </div>
      )}

      {/* desktop image */}
      <Image
        alt={spotlight.name}
        src={spotlight.cover || spotlight.image}
        className={cn(isPlaying && "hidden")}
        classNames={{
          wrapper:
            "hidden blur-sm sm:flex z-0 w-full h-full mx-auto bg-blur-md items-start justify-end -mt-2",
          img: "object-cover object-right-middle min-w-full min-h-full",
        }}
      />

      {/* mobile image */}
      <Image
        alt={spotlight.name}
        src={spotlight.image}
        className={cn(isPlaying && "hidden")}
        classNames={{
          wrapper:
            "flex sm:hidden z-0 w-full h-full mx-auto bg-blur-md items-start justify-end -mt-2",
          img: "object-cover object-right-middle min-w-full min-h-full",
        }}
      />

      <div className="absolute z-30 bottom-2 md:bottom-16 right-4">
        <ButtonGroup
          variant="bordered"
          radius="full"
          color="secondary"
          size="sm"
        >
          <Button
            isDisabled={canNavigate !== "canPrev" && canNavigate !== "canBoth"}
            onPress={() => handleNavigate("prev")}
            startContent={<SvgIcon.chevronLeft />}
            isIconOnly
          >
            <span className="sr-only">Previous</span>
          </Button>
          <Button
            isDisabled={canNavigate !== "canNext" && canNavigate !== "canBoth"}
            onPress={() => handleNavigate("next")}
            startContent={<SvgIcon.chevronRight />}
            isIconOnly
          >
            <span className="sr-only">Next</span>
          </Button>
        </ButtonGroup>
      </div>

      <CardFooter className="absolute flex items-start flex-col z-20 left-1 bottom-2 md:left-20 md:bottom-20">
        {Boolean(spotlight.rank) && (
          <p className=" text-tiny sm:text-2xl font-black text-foreground-700 dark:text-foreground-700/70 text-shadow text-shadow-white dark:text-shadow-black text-shadow-x-1 text-shadow-y-1">
            {moment.localeData().ordinal(spotlight.rank || 0)}&nbsp;
            <span className="text-tiny sm:text-base">on Trend</span>
          </p>
        )}
        <h6 className="font-bold text-foreground-800 dark:text-foreground-700 text-xl md:text-4xl w-2/3 sm:w-1/3 line-clamp-3 sm:line-clamp-4 text-left text-shadow text-shadow-white dark:text-shadow-black text-shadow-x-1 text-shadow-y-1">
          {spotlight.name}
        </h6>

        <div className="space-y-3">
          <div className="hidden sm:flex flex-wrap gap-2 w-2/3 mt-2">
            {spotlight.tagList?.map((tag) => (
              <Chip
                radius="sm"
                size="sm"
                color={tag.color}
                variant={tag.variant}
                startContent={tag.startContent}
                endContent={tag.endContent}
                key={`${tag.name}-${tag.value}`}
              >
                {tag.value}
              </Chip>
            ))}
          </div>

          <p className="text-foreground-800 dark:text-foreground-600 text-tiny sm:text-sm md:text-base w-1/2 line-clamp-2 text-left text-shadow text-shadow-white dark:text-shadow-black text-shadow-x-1 text-shadow-y-1">
            {spotlight.description?.replace(/<[^>]*>/g, " ")}
          </p>
        </div>

        <div className="mt-6 flex gap-4">
          <ButtonGroup color="primary">
            <Button
              as={NextLink}
              href={`/anime/watch/${spotlight.id}`}
              className=" font-medium"
            >
              Watch Now
            </Button>
            <Button
              as={NextLink}
              href={`/anime/info/${spotlight.id}`}
              variant="bordered"
              className="font-medium"
              startContent={<SvgIcon.information />}
            >
              Info
            </Button>
          </ButtonGroup>

          {canPlay && (
            <Button
              aria-label="player button"
              onPress={handlePlayerButton}
              variant="bordered"
              color="secondary"
              radius="full"
              className={cn(spotlight.trailer?.id ? "" : "hidden")}
              startContent={
                <>
                  {isPlaying &&
                    (isMuted ? <SvgIcon.speakerOff /> : <SvgIcon.speaker />)}

                  {!isPlaying && <SvgIcon.play className="size-4" />}
                </>
              }
              isIconOnly
            />
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
