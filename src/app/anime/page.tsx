import GenreCarouselList from "@/components/card-data/genre-carousel-list";
import CardListSkeleton from "@/components/card-data/skeleton/card-list-skeleton";
import Heading from "@/components/ui/heading";
import ListSectionWrapper from "@/components/ui/list-section-wrapper";
import { genreList } from "@/lib/constants";
import { Skeleton, Spacer } from "@nextui-org/react";
import { Suspense } from "react";
import AiringScheduleList from "./_components/airing-schedules";
import LastSeasonList from "./_components/last-season";
import MostPopularList from "./_components/most-popular-list";
import NextSeasonList from "./_components/next-season";
import PopularThisSeasonList from "./_components/popular-this-season";
import RecentEpisodeList from "./_components/recent-episodes";
import { default as RecentlyWatchedList } from "./_components/recently-watched-list";
import SpotlightList from "./_components/spotlight-list";

export default async function Page() {
  return (
    <main className="space-y-8 mb-12">
      <Suspense
        fallback={<Skeleton className="aspect-square sm:aspect-16/8 " />}
      >
        <SpotlightList />
      </Suspense>

      <ListSectionWrapper title="History">
        <Suspense fallback={<>loading...</>}>
          <RecentlyWatchedList />
        </Suspense>
      </ListSectionWrapper>

      <ListSectionWrapper title="Popular This Season">
        <Suspense fallback={<>loading...</>}>
          <PopularThisSeasonList />
        </Suspense>
      </ListSectionWrapper>

      <GenreCarouselList genreList={genreList} pathName="/anime/genre" />

      <ListSectionWrapper title="Recent Episodes">
        <Suspense fallback={<>loading...</>}>
          <RecentEpisodeList />
        </Suspense>
      </ListSectionWrapper>

      <Spacer className="h-2" />

      <ListSectionWrapper title="Last Season">
        <Suspense fallback={<>loading...</>}>
          <LastSeasonList />
        </Suspense>
      </ListSectionWrapper>

      <Spacer className="h-2" />

      <ListSectionWrapper title="Most Popular">
        <Suspense fallback={<>loading...</>}>
          <MostPopularList />
        </Suspense>
      </ListSectionWrapper>

      <Spacer className="h-2" />

      <ListSectionWrapper title="Airing Schedules">
        <Suspense fallback={<>loading...</>}>
          <AiringScheduleList />
        </Suspense>
      </ListSectionWrapper>

      <Spacer className="h-2" />

      <ListSectionWrapper title="Next Season">
        <Suspense fallback={<>loading...</>}>
          <NextSeasonList />
        </Suspense>
      </ListSectionWrapper>

      <Spacer className="h-1.5" />

      <GenreCarouselList genreList={genreList} pathName="/anime/genre" />
    </main>
  );
}
