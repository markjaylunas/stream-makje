import { TrailerSchema } from "@/app/api/consumet-validations";
import { ANIME_PROVIDER } from "@/lib/constants";
import { Tag } from "@/lib/types";
import { cn, createURL, formatTimestamp } from "@/lib/utils";
import { Card, CardFooter, CardHeader } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Chip } from "@nextui-org/react";
import NextLink from "next/link";

export type CardDataProps = {
  id: string;
  name: string;
  description?: string;
  image: string;
  cover?: string;
  rank?: number;
  trailer?: TrailerSchema;
  tagList?: Tag[];
};

export default function CardData({ tagList = [], ...props }: CardDataProps) {
  let link = `/anime/info/${props.id}`;
  const filteredTagList = tagList.filter((tag) => !tag.isCentered);
  const centerTagList = tagList.filter((tag) => tag.isCentered);
  const episodeTag = tagList.filter((tag) => tag.name === "episodeNumber")[0];
  if (episodeTag)
    link = createURL({
      path: `/anime/watch/${props.id}`,
      params: {
        episodeId: undefined,
        episodeNumber: `${episodeTag.value}`,
        provider: ANIME_PROVIDER.P1,
      },
    });

  return (
    <Card
      as={NextLink}
      href={link}
      className="relative group h-full w-full mx-auto aspect-2/3 bg-transparent select-none hover:cursor-pointer overflow-hidden "
    >
      <CardHeader className="absolute z-20 top-0 p-2 flex flex-wrap gap-2 justify-between items-end">
        {filteredTagList.map((tag, tagIndex) => (
          <Chip
            className="bg-opacity-80 group-hover:bg-opacity-100"
            radius="sm"
            size="sm"
            color={tag.color}
            variant={tag.variant}
            startContent={tag.startContent}
            endContent={tag.endContent}
            key={tag.value + `${tagIndex}` + "head"}
          >
            {tag.value}
          </Chip>
        ))}

        <div className="flex w-full justify-end">
          {Boolean(props.rank) && (
            <p className="text-7xl font-black text-white/60">{props.rank}</p>
          )}
        </div>
      </CardHeader>
      <div
        className={cn(
          "absolute z-10 w-[101%] h-[101%] bg-gradient-to-t from-black/50 from-[13%] via-[30%] via-black/15 to-transparent transition-all delay-100 ease-soft-spring",
          Boolean(props.rank) ? "via-black/20" : "via-transparent"
        )}
      />

      <Image
        alt={props.name}
        src={props.image}
        classNames={{
          wrapper:
            "z-0 w-full h-full mx-auto bg-blur-md flex items-center justify-center",
          img: "object-cover min-w-full min-h-full",
        }}
      />

      <CardFooter className="absolute z-20 bottom-0 p-2 flex items-start flex-col gap-2">
        <div className="flex justify-center items-center w-full">
          {centerTagList.map((tag, tagIndex) => (
            <Chip
              radius="sm"
              size="sm"
              color={tag.color}
              variant={tag.variant}
              startContent={tag.startContent}
              key={tag.value + `${tagIndex}` + "foot"}
            >
              {tag.name === "airingAt"
                ? formatTimestamp(Number(tag.value))
                : tag.value}
            </Chip>
          ))}
        </div>
        <h6 className="text-white text-shadow text-shadow-black text-shadow-x-1 text-shadow-y-1 w-full font-normal text-sm line-clamp-2 text-left text-pretty">
          {props.name}
        </h6>
      </CardFooter>
    </Card>
  );
}
