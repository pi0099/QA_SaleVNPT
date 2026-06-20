"use client";

import { useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
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
import { cmsId } from "@/lib/cms-store/id";
import type { Faq } from "@/lib/content/types";

export default function AdminFaqPage() {
  const { store, loading, error, toast, saving, save, patch } = useCmsStore();
  const [dirty, setDirty] = useState(false);

  if (loading || !store) {
    return (
      <AdminShell title="FAQ" subtitle="Quản lý hỏi đáp">
        {loading ? <AdminLoading /> : <AdminError message={error} />}
      </AdminShell>
    );
  }

  function updateFaq(id: string, fn: (f: Faq) => Faq) {
    patch((prev) => ({
      ...prev,
      faqs: prev.faqs.map((f) => (f.id === id ? fn(f) : f)),
    }));
    setDirty(true);
  }

  function addFaq() {
    if (!store) return;
    const f: Faq = {
      id: cmsId("faq"),
      question: "Câu hỏi mới",
      answer: "Câu trả lời...",
      category: "general",
      order: store.faqs.length + 1,
      isActive: true,
    };
    patch((prev) => ({ ...prev, faqs: [...prev.faqs, f] }));
    setDirty(true);
  }

  function deleteFaq(id: string) {
    if (!confirm("Xóa FAQ?")) return;
    patch((prev) => ({ ...prev, faqs: prev.faqs.filter((f) => f.id !== id) }));
    setDirty(true);
  }

  return (
    <AdminShell title="FAQ" subtitle="CRUD câu hỏi thường gặp">
      <AdminToast message={toast} />
      <AdminError message={error} />

      <button
        type="button"
        onClick={addFaq}
        className="mb-4 rounded-lg bg-[#2563eb] px-4 py-2 text-sm font-bold text-white"
      >
        + Thêm FAQ
      </button>

      <div className="space-y-4">
        {store.faqs
          .sort((a, b) => a.order - b.order)
          .map((f) => (
            <div
              key={f.id}
              className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <AdminField label="Question">
                <input
                  className={inputClass}
                  value={f.question}
                  onChange={(e) =>
                    updateFaq(f.id, (x) => ({ ...x, question: e.target.value }))
                  }
                />
              </AdminField>
              <AdminField label="Answer">
                <textarea
                  className={textareaClass}
                  rows={3}
                  value={f.answer}
                  onChange={(e) =>
                    updateFaq(f.id, (x) => ({ ...x, answer: e.target.value }))
                  }
                />
              </AdminField>
              <div className="mt-2 grid gap-3 md:grid-cols-3">
                <AdminField label="Category">
                  <input
                    className={inputClass}
                    value={f.category}
                    onChange={(e) =>
                      updateFaq(f.id, (x) => ({ ...x, category: e.target.value }))
                    }
                  />
                </AdminField>
                <AdminField label="Service slug (optional)">
                  <input
                    className={inputClass}
                    value={f.serviceSlug ?? ""}
                    onChange={(e) =>
                      updateFaq(f.id, (x) => ({
                        ...x,
                        serviceSlug: e.target.value || undefined,
                      }))
                    }
                  />
                </AdminField>
                <label className="flex items-end gap-2 pb-2 text-sm">
                  <input
                    type="checkbox"
                    checked={f.isActive}
                    onChange={(e) =>
                      updateFaq(f.id, (x) => ({ ...x, isActive: e.target.checked }))
                    }
                  />
                  Active
                </label>
              </div>
              <button
                type="button"
                onClick={() => deleteFaq(f.id)}
                className="mt-2 text-sm text-red-600"
              >
                Xóa
              </button>
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
