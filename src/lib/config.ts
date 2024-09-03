import { NavItemWithChildren } from "./types";

export const siteConfig = {
  name: "Stream",
  url: "https://stream.makje.com",
  description:
    "A premier platform for streaming a diverse collection of anime, movie, tv shows, and k-drama content.",
  links: {
    website: "https://makje.com",
    github: "https://github.com/markjaylunas",
    portfolio: "https://makje.com",
    kofi: "https://ko-fi.com/V7V411PJ17",
  },
};

export type SiteConfig = typeof siteConfig;

type RoutesConfig = {
  mainNav: NavItemWithChildren[];
};
export const routesConfig: RoutesConfig = {
  mainNav: [
    {
      title: "Anime",
      items: [
        {
          title: "Anime Homepage",
          href: "/anime",
          label:
            "Explore all anime-related content, from trending series to new releases.",
          icon: "home",
          iconClass: "text-primary",
          items: [],
        },
        {
          title: "Popular This Season",
          href: "/anime/popular-this-season",
          label: "Explore the most popular anime of the current season.",
          icon: "flame",
          iconClass: "text-danger",
          items: [],
        },
        {
          title: "Recent Episodes",
          href: "/anime/recent-episodes",
          label: "Catch up on the latest episodes released for ongoing series.",
          items: [],
          icon: "clockDashed",
          iconClass: "text-amber-700",
        },
        {
          title: "Last Season",
          href: "/anime/last-season",
          label: "See what was trending last season in the anime world.",
          items: [],
          icon: "archive",
          iconClass: "text-gray-500",
        },
        {
          title: "Most Popular",
          href: "/anime/most-popular",
          label: "Discover the all-time favorite and top-rated anime series.",
          items: [],
          icon: "star",
          iconClass: "text-yellow-500",
        },
        {
          title: "Airing Schedules",
          href: "/anime/airing-schedules",
          label:
            "Stay updated with the weekly airing schedule of your favorite anime.",
          items: [],
          icon: "calendar",
          iconClass: "text-emerald-500",
        },
        {
          title: "Next Season",
          href: "/anime/next-season",
          label: "Find out which new anime are coming up in the next season.",
          items: [],
          icon: "chevronDoubleRight",
          iconClass: "text-purple-500",
        },
        {
          title: "Genres",
          href: "/anime/genre/Action",
          label: "Explore anime by different genres.",
          icon: "tag",
          iconClass: "text-blue-500",
          items: [],
        },
      ],
    },

    {
      title: "Movie",
      items: [
        {
          title: "Movie Homepage",
          href: "/movie",
          label:
            "Explore all movie and tv related content, from trending series to new releases.",
          icon: "home",
          iconClass: "text-primary",
          items: [],
        },
        {
          title: "By Country",
          href: "/movie/country/us",
          label: "Find movies based on country or region of production.",
          icon: "globe",
          iconClass: "text-orange-500",
          items: [],
        },
        {
          title: "Genres",
          href: "/movie/genre/action",
          label: "Explore movies by different genres.",
          icon: "tag",
          iconClass: "text-blue-500",
          items: [],
        },
      ],
    },
    {
      title: "K-drama",
      items: [
        {
          title: "K-drama Homepage",
          href: "/k-drama",
          label:
            "Explore all k-drama-related content, from trending series to new releases.",
          icon: "home",
          iconClass: "text-primary",
          items: [],
        },
      ],
    },
  ],
};
