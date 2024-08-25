import CardCarouselListSkeleton from "@/components/card-data/skeleton/card-carousel-list-skeleton";
import CardListSkeleton from "@/components/card-data/skeleton/card-list-skeleton";
import CardWatchedCarouselListSkeleton from "@/components/card-data/skeleton/card-watched-carousel-list-skeleton";
import ListSectionWrapper from "@/components/ui/list-section-wrapper";
import { Suspense } from "react";
import CountryMovieList from "./_components/country-movies";
import RecentMovieList from "./_components/recent-movies";
import RecentShowList from "./_components/recent-show";
import RecentlyWatchedList from "./_components/recently-watched-list";
import { default as TrendingMovieList } from "./_components/trending-movies";
import TrendingShowList from "./_components/trending-shows";

export default async function Page() {
  return (
    <main className="space-y-8 mb-12">
      <ListSectionWrapper title="History">
        <Suspense fallback={<CardWatchedCarouselListSkeleton count={8} />}>
          <RecentlyWatchedList />
        </Suspense>
      </ListSectionWrapper>

      <ListSectionWrapper title="Trending Movies">
        <Suspense fallback={<CardCarouselListSkeleton count={8} />}>
          <TrendingMovieList />
        </Suspense>
      </ListSectionWrapper>

      <ListSectionWrapper title="Recent Movies">
        <Suspense
          fallback={
            <CardListSkeleton
              count={14}
              className="max-w-screen-2xl mx-auto px-2 lg:px-8"
            />
          }
        >
          <RecentMovieList />
        </Suspense>
      </ListSectionWrapper>

      <ListSectionWrapper title="Country Movies">
        <Suspense fallback={<CardCarouselListSkeleton count={8} />}>
          <CountryMovieList />
        </Suspense>
      </ListSectionWrapper>

      <ListSectionWrapper title="Trending TV Shows">
        <Suspense fallback={<CardCarouselListSkeleton count={8} />}>
          <TrendingShowList />
        </Suspense>
      </ListSectionWrapper>

      <ListSectionWrapper title="Recent TV Shows">
        <Suspense
          fallback={
            <CardListSkeleton
              count={14}
              className="max-w-screen-2xl mx-auto px-2 lg:px-8"
            />
          }
        >
          <RecentShowList />
        </Suspense>
      </ListSectionWrapper>
    </main>
  );
}
