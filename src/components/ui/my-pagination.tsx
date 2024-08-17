"use client";

import { Pagination } from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Props = {
  hasNextPage: boolean;
};

export default function MyPagination({ hasNextPage }: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const pageParam = searchParams.get("page")?.toString();
  const perPageParam = searchParams.get("perPage")?.toString();

  const page = typeof pageParam === "string" ? parseInt(pageParam) : 1;
  const perPage =
    typeof perPageParam === "string" ? parseInt(perPageParam) : 35;

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    params.set("perPage", perPage.toString());
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Pagination
      showControls
      total={hasNextPage ? page + 1 : page}
      initialPage={1}
      page={page}
      onChange={handlePageChange}
    />
  );
}
