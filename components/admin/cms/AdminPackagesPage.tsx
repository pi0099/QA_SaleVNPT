"use client";

import { useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import PricingCard from "@/components/PricingCard";
import {
  AdminError,
  AdminField,
  AdminLoading,
  AdminToast,
  SaveBar,
  inputClass,
  textareaClass,
} from "@/components/admin/cms/ui";
import { useCmsStore } from "@/components/admin/cms/useCmsStore";
import { createCardId } from "@/lib/cms-storage";
import type { PackageCard, PackageSection } from "@/lib/data";

export default function AdminPackagesPage() {
  const { store, loading, error, toast, saving, save, patch } = useCmsStore();
  const [sectionId, setSectionId] = useState<string | null>(null);
  const [dirty, setDirty] = useState(false);

  const section = store?.sections.find((s) => s.id === sectionId);

  if (loading || !store) {
    return (
      <AdminShell title="Packages" subtitle="Quản lý gói cước">
        {loading ? <AdminLoading /> : <AdminError message={error} />}
      </AdminShell>
    );
  }

  function updateSections(fn: (sections: PackageSection[]) => PackageSection[]) {
    patch((prev) => ({ ...prev, sections: fn(prev.sections) }));
    setDirty(true);
  }

  function updateCard(cardId: string, fn: (c: PackageCard) => PackageCard) {
    if (!sectionId) return;
    updateSections((sections) =>
      sections.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              cards: s.cards.map((c) => (c.id === cardId ? fn(c) : c)),
            }
          : s,
      ),
    );
  }

  function addCard() {
    if (!sectionId) return;
    const card: PackageCard = {
      id: createCardId(),
      title: "GÓI MỚI",
      price: "0",
      speed: "—",
      features: [],
      promotion: "",
      variant: "blue",
      isPopular: false,
    };
    updateSections((sections) =>
      sections.map((s) =>
        s.id === sectionId ? { ...s, cards: [...s.cards, card] } : s,
      ),
    );
  }

  function duplicateCard(card: PackageCard) {
    if (!sectionId) return;
    const copy = { ...card, id: createCardId(), title: `${card.title} (copy)` };
    updateSections((sections) =>
      sections.map((s) =>
        s.id === sectionId ? { ...s, cards: [...s.cards, copy] } : s,
      ),
    );
  }

  return (
    <AdminShell title="Packages" subtitle="Gói cước trên trang chủ & service pages">
      <AdminToast message={toast} />
      <AdminError message={error} />

      <div className="mb-4 flex flex-wrap gap-2">
        {store.sections.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setSectionId(s.id)}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              sectionId === s.id
                ? "bg-[#2563eb] text-white"
                : "border border-slate-200 bg-white"
            }`}
          >
            {s.title}
          </button>
        ))}
      </div>

      {section ? (
        <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
          <div className="space-y-4">
            {section.cards.map((card) => (
              <div
                key={card.id}
                className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <div className="grid gap-3 md:grid-cols-2">
                  <AdminField label="Tên gói">
                    <input
                      className={inputClass}
                      value={card.title}
                      onChange={(e) =>
                        updateCard(card.id, (c) => ({ ...c, title: e.target.value }))
                      }
                    />
                  </AdminField>
                  <AdminField label="Giá nội thành">
                    <input
                      className={inputClass}
                      value={card.price}
                      onChange={(e) =>
                        updateCard(card.id, (c) => ({ ...c, price: e.target.value }))
                      }
                    />
                  </AdminField>
                  <AdminField label="Giá ngoại thành">
                    <input
                      className={inputClass}
                      value={card.priceOuterCity ?? ""}
                      onChange={(e) =>
                        updateCard(card.id, (c) => ({
                          ...c,
                          priceOuterCity: e.target.value || undefined,
                        }))
                      }
                    />
                  </AdminField>
                  <AdminField label="Speed">
                    <input
                      className={inputClass}
                      value={card.speed}
                      onChange={(e) =>
                        updateCard(card.id, (c) => ({ ...c, speed: e.target.value }))
                      }
                    />
                  </AdminField>
                </div>
                <AdminField label="Features (mỗi dòng 1 feature)">
                  <textarea
                    className={textareaClass}
                    rows={3}
                    value={card.features.join("\n")}
                    onChange={(e) =>
                      updateCard(card.id, (c) => ({
                        ...c,
                        features: e.target.value.split("\n").filter(Boolean),
                      }))
                    }
                  />
                </AdminField>
                <label className="mt-2 flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={card.isPopular}
                    onChange={(e) =>
                      updateCard(card.id, (c) => ({
                        ...c,
                        isPopular: e.target.checked,
                      }))
                    }
                  />
                  Featured / Popular
                </label>
                <button
                  type="button"
                  onClick={() => duplicateCard(card)}
                  className="mt-2 text-sm text-[#2563eb]"
                >
                  Duplicate
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addCard}
              className="rounded-lg border border-dashed border-slate-300 px-4 py-3 text-sm font-semibold text-slate-600"
            >
              + Thêm gói trong section này
            </button>
          </div>

          <div>
            <p className="mb-3 text-sm font-bold text-slate-700">Preview</p>
            {section.cards[0] ? (
              <PricingCard
                card={section.cards[0]}
                recommended={section.cards[0].isPopular}
                zaloBaseUrl={store.legacySite.zalo}
              />
            ) : null}
          </div>
        </div>
      ) : (
        <p className="text-sm text-slate-500">Chọn section gói cước để chỉnh sửa.</p>
      )}

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
