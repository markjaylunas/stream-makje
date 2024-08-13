import Heading from "../ui/heading";
import CardData, { CardDataProps } from "./card-data";

type Props = {
  title?: string;
  infoList: CardDataProps[];
};

export default function CardList({ title, infoList }: Props) {
  return (
    <section className="space-y-2">
      {title && (
        <Heading order="xl" className="text-gray-700 dark:text-gray-300 ">
          {title}
        </Heading>
      )}
      <ul className="grid grid-cols-2 xs:grid-cols-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-4">
        {infoList.map((info) => (
          <CardData {...info} key={info.id} />
        ))}
      </ul>
    </section>
  );
}
