import CardWatchedCarouselListSkeleton from "@/components/card-data/skeleton/card-watched-carousel-list-skeleton";
import ListSectionWrapper from "@/components/ui/list-section-wrapper";
import { Suspense } from "react";
import KDramaPopularList from "./_components/kdrama-popular-list";

export default async function Page() {
  return (
    <main className="space-y-8 my-12 min-h-screen">
      <ListSectionWrapper title="Popular">
        <Suspense fallback={<CardWatchedCarouselListSkeleton count={8} />}>
          <KDramaPopularList />
        </Suspense>
      </ListSectionWrapper>
    </main>
  );
}
