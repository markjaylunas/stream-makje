import CardListSkeleton from "@/components/card-data/skeleton/card-list-skeleton";
import { Skeleton } from "@nextui-org/skeleton";

export default function Loading() {
  return (
    <>
      <section className="grid grid-cols-10 gap-4 w-full md:px-4 ">
        <div className="col-span-full md:col-span-7 ">
          <Skeleton className=" w-full aspect-video rounded-xl" />

          <div className="flex flex-col w-full gap-2 px-4 md:px-0 space-y-2">
            <div className="flex justify-between flex-col sm:flex-row w-full gap-4 mt-2">
              <Skeleton className="w-4/6 h-8 rounded-xl" />
              <div className="flex gap-1 w-2/6 h-8 ">
                <Skeleton className="h-full w-1/3 rounded-xl" />
                <Skeleton className="h-full w-1/3 rounded-xl" />
                <Skeleton className="h-full w-1/3 rounded-xl" />
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-full md:col-span-3 px-4 md:px-0 space-y-2 flex flex-col">
          <Skeleton className="w-2/3 h-8 rounded-xl" />
          <div className="flex gap-2">
            <Skeleton className="w-1/5 rounded-xl" />
            <Skeleton className="w-2/5 h-8 rounded-xl" />
            <Skeleton className="w-2/5 h-8 rounded-xl" />
          </div>
          <Skeleton className="w-full h-full rounded-xl" />
        </div>
      </section>
      <section className="max-w-7xl px-4 sm:mx-auto space-y-2 mt-4 sm:mt-8">
        <CardListSkeleton cardCount={10} />
      </section>
    </>
  );
}
