"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

type ReadMoreProps = {
  text: string;
  amountOfWords?: number;
} & React.HTMLProps<HTMLParagraphElement>;

export const ReadMore = ({
  text: initialText,
  amountOfWords = 32,
  className,
  ...props
}: ReadMoreProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const text = initialText.replace(/<[^>]*>/g, " ");
  const splittedText = text.split(" ");
  const itCanOverflow = splittedText.length > amountOfWords;
  const beginText = itCanOverflow
    ? splittedText.slice(0, amountOfWords - 1).join(" ")
    : text;
  const endText = splittedText.slice(amountOfWords - 1).join(" ");

  return (
    <p className={className} {...props}>
      {beginText}
      {itCanOverflow && (
        <>
          {!isExpanded && <span>... </span>}
          <span
            className={`${!isExpanded && "hidden"}`}
            aria-hidden={!isExpanded}
          >
            &nbsp;
            {endText}
          </span>
          <span
            className="text-violet-400 ml-2"
            role="button"
            tabIndex={0}
            aria-expanded={isExpanded}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? "show less" : "show more"}
          </span>
        </>
      )}
    </p>
  );
};
