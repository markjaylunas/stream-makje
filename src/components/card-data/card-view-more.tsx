import { cn } from "@/lib/utils";
import { Card, CardBody, Skeleton } from "@nextui-org/react";
import NextLink from "next/link";
import { SvgIcon } from "../ui/svg-icons";

type Props = {
  href: string;
  orientation?: "portrait" | "horizontal";
};

export default function CardViewMore({
  href,
  orientation = "portrait",
}: Props) {
  return (
    <Card
      as={NextLink}
      href={href}
      className={cn(
        "relative h-full w-full mx-auto bg-foreground-300 dark:bg-foreground-100 select-none hover:cursor-pointer overflow-hidden",
        orientation === "portrait" && "aspect-2/3",
        orientation === "horizontal" && "aspect-video"
      )}
    >
      <CardBody className="flex justify-center items-center">
        <p className="text-large flex items-center  ">
          <span>View More</span>
          &nbsp;
          <SvgIcon.chevronRight />
        </p>
      </CardBody>
    </Card>
  );
}
