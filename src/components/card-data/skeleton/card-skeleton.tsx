import { Skeleton } from "@nextui-org/skeleton";

export default function CardSkeleton() {
  return (
    <Skeleton className=" rounded-xl h-full w-full mx-auto aspect-2/3 select-none hover:cursor-pointer overflow-hidden" />
  );
}
