"use client";

import { useMemo, useState } from "react";
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
import type { Service } from "@/lib/content/types";

export default function AdminServicesPage() {
  const { store, loading, error, toast, saving, save, patch } = useCmsStore();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [dirty, setDirty] = useState(false);

  const selected = useMemo(
    () => store?.services.find((s) => s.id === selectedId),
    [store, selectedId],
  );

  if (loading || !store) {
    return (
      <AdminShell title="Services" subtitle="Quản lý trang dịch vụ">
        {loading ? <AdminLoading /> : <AdminError message={error} />}
      </AdminShell>
    );
  }

  function updateService(id: string, patchFn: (s: Service) => Service) {
    patch((prev) => ({
      ...prev,
      services: prev.services.map((s) => (s.id === id ? patchFn(s) : s)),
    }));
    setDirty(true);
  }

  return (
    <AdminShell title="Services" subtitle="CRUD trang dịch vụ">
      <AdminToast message={toast} />
      <AdminError message={error} />

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <div className="space-y-2 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
          {store.services
            .sort((a, b) => a.order - b.order)
            .map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSelectedId(s.id)}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm ${
                  selectedId === s.id
                    ? "bg-[#2563eb]/10 text-[#2563eb]"
                    : "hover:bg-slate-50"
                }`}
              >
                <span className="font-semibold">{s.title}</span>
                <StatusBadge status={s.isActive ? "active" : "inactive"} />
              </button>
            ))}
        </div>

        {selected ? (
          <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs text-slate-500">
              Preview:{" "}
              <a
                href={`/${selected.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#2563eb] hover:underline"
              >
                /{selected.slug}
              </a>
            </p>
            <AdminField label="Title">
              <input
                className={inputClass}
                value={selected.title}
                onChange={(e) =>
                  updateService(selected.id, (s) => ({ ...s, title: e.target.value }))
                }
              />
            </AdminField>
            <AdminField label="Slug">
              <input className={inputClass} value={selected.slug} readOnly />
            </AdminField>
            <AdminField label="Short description">
              <textarea
                className={textareaClass}
                rows={2}
                value={selected.shortDescription}
                onChange={(e) =>
                  updateService(selected.id, (s) => ({
                    ...s,
                    shortDescription: e.target.value,
                  }))
                }
              />
            </AdminField>
            <AdminField label="SEO title">
              <input
                className={inputClass}
                value={selected.seoTitle}
                onChange={(e) =>
                  updateService(selected.id, (s) => ({ ...s, seoTitle: e.target.value }))
                }
              />
            </AdminField>
            <AdminField label="SEO description">
              <textarea
                className={textareaClass}
                rows={2}
                value={selected.seoDescription}
                onChange={(e) =>
                  updateService(selected.id, (s) => ({
                    ...s,
                    seoDescription: e.target.value,
                  }))
                }
              />
            </AdminField>
            <AdminField label="Long content (HTML)">
              <textarea
                className={textareaClass}
                rows={12}
                value={selected.longContent}
                onChange={(e) =>
                  updateService(selected.id, (s) => ({
                    ...s,
                    longContent: e.target.value,
                  }))
                }
              />
            </AdminField>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={selected.isActive}
                onChange={(e) =>
                  updateService(selected.id, (s) => ({
                    ...s,
                    isActive: e.target.checked,
                  }))
                }
              />
              Active
            </label>
          </div>
        ) : (
          <p className="text-sm text-slate-500">Chọn dịch vụ để chỉnh sửa.</p>
        )}
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
