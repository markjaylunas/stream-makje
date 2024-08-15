"use client";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { useState } from "react";
import Heading from "../ui/heading";
import CardData, { CardDataProps } from "./card-data";

type Props = {
  title?: string;
  infoList: CardDataProps[];
  className?: string;
};

export default function CardCarouselList({
  infoList,
  title,
  className,
}: Props) {
  const [_, setApi] = useState<CarouselApi>();
  return (
    <section className={cn("space-y-2", className)}>
      {title && (
        <Heading
          order="xl"
          className="text-gray-700 dark:text-gray-300 px-6 md:px-10"
        >
          {title}
        </Heading>
      )}
      <Carousel
        opts={{
          dragFree: true,
          slidesToScroll: "auto",
        }}
        setApi={setApi}
        className="w-full"
      >
        <CarouselContent className="-ml-1">
          {infoList.map((info, index) => (
            <CarouselItem
              key={`${info.id}-${index}`}
              className={cn(
                "p-2 hover:p-2 hover:bg-gray-500/50 transition-all delay-200 ease-soft-spring rounded-xl basis-[42%] xs:basis-[28%] md:basis-[23%] lg:basis-[19%] xl:basis-[15%] 2xl:basis-[13%]",
                index === 0 && "ml-4 md:ml-10"
              )}
            >
              <CardData {...info} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute z-10 top-1/2 left-8 transform -translate-x-1/2 -translate-y-1/2" />
        <CarouselNext className="absolute z-10 top-1/2 right-0 transform -translate-x-1/2 -translate-y-1/2" />
      </Carousel>
    </section>
  );
}
