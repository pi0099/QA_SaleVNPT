"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";

const navSections = [
  {
    title: "Quản trị nội dung",
    items: [
      { href: "/admin", label: "Tổng quan" },
      { href: "/admin/settings", label: "Cài đặt website" },
      { href: "/admin/homepage", label: "Trang chủ & Banner" },
      { href: "/admin/services", label: "Dịch vụ" },
      { href: "/admin/packages", label: "Gói cước" },
      { href: "/admin/news", label: "Tin tức / Blog" },
      { href: "/admin/blog-generator", label: "Tạo bài AI" },
      { href: "/admin/faq", label: "Câu hỏi thường gặp" },
      { href: "/admin/local-seo", label: "SEO địa phương" },
      { href: "/admin/leads", label: "Khách hàng tiềm năng" },
    ],
  },
  {
    title: "Cài đặt SEO",
    items: [
      { href: "/admin/seo/keywords", label: "Từ khóa / Thẻ" },
      { href: "/admin/seo/traffic", label: "Lượt truy cập" },
      { href: "/admin/seo/google-ads", label: "Theo dõi quảng cáo" },
    ],
  },
];

export default function AdminShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  const isActiveHref = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname?.startsWith(href);

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-8 lg:px-8">
        <aside className="hidden w-60 shrink-0 flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm lg:flex">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            VNPT Sales CMS
          </p>
          <nav className="mt-4 space-y-6">
            {navSections.map((section) => (
              <div key={section.title}>
                <p className="px-3 text-sm font-bold text-slate-900">
                  {section.title}
                </p>
                <div className="mt-2 flex flex-col gap-0.5">
                  {section.items.map((item) => {
                    const active = isActiveHref(item.href);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`rounded-lg px-3 py-2 text-[13px] font-medium ${
                          active
                            ? "bg-[#2563eb]/10 text-[#2563eb]"
                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                        }`}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
          <div className="mt-auto pt-8">
            <button
              type="button"
              onClick={handleLogout}
              className="w-full rounded-lg border border-slate-200 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
            >
              Đăng xuất
            </button>
            <Link
              href="/"
              className="mt-2 block text-center text-sm text-[#2563eb] hover:underline"
            >
              Xem trang chủ
            </Link>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <div className="mb-6 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h1 className="text-lg font-bold text-slate-900">{title}</h1>
                <p className="text-sm text-slate-500">{subtitle}</p>
              </div>
            </div>
            <nav className="mt-4 space-y-4 border-t border-slate-100 pt-4 lg:hidden">
              {navSections.map((section) => (
                <div key={section.title}>
                  <p className="mb-2 text-sm font-bold text-slate-900">
                    {section.title}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {section.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                          isActiveHref(item.href)
                            ? "bg-[#2563eb] text-white"
                            : "border border-slate-200 bg-white text-slate-700"
                        }`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </nav>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
