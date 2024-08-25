import CardCarouselListSkeleton from "@/components/card-data/skeleton/card-carousel-list-skeleton";
import CardListSkeleton from "@/components/card-data/skeleton/card-list-skeleton";
import CardWatchedCarouselListSkeleton from "@/components/card-data/skeleton/card-watched-carousel-list-skeleton";
import Heading from "@/components/ui/heading";
import ListSectionWrapper from "@/components/ui/list-section-wrapper";
import { siteConfig } from "@/lib/config";
import { Suspense } from "react";
import CountryMovieList from "./_components/country-movies";
import RecentMovieList from "./_components/recent-movies";
import RecentShowList from "./_components/recent-show";
import RecentlyWatchedList from "./_components/recently-watched-list";
import { default as TrendingMovieList } from "./_components/trending-movies";
import TrendingShowList from "./_components/trending-shows";

export default async function Page() {
  return (
    <main className="space-y-8 min-h-screen my-10">
      <div>
        <Heading className="text-center">
          <span className="text-primary-500">Stream</span> &nbsp;
          <span className="text-secondary-500">Movie</span>
        </Heading>
        <p className="text-balance text-center text-sm leading-loose text-muted-foreground">
          Built by&nbsp;
          <a
            href={siteConfig.links.website}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            makje
          </a>
          .
        </p>
      </div>

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
