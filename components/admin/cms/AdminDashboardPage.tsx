"use client";

import Link from "next/link";
import AdminShell from "@/components/admin/AdminShell";
import {
  AdminError,
  AdminLoading,
  AdminToast,
} from "@/components/admin/cms/ui";
import { useCmsStore } from "@/components/admin/cms/useCmsStore";

export default function AdminDashboardPage() {
  const { store, loading, error, toast } = useCmsStore();

  if (loading) {
    return (
      <AdminShell title="Tổng quan" subtitle="Thống kê nhanh website">
        <AdminLoading />
      </AdminShell>
    );
  }

  if (!store) {
    return (
      <AdminShell title="Tổng quan" subtitle="Thống kê nhanh website">
        <AdminError message={error ?? "Không có dữ liệu"} />
      </AdminShell>
    );
  }

  const publishedPosts = store.posts.filter((p) => p.status === "published").length;
  const draftPosts = store.posts.filter((p) => p.status === "draft").length;
  const activeServices = store.services.filter((s) => s.isActive).length;
  const activePackages = store.sections.reduce(
    (n, s) => n + s.cards.length,
    0,
  );
  const newLeads = store.leads.filter((l) => l.status === "new").length;

  const stats = [
    { label: "Bài đã xuất bản", value: publishedPosts, href: "/admin/news" },
    { label: "Bài nháp", value: draftPosts, href: "/admin/news" },
    { label: "Dịch vụ đang bật", value: activeServices, href: "/admin/services" },
    { label: "Gói cước", value: activePackages, href: "/admin/packages" },
    { label: "Lead mới", value: newLeads, href: "/admin/leads" },
  ];

  const quickActions = [
    { href: "/admin/news", label: "Thêm bài viết" },
    { href: "/admin/packages", label: "Thêm/sửa gói cước" },
    { href: "/admin/homepage", label: "Chỉnh banner trang chủ" },
    { href: "/admin/settings", label: "Cập nhật SĐT/Zalo" },
    { href: "/admin/faq", label: "Cập nhật FAQ" },
  ];

  return (
    <AdminShell title="Tổng quan" subtitle="Website tư vấn VNPT TP.HCM">
      <AdminToast message={toast} />
      <AdminError message={error} />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-[#2563eb]/40 hover:shadow-md"
          >
            <p className="text-xs font-semibold uppercase text-slate-500">
              {s.label}
            </p>
            <p className="mt-2 text-2xl font-bold text-slate-900">{s.value}</p>
            <p className="mt-2 text-xs font-medium text-[#2563eb]">
              Mở trang quản lý →
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="font-bold text-slate-900">Thao tác nhanh</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {quickActions.map((a) => (
            <Link
              key={a.href}
              href={a.href}
              className="rounded-full bg-[#2563eb] px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
            >
              {a.label}
            </Link>
          ))}
        </div>
      </div>

      <p className="mt-6 text-xs text-slate-500">
        Cập nhật lần cuối: {new Date(store.updatedAt).toLocaleString("vi-VN")}
      </p>
    </AdminShell>
  );
}
