import { Card, CardFooter } from "@nextui-org/react";
import Image, { StaticImageData } from "next/image";
import MyLink from "../ui/my-link";

export default function CategoryCard({
  link,
  image,
  description,
  isDisabled = false,
  isNewtab = false,
  className,
}: {
  link: string;
  image: StaticImageData;
  description: string;
  isDisabled?: boolean;
  isNewtab?: boolean;
  className?: string;
}) {
  return (
    <MyLink
      href={link}
      target={isNewtab ? "_blank" : undefined}
      className={className}
    >
      <Card
        isPressable
        isDisabled={isDisabled}
        isFooterBlurred
        radius="lg"
        className="border-none"
      >
        <Image
          unoptimized
          alt={description}
          className="object-cover rounded-xl w-full max-w-md aspect-square"
          src={image}
          width={250}
        />
        <CardFooter className="justify-between before:bg-black/10 border-white/20 border-1 overflow-hidden p-0 absolute before:rounded-xl rounded-md bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
          <p className="text-tiny md:text-base text-white/80 text-center py-1 w-full mx-auto">
            {description}
          </p>
        </CardFooter>
      </Card>
    </MyLink>
  );
}
