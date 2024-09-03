import GIFAnime from "@/assets/anime.gif";
import GIFKdrama from "@/assets/kdrama.gif";
import GIFMovie from "@/assets/movie.gif";
import CategoryCard from "@/components/card-data/category-card";
import CardCarouselListSkeleton from "@/components/card-data/skeleton/card-carousel-list-skeleton";
import Heading from "@/components/ui/heading";
import ListSectionWrapper from "@/components/ui/list-section-wrapper";
import MyLink from "@/components/ui/my-link";
import { siteConfig } from "@/lib/config";
import { StaticImageData } from "next/image";
import { Suspense } from "react";
import PopularThisSeasonList from "./anime/_components/popular-this-season";
import KDramaPopularCarouselList from "./k-drama/_components/kdrama-popular-carousel-list";
import TrendingMovieList from "./movie/_components/trending-movies";

type CategoryCardProps = {
  description: string;
  image: StaticImageData;
  link: string;
  isDisabled?: boolean;
  className?: string;
};
const categoryCards: CategoryCardProps[] = [
  {
    description: "Anime",
    image: GIFAnime,
    link: "/anime",
    // className: "row-span-3 col-span-2 ",
  },
  {
    description: "Movie",
    image: GIFMovie,
    link: "/movie",
    // className: "row-span-2 self-start",
  },
  {
    description: "K-drama",
    image: GIFKdrama,
    link: "/k-drama",
    // className: "row-span-2 row-start-4 self-start",
  },
];

export default async function Home() {
  return (
    <main className="min-h-screen mx-auto space-y-8 pb-12">
      <div>
        <Heading className="text-center">Stream | Makje</Heading>
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

      <section className="max-w-screen-sm lg:max-w-screen-md mx-auto grid grid-cols-3 gap-4 px-4">
        {categoryCards.map((cat) => (
          <CategoryCard
            key={cat.link}
            description={cat.description}
            image={cat.image}
            link={cat.link}
            isDisabled={cat.isDisabled}
            className={cat.className}
          />
        ))}
      </section>

      <ListSectionWrapper
        title="Anime"
        endContent={
          <MyLink href="/anime" color="primary" className="px-6 md:px-10">
            Browse All
          </MyLink>
        }
      >
        <Suspense fallback={<CardCarouselListSkeleton count={8} />}>
          <PopularThisSeasonList />
        </Suspense>
      </ListSectionWrapper>

      <ListSectionWrapper
        title="Movie"
        endContent={
          <MyLink href="/movie" color="primary" className="px-6 md:px-10">
            Browse All
          </MyLink>
        }
      >
        <Suspense fallback={<CardCarouselListSkeleton count={8} />}>
          <TrendingMovieList />
        </Suspense>
      </ListSectionWrapper>

      <ListSectionWrapper
        title="K-drama"
        endContent={
          <MyLink href="/k-drama" color="primary" className="px-6 md:px-10">
            Browse All
          </MyLink>
        }
      >
        <Suspense fallback={<CardCarouselListSkeleton count={8} />}>
          <KDramaPopularCarouselList />
        </Suspense>
      </ListSectionWrapper>
    </main>
  );
}
