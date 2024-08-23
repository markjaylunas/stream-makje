import { formatTimestamp } from "@/lib/utils";
import { Card, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Chip } from "@nextui-org/react";

export type CardImageProps = {
  name: string;
  image: string;
};

export default function CardImage({ name, image }: CardImageProps) {
  return (
    <Card
      className="relative group h-full w-full mx-auto aspect-2/3 bg-transparent select-none hover:cursor-grab overflow-hidden border-none"
      isFooterBlurred
    >
      <Image
        alt={name}
        src={image}
        classNames={{
          wrapper:
            "z-0 w-full h-full mx-auto bg-blur-md flex items-center justify-center",
          img: "object-cover min-w-full min-h-full",
        }}
      />

      <CardFooter className="justify-between bg-background/60 dark:bg-default-100/50  border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-lg bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
        <p className="text-tiny text-white/80 text-center mx-auto text-shadow-black text-shadow-x-1 text-shadow-y-1">
          {name}
        </p>
      </CardFooter>
    </Card>
  );
}
