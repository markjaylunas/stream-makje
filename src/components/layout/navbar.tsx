import { routesConfig, siteConfig } from "@/lib/config";
import {
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Navbar as NextNavbar,
} from "@nextui-org/react";
import React from "react";
import MyLink from "../ui/my-link";
import { SvgIcon } from "../ui/svg-icons";
import { ThemeSwitcher } from "../ui/theme-switcher";

export default function Navbar() {
  return (
    <NextNavbar shouldHideOnScroll>
      <NavbarContent>
        <NavbarBrand>
          <MyLink href="/" color="foreground" className="rounded-md space-x-3">
            <SvgIcon.logo className=" size-10" />
            <span className="sr-only">{siteConfig.name}</span>
          </MyLink>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {routesConfig.mainNav.map((link) => (
          <NavbarItem key={link.title}>
            <MyLink href={link.href}>{link.title}</MyLink>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
      </NavbarContent>
    </NextNavbar>
  );
}
