"use client";

import { cn } from "@/lib/utils";
import { Button, ButtonGroup } from "@nextui-org/button";
import { Card, CardFooter } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import { Image } from "@nextui-org/image";
import { MediaPlayerInstance } from "@vidstack/react";
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

  const [spotlight, setSpotlight] = useState<CardDataProps>(infoList[0]);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [canNavigate, setCanNavigate] = useState<Navigate>("canNext");

  const handlePlay = () => {
    setIsPlaying(true);
  };
  const handleEnd = () => {
    setIsPlaying(false);
  };

  const handlePlayerButton = () => {
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
      setIsPlaying(false);
      setSpotlight(newSpotlight);
    }
  };

  return (
    <Card
      shadow="none"
      radius="none"
      className="relative transition-all delay-75 ease-soft-spring
       h-full w-full aspect-square md:aspect-3/1 lg:aspect-16/6 bg-gray-600 select-none overflow-hidden"
    >
      <div className="absolute z-10 w-[101%] h-[101%] bg-gradient-to-t from-white dark:from-black via-white/20 dark:via-black/20  to-transparent" />
      <div className="absolute z-10 w-[101%] h-[101%] bg-gradient-to-r dark:from-black dark:via-black/40 from-white via-white/40 to-transparent" />

      {spotlight.trailer && (
        <div className="absolute bg-black h-full w-full -top-2 -right-2">
          <SpotlightVideoPlayer
            isPlaying={true}
            isMuted={isMuted}
            src={`https://www.youtube.com/watch?v=${spotlight.trailer?.id}`}
            onPlay={handlePlay}
            onEnd={handleEnd}
            player={player}
          />
        </div>
      )}

      <div className="absolute z-30  bottom-2 right-6">
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

      <Image
        alt={spotlight.name}
        src={spotlight.cover || spotlight.image}
        className={cn(isPlaying && "hidden")}
        classNames={{
          wrapper:
            "hidden sm:flex z-0 w-full h-full mx-auto bg-blur-md items-start justify-end -mt-2",
          img: "object-cover object-right-middle min-w-full min-h-full",
        }}
      />

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

      <CardFooter className="absolute flex items-start flex-col pl-4 pb-16 md:pl-28 md:pb-12 z-20 bottom-0">
        {Boolean(spotlight.rank) && (
          <p className="text-2xl font-black text-foreground-500/70 ">
            {moment.localeData().ordinal(spotlight.rank || 0)}&nbsp;
            <span className="text-base">on Trend</span>
          </p>
        )}
        <h6 className="text-foreground-600 font-bold text-2xl md:text-4xl w-1/3 line-clamp-3 sm:line-clamp-2 text-left">
          {spotlight.name}
        </h6>

        <div className="space-y-3 mt-4">
          <div className="hidden sm:flex flex-wrap gap-2 w-2/3">
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

          <p className="text-foreground-500 text-tiny sm:text-sm md:text-base w-1/2 line-clamp-3 sm:line-clamp-2 text-left">
            {spotlight.description?.replace(/<[^>]*>/g, " ")}
          </p>
        </div>

        <div className="mt-4 flex gap-4">
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
            >
              More Info
            </Button>
          </ButtonGroup>

          <Button
            aria-label="player button"
            onPress={handlePlayerButton}
            variant="bordered"
            radius="full"
            className={cn(spotlight.trailer?.id ? "" : "hidden")}
            startContent={
              <>
                {isPlaying ? (
                  isMuted ? (
                    <SvgIcon.speakerOff />
                  ) : (
                    <SvgIcon.speaker />
                  )
                ) : (
                  <SvgIcon.play className="size-4" />
                )}
              </>
            }
            isIconOnly
          />
        </div>
      </CardFooter>
    </Card>
  );
}
