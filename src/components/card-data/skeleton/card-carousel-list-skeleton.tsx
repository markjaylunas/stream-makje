import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import CardSkeleton from "./card-skeleton";

type Props = {
  count: number;
  className?: string;
};

export default function CardCarouselListSkeleton({ className, count }: Props) {
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
              "p-2 hover:p-2 hover:bg-gray-500/50 transition-all delay-100 ease-soft-spring rounded-xl basis-[42%] xs:basis-[28%] md:basis-[23%] lg:basis-[19%] xl:basis-[15%] 2xl:basis-[13%]",
              index === 0 && "ml-4 md:ml-10"
            )}
          >
            <CardSkeleton />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
