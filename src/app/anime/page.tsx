import { Skeleton, Spacer } from "@nextui-org/react";
import { Suspense } from "react";
import AiringScheduleList from "./_components/airing-schedule";
import PopularList from "./_components/popular-list";
import RecentEpisodeList from "./_components/recent-episodes";
import SpotlightList from "./_components/spotlight-list";

export default async function Page() {
  return (
    <main className="space-y-8">
      <Suspense
        fallback={
          <section className="max-w-5xl mx-auto px-0 sm:px-4 h-full w-full aspect-square sm:aspect-3/1">
            <Skeleton className="h-full w-full" />
          </section>
        }
      >
        <SpotlightList />
      </Suspense>

      <Suspense fallback={<>loading...</>}>
        <PopularList />
      </Suspense>

      <Spacer className="h-2" />

      <Suspense fallback={<>loading...</>}>
        <RecentEpisodeList />
      </Suspense>

      <Spacer className="h-2" />

      <Suspense fallback={<>loading...</>}>
        <AiringScheduleList />
      </Suspense>
    </main>
  );
}
