"use client";

import { Button, ButtonGroup } from "@nextui-org/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SvgIcon } from "./svg-icons";

type Props = {
  prevDisabled: boolean;
  nextDisabled: boolean;
};

export default function PageNavigation({ prevDisabled, nextDisabled }: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const pageParam = searchParams.get("page")?.toString();
  const perPageParam = searchParams.get("perPage")?.toString();

  const page = typeof pageParam === "string" ? parseInt(pageParam) : 1;
  const perPage =
    typeof perPageParam === "string" ? parseInt(perPageParam) : 28;

  const handlePageChange = (nav: "prev" | "next") => {
    const params = new URLSearchParams(searchParams);
    const newPage = nav === "next" ? page + 1 : page - 1;
    params.set("page", newPage.toString());
    params.set("perPage", perPage.toString());
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <ButtonGroup size="sm" radius="md" color="primary" variant="flat">
      <Button
        isDisabled={prevDisabled}
        onClick={() => handlePageChange("prev")}
        startContent={<SvgIcon.chevronLeft />}
      >
        Prev
      </Button>
      <Button
        isDisabled={nextDisabled}
        onClick={() => handlePageChange("next")}
        endContent={<SvgIcon.chevronRight />}
        className="w-full sm:w-fit"
      >
        Next
      </Button>
    </ButtonGroup>
  );
}
