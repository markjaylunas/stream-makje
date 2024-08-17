import GIFAnime from "@/assets/anime.gif";
import GIFManga from "@/assets/manga.gif";
import GIFMovie from "@/assets/movie.gif";
import Heading from "@/components/ui/heading";
import MyLink from "@/components/ui/my-link";
import { siteConfig } from "@/lib/config";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";
import Image, { StaticImageData } from "next/image";
import { Suspense } from "react";
import PopularThisSeasonList from "./anime/_components/popular-this-season";

export default function Home() {
  return (
    <main className="min-h-screen mx-auto space-y-8 px-4 py-8">
      <section className="max-w-screen-lg mx-auto grid grid-cols-2 grid-rows-4 sm:grid-cols-3 gap-4">
        <Card
          className="col-span-2 md:col-span-3 row-span-2 sm:row-span-1 border-none h-fit"
          as={MyLink}
          target="_blank"
          href={siteConfig.links.github}
          isPressable
          isFooterBlurred
          radius="lg"
        >
          <CardBody className="flex flex-col justify-center items-start h-full mt-0 px-4 sm:px-8">
            <Heading className="text-xl mx-auto sm:text-2xl font-mono underline underline-offset-4 text-primary-500">
              stream by makje
            </Heading>
            <p className="indent-7 text-foreground-500 text-justify text-sm mt-6">
              Dive into a world of anime, manga, and movies—all in one place.
              Whether you&apos;re looking for the latest episodes, classic
              series, or a new story to immerse yourself in, I&apos;ve got you
              covered.
            </p>

            <p className="indent-7 text-foreground-500 text-justify text-sm mt-4">
              I&apos;m Mark Jay Lunas &#40;
              <a
                className="text-secondary-500 underline"
                href={siteConfig.links.github}
                target="_blank"
              >
                Makje
              </a>
              &#41;, a web developer with a passion for creating seamless online
              experiences. I built this platform to bring together my love for
              anime, manga, and movies in a way that&apos;s easy to navigate and
              fun to use. Enjoy exploring, watching, and reading to your
              heart&apos;s content!
            </p>
          </CardBody>
        </Card>
        <CategoryCard buttonName="Watch Anime" image={GIFAnime} link="/anime" />
        <CategoryCard
          buttonName="Manga: Coming Soon!"
          image={GIFManga}
          link=""
          isDisabled={true}
        />
        <CategoryCard
          buttonName="Movie: Coming Soon!"
          image={GIFMovie}
          link=""
          isDisabled={true}
        />
      </section>

      <Suspense fallback={<>loading...</>}>
        <PopularThisSeasonList customTitle="Anime This Season" />
      </Suspense>
    </main>
  );
}

const CategoryCard = ({
  link,
  image,
  buttonName,
  isDisabled = false,
}: {
  link: string;
  image: StaticImageData;
  buttonName: string;
  isDisabled?: boolean;
}) => (
  <Card
    as={!isDisabled ? MyLink : undefined}
    href={link}
    isPressable
    isDisabled={isDisabled}
    isFooterBlurred
    radius="lg"
    className="border-none"
  >
    <Image
      unoptimized
      alt={buttonName}
      className="object-cover rounded-xl w-full max-w-md aspect-square"
      src={image}
      width={250}
    />
    <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
      <Button
        className="text-medium lg:text-lg text-white bg-black/20"
        variant="flat"
        color="default"
        radius="lg"
        size="lg"
        fullWidth
      >
        {buttonName}
      </Button>
    </CardFooter>
  </Card>
);
