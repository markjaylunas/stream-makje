import { CardInfo } from "@/lib/types";
import CardData from "./card-data";

type Props = {
  infoList: CardInfo[];
};

export default function CardList({ infoList }: Props) {
  return (
    <ul className="grid grid-cols-2 xs:grid-cols-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-4">
      {infoList.map((info) => (
        <CardData info={info} key={info.id} />
      ))}
    </ul>
  );
}
