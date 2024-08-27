import { routesConfig, siteConfig } from "@/lib/config";
import { NavItemWithChildren } from "@/lib/types";
import CategoryCard from "../card-data/category-card";
import MyLink from "../ui/my-link";

import PNGDev from "@/assets/dev.png";
import PNGGithub from "@/assets/github.png";
import PNGKofi from "@/assets/kofi.png";

export function Footer() {
  return (
    <footer className="border-t border-default-100 py-6 px-4 md:px-8 space-y-8">
      <section className="flex justify-between flex-col lg:flex-row gap-8">
        <MainNav links={routesConfig.mainNav} />

        <div className="max-w-screen-sm mx-auto grid grid-cols-3 gap-4">
          <CategoryCard
            description="Visit Makje"
            image={PNGDev}
            link={siteConfig.links.portfolio}
            isNewtab={true}
          />

          <CategoryCard
            description="Donate"
            image={PNGKofi}
            link={siteConfig.links.kofi}
            isNewtab={true}
          />

          <CategoryCard
            description="Github"
            image={PNGGithub}
            link={siteConfig.links.github}
            isNewtab={true}
          />
        </div>
      </section>

      <section className="flex items-center justify-center">
        <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built by&nbsp;
          <a
            href={siteConfig.links.website}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            makje
          </a>
          .
        </p>
      </section>
    </footer>
  );
}

function MainNav({ links }: { links: NavItemWithChildren[] }) {
  return (
    <section className="flex gap-12">
      {links.map((linkList) => (
        <div key={linkList.title} className="space-y-2">
          <p>{linkList.title}</p>
          <div className="flex flex-col gap-2">
            {linkList.items.map((link) => (
              <MyLink
                href={link.href}
                className="text-foreground-400 text-tiny"
                key={link.href}
              >
                {link.title}
              </MyLink>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
