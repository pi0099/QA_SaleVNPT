"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";

const navSections = [
  {
    title: "CMS",
    items: [{ href: "/admin", label: "Trang quản trị nội dung" }],
  },
  {
    title: "SEO Settings",
    items: [
      { href: "/admin/seo/keywords", label: "Keyword / Tag" },
      { href: "/admin/seo/traffic", label: "Lượt truy cập trang" },
      { href: "/admin/seo/google-ads", label: "Google Ads" },
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
            Menu
          </p>
          <nav className="mt-4 space-y-5">
            {navSections.map((section) => (
              <div key={section.title}>
                <p className="px-3 text-[11px] font-bold uppercase tracking-wide text-slate-400">
                  {section.title}
                </p>
                <div className="mt-2 flex flex-col gap-1">
                  {section.items.map((item) => {
                    const active = isActiveHref(item.href);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`rounded-lg px-3 py-2 text-sm font-medium ${
                          active
                            ? "bg-[#2563eb]/10 text-[#2563eb]"
                            : "text-slate-700 hover:bg-slate-50"
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
              <div className="flex flex-wrap gap-2">
                <Link
                  href="/"
                  className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Trang chủ
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Đăng xuất
                </button>
              </div>
            </div>
            <nav className="mt-4 space-y-3 border-t border-slate-100 pt-4 lg:hidden">
              {navSections.map((section) => (
                <div key={section.title}>
                  <p className="mb-2 text-[11px] font-bold uppercase tracking-wide text-slate-400">
                    {section.title}
                  </p>
                  <div className="flex gap-2 overflow-x-auto">
                    {section.items.map((item) => {
                      const active = isActiveHref(item.href);
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`shrink-0 rounded-lg px-3 py-2 text-sm font-medium ${
                            active ? "bg-[#2563eb] text-white" : "bg-slate-100"
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
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
