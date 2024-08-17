import GIFAnime from "@/assets/anime.gif";
import GIFManga from "@/assets/manga.gif";
import GIFMovie from "@/assets/movie.gif";
import Heading from "@/components/ui/heading";
import MyLink from "@/components/ui/my-link";
import { siteConfig } from "@/lib/config";
import { Button, Card, CardBody, CardFooter } from "@nextui-org/react";
import Image, { StaticImageData } from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen max-w-screen-lg mx-auto space-y-8 px-4 py-8">
      <Card>
        <CardBody className="flex flex-col justify-center items-center p-8">
          <MyLink href={siteConfig.links.github}>
            <Heading className="text-3xl sm:text-5xl font-mono underline underline-offset-4 text-primary-500">
              stream by makje
            </Heading>
          </MyLink>

          <p className="indent-7 text-foreground-500 text-justify text-tiny sm:text-sm mt-8">
            Dive into a world of anime, manga, and movies—all in one place.
            Whether you&apos;re looking for the latest episodes, classic series,
            or a new story to immerse yourself in, I&apos;ve got you covered.
          </p>
          <p className="indent-7 text-foreground-500 text-justify text-tiny sm:text-sm mt-2">
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

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
