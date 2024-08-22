import { cn } from "@/lib/utils";
import CardWatchedData, { CardWatchedDataProps } from "./card-watched-data";

type Props = {
  infoList: CardWatchedDataProps[];
  className?: string;
};

export default function CardWatchedList({ infoList, className }: Props) {
  return (
    <ul
      className={cn(
        "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4",
        className
      )}
    >
      {infoList.map((info) => (
        <div
          className="p-2 hover:p-2 hover:bg-gray-500/50 transition-all delay-100 ease-soft-spring rounded-xl"
          key={info.id}
        >
          <CardWatchedData {...info} />
        </div>
      ))}
    </ul>
  );
}
