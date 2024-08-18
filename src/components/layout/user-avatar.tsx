"use client";

import { toTitleCase } from "@/lib/utils";
import { Avatar } from "@nextui-org/avatar";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { User } from "next-auth";
import { signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import { SvgIcon } from "../ui/svg-icons";

type Props = {
  user: User | null;
};

export default function UserAvatar({ user }: Props) {
  const { theme, setTheme } = useTheme();

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          size="sm"
          isBordered
          as="button"
          name={user ? user.name || undefined : "Guest"}
          src={user ? user.image || undefined : undefined}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownSection title="User" showDivider>
          <DropdownItem key="profile" isReadOnly className="h-14 gap-2">
            <p className="font-semibold">
              {toTitleCase(user ? user.name || "?" : "Guest User")}
            </p>
            <p className="text-sm">
              {user ? user.email : "Sign in to get the best experience."}
            </p>
          </DropdownItem>
        </DropdownSection>
        <DropdownSection>
          <DropdownItem key="my-list" href="/my-list" showDivider>
            My List
          </DropdownItem>
        </DropdownSection>
        <DropdownSection>
          <DropdownItem
            key="theme toggle"
            onPress={() => setTheme(theme === "dark" ? "light" : "dark")}
            startContent={
              theme === "dark" ? (
                <SvgIcon.moon className="size-4" />
              ) : (
                <SvgIcon.sun className="size-4" />
              )
            }
          >
            {theme === "dark" ? "Dark" : "Light"}
          </DropdownItem>

          <DropdownItem
            startContent={
              user ? (
                <SvgIcon.logout className="size-4" />
              ) : (
                <SvgIcon.logout className="size-4" />
              )
            }
            href={user ? undefined : "/sign-in"}
            onPress={() => (user ? signOut() : undefined)}
            key={user ? "logout" : "sign-in"}
            color={user ? "danger" : "primary"}
          >
            {user ? "Log out" : "Sign in"}
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
}
