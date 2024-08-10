import { MainNavItem } from "./types";

export const siteConfig = {
  name: "Stream",
  url: "https://myanime.makje.com",
  description:
    "A premier platform for streaming a diverse collection of anime content. We offer high-quality, uninterrupted viewing experiences to anime enthusiasts around the globe.",
  links: {
    github: "https://github.com/markjaylunas",
  },
};

export type SiteConfig = typeof siteConfig;

type RoutesConfig = {
  mainNav: MainNavItem[];
};

export const routesConfig: RoutesConfig = {
  mainNav: [
    {
      title: "Home",
      href: "/anime",
    },
  ],
};

export const API_BASE_URL = `${process.env.CONSUMET_API_BASE_URL}/meta/anilist`;
