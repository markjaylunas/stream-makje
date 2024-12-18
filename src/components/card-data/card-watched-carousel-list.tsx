import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import CardLink from "./card-link";
import {
  default as CardWatchedData,
  CardWatchedDataProps,
} from "./card-watched-data";

type Props = {
  viewMoreHref?: string;
  infoList: CardWatchedDataProps[];
  className?: string;
};

export default function CardWatchedCarouselList({
  viewMoreHref,
  infoList,
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
            key={viewMoreHref}
            className="p-2 hover:p-2 hover:bg-gray-500/50 transition-all delay-100 ease-soft-spring rounded-xl basis-[65%] md:basis-[35%] lg:basis-[18%]"
          >
            <CardLink
              orientation="horizontal"
              href={viewMoreHref}
              title="View More"
            />
          </CarouselItem>
        )}
      </CarouselContent>
      <CarouselPrevious className="absolute z-10 top-1/2 left-8 transform -translate-x-1/2 -translate-y-1/2" />
      <CarouselNext className="absolute z-10 top-1/2 right-0 transform -translate-x-1/2 -translate-y-1/2" />
    </Carousel>
  );
}
