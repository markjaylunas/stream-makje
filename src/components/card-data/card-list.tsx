import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import Heading from "../ui/heading";
import CardData, { CardDataProps } from "./card-data";

type Props = {
  title?: string;
  infoList: CardDataProps[];
  className?: string;
  endContent?: ReactNode;
};

export default function CardList({
  title,
  infoList,
  endContent,
  className,
}: Props) {
  return (
    <section className={cn("space-y-2", className)}>
      <div className="flex justify-between px-2">
        {title && (
          <Heading order="xl" className="text-gray-700 dark:text-gray-300">
            {title}
          </Heading>
        )}
        {endContent}
      </div>
      <ul className="grid grid-cols-2 xs:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7">
        {infoList.map((info) => (
          <div
            className="p-2 hover:p-2 hover:bg-gray-500/50 transition-all delay-100 ease-soft-spring rounded-xl"
            key={info.id}
          >
            <CardData {...info} />
          </div>
        ))}
      </ul>
    </section>
  );
}
