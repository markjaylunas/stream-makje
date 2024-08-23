import { cn } from "@/lib/utils";
import { Card, CardBody, Skeleton } from "@nextui-org/react";
import NextLink from "next/link";
import { SvgIcon } from "../ui/svg-icons";

type Props = {
  href?: string;
  title: string;
  description?: string;
  orientation?: "portrait" | "horizontal";
  className?: string;
  showIcon?: boolean;
};

export default function CardLink({
  href,
  title,
  description,
  orientation = "portrait",
  className,
  showIcon = true,
}: Props) {
  return (
    <Card
      isPressable={Boolean(href)}
      as={href ? NextLink : undefined}
      href={href}
      className={cn(
        "relative h-full w-full mx-auto bg-foreground-300 dark:bg-foreground-100 select-none hover:cursor-pointer overflow-hidden",
        orientation === "portrait" && "aspect-2/3",
        orientation === "horizontal" && "aspect-video",
        className
      )}
    >
      <CardBody className="flex justify-center items-center gap-2">
        <p className="text-large flex items-center  ">
          <span>{title}</span>
          &nbsp;
          {showIcon && <SvgIcon.chevronRight />}
        </p>
        <p className="text-tiny text-foreground-500">{description}</p>
      </CardBody>
    </Card>
  );
}
