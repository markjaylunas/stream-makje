"use client";

import { Button, ButtonProps } from "@nextui-org/button";
import { usePathname, useSearchParams } from "next/navigation";
import { SvgIcon } from "./svg-icons";

export default function ShareButton({ children, ...props }: ButtonProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const path = `${process.env.NEXT_PUBLIC_BASE_URL}${pathname}${
    params ? `?${params.toString()}` : ""
  }`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Stream | Makje",
          text: "A streaming web app, discover anime, movies, k-drama, and manga here.",
          url: path,
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Web Share API is not supported in your browser.");
    }
  };

  return (
    <Button
      onClick={handleShare}
      variant="bordered"
      startContent={<SvgIcon.share />}
      {...props}
    >
      {children}
    </Button>
  );
}
