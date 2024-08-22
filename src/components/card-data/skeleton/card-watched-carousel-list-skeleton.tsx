"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import CardWatchedSkeleton from "./card-watched-skeleton";

type Props = {
  count: number;
  className?: string;
};

export default function CardWatchedCarouselListSkeleton({
  count,
  className,
}: Props) {
  return (
    <Carousel
      opts={{
        dragFree: true,
        slidesToScroll: "auto",
      }}
      className={className}
    >
      <CarouselContent className="-ml-1">
        {Array.from({ length: count }, (_, index) => index).map((_, index) => (
          <CarouselItem
            key={index}
            className={cn(
              "p-2 hover:p-2 h-fit hover:bg-gray-500/50 transition-all delay-100 ease-soft-spring rounded-xl basis-[60%] md:basis-[32%] lg:basis-[24%] xl:basis-[18%]",
              index === 0 && "ml-4 md:ml-10"
            )}
          >
            <CardWatchedSkeleton />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
