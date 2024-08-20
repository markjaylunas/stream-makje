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
import CardViewMore from "./card-view-more";
import {
  default as CardWatchedData,
  CardWatchedDataProps,
} from "./card-watched-data";

type Props = {
  title?: string;
  viewMoreHref?: string;
  infoList: CardWatchedDataProps[];
  className?: string;
};

export default function CardWatchedCarouselList({
  viewMoreHref,
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
          className="text-gray-700 dark:text-gray-300 px-6 md:px-10 h-fit"
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
        className="w-full  overflow-hidden"
      >
        <CarouselContent className="-ml-1">
          {infoList.map((info, index) => (
            <CarouselItem
              key={`${info.id}-${index}`}
              className={cn(
                "p-2 hover:p-2 h-fit hover:bg-gray-500/50 transition-all delay-100 ease-soft-spring rounded-xl basis-[60%] md:basis-[32%] lg:basis-[24%] xl:basis-[18%]",
                index === 0 && "ml-4 md:ml-10"
              )}
            >
              <CardWatchedData {...info} />
            </CarouselItem>
          ))}
          {viewMoreHref && (
            <CarouselItem
              key={`${title}-view-more`}
              className="p-2 hover:p-2 hover:bg-gray-500/50 transition-all delay-100 ease-soft-spring rounded-xl basis-[65%] md:basis-[35%] lg:basis-[18%]"
            >
              <CardViewMore orientation="horizontal" href={viewMoreHref} />
            </CarouselItem>
          )}
        </CarouselContent>
        <CarouselPrevious className="absolute z-10 top-1/2 left-8 transform -translate-x-1/2 -translate-y-1/2" />
        <CarouselNext className="absolute z-10 top-1/2 right-0 transform -translate-x-1/2 -translate-y-1/2" />
      </Carousel>
    </section>
  );
}
