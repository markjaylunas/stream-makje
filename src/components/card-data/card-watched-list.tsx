import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import Heading from "../ui/heading";
import CardWatchedData, { CardWatchedDataProps } from "./card-watched-data";

type Props = {
  title?: string;
  infoList: CardWatchedDataProps[];
  className?: string;
  endContent?: ReactNode;
};

export default function CardWatchedList({
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
      <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        {infoList.map((info) => (
          <div
            className="p-2 hover:p-2 hover:bg-gray-500/50 transition-all delay-100 ease-soft-spring rounded-xl"
            key={info.id}
          >
            <CardWatchedData {...info} />
          </div>
        ))}
      </ul>
    </section>
  );
}
