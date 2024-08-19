import { SvgIcon } from "@/components/ui/svg-icons";
import { AnimeInfo } from "@/lib/types";
import { cn, toTitleCase } from "@/lib/utils";
import { Chip } from "@nextui-org/chip";
import { Image } from "@nextui-org/image";

type Props = {
  anime: AnimeInfo;
  classname?: string;
};

export default function PosterMoreInfo({ anime, classname }: Props) {
  return (
    <section
      className={cn(
        "flex-none z-10 md:max-w-60 flex items-start  gap-2 flex-row sm:flex-col",
        classname
      )}
    >
      <div className="max-w-60 flex-1">
        <Image isBlurred width={240} src={anime.poster} alt={anime.name} />
      </div>

      <article className="space-y-2 w-full flex-1">
        <div className="flex justify-between items-start ">
          {anime.type && (
            <Chip
              radius="sm"
              size="sm"
              color="secondary"
              variant="shadow"
              className="text-xs"
            >
              {anime.type}
            </Chip>
          )}
          <div className="flex justify-center items-center ">
            {Boolean(anime?.sub) && (
              <Chip
                size="sm"
                radius="sm"
                color="primary"
                variant="shadow"
                className={cn(
                  "text-xs mx-auto space-x-1",
                  anime?.dub && "rounded-r-none"
                )}
                startContent={<SvgIcon.closedCaption className="size-3" />}
              >
                {anime?.sub}
              </Chip>
            )}

            {Boolean(anime?.dub) && (
              <Chip
                radius="sm"
                size="sm"
                color="secondary"
                variant="shadow"
                className={cn("text-xs", anime?.sub && "rounded-l-none")}
                startContent={<SvgIcon.microphone className="size-3" />}
              >
                {anime?.dub}
              </Chip>
            )}
          </div>
        </div>

        {anime.otherInfo.map((info) => (
          <p className="flex justify-between text-tiny" key={info.key}>
            <span className="text-foreground-500 pr-2">
              {toTitleCase(info.key)}
            </span>{" "}
            <span className="text-right">{info.value}</span>
          </p>
        ))}
      </article>
    </section>
  );
}
