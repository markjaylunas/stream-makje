"use client";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNextPrev,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useState } from "react";
import { CardDataProps } from "./card-data";
import AnimeSpotlightCard from "./card-spotlight";

type Props = {
  infoList: CardDataProps[];
};

export default function CardSpotlightList({ infoList }: Props) {
  const [_, setApi] = useState<CarouselApi>();

  return (
    <Carousel
      setApi={setApi}
      opts={{
        skipSnaps: true,
      }}
      plugins={[
        Autoplay({
          delay: 5000,
          stopOnMouseEnter: true,
        }),
      ]}
      className="w-full"
    >
      <CarouselContent className="-ml-1 ">
        {infoList.map((anime, index) => (
          <CarouselItem key={`${anime.id}-${index}`} className="basis-[100%]">
            <AnimeSpotlightCard {...anime} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselNextPrev
        className="right-4 sm:right-2  bottom-2"
        variant="secondary"
      />
    </Carousel>
  );
}
