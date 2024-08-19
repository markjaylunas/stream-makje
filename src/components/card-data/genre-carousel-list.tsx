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
import { Button } from "@nextui-org/react";
import NextLink from "next/link";
import { useState } from "react";

type Props = {
  pathName: string;
  genreList: string[];
  className?: string;
};

export default function GenreCarouselList({
  genreList,
  className,
  pathName,
}: Props) {
  const [_, setApi] = useState<CarouselApi>();
  return (
    <section className={cn("space-y-2", className)}>
      <Carousel
        opts={{
          dragFree: true,
          slidesToScroll: "auto",
        }}
        setApi={setApi}
        className="w-full bg-default-50"
      >
        <CarouselContent className="-ml-1 py-4">
          {genreList.map((genre, index) => (
            <CarouselItem
              key={`${genre}-${index}`}
              className={cn(
                "p-1 rounded-xl basis-auto",
                index === 0 && "ml-4 md:ml-10"
              )}
            >
              <Button
                as={NextLink}
                href={`${pathName}/${genre}`}
                radius="full"
                size="sm"
                variant="bordered"
                color="default"
              >
                {genre}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute z-10 top-1/2 left-8 transform -translate-x-1/2 -translate-y-1/2" />
        <CarouselNext className="absolute z-10 top-1/2 right-0 transform -translate-x-1/2 -translate-y-1/2" />
      </Carousel>
    </section>
  );
}
