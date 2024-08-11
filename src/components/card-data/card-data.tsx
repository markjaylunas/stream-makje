"use client";

import { Tag } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Card, CardFooter, CardHeader } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Chip } from "@nextui-org/react";
import NextLink from "next/link";

export type CardDataProps = {
  id: string;
  name: string;
  image: string;
  cover?: string;
  rank?: number;
  tagList?: Tag[];
};

export default function CardData({ tagList = [], ...props }: CardDataProps) {
  return (
    <Card
      as={NextLink}
      href={`/anime/info/${props.id}`}
      className="relative
       h-full w-full mx-auto aspect-2/3 bg-gray-600 select-none hover:cursor-pointer overflow-hidden"
    >
      <CardHeader className="absolute z-20 top-0 p-2 flex flex-wrap gap-2 justify-between items-end">
        {tagList.map((tag) => (
          <Chip
            radius="sm"
            size="sm"
            color={tag.color}
            variant={tag.variant}
            startContent={tag.startContent}
            key={Array.isArray(tag.value) ? tag.value[0] : tag.value}
          >
            {tag.value}
          </Chip>
        ))}
      </CardHeader>
      <div
        className={cn(
          "absolute z-10 w-[101%] h-[101%] bg-gradient-to-t from-black/85 to-transparent",
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

      {Boolean(props.rank) && (
        <p className="absolute z-20 top-1/3 right-2 text-8xl font-black text-white/75">
          {props.rank}
        </p>
      )}

      <CardFooter className="absolute z-20 bottom-0 p-2 flex items-start flex-col gap-2">
        <h6 className="w-full text-white font-normal text-sm line-clamp-2 text-left text-pretty">
          {props.name}
        </h6>
      </CardFooter>
    </Card>
  );
}
