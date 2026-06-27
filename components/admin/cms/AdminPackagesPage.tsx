"use client";

import { useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import HomeProductSection from "@/components/HomeProductSection";
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
import type { HomepageTier, PackageCard, PackageSection } from "@/lib/data";
import {
  HOMEPAGE_TIER_ORDER,
  TIER_LABELS,
  setSectionHomepageTier,
} from "@/lib/packages/helpers";

export default function AdminPackagesPage() {
  const { store, loading, error, toast, saving, save, patch } = useCmsStore();
  const [sectionId, setSectionId] = useState<string | null>(null);
  const [dirty, setDirty] = useState(false);

  const section = store?.sections.find((s) => s.id === sectionId);

  if (loading || !store) {
    return (
      <AdminShell title="Gói cước" subtitle="Quản lý gói cước">
        {loading ? <AdminLoading /> : <AdminError message={error} />}
      </AdminShell>
    );
  }

  function updateSections(fn: (sections: PackageSection[]) => PackageSection[]) {
    patch((prev) => ({ ...prev, sections: fn(prev.sections) }));
    setDirty(true);
  }

  function updateSection(fn: (s: PackageSection) => PackageSection) {
    if (!sectionId) return;
    updateSections((sections) =>
      sections.map((s) => (s.id === sectionId ? fn(s) : s)),
    );
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
    const copy = {
      ...card,
      id: createCardId(),
      title: `${card.title} (bản sao)`,
      homepageTier: undefined,
    };
    updateSections((sections) =>
      sections.map((s) =>
        s.id === sectionId ? { ...s, cards: [...s.cards, copy] } : s,
      ),
    );
  }

  function getTierCardId(tier: HomepageTier): string {
    return section?.cards.find((c) => c.homepageTier === tier)?.id ?? "";
  }

  function handleTierChange(tier: HomepageTier, cardId: string) {
    updateSection((s) => setSectionHomepageTier(s, tier, cardId));
  }

  const tierWarnings = section
    ? HOMEPAGE_TIER_ORDER.filter(
        (tier) => !section.cards.some((c) => c.homepageTier === tier),
      )
    : [];

  return (
    <AdminShell title="Gói cước" subtitle="Quản lý gói cước theo từng nhóm sản phẩm">
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
        <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
          <div className="space-y-4">
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="mb-3 text-sm font-bold text-slate-800">Cài đặt nhóm gói</p>
              <div className="grid gap-3 md:grid-cols-2">
                <AdminField label="Chế độ giá">
                  <select
                    className={inputClass}
                    value={section.pricingMode ?? "dual"}
                    onChange={(e) =>
                      updateSection((s) => ({
                        ...s,
                        pricingMode: e.target.value as "dual" | "single",
                      }))
                    }
                  >
                    <option value="dual">Tab Nội/Ngoại thành</option>
                    <option value="single">Giá đồng nhất (ẩn tab)</option>
                  </select>
                </AdminField>
                <AdminField label="Slug trang sản phẩm">
                  <input
                    className={inputClass}
                    value={section.serviceSlug ?? ""}
                    onChange={(e) =>
                      updateSection((s) => ({
                        ...s,
                        serviceSlug: e.target.value || undefined,
                      }))
                    }
                    placeholder="wifi-vnpt"
                  />
                </AdminField>
              </div>
              <AdminField label="Mô tả SEO trên trang chủ">
                <textarea
                  className={textareaClass}
                  rows={3}
                  value={section.homepageIntro ?? ""}
                  onChange={(e) =>
                    updateSection((s) => ({
                      ...s,
                      homepageIntro: e.target.value || undefined,
                    }))
                  }
                />
              </AdminField>
            </div>

            <div className="rounded-xl border border-sky-200 bg-sky-50 p-4 shadow-sm">
              <p className="text-sm font-bold text-slate-900">
                Gói hiển thị trên Trang chủ
              </p>
              <p className="mt-1 text-xs text-slate-600">
                Chọn 3 gói đại diện cho section này trên trang chủ (mỗi tier một gói).
              </p>
              <div className="mt-4 grid gap-3 md:grid-cols-3">
                {HOMEPAGE_TIER_ORDER.map((tier) => (
                  <AdminField key={tier} label={TIER_LABELS[tier]}>
                    <select
                      className={inputClass}
                      value={getTierCardId(tier)}
                      onChange={(e) => handleTierChange(tier, e.target.value)}
                    >
                      <option value="">— Chưa chọn —</option>
                      {section.cards.map((card) => (
                        <option key={card.id} value={card.id}>
                          {card.title}
                        </option>
                      ))}
                    </select>
                  </AdminField>
                ))}
              </div>
              {tierWarnings.length > 0 ? (
                <p className="mt-3 text-sm text-amber-700">
                  Chưa chọn: {tierWarnings.map((t) => TIER_LABELS[t]).join(", ")}
                </p>
              ) : null}
            </div>

            {section.cards.map((card) => (
              <div
                key={card.id}
                className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <p className="mb-3 text-sm font-bold text-slate-800">
                  Chi tiết gói: {card.title}
                </p>
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
                  <AdminField label="Tốc độ / Dung lượng">
                    <input
                      className={inputClass}
                      value={card.speed}
                      onChange={(e) =>
                        updateCard(card.id, (c) => ({ ...c, speed: e.target.value }))
                      }
                    />
                  </AdminField>
                  <AdminField label="Thứ tự trên trang sản phẩm">
                    <input
                      type="number"
                      className={inputClass}
                      value={card.sortOrder ?? ""}
                      onChange={(e) =>
                        updateCard(card.id, (c) => ({
                          ...c,
                          sortOrder: e.target.value
                            ? Number(e.target.value)
                            : undefined,
                        }))
                      }
                    />
                  </AdminField>
                  <AdminField label="Màu thẻ">
                    <select
                      className={inputClass}
                      value={card.variant}
                      onChange={(e) =>
                        updateCard(card.id, (c) => ({
                          ...c,
                          variant: e.target.value as "blue" | "orange",
                        }))
                      }
                    >
                      <option value="blue">Xanh</option>
                      <option value="orange">Cam</option>
                    </select>
                  </AdminField>
                </div>
                <AdminField label="Tính năng (mỗi dòng một mục)">
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
                <AdminField label="Khuyến mãi / Ghi chú">
                  <input
                    className={inputClass}
                    value={card.promotion}
                    onChange={(e) =>
                      updateCard(card.id, (c) => ({
                        ...c,
                        promotion: e.target.value,
                      }))
                    }
                  />
                </AdminField>
                <button
                  type="button"
                  onClick={() => duplicateCard(card)}
                  className="mt-2 text-sm text-[#2563eb]"
                >
                  Nhân bản gói
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addCard}
              className="rounded-lg border border-dashed border-slate-300 px-4 py-3 text-sm font-semibold text-slate-600"
            >
              + Thêm gói trong nhóm này
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <p className="mb-3 text-sm font-bold text-slate-700">
                Xem trước 3 thẻ trang chủ
              </p>
              <HomeProductSection
                section={section}
                zaloBaseUrl={store.legacySite.zalo}
              />
            </div>
            {section.cards[0] ? (
              <div>
                <p className="mb-3 text-sm font-bold text-slate-700">Xem trước thẻ</p>
                <PricingCard
                  card={section.cards[0]}
                  zaloBaseUrl={store.legacySite.zalo}
                  showTierBadge
                />
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        <p className="text-sm text-slate-500">Chọn nhóm gói cước để chỉnh sửa.</p>
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
