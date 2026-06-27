"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import {
  AdminError,
  AdminField,
  AdminLoading,
  AdminToast,
  SaveBar,
  inputClass,
} from "@/components/admin/cms/ui";
import { useCmsStore } from "@/components/admin/cms/useCmsStore";
import type { HomepageBannerSlide } from "@/lib/cms-store/types";
import { cmsId } from "@/lib/cms-store/id";
import {
  listPackagePickerOptions,
  resolveHomepageBannerEntries,
} from "@/lib/packages/helpers";

function bannerPickerValue(banner: HomepageBannerSlide): string {
  return `${banner.sectionId}::${banner.cardId}`;
}

function parseBannerPickerValue(value: string): {
  sectionId: string;
  cardId: string;
} | null {
  const [sectionId, cardId] = value.split("::");
  if (!sectionId || !cardId) return null;
  return { sectionId, cardId };
}

export default function AdminHomepagePage() {
  const { store, loading, error, toast, saving, save, patch } = useCmsStore();
  const [dirty, setDirty] = useState(false);
  const [uploadingId, setUploadingId] = useState<string | null>(null);

  const packageOptions = useMemo(
    () => (store ? listPackagePickerOptions(store.sections) : []),
    [store],
  );

  if (loading || !store) {
    return (
      <AdminShell title="Trang chủ & Banner" subtitle="Quản lý banner carousel">
        {loading ? <AdminLoading /> : <AdminError message={error} />}
      </AdminShell>
    );
  }

  const banners = store.homepageBanners ?? [];
  const previewEntries = resolveHomepageBannerEntries(
    store.sections,
    banners,
  );

  function updateBanners(fn: (items: HomepageBannerSlide[]) => HomepageBannerSlide[]) {
    patch((prev) => ({
      ...prev,
      homepageBanners: fn(prev.homepageBanners ?? []),
    }));
    setDirty(true);
  }

  function addBannerRow() {
    const first = packageOptions[0];
    updateBanners((items) => [
      ...items,
      {
        id: cmsId("banner"),
        cardId: first?.cardId ?? "",
        sectionId: first?.sectionId ?? "",
        imageUrl: "",
        sortOrder: items.length + 1,
      },
    ]);
  }

  function removeBanner(id: string) {
    updateBanners((items) => items.filter((b) => b.id !== id));
  }

  function updateBanner(
    id: string,
    patchBanner: Partial<HomepageBannerSlide>,
  ) {
    updateBanners((items) =>
      items.map((b) => (b.id === id ? { ...b, ...patchBanner } : b)),
    );
  }

  async function uploadBannerImage(bannerId: string, file: File) {
    setUploadingId(bannerId);
    try {
      const body = new FormData();
      body.append("file", file);
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body,
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(data?.error ?? "Upload thất bại");
      }
      const data = (await res.json()) as { url: string };
      updateBanner(bannerId, { imageUrl: data.url });
    } catch (e) {
      alert(e instanceof Error ? e.message : "Upload thất bại");
    } finally {
      setUploadingId(null);
    }
  }

  return (
    <AdminShell
      title="Trang chủ & Banner"
      subtitle="Thêm, sửa, xóa slide banner trang chủ"
    >
      <AdminToast message={toast} />
      <AdminError message={error} />

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Banner trang chủ</h2>
            <p className="mt-1 text-sm text-slate-600">
              Mỗi dòng = một slide. Chọn gói cước (link trang sản phẩm) và ảnh banner.
            </p>
          </div>
          <button
            type="button"
            onClick={addBannerRow}
            className="rounded-lg bg-[#2563eb] px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            + Thêm banner
          </button>
        </div>

        {banners.length === 0 ? (
          <p className="text-sm text-slate-500">Chưa có banner. Bấm &quot;Thêm banner&quot;.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs uppercase text-slate-500">
                  <th className="px-3 py-2">Thứ tự</th>
                  <th className="px-3 py-2">Gói cước (link trang)</th>
                  <th className="px-3 py-2">Ảnh banner</th>
                  <th className="px-3 py-2">Xem trước</th>
                  <th className="px-3 py-2" />
                </tr>
              </thead>
              <tbody>
                {banners.map((banner, index) => {
                  const pickerValue = bannerPickerValue(banner);
                  const option = packageOptions.find(
                    (o) =>
                      o.cardId === banner.cardId &&
                      o.sectionId === banner.sectionId,
                  );
                  return (
                    <tr key={banner.id} className="border-b border-slate-100 align-top">
                      <td className="px-3 py-3">
                        <input
                          type="number"
                          min={1}
                          className={`${inputClass} w-20`}
                          value={banner.sortOrder ?? index + 1}
                          onChange={(e) =>
                            updateBanner(banner.id, {
                              sortOrder: Number(e.target.value) || index + 1,
                            })
                          }
                        />
                      </td>
                      <td className="px-3 py-3 min-w-[240px]">
                        <select
                          className={inputClass}
                          value={pickerValue}
                          onChange={(e) => {
                            const parsed = parseBannerPickerValue(e.target.value);
                            if (!parsed) return;
                            updateBanner(banner.id, parsed);
                          }}
                        >
                          {packageOptions.map((opt) => (
                            <option
                              key={`${opt.sectionId}::${opt.cardId}`}
                              value={`${opt.sectionId}::${opt.cardId}`}
                            >
                              {opt.label}
                            </option>
                          ))}
                        </select>
                        {option ? (
                          <p className="mt-1 text-xs text-slate-500">
                            Link:{" "}
                            <Link
                              href={option.href}
                              className="text-[#2563eb] hover:underline"
                              target="_blank"
                            >
                              {option.href}
                            </Link>
                          </p>
                        ) : null}
                      </td>
                      <td className="px-3 py-3 min-w-[220px]">
                        <AdminField label="URL ảnh (hoặc upload bên dưới)">
                          <input
                            className={inputClass}
                            value={banner.imageUrl}
                            placeholder="/sim-data-u1500-banner.png"
                            onChange={(e) =>
                              updateBanner(banner.id, {
                                imageUrl: e.target.value,
                              })
                            }
                          />
                        </AdminField>
                        <label className="mt-2 flex cursor-pointer flex-col gap-1 text-xs font-medium text-slate-600">
                          <span>Tải ảnh lên</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="text-xs"
                            disabled={uploadingId === banner.id}
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) void uploadBannerImage(banner.id, file);
                            }}
                          />
                          {uploadingId === banner.id ? (
                            <span className="text-[#2563eb]">Đang tải…</span>
                          ) : null}
                        </label>
                      </td>
                      <td className="px-3 py-3">
                        {banner.imageUrl ? (
                          <div className="relative h-16 w-28 overflow-hidden rounded-lg border border-slate-200">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={banner.imageUrl}
                              alt="Xem trước banner"
                              className="h-full w-full object-cover"
                            />
                          </div>
                        ) : (
                          <span className="text-xs text-slate-400">Chưa có ảnh</span>
                        )}
                      </td>
                      <td className="px-3 py-3">
                        <button
                          type="button"
                          onClick={() => removeBanner(banner.id)}
                          className="text-sm font-medium text-red-600 hover:underline"
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {previewEntries.length > 0 ? (
        <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">Thứ tự hiển thị</h2>
          <ol className="mt-3 space-y-2 text-sm">
            {previewEntries.map((entry, i) => (
              <li
                key={entry.bannerId}
                className="rounded-lg border border-slate-100 bg-slate-50 px-4 py-2"
              >
                {i + 1}. {entry.card.title} →{" "}
                <Link href={entry.href} className="text-[#2563eb] hover:underline">
                  {entry.href}
                </Link>
              </li>
            ))}
          </ol>
        </div>
      ) : null}

      <SaveBar
        saving={saving}
        dirty={dirty}
        onSave={() => {
          save(store);
          setDirty(false);
        }}
      />
    </AdminShell>
  );
}
