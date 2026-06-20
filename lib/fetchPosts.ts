import { postCategoryLabels } from "@/lib/content/blog-images";
import { getAllPublishedPosts, getPublishedPostBySlug } from "@/lib/blog/mergePosts";
import type {
  FetchPostsParams,
  FetchPostsResult,
  Post,
  PostCategory,
} from "@/lib/content/types";

export async function fetchPosts(
  params: FetchPostsParams = {},
): Promise<FetchPostsResult> {
  const { category = "all", page = 1, search = "", limit = 9 } = params;
  let filtered = await getAllPublishedPosts();

  if (category !== "all") {
    filtered = filtered.filter((p) => p.category === category);
  }

  if (search.trim()) {
    const q = search.trim().toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)),
    );
  }

  filtered.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const safePage = Math.min(Math.max(page, 1), totalPages);
  const start = (safePage - 1) * limit;

  return {
    posts: filtered.slice(start, start + limit),
    total,
    page: safePage,
    totalPages,
  };
}

export async function fetchPostBySlug(
  slug: string,
): Promise<Post | undefined> {
  return getPublishedPostBySlug(slug);
}

export async function fetchPostsBySlugs(slugs: string[]): Promise<Post[]> {
  const all = await getAllPublishedPosts();
  return slugs
    .map((slug) => all.find((p) => p.slug === slug))
    .filter((p): p is Post => Boolean(p));
}

export async function fetchCategories(): Promise<
  { id: PostCategory; label: string }[]
> {
  return (Object.keys(postCategoryLabels) as PostCategory[]).map((id) => ({
    id,
    label: postCategoryLabels[id],
  }));
}

export async function getAllPostSlugs(): Promise<string[]> {
  const all = await getAllPublishedPosts();
  return all.map((p) => p.slug);
}
