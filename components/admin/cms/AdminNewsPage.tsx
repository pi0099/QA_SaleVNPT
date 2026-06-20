"use client";

import { useMemo, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import {
  AdminError,
  AdminField,
  AdminLoading,
  AdminToast,
  SaveBar,
  StatusBadge,
  inputClass,
  selectClass,
  textareaClass,
} from "@/components/admin/cms/ui";
import { useCmsStore } from "@/components/admin/cms/useCmsStore";
import type { Post, PostCategory } from "@/lib/content/types";
import { cmsId, estimateReadingTime, slugifyVi } from "@/lib/cms-store/id";

type StatusFilter = "all" | "draft" | "published";

export default function AdminNewsPage() {
  const { store, loading, error, toast, saving, save, patch } = useCmsStore();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [dirty, setDirty] = useState(false);
  const [reviewChecked, setReviewChecked] = useState(false);

  const filtered = useMemo(() => {
    if (!store) return [];
    const q = search.trim().toLowerCase();
    return store.posts.filter((p) => {
      if (statusFilter !== "all" && p.status !== statusFilter) return false;
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        p.slug.includes(q) ||
        (p.generatedByAI && "ai".includes(q))
      );
    });
  }, [store, search, statusFilter]);

  const selected = store?.posts.find((p) => p.id === selectedId);

  if (loading || !store) {
    return (
      <AdminShell title="News" subtitle="Quản lý blog">
        {loading ? <AdminLoading /> : <AdminError message={error} />}
      </AdminShell>
    );
  }

  function updatePost(id: string, fn: (p: Post) => Post) {
    patch((prev) => ({
      ...prev,
      posts: prev.posts.map((p) =>
        p.id === id
          ? { ...fn(p), updatedAt: new Date().toISOString() }
          : p,
      ),
    }));
    setDirty(true);
  }

  function trySetPublished(post: Post, nextStatus: Post["status"]) {
    if (
      nextStatus === "published" &&
      post.generatedByAI &&
      !reviewChecked &&
      !post.reviewedByAdmin
    ) {
      alert(
        "Bài AI cần tick checkbox review trước khi publish: kiểm tra giá, claim, source notes và wording VNPT.",
      );
      return;
    }
    updatePost(post.id, (p) => ({
      ...p,
      status: nextStatus,
      reviewedByAdmin:
        nextStatus === "published" && p.generatedByAI
          ? true
          : p.reviewedByAdmin,
    }));
    if (nextStatus === "published") setReviewChecked(false);
  }

  function addPost() {
    const now = new Date().toISOString();
    const p: Post = {
      id: cmsId("post"),
      title: "Bài viết mới",
      slug: slugifyVi(`bai-viet-moi-${Date.now()}`),
      excerpt: "",
      content: "<p>Nội dung...</p>",
      category: "wifi",
      tags: [],
      seoTitle: "Bài viết mới",
      seoDescription: "",
      readingTime: 1,
      publishedAt: now.slice(0, 10),
      status: "draft",
      relatedPostSlugs: [],
      isFeatured: false,
      generatedByAI: false,
      reviewedByAdmin: false,
      createdAt: now,
      updatedAt: now,
    };
    patch((prev) => ({ ...prev, posts: [p, ...prev.posts] }));
    setSelectedId(p.id);
    setDirty(true);
  }

  function deletePost(id: string) {
    if (!confirm("Xóa bài viết này?")) return;
    patch((prev) => ({
      ...prev,
      posts: prev.posts.filter((p) => p.id !== id),
    }));
    if (selectedId === id) setSelectedId(null);
    setDirty(true);
  }

  const draftCount = store.posts.filter((p) => p.status === "draft").length;
  const aiDraftCount = store.posts.filter(
    (p) => p.status === "draft" && p.generatedByAI,
  ).length;

  return (
    <AdminShell title="News / Blog" subtitle="CRUD bài viết — draft & published">
      <AdminToast message={toast} />
      <AdminError message={error} />

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <input
          className={inputClass + " max-w-xs"}
          placeholder="Tìm bài..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className={selectClass + " max-w-[140px]"}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
        >
          <option value="all">Tất cả</option>
          <option value="draft">Draft ({draftCount})</option>
          <option value="published">Published</option>
        </select>
        <button
          type="button"
          onClick={addPost}
          className="rounded-lg bg-[#2563eb] px-4 py-2 text-sm font-bold text-white"
        >
          + Thêm bài viết
        </button>
        <a
          href="/admin/blog-generator"
          className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          Blog Generator
        </a>
      </div>

      {aiDraftCount > 0 && (
        <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          Có {aiDraftCount} bài draft do AI tạo — cần review trước khi publish.
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <div className="max-h-[70vh] space-y-2 overflow-y-auto rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
          {filtered.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => {
                setSelectedId(p.id);
                setReviewChecked(p.reviewedByAdmin ?? false);
              }}
              className={`w-full rounded-lg px-3 py-2 text-left text-sm ${
                selectedId === p.id ? "bg-[#2563eb]/10" : "hover:bg-slate-50"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="line-clamp-1 font-semibold">{p.title}</span>
                <StatusBadge status={p.status} />
              </div>
              {p.generatedByAI && (
                <span className="mt-1 inline-block rounded bg-violet-100 px-1.5 py-0.5 text-[10px] font-bold text-violet-700">
                  AI draft
                </span>
              )}
            </button>
          ))}
        </div>

        {selected ? (
          <div className="space-y-3 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            {selected.status === "published" && (
              <p className="text-xs text-slate-500">
                Preview:{" "}
                <a
                  href={`/news/${selected.slug}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#2563eb]"
                >
                  /news/{selected.slug}
                </a>
              </p>
            )}
            {selected.generatedByAI && (
              <div className="rounded-lg bg-violet-50 px-3 py-2 text-xs text-violet-800">
                Bài do AI tạo — bắt buộc review trước khi publish.
              </div>
            )}
            <AdminField label="Title">
              <input
                className={inputClass}
                value={selected.title}
                onChange={(e) => {
                  const title = e.target.value;
                  updatePost(selected.id, (p) => ({
                    ...p,
                    title,
                    slug: p.slug || slugifyVi(title),
                  }));
                }}
              />
            </AdminField>
            <AdminField label="Slug">
              <input
                className={inputClass}
                value={selected.slug}
                onChange={(e) =>
                  updatePost(selected.id, (p) => ({
                    ...p,
                    slug: slugifyVi(e.target.value),
                  }))
                }
              />
            </AdminField>
            <AdminField label="Category">
              <select
                className={selectClass}
                value={selected.category}
                onChange={(e) =>
                  updatePost(selected.id, (p) => ({
                    ...p,
                    category: e.target.value as PostCategory,
                  }))
                }
              >
                {store.postCategories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </AdminField>
            <AdminField label="Excerpt">
              <textarea
                className={textareaClass}
                rows={2}
                value={selected.excerpt}
                onChange={(e) =>
                  updatePost(selected.id, (p) => ({
                    ...p,
                    excerpt: e.target.value,
                  }))
                }
              />
            </AdminField>
            <AdminField label="Content (HTML)">
              <textarea
                className={textareaClass}
                rows={10}
                value={selected.content}
                onChange={(e) => {
                  const content = e.target.value;
                  updatePost(selected.id, (p) => ({
                    ...p,
                    content,
                    readingTime: estimateReadingTime(content),
                  }));
                }}
              />
            </AdminField>
            <AdminField label="SEO title">
              <input
                className={inputClass}
                value={selected.seoTitle}
                onChange={(e) =>
                  updatePost(selected.id, (p) => ({
                    ...p,
                    seoTitle: e.target.value,
                  }))
                }
              />
            </AdminField>
            <AdminField label="Meta description">
              <textarea
                className={textareaClass}
                rows={2}
                value={selected.seoDescription}
                onChange={(e) =>
                  updatePost(selected.id, (p) => ({
                    ...p,
                    seoDescription: e.target.value,
                  }))
                }
              />
            </AdminField>
            <AdminField label="OG title">
              <input
                className={inputClass}
                value={selected.ogTitle ?? ""}
                onChange={(e) =>
                  updatePost(selected.id, (p) => ({
                    ...p,
                    ogTitle: e.target.value,
                  }))
                }
              />
            </AdminField>
            <AdminField label="OG description">
              <textarea
                className={textareaClass}
                rows={2}
                value={selected.ogDescription ?? ""}
                onChange={(e) =>
                  updatePost(selected.id, (p) => ({
                    ...p,
                    ogDescription: e.target.value,
                  }))
                }
              />
            </AdminField>
            <AdminField label="Facebook caption">
              <textarea
                className={textareaClass}
                rows={3}
                value={selected.facebookCaption ?? ""}
                onChange={(e) =>
                  updatePost(selected.id, (p) => ({
                    ...p,
                    facebookCaption: e.target.value,
                  }))
                }
              />
            </AdminField>
            <AdminField label="Source notes (admin only)">
              <textarea
                className={textareaClass}
                rows={4}
                value={selected.sourceNotes ?? ""}
                onChange={(e) =>
                  updatePost(selected.id, (p) => ({
                    ...p,
                    sourceNotes: e.target.value,
                  }))
                }
              />
            </AdminField>
            <AdminField label="Status">
              <select
                className={selectClass}
                value={selected.status}
                onChange={(e) =>
                  trySetPublished(
                    selected,
                    e.target.value as Post["status"],
                  )
                }
              >
                <option value="draft">draft</option>
                <option value="published">published</option>
              </select>
            </AdminField>
            {selected.generatedByAI && selected.status === "draft" && (
              <label className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm">
                <input
                  type="checkbox"
                  checked={reviewChecked}
                  onChange={(e) => setReviewChecked(e.target.checked)}
                  className="mt-1"
                />
                <span>
                  Tôi đã review giá, claim, source notes và wording VNPT trước
                  khi publish.
                </span>
              </label>
            )}
            <button
              type="button"
              onClick={() => deletePost(selected.id)}
              className="text-sm font-semibold text-red-600"
            >
              Xóa bài viết
            </button>
          </div>
        ) : (
          <p className="text-sm text-slate-500">Chọn bài để chỉnh sửa.</p>
        )}
      </div>

      <SaveBar
        saving={saving}
        dirty={dirty}
        onSave={() => {
          if (!store) return;
          save(store);
          setDirty(false);
        }}
      />
    </AdminShell>
  );
}
