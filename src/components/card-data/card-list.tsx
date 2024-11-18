import { cn } from "@/lib/utils";
import Unavailable from "../ui/unavailable";
import CardData, { CardDataProps } from "./card-data";

type Props = {
  infoList: CardDataProps[];
  className?: string;
};

export default function CardList({ infoList, className }: Props) {

  if(infoList.length === 0) return <Unavailable /> 
  
  return (
    <ul
      className={cn(
        "grid grid-cols-2 xs:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7",
        className
      )}
    >
      {infoList.map((info) => (
        <div
          className="p-2 hover:p-2 hover:bg-gray-500/50 transition-all delay-100 ease-soft-spring rounded-xl"
          key={info.id}
        >
          <CardData {...info} />
        </div>
      ))}
    </ul>
  );
}
