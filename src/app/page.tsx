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
import { cn } from "@/lib/utils";
import { Card, CardFooter } from "@nextui-org/react";
import Image, { StaticImageData } from "next/image";
import { Suspense } from "react";
import PopularThisSeasonList from "./anime/_components/popular-this-season";

export default function Home() {
  return (
    <main className="min-h-screen mx-auto space-y-8 px-4 py-8">
      <Heading className="text-center">Stream | Makje</Heading>
      <section className="max-w-screen-lg mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <CategoryCard
          description="Watch Anime Now"
          image={GIFAnime}
          link="/anime"
        />

        <CategoryCard
          description="Manga: Coming soon"
          image={GIFManga}
          link=""
          isDisabled={true}
        />

        <CategoryCard
          description="Movie: Coming soon"
          image={GIFMovie}
          link=""
          isDisabled={true}
        />

        <CategoryCard
          description="Watch K-drama Now"
          image={GIFKdrama}
          link="/kdrama"
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

      <ListSectionWrapper title="Anime This Season">
        <Suspense fallback={<CardCarouselListSkeleton count={8} />}>
          <PopularThisSeasonList />
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
  <Card
    as={!isDisabled ? MyLink : undefined}
    href={link}
    target={isNewtab ? "_blank" : undefined}
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
);
