import { createURL } from "@/lib/utils";
import { Button, ButtonGroup } from "@nextui-org/button";
import { Card, CardFooter } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import { Image } from "@nextui-org/image";
import moment from "moment";
import NextLink from "next/link";
import { CardDataProps } from "./card-data";

export default function CardSpotlight(anime: CardDataProps) {
  const watchLink = createURL({
    path: `/anime/watch/${anime.id}`,
    params: {
      watchNow: true,
    },
  });

  const infoLink = createURL({
    path: `/anime/watch/${anime.id}`,
  });

  return (
    <Card
      radius="none"
      className="relative
       h-full w-full aspect-square sm:aspect-4/1 bg-gray-600 select-none overflow-hidden"
    >
      <div className="absolute z-10 w-[101%] h-[101%] bg-gradient-to-t from-white dark:from-black via-white/20 dark:via-black/20  to-transparent" />
      <div className="absolute z-10 w-[101%] h-[101%] bg-gradient-to-r dark:from-black dark:via-black/40 from-white via-white/40 to-transparent" />

      <Image
        alt={anime.name}
        src={anime.cover || anime.image}
        classNames={{
          wrapper:
            "hidden sm:flex z-0 w-full h-full mx-auto bg-blur-md items-start justify-end -mt-2",
          img: "object-cover object-right-middle min-w-full min-h-full",
        }}
      />

      <Image
        alt={anime.name}
        src={anime.image}
        classNames={{
          wrapper:
            "flex sm:hidden z-0 w-full h-full mx-auto bg-blur-md items-start justify-end -mt-2",
          img: "object-cover object-right-middle min-w-full min-h-full",
        }}
      />

      <CardFooter className="absolute flex items-start flex-col gap-6 pl-4 md:pl-12  z-20 bottom-0 ">
        {Boolean(anime.rank) && (
          <p className="text-4xl font-black text-foreground-500/70 ">
            {moment.localeData().ordinal(anime.rank || 0)}&nbsp;
            <span className="text-xl">on Trend</span>
          </p>
        )}
        <h6 className=" text-foreground-600 font-bold text-2xl sm:text-5xl w-2/3 line-clamp-3 sm:line-clamp-2 text-left">
          {anime.name}
        </h6>

        <div className="space-y-3">
          <div className="flex flex-wrap gap-2 w-2/3">
            {anime.tagList?.map((tag) => (
              <Chip
                radius="sm"
                size="sm"
                color={tag.color}
                variant={tag.variant}
                startContent={tag.startContent}
                endContent={tag.endContent}
                key={Array.isArray(tag.value) ? tag.value[0] : tag.value}
              >
                {tag.value}
              </Chip>
            ))}
          </div>

          <p className="text-foreground-500 text-tiny sm:text-base w-1/2 line-clamp-3 sm:line-clamp-2 text-left">
            {anime.description?.replace(/<[^>]*>/g, " ")}
          </p>
        </div>

        <ButtonGroup color="primary" className="">
          <Button
            as={NextLink}
            href={watchLink}
            className="text-xl font-medium"
          >
            Watch Now
          </Button>
          <Button
            as={NextLink}
            href={infoLink}
            variant="bordered"
            className="text-xl font-medium"
          >
            Detail
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
}
