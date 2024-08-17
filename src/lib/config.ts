import { MainNavItem } from "./types";

export const siteConfig = {
  name: "Stream",
  url: "https://stream.makje.com",
  description:
    "A premier platform for streaming a diverse collection of anime content. We offer high-quality, uninterrupted viewing experiences to anime enthusiasts around the globe.",
  links: {
    github: "https://github.com/markjaylunas",
    portfolio: "https://makje.com",
    kofi: "https://ko-fi.com/V7V411PJ17",
  },
};

export type SiteConfig = typeof siteConfig;

type RoutesConfig = {
  mainNav: MainNavItem[];
};

export const routesConfig: RoutesConfig = {
  mainNav: [
    {
      title: "Anime",
      href: "/anime",
    },
  ],
};
