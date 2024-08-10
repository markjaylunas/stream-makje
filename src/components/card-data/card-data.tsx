"use client";

import { CardInfo } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Card, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import NextLink from "next/link";

type Props = {
  info: CardInfo;
};

export default function CardData({ info }: Props) {
  return (
    <Card
      as={NextLink}
      href={`/anime/${info.id}`}
      className="relative
       h-full w-full mx-auto aspect-2/3 bg-gray-600 select-none hover:cursor-pointer overflow-hidden"
    >
      <div
        className={cn(
          "absolute z-10 w-[101%] h-[101%] bg-gradient-to-t from-black/85 to-transparent",
          Boolean(info.rank) ? "via-black/20" : "via-transparent"
        )}
      />

      <Image
        alt={info.name}
        src={info.image}
        classNames={{
          wrapper:
            "z-0 w-full h-full mx-auto bg-blur-md flex items-center justify-center",
          img: "object-cover min-w-full min-h-full",
        }}
      />

      {Boolean(info.rank) && (
        <p className="absolute z-20 top-1/3 right-2 text-8xl font-black text-white/75">
          {info.rank}
        </p>
      )}

      <CardFooter className="absolute z-20 bottom-0 p-2 flex items-start flex-col gap-2">
        <h6 className="w-full text-white font-normal text-sm line-clamp-2 text-left text-pretty">
          {info.name}
        </h6>
      </CardFooter>
    </Card>
  );
}
