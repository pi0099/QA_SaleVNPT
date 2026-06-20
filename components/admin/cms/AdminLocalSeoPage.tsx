"use client";

import { useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import {
  AdminError,
  AdminField,
  AdminLoading,
  AdminToast,
  SaveBar,
  StatusBadge,
  inputClass,
  textareaClass,
} from "@/components/admin/cms/ui";
import { useCmsStore } from "@/components/admin/cms/useCmsStore";
import type { LocalArea } from "@/lib/content/types";

export default function AdminLocalSeoPage() {
  const { store, loading, error, toast, saving, save, patch } = useCmsStore();
  const [dirty, setDirty] = useState(false);

  if (loading || !store) {
    return (
      <AdminShell title="Local SEO" subtitle="Khu vực phục vụ">
        {loading ? <AdminLoading /> : <AdminError message={error} />}
      </AdminShell>
    );
  }

  function updateArea(id: string, fn: (a: LocalArea) => LocalArea) {
    patch((prev) => ({
      ...prev,
      localAreas: prev.localAreas.map((a) => (a.id === id ? fn(a) : a)),
    }));
    setDirty(true);
  }

  return (
    <AdminShell
      title="Local SEO Areas"
      subtitle="Chỉ bật dedicated page khi có nội dung riêng"
    >
      <AdminToast message={toast} />
      <AdminError message={error} />

      <div className="space-y-4">
        {store.localAreas.map((area) => (
          <div
            key={area.id}
            className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-bold text-slate-900">{area.name}</h3>
              <div className="flex gap-2">
                <StatusBadge status={area.isActive ? "active" : "inactive"} />
                {area.hasDedicatedPage ? (
                  <a
                    href={`/${area.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-[#2563eb]"
                  >
                    /{area.slug}
                  </a>
                ) : (
                  <span className="text-xs text-slate-500">Text only</span>
                )}
              </div>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <AdminField label="Area name">
                <input
                  className={inputClass}
                  value={area.name}
                  onChange={(e) =>
                    updateArea(area.id, (a) => ({ ...a, name: e.target.value }))
                  }
                />
              </AdminField>
              <AdminField label="Slug">
                <input className={inputClass} value={area.slug} readOnly />
              </AdminField>
            </div>
            <label className="mt-3 flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={area.hasDedicatedPage}
                onChange={(e) =>
                  updateArea(area.id, (a) => ({
                    ...a,
                    hasDedicatedPage: e.target.checked,
                  }))
                }
              />
              Has dedicated page
            </label>
            {area.hasDedicatedPage ? (
              <>
                <AdminField label="SEO title">
                  <input
                    className={inputClass}
                    value={area.seoTitle}
                    onChange={(e) =>
                      updateArea(area.id, (a) => ({
                        ...a,
                        seoTitle: e.target.value,
                      }))
                    }
                  />
                </AdminField>
                <AdminField label="Content (HTML)">
                  <textarea
                    className={textareaClass}
                    rows={6}
                    value={area.content}
                    onChange={(e) =>
                      updateArea(area.id, (a) => ({
                        ...a,
                        content: e.target.value,
                      }))
                    }
                  />
                </AdminField>
              </>
            ) : null}
            <label className="mt-2 flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={area.isActive}
                onChange={(e) =>
                  updateArea(area.id, (a) => ({ ...a, isActive: e.target.checked }))
                }
              />
              Active (listed in footer text)
            </label>
          </div>
        ))}
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
