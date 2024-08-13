"use client";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
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
      <div className="absolute z-10 bottom-8 right-16 transform -translate-x-1/2 -translate-y-1/2">
        <CarouselPrevious className="ml-6" />
        <CarouselNext />
      </div>
    </Carousel>
  );
}
