"use client";

import { cn } from "@/lib/utils";
import NextImage from "next/image";

type Props = {
  title: string;
  cover: string | null;
  backupCover: string;
};

export default function InfoCover({ title, cover, backupCover }: Props) {
  const isBlur = cover === null || cover === backupCover;
  return (
    <section className="relative  flex-col z-0">
      <div className="relative -z-20 w-full h-[150px] md:h-[200px] lg:h-[300px]">
        <NextImage
          src={cover || backupCover}
          alt={title}
          fill
          sizes="100vw"
          className="z-0 object-cover bg-gray-200 dark:bg-gray-800 "
          unoptimized
        />
      </div>
      <div
        className={cn(
          "absolute -z-10 inset-0 bg-gradient-to-tr from-white dark:from-black to-transparent",
          isBlur && "backdrop-blur-md"
        )}
      />
      <div
        className={cn(
          "absolute -z-10 inset-0 bg-gradient-to-t from-white dark:from-black to-transparent",
          isBlur && "backdrop-blur-md"
        )}
      />
    </section>
  );
}
