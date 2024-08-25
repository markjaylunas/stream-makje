import { Tag } from "@/lib/types";
import { formatTimestamp } from "@/lib/utils";
import { Card, CardFooter, CardHeader } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Chip, Progress } from "@nextui-org/react";
import NextLink from "next/link";

export type CardWatchedDataProps = {
  id: string;
  name: string;
  episodeName: string;
  episodeNumber: number;
  image: string;
  currentTime: number;
  durationTime: number;
  href: string;
  tagList?: Tag[];
};

export default function CardWatchedData({
  tagList = [],
  ...props
}: CardWatchedDataProps) {
  const filteredTagList = tagList.filter((tag) => !tag.isCentered);
  const centerTagList = tagList.filter((tag) => tag.isCentered);
  const progressPercentage = (props.currentTime / props.durationTime) * 100;
  const isTitleDuplicate =
    props.name.toLowerCase() === props.episodeName.toLowerCase();

  return (
    <Card
      as={NextLink}
      href={props.href}
      className="relative group h-full w-full mx-auto aspect-5/3 bg-transparent select-none hover:cursor-pointer overflow-hidden "
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
      </CardHeader>

      <div className="absolute z-10 w-[101%] h-[101%] bg-gradient-to-t from-black/50 from-[13%] via-[50%] via-black/15 to-transparent transition-all delay-100 ease-soft-spring" />

      <Image
        alt={props.name}
        src={props.image}
        classNames={{
          wrapper:
            "z-0 w-full h-full bg-blur-md flex items-center justify-center",
          img: "w-full object-cover",
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

        <h6 className="text-white text-shadow text-shadow-black text-shadow-x-1 text-shadow-y-1 w-full font-normal text-sm line-clamp-1 text-left text-pretty">
          {props.name}
        </h6>

        {!isTitleDuplicate && (
          <p className="text-white/90 text-shadow text-shadow-black text-shadow-x-1 text-shadow-y-1 w-full font-normal text-tiny line-clamp-2 text-left text-pretty">
            {props.episodeName}
          </p>
        )}

        <Progress
          aria-label={`progress ${progressPercentage}`}
          value={progressPercentage}
          classNames={{ base: "h-1" }}
        />
      </CardFooter>
    </Card>
  );
}
