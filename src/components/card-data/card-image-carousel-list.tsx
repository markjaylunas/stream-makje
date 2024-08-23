import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import CardData, { CardDataProps } from "./card-data";
import CardImage, { CardImageProps } from "./card-image";
import CardLink from "./card-link";

type Props = {
  imageList: CardImageProps[];
  className?: string;
};

export default function CardImageCarouselList({ imageList, className }: Props) {
  return (
    <Carousel
      opts={{
        dragFree: true,
        slidesToScroll: "auto",
      }}
      className={className}
    >
      <CarouselContent className="-ml-1">
        {imageList.map((image, index) => (
          <CarouselItem
            key={`${image.name}-${index}`}
            className={cn(
              "p-2 transition-all delay-100 ease-soft-spring rounded-xl basis-[42%] xs:basis-[28%] md:basis-[23%] lg:basis-[19%] xl:basis-[15%] 2xl:basis-[13%]",
              index === 0 && "ml-4 md:ml-10"
            )}
          >
            <CardImage {...image} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute z-10 top-1/2 left-8 transform -translate-x-1/2 -translate-y-1/2" />
      <CarouselNext className="absolute z-10 top-1/2 right-0 transform -translate-x-1/2 -translate-y-1/2" />
    </Carousel>
  );
}
