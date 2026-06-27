"use client";

import AdminShell from "@/components/admin/AdminShell";
import {
  AdminError,
  AdminLoading,
  AdminToast,
} from "@/components/admin/cms/ui";
import { useCmsStore } from "@/components/admin/cms/useCmsStore";
import { getHeroProductsWithSection } from "@/lib/packages/helpers";

export default function AdminHomepagePage() {
  const { store, loading, error, toast } = useCmsStore();

  if (loading || !store) {
    return (
      <AdminShell title="Homepage" subtitle="Sản phẩm hero & sections">
        {loading ? <AdminLoading /> : <AdminError message={error} />}
      </AdminShell>
    );
  }

  const heroes = getHeroProductsWithSection(store.sections);

  return (
    <AdminShell
      title="Homepage"
      subtitle="Xem nhanh hero carousel và sections trang chủ"
    >
      <AdminToast message={toast} />
      <AdminError message={error} />

      <div className="space-y-6">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">Hero carousel</h2>
          <p className="mt-1 text-sm text-slate-600">
            Chỉnh gói hero tại Packages → tick &quot;Hero carousel&quot; và thứ tự.
          </p>
          {heroes.length === 0 ? (
            <p className="mt-4 text-sm text-slate-500">Chưa có gói hero.</p>
          ) : (
            <ol className="mt-4 space-y-2">
              {heroes.map(({ card, sectionId }, i) => (
                <li
                  key={card.id}
                  className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 px-4 py-3 text-sm"
                >
                  <span>
                    <span className="font-bold text-slate-900">{i + 1}.</span>{" "}
                    {card.title}
                  </span>
                  <span className="text-slate-500">Section: {sectionId}</span>
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
