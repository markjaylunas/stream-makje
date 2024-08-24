import GIFAnime from "@/assets/anime.gif";
import PNGDev from "@/assets/dev.png";
import PNGGithub from "@/assets/github.png";
import GIFKdrama from "@/assets/kdrama.gif";
import PNGKofi from "@/assets/kofi.png";
import GIFManga from "@/assets/manga.gif";
import GIFMovie from "@/assets/movie.gif";
import CardWatchedCarouselListSkeleton from "@/components/card-data/skeleton/card-watched-carousel-list-skeleton";
import Heading from "@/components/ui/heading";
import ListSectionWrapper from "@/components/ui/list-section-wrapper";
import MyLink from "@/components/ui/my-link";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import { Card, CardFooter } from "@nextui-org/react";
import Image, { StaticImageData } from "next/image";
import { Suspense } from "react";
import AnimeRecentlyWatchedList from "./anime/_components/recently-watched-list";
import KdramaRecentlyWatchedList from "./k-drama/_components/recently-watched-list";

export default function Home() {
  return (
    <main className="min-h-screen mx-auto space-y-8 pb-12">
      <div className="px-4 py-8 space-y-8">
        <Heading className="text-center">Stream | Makje</Heading>
        <section className="max-w-screen-lg mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <CategoryCard
            description="Watch Anime"
            image={GIFAnime}
            link="/anime"
          />

          <CategoryCard
            description="Manga: Coming soon"
            image={GIFManga}
            link="#"
            isDisabled={true}
          />

          <CategoryCard
            description="Watch Movie"
            image={GIFMovie}
            link="/movie"
          />

          <CategoryCard
            description="Watch K-drama"
            image={GIFKdrama}
            link="/k-drama"
          />

          <CategoryCard
            description="Visit Makje's Official Website"
            image={PNGDev}
            link={siteConfig.links.portfolio}
            isNewtab={true}
          />

          <CategoryCard
            description="Support on Ko-fi"
            image={PNGKofi}
            link={siteConfig.links.kofi}
            isNewtab={true}
          />

          <CategoryCard
            description="Visit Makje's Github"
            image={PNGGithub}
            link={siteConfig.links.github}
            isNewtab={true}
          />
        </section>
      </div>

      <ListSectionWrapper title="Anime History">
        <Suspense fallback={<CardWatchedCarouselListSkeleton count={8} />}>
          <AnimeRecentlyWatchedList />
        </Suspense>
      </ListSectionWrapper>

      <ListSectionWrapper title="K-drama History">
        <Suspense fallback={<CardWatchedCarouselListSkeleton count={8} />}>
          <KdramaRecentlyWatchedList />
        </Suspense>
      </ListSectionWrapper>
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
  <MyLink href={link} target={isNewtab ? "_blank" : undefined}>
    <Card
      isPressable
      isDisabled={isDisabled}
      isFooterBlurred
      radius="lg"
      className={cn("border-none", className)}
    >
      <Image
        unoptimized
        alt={description}
        className="object-cover rounded-xl w-full max-w-md aspect-square"
        src={image}
        width={250}
      />
      <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
        <p className="text-tiny md:text-base text-white/80 text-center py-2 w-full mx-auto">
          {description}
        </p>
      </CardFooter>
    </Card>
  </MyLink>
);
