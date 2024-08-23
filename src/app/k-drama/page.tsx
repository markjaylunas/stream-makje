import CardListSkeleton from "@/components/card-data/skeleton/card-list-skeleton";
import CardWatchedCarouselListSkeleton from "@/components/card-data/skeleton/card-watched-carousel-list-skeleton";
import ListSectionWrapper from "@/components/ui/list-section-wrapper";
import { Suspense } from "react";
import KDramaPopularList from "./_components/kdrama-popular-list";
import RecentlyWatchedList from "./_components/recently-watched-list";

export default async function Page() {
  return (
    <main className="space-y-8 my-12 min-h-screen">
      <ListSectionWrapper title="History">
        <Suspense fallback={<CardWatchedCarouselListSkeleton count={8} />}>
          <RecentlyWatchedList />
        </Suspense>
      </ListSectionWrapper>

      <ListSectionWrapper title="Popular K-drama">
        <Suspense
          fallback={
            <CardListSkeleton
              count={24}
              className="max-w-screen-2xl mx-auto px-2 lg:px-8"
            />
          }
        >
          <KDramaPopularList />
        </Suspense>
      </ListSectionWrapper>
    </main>
  );
}
