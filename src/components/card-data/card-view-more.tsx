import { Card, CardBody, Skeleton } from "@nextui-org/react";
import NextLink from "next/link";
import { SvgIcon } from "../ui/svg-icons";

type Props = {
  href: string;
};

export default function CardViewMore({ href }: Props) {
  return (
    <Card
      as={NextLink}
      href={href}
      className="relative h-full w-full mx-auto aspect-2/3 bg-slate-900 select-none hover:cursor-pointer overflow-hidden "
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
