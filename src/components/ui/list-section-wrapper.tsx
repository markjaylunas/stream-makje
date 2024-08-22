import { ReactNode } from "react";
import Heading from "./heading";

type Props = {
  title?: string;
  children: ReactNode;
};

export default function ListSectionWrapper({ children, title }: Props) {
  return (
    <section className="space-y-2">
      {title && (
        <Heading
          order="xl"
          className="text-gray-700 dark:text-gray-300 px-6 md:px-10"
        >
          {title}
        </Heading>
      )}
      {children}
    </section>
  );
}
