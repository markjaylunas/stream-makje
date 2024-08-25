import CardListSkeleton from "@/components/card-data/skeleton/card-list-skeleton";
import CardWatchedCarouselListSkeleton from "@/components/card-data/skeleton/card-watched-carousel-list-skeleton";
import Heading from "@/components/ui/heading";
import ListSectionWrapper from "@/components/ui/list-section-wrapper";
import { siteConfig } from "@/lib/config";
import { Suspense } from "react";
import KDramaPopularList from "./_components/kdrama-popular-list";
import RecentlyWatchedList from "./_components/recently-watched-list";

export default async function Page() {
  return (
    <main className="space-y-8 my-10 min-h-screen">
      <div>
        <Heading className="text-center">
          <span className="text-primary-500">Stream</span> &nbsp;
          <span className="text-secondary-500">K-drama</span>
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
