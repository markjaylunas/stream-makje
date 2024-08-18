"use client";

import { routesConfig, siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionItem,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Navbar as NextNavbar,
  useDisclosure,
} from "@nextui-org/react";
import React from "react";
import MyLink from "../ui/my-link";
import { SvgIcon } from "../ui/svg-icons";
import Search from "./search";

export default function Navbar() {
  const { onOpen, isOpen, onOpenChange } = useDisclosure();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  return (
    <>
      <NextNavbar shouldHideOnScroll>
        <NavbarContent>
          <NavbarBrand>
            <MyLink
              href="/"
              color="foreground"
              className="rounded-md space-x-3"
            >
              <SvgIcon.logo className=" size-10" />
              <span className="sr-only">{siteConfig.name}</span>
            </MyLink>
          </NavbarBrand>
        </NavbarContent>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {routesConfig.mainNav.map((category) => (
            <Dropdown key={category.title}>
              <NavbarItem>
                <DropdownTrigger>
                  <Button
                    disableRipple
                    className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                    endContent={<SvgIcon.chevronDown />}
                    radius="sm"
                    variant="light"
                  >
                    {category.title}
                  </Button>
                </DropdownTrigger>
              </NavbarItem>
              <DropdownMenu
                aria-label={category.title}
                className="w-[340px]"
                itemClasses={{
                  base: "gap-4",
                }}
              >
                {category.items.map((item) => {
                  const IconComponent = item.icon ? SvgIcon[item.icon] : null;
                  return (
                    <DropdownItem
                      description={item.label}
                      startContent={
                        IconComponent && (
                          <IconComponent
                            className={cn("size-10", item.iconClass)}
                          />
                        )
                      }
                      href={item.href}
                      key={item.href}
                    >
                      {item.title}
                    </DropdownItem>
                  );
                })}
              </DropdownMenu>
            </Dropdown>
          ))}
        </NavbarContent>

        <NavbarContent justify="center">
          <NavbarItem
            onClick={onOpen}
            className="rounded-lg hover:bg-black/5 cursor-pointer"
            aria-label="Search"
          >
            <SvgIcon.search />
          </NavbarItem>

          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
        </NavbarContent>

        <NavbarMenu>
          {routesConfig.mainNav.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Accordion
                defaultExpandedKeys={["Anime"]}
                itemClasses={{
                  base: "max-w-sm mx-auto",
                  title: "text-foreground-500/90",
                  content: "flex flex-col gap-3",
                }}
              >
                <AccordionItem
                  key={item.title}
                  aria-label={item.title}
                  title={item.title}
                >
                  {item.items.map((sublink) => {
                    const IconComponent = sublink.icon
                      ? SvgIcon[sublink.icon]
                      : null;
                    return (
                      <MyLink
                        className="w-full py-1 text-foreground-600"
                        href={sublink.href}
                        size="lg"
                        key={sublink.href}
                      >
                        <div className="grid grid-cols-5 place-items-center size-full">
                          {IconComponent && (
                            <IconComponent
                              className={cn(
                                "size-10 col-span-1",
                                sublink.iconClass
                              )}
                            />
                          )}
                          <div className="col-span-4 flex flex-col justify-center items-start">
                            <p>{sublink.title}</p>
                            <p className="text-tiny text-foreground-500">
                              {sublink.label}
                            </p>
                          </div>
                        </div>
                      </MyLink>
                    );
                  })}
                </AccordionItem>
              </Accordion>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </NextNavbar>
      <Search isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
}
