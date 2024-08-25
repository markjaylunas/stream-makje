import GIFAnime from "@/assets/anime.gif";
import PNGDev from "@/assets/dev.png";
import PNGGithub from "@/assets/github.png";
import GIFKdrama from "@/assets/kdrama.gif";
import PNGKofi from "@/assets/kofi.png";
import GIFManga from "@/assets/manga.gif";
import GIFMovie from "@/assets/movie.gif";
import CardCarouselListSkeleton from "@/components/card-data/skeleton/card-carousel-list-skeleton";
import Heading from "@/components/ui/heading";
import ListSectionWrapper from "@/components/ui/list-section-wrapper";
import MyLink from "@/components/ui/my-link";
import { siteConfig } from "@/lib/config";
import { Card, CardFooter } from "@nextui-org/react";
import Image, { StaticImageData } from "next/image";
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
    description: "Manga",
    image: GIFManga,
    link: "#",
    isDisabled: true,
    // className: "row-span-2 col-start-3 self-start",
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
      <div className="px-4 py-8 space-y-8">
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
      </div>

      <section className="max-w-screen-sm mx-auto grid grid-cols-4 gap-4 px-4">
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

      <section className="max-w-screen-lg mx-auto grid grid-cols-3 gap-2 px-4">
        <CategoryCard
          description="Visit Makje"
          image={PNGDev}
          link={siteConfig.links.portfolio}
          isNewtab={true}
        />

        <CategoryCard
          description="Donate"
          image={PNGKofi}
          link={siteConfig.links.kofi}
          isNewtab={true}
        />

        <CategoryCard
          description="Github"
          image={PNGGithub}
          link={siteConfig.links.github}
          isNewtab={true}
        />
      </section>
    </main>
  );
}

const CategoryCard = ({
  link,
  image,
  description,
  isDisabled = false,
  isNewtab = false,
  className,
}: {
  link: string;
  image: StaticImageData;
  description: string;
  isDisabled?: boolean;
  isNewtab?: boolean;
  className?: string;
}) => (
  <MyLink
    href={link}
    target={isNewtab ? "_blank" : undefined}
    className={className}
  >
    <Card
      isPressable
      isDisabled={isDisabled}
      isFooterBlurred
      radius="lg"
      className="border-none"
    >
      <Image
        unoptimized
        alt={description}
        className="object-cover rounded-xl w-full max-w-md aspect-square"
        src={image}
        width={250}
      />
      <CardFooter className="justify-between before:bg-black/10 border-white/20 border-1 overflow-hidden p-0 absolute before:rounded-xl rounded-md bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
        <p className="text-tiny md:text-base text-white/80 text-center py-1 w-full mx-auto">
          {description}
        </p>
      </CardFooter>
    </Card>
  </MyLink>
);
