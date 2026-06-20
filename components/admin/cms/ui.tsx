"use client";

import type { ReactNode } from "react";

export function AdminLoading() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-500">
      Đang tải...
    </div>
  );
}

export function AdminToast({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <div className="fixed bottom-6 right-6 z-50 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-lg">
      {message}
    </div>
  );
}

export function AdminError({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
      {message}
    </div>
  );
}

export function StatusBadge({
  status,
}: {
  status: "published" | "draft" | "active" | "inactive" | string;
}) {
  const styles: Record<string, string> = {
    published: "bg-emerald-100 text-emerald-800",
    draft: "bg-amber-100 text-amber-800",
    active: "bg-blue-100 text-blue-800",
    inactive: "bg-slate-100 text-slate-600",
    new: "bg-sky-100 text-sky-800",
    contacted: "bg-indigo-100 text-indigo-800",
    converted: "bg-emerald-100 text-emerald-800",
    lost: "bg-red-100 text-red-700",
  };
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${styles[status] ?? "bg-slate-100 text-slate-600"}`}
    >
      {status}
    </span>
  );
}

export function AdminField({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-semibold text-slate-700">
        {label}
      </span>
      {children}
    </label>
  );
}

export const inputClass =
  "w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-blue-100";

export const selectClass = inputClass;

export const textareaClass =
  "w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-blue-100 font-mono";

export function SaveBar({
  saving,
  onSave,
  dirty,
}: {
  saving: boolean;
  onSave: () => void;
  dirty?: boolean;
}) {
  return (
    <div className="sticky bottom-0 mt-6 flex justify-end gap-3 border-t border-slate-200 bg-white/95 py-4 backdrop-blur">
      <button
        type="button"
        disabled={saving || !dirty}
        onClick={onSave}
        className="rounded-lg bg-[#2563eb] px-5 py-2.5 text-sm font-bold text-white disabled:opacity-50"
      >
        {saving ? "Đang lưu..." : "Lưu thay đổi"}
      </button>
    </div>
  );
}
