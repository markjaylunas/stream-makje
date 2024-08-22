import { cn } from "@/lib/utils";
import CardSkeleton from "./card-skeleton";

type Props = {
  count: number;
  className?: string;
};

export default function CardListSkeleton({ count, className }: Props) {
  return (
    <ul
      className={cn(
        "grid grid-cols-2 xs:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7",
        className
      )}
    >
      {Array.from({ length: count }, (_, index) => index).map((_, index) => (
        <div
          className="p-2 hover:p-2 hover:bg-gray-500/50 transition-all delay-100 ease-soft-spring rounded-xl"
          key={index}
        >
          <CardSkeleton />
        </div>
      ))}
    </ul>
  );
}
