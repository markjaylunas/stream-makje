import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import Unavailable from "../ui/unavailable";
import CardData, { CardDataProps } from "./card-data";
import CardLink from "./card-link";

type Props = {
  viewMoreHref?: string;
  infoList: CardDataProps[];
  className?: string;
};

export default function CardCarouselList({
  viewMoreHref,
  infoList,
  className,
}: Props) {

  if(infoList.length === 0) return <Unavailable /> 
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
              "p-2 hover:p-2 hover:bg-gray-500/50 transition-all delay-100 ease-soft-spring rounded-xl basis-[42%] xs:basis-[28%] md:basis-[23%] lg:basis-[19%] xl:basis-[15%] 2xl:basis-[13%]",
              index === 0 && "ml-4 md:ml-10"
            )}
          >
            <CardData {...info} />
          </CarouselItem>
        ))}
        {viewMoreHref && (
          <CarouselItem
            key={viewMoreHref}
            className="p-2 hover:p-2 hover:bg-gray-500/50 transition-all delay-100 ease-soft-spring rounded-xl basis-[42%] xs:basis-[28%] md:basis-[23%] lg:basis-[19%] xl:basis-[15%] 2xl:basis-[13%]"
          >
            <CardLink href={viewMoreHref} title="View More" />
          </CarouselItem>
        )}
      </CarouselContent>
      <CarouselPrevious className="absolute z-10 top-1/2 left-8 transform -translate-x-1/2 -translate-y-1/2" />
      <CarouselNext className="absolute z-10 top-1/2 right-0 transform -translate-x-1/2 -translate-y-1/2" />
    </Carousel>
  );
}
