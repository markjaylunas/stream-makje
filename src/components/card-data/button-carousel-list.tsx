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

type Button = {
  name: string;
  value: string;
};

type Props = {
  pathName: string;
  selected?: string;
  buttonList: Button[];
  className?: string;
};

export default function ButtonCarouselList({
  buttonList,
  className,
  pathName,
  selected,
}: Props) {
  return (
    <section className={cn("space-y-2", className)}>
      <Carousel
        opts={{
          dragFree: true,
          slidesToScroll: "auto",
        }}
        className="w-full bg-default-50"
      >
        <CarouselContent className="-ml-1 py-4">
          {buttonList.map((button, index) => (
            <CarouselItem
              key={`${button.value}-${index}`}
              className={cn(
                "p-1 rounded-xl basis-auto",
                index === 0 && "ml-4 md:ml-10"
              )}
            >
              <Button
                as={NextLink}
                href={`${pathName}/${button.value}`}
                radius="full"
                size="sm"
                variant="bordered"
                color="default"
                isDisabled={selected === button.value}
              >
                {button.name}
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
