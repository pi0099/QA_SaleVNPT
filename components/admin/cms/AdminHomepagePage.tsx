"use client";

import Link from "next/link";
import AdminShell from "@/components/admin/AdminShell";
import {
  AdminError,
  AdminLoading,
  AdminToast,
} from "@/components/admin/cms/ui";
import { useCmsStore } from "@/components/admin/cms/useCmsStore";
import {
  getHeroImageUrl,
  getHeroProductsWithSection,
} from "@/lib/packages/helpers";

export default function AdminHomepagePage() {
  const { store, loading, error, toast } = useCmsStore();

  if (loading || !store) {
    return (
      <AdminShell title="Trang chủ & Banner" subtitle="Hero carousel và sections">
        {loading ? <AdminLoading /> : <AdminError message={error} />}
      </AdminShell>
    );
  }

  const heroes = getHeroProductsWithSection(store.sections);

  return (
    <AdminShell
      title="Trang chủ & Banner"
      subtitle="Cấu hình banner carousel và sections trang chủ"
    >
      <AdminToast message={toast} />
      <AdminError message={error} />

      <div className="mb-6 rounded-xl border border-sky-200 bg-sky-50 p-4 text-sm text-slate-700">
        <p className="font-bold text-slate-900">Banner trang chủ cấu hình ở đâu?</p>
        <p className="mt-2">
          Vào{" "}
          <Link href="/admin/packages" className="font-semibold text-[#2563eb] hover:underline">
            Gói cước
          </Link>
          {" "}→ chọn gói → bật <strong>Hero carousel (banner)</strong>, nhập{" "}
          <strong>Ảnh banner</strong> và <strong>Link banner</strong>.
        </p>
        <p className="mt-2">
          Ví dụ SIM U1500: ảnh <code className="rounded bg-white px-1">/sim-data-u1500-banner.png</code>,
          link <code className="rounded bg-white px-1">/sim-u1500-vinaphone</code>
        </p>
      </div>

      <div className="space-y-6">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">Banner carousel</h2>
          <p className="mt-1 text-sm text-slate-600">
            Mỗi slide hiển thị ảnh nền và link tới trang sản phẩm tương ứng.
          </p>
          {heroes.length === 0 ? (
            <p className="mt-4 text-sm text-slate-500">Chưa có gói banner.</p>
          ) : (
            <ol className="mt-4 space-y-2">
              {heroes.map(({ card, sectionId, href }, i) => (
                <li
                  key={card.id}
                  className="flex flex-col gap-1 rounded-lg border border-slate-100 bg-slate-50 px-4 py-3 text-sm sm:flex-row sm:items-center sm:justify-between"
                >
                  <span>
                    <span className="font-bold text-slate-900">{i + 1}.</span>{" "}
                    {card.title}
                  </span>
                  <span className="text-slate-500">
                    Section: {sectionId} · Link:{" "}
                    <Link href={href} className="text-[#2563eb] hover:underline">
                      {href}
                    </Link>
                    {getHeroImageUrl(card) ? (
                      <> · Ảnh: {getHeroImageUrl(card)}</>
                    ) : null}
                  </span>
                </li>
              ))}
            </ol>
          )}
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">Sections trang chủ</h2>
          <ul className="mt-4 space-y-3">
            {store.sections.map((section) => {
              const tierCount = section.cards.filter((c) => c.homepageTier).length;
              return (
                <li
                  key={section.id}
                  className="rounded-lg border border-slate-100 px-4 py-3 text-sm"
                >
                  <p className="font-semibold text-slate-900">{section.title}</p>
                  <p className="text-slate-600">
                    {tierCount}/3 tier cards · {section.cards.length} gói tổng ·{" "}
                    {section.pricingMode === "single" ? "Giá đơn" : "Dual pricing"}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </AdminShell>
  );
}
