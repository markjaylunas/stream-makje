"use client";

import { SvgIcon } from "@/components/ui/svg-icons";
import {
  ASContentTypeArray,
  ASFormatArray,
  ASGenresArray,
  ASSeasonArray,
  ASSortArray,
  ASStatusArray,
} from "@/lib/constants";
import {
  ASContentType,
  ASFormat,
  ASGenres,
  ASSeason,
  ASSort,
  ASStatus,
} from "@/lib/types";
import { cn, debounce, toTitleCase } from "@/lib/utils";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function SearchInput() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const q = searchParams.get("q")?.toString();
  const year = searchParams.get("year")?.toString();
  const paramSeason = searchParams.get("season")?.toString();
  const paramFormat = searchParams.get("format")?.toString();
  const paramStatus = searchParams.get("status")?.toString();
  const paramGenres = searchParams.get("genres");
  const paramSort = searchParams.get("sort");
  const paramContentType = searchParams.get("contentType");

  const season: ASSeason | undefined = ASSeasonArray.includes(
    paramSeason as ASSeason
  )
    ? (paramSeason as ASSeason)
    : undefined;

  const format: ASFormat | undefined = ASFormatArray.includes(
    paramFormat as ASFormat
  )
    ? (paramFormat as ASFormat)
    : undefined;

  const status: ASStatus | undefined = ASStatusArray.includes(
    paramStatus as ASStatus
  )
    ? (paramStatus as ASStatus)
    : undefined;

  const genres: ASGenres | undefined = ASGenresArray.includes(
    paramGenres as ASGenres
  )
    ? (paramGenres as ASGenres)
    : undefined;

  const sort: ASSort | undefined = ASSortArray.includes(paramSort as ASSort)
    ? (paramSort as ASSort)
    : undefined;

  const contentType: ASContentType | undefined = ASContentTypeArray.includes(
    paramContentType as ASContentType
  )
    ? (paramContentType as ASContentType)
    : undefined;

  const handleSearch = useCallback(
    debounce(async (key: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      params.set("page", "1");
      replace(`${pathname}?${params.toString()}`);
    }, 300),
    []
  );

  return (
    <>
      <Input
        isClearable
        type="text"
        variant="flat"
        color="primary"
        size="lg"
        radius="md"
        fullWidth
        defaultValue={q}
        placeholder="Search title..."
        classNames={{ input: "text-foreground" }}
        startContent={<SvgIcon.search className="size-5" />}
        onClear={() => handleSearch("q", "")}
        onChange={(e) => {
          handleSearch("q", e.target.value);
        }}
      />

      <div className="flex gap-2 flex-wrap">
        {/* content-type */}
        <Select
          label="Content Type"
          size="sm"
          radius="md"
          defaultSelectedKeys={contentType ? [contentType] : undefined}
          onChange={(e) => {
            handleSearch("contentType", e.target.value);
          }}
          className="min-w-28 max-w-fit"
        >
          {ASContentTypeArray.map((item) => (
            <SelectItem key={item} value={item}>
              {toTitleCase(item.split("_").join(" "))}
            </SelectItem>
          ))}
        </Select>

        <div
          className={cn(
            "flex gap-2 flex-wrap",
            (contentType === "K-DRAMA" || contentType === "MOVIE") && "hidden"
          )}
        >
          {/* year */}
          <Select
            label="Year"
            size="sm"
            radius="md"
            defaultSelectedKeys={year ? [year] : undefined}
            onChange={(e) => {
              handleSearch("year", e.target.value);
            }}
            className="min-w-28 max-w-fit"
          >
            {Array.from(
              { length: 2024 - 1917 + 1 },
              (_, i) => `${2024 - i}`
            ).map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </Select>

          {/* season */}
          <Select
            label="Season"
            size="sm"
            radius="md"
            defaultSelectedKeys={season ? [season] : undefined}
            onChange={(e) => {
              handleSearch("season", e.target.value);
            }}
            className="min-w-28 max-w-fit"
          >
            {ASSeasonArray.map((item) => (
              <SelectItem key={item} value={item}>
                {toTitleCase(item.split("_").join(" "))}
              </SelectItem>
            ))}
          </Select>

          {/* format */}
          <Select
            label="Format"
            size="sm"
            radius="md"
            defaultSelectedKeys={format ? [format] : undefined}
            onChange={(e) => {
              handleSearch("format", e.target.value);
            }}
            className="min-w-28 max-w-fit"
          >
            {ASFormatArray.map((item) => (
              <SelectItem key={item} value={item}>
                {toTitleCase(item.split("_").join(" "))}
              </SelectItem>
            ))}
          </Select>

          {/* status */}
          <Select
            label="Status"
            size="sm"
            radius="md"
            defaultSelectedKeys={status ? [status] : undefined}
            onChange={(e) => {
              handleSearch("status", e.target.value);
            }}
            className="min-w-28 max-w-fit"
          >
            {ASStatusArray.map((item) => (
              <SelectItem key={item} value={item}>
                {toTitleCase(item.split("_").join(" "))}
              </SelectItem>
            ))}
          </Select>

          {/* genres */}
          <Select
            label="Genres"
            size="sm"
            radius="md"
            className="min-w-36 max-w-fit"
            defaultSelectedKeys={genres ? [genres] : undefined}
            onChange={(e) => {
              handleSearch("genres", e.target.value);
            }}
          >
            {ASGenresArray.map((item) => (
              <SelectItem key={item} value={item}>
                {toTitleCase(item.split("_").join(" "))}
              </SelectItem>
            ))}
          </Select>

          {/* sort */}
          <Select
            label="Sort"
            size="sm"
            radius="md"
            className="min-w-44 max-w-fit"
            defaultSelectedKeys={sort ? [sort] : undefined}
            onChange={(e) => {
              handleSearch("sort", e.target.value);
            }}
          >
            {ASSortArray.map((item) => (
              <SelectItem key={item} value={item}>
                {toTitleCase(item.split("_").join(" "))}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>
    </>
  );
}
