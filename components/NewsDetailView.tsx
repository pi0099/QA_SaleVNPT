import Link from "next/link";
import ContentHtml from "@/components/ContentHtml";
import CtaBox from "@/components/CtaBox";
import LeadForm from "@/components/LeadForm";
import type { Post } from "@/lib/content/types";
import { postCategoryLabels } from "@/lib/content/blog-images";
import { categoryServiceLink } from "@/lib/content/post-service-links";

type NewsDetailViewProps = {
  post: Post;
  relatedPosts: Post[];
};

function extractHeadings(html: string) {
  const matches = Array.from(html.matchAll(/<h2[^>]*>(.*?)<\/h2>/gi));
  return matches.map((m, i) => ({
    id: `section-${i}`,
    text: m[1].replace(/<[^>]+>/g, ""),
  }));
}

function addHeadingIds(html: string) {
  let i = 0;
  return html.replace(/<h2([^>]*)>/gi, () => {
    const id = `section-${i}`;
    i += 1;
    return `<h2 id="${id}"$1>`;
  });
}

/** Remove duplicate H1 when page hero already renders post.title */
function stripLeadingH1(html: string): string {
  return html.replace(/^\s*<h1[^>]*>[\s\S]*?<\/h1>\s*/i, "");
}

export default function NewsDetailView({
  post,
  relatedPosts,
}: NewsDetailViewProps) {
  const headings = extractHeadings(post.content);
  const contentWithIds = addHeadingIds(stripLeadingH1(post.content));
  const showToc = headings.length >= 3;
  const faqInContent = post.content.includes("post-faq-block");

  return (
    <>
      <div className="landing-hero-shell border-b border-sky-100/80">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-[#2563eb]">
              {postCategoryLabels[post.category]}
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              {post.title}
            </h1>
            <p className="mt-4 flex flex-wrap gap-2 text-sm text-slate-500">
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString("vi-VN")}
              </time>
              <span>·</span>
              <span>{post.readingTime} phút đọc</span>
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
          <article>
            {post.featuredImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={post.featuredImage}
                alt={post.title}
                width={800}
                height={400}
                loading="lazy"
                className="mb-8 w-full rounded-2xl object-cover"
              />
            ) : null}

            {showToc ? (
              <nav className="mb-8 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm font-bold text-slate-900">Mục lục</p>
                <ol className="mt-3 space-y-2 text-sm">
                  {headings.map((h) => (
                    <li key={h.id}>
                      <a href={`#${h.id}`} className="text-[#2563eb] hover:underline">
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            ) : null}

            <ContentHtml html={contentWithIds} />

            {categoryServiceLink[post.category] ? (
              <div className="mt-10 rounded-2xl border border-[#2563eb]/20 bg-blue-50/50 p-5">
                <p className="text-sm font-semibold text-slate-900">
                  Cần tư vấn đăng ký dịch vụ?
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Xem trang dịch vụ chính thức trên website tư vấn để biết bảng giá, quy trình và FAQ cập nhật.
                </p>
                <Link
                  href={categoryServiceLink[post.category]!.href}
                  className="mt-4 inline-flex min-h-[44px] items-center rounded-full bg-[#2563eb] px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-700"
                >
                  {categoryServiceLink[post.category]!.label}
                </Link>
              </div>
            ) : null}

            {post.faqs && post.faqs.length > 0 && !faqInContent ? (
              <div className="mt-10 space-y-4">
                <h2 className="text-xl font-bold text-slate-900">FAQ</h2>
                {post.faqs.map((item) => (
                  <div
                    key={item.question}
                    className="rounded-xl border border-slate-200 p-4"
                  >
                    <h3 className="font-bold text-slate-900">{item.question}</h3>
                    <p className="mt-2 text-sm text-slate-600">{item.answer}</p>
                  </div>
                ))}
              </div>
            ) : null}

            <div className="mt-10">
              <CtaBox />
            </div>
          </article>

          <aside className="space-y-6">
            <LeadForm defaultNeed="Chưa rõ" />
            {relatedPosts.length > 0 ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h2 className="font-bold text-slate-900">Bài liên quan</h2>
                <ul className="mt-4 space-y-3">
                  {relatedPosts.map((rp) => (
                    <li key={rp.slug}>
                      <Link
                        href={`/news/${rp.slug}`}
                        className="text-sm font-semibold text-slate-700 hover:text-[#2563eb]"
                      >
                        {rp.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </aside>
        </div>
      </div>
    </>
  );
}
