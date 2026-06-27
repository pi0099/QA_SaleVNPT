import type { HomepageBannerSlide } from "@/lib/cms-store/types";
import { SIM_U1500_HERO_IMAGE } from "@/lib/content/sim-u1500-data";

export const defaultHomepageBanners: HomepageBannerSlide[] = [
  {
    id: "banner-u1500",
    cardId: "5g-u1500",
    sectionId: "goi-5g-data",
    imageUrl: SIM_U1500_HERO_IMAGE,
    sortOrder: 1,
  },
];
