import { postCategoryLabels } from "@/lib/content/blog-images";

export { postCategoryLabels };

export {
  fetchSiteSettings,
  fetchLegacySite,
  fetchHomepageSeo,
} from "@/lib/fetchSiteSettings";

export {
  fetchHomepageSections,
  fetchHomepageBanners,
  fetchPackageSections,
} from "@/lib/fetchPackages";

export {
  fetchServices,
  fetchServiceBySlug,
  fetchServicePackages,
  getAllServiceSlugs,
} from "@/lib/fetchServices";

export {
  fetchPosts,
  fetchPostBySlug,
  fetchPostsBySlugs,
  fetchCategories,
  getAllPostSlugs,
} from "@/lib/fetchPosts";

export { fetchFaqs, fetchFaqsByServiceSlug } from "@/lib/fetchFaqs";

export {
  fetchLocalAreas,
  fetchLocalAreaBySlug,
  getDedicatedLocalSlugs,
} from "@/lib/fetchLocalAreas";
