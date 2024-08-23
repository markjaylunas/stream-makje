import { SvgIcon } from "@/components/ui/svg-icons";
import { Info } from "@/lib/types";
import { cn, toTitleCase } from "@/lib/utils";
import { Chip } from "@nextui-org/chip";
import { Image } from "@nextui-org/image";

type Props = {
  info: Info;
  classname?: string;
};

export default function PosterMoreInfo({ info, classname }: Props) {
  return (
    <section
      className={cn(
        "flex-none z-10 md:max-w-60 flex items-start  gap-2 flex-row sm:flex-col",
        classname
      )}
    >
      <div className="max-w-60 flex-1">
        <Image isBlurred width={240} src={info.poster} alt={info.name} />
      </div>

      <article className="space-y-2 w-full flex-1">
        <div className="flex justify-between items-start ">
          {info.type && (
            <Chip
              radius="sm"
              size="sm"
              color="secondary"
              variant="shadow"
              className="text-xs"
            >
              {info.type}
            </Chip>
          )}
          <div className="flex justify-center items-center ">
            {Boolean(info?.sub) && (
              <Chip
                size="sm"
                radius="sm"
                color="primary"
                variant="shadow"
                className={cn(
                  "text-xs mx-auto space-x-1",
                  info?.dub && "rounded-r-none"
                )}
                startContent={<SvgIcon.closedCaption className="size-3" />}
              >
                {info?.sub}
              </Chip>
            )}

            {Boolean(info?.dub) && (
              <Chip
                radius="sm"
                size="sm"
                color="secondary"
                variant="shadow"
                className={cn("text-xs", info?.sub && "rounded-l-none")}
                startContent={<SvgIcon.microphone className="size-3" />}
              >
                {info?.dub}
              </Chip>
            )}
          </div>
        </div>

        {info.otherInfo.map((data) => (
          <p className="flex justify-between text-tiny" key={data.key}>
            <span className="text-foreground-500 pr-2">
              {toTitleCase(data.key)}
            </span>{" "}
            <span className="text-right">{data.value}</span>
          </p>
        ))}
      </article>
    </section>
  );
}
