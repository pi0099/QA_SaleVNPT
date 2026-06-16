"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";

const navItems = [
  { href: "/admin", label: "CMS" },
  { href: "/admin/seo/keywords", label: "SEO: Keyword/Tag" },
  { href: "/admin/seo/traffic", label: "Lượt truy cập" },
  { href: "/admin/seo/google-ads", label: "Google Ads" },
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

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-8 lg:px-8">
        <aside className="hidden w-60 shrink-0 flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm lg:flex">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Menu
          </p>
          <nav className="mt-4 flex flex-col gap-1">
            {navItems.map((item) => {
              const active =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname?.startsWith(item.href);
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
            <nav className="mt-4 flex gap-2 overflow-x-auto border-t border-slate-100 pt-4 lg:hidden">
              {navItems.map((item) => {
                const active =
                  item.href === "/admin"
                    ? pathname === "/admin"
                    : pathname?.startsWith(item.href);
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
            </nav>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
