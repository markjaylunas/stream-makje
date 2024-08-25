import { ReactNode } from "react";
import Heading from "./heading";

type Props = {
  title?: string;
  children: ReactNode;
  endContent?: ReactNode;
};

export default function ListSectionWrapper({
  children,
  title,
  endContent,
}: Props) {
  return (
    <section className="space-y-2">
      <div className="flex justify-between items-center">
        {title && (
          <Heading
            order="xl"
            className="text-gray-700 dark:text-gray-300 px-6 md:px-10"
          >
            {title}
          </Heading>
        )}
        {endContent}
      </div>
      {children}
    </section>
  );
}
