"use client";

import { useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import {
  AdminError,
  AdminLoading,
  AdminToast,
  SaveBar,
  StatusBadge,
  inputClass,
} from "@/components/admin/cms/ui";
import { useCmsStore } from "@/components/admin/cms/useCmsStore";
import type { LeadStatus } from "@/lib/cms-store/types";

export default function AdminLeadsPage() {
  const { store, loading, error, toast, saving, save, patch } = useCmsStore();
  const [dirty, setDirty] = useState(false);
  const [filter, setFilter] = useState("all");

  if (loading || !store) {
    return (
      <AdminShell title="Leads" subtitle="Quản lý form đăng ký">
        {loading ? <AdminLoading /> : <AdminError message={error} />}
      </AdminShell>
    );
  }

  const leads = store.leads.filter(
    (l) => filter === "all" || l.status === filter,
  );

  function updateLead(id: string, status: LeadStatus, adminNote?: string) {
    patch((prev) => ({
      ...prev,
      leads: prev.leads.map((l) =>
        l.id === id
          ? { ...l, status, adminNote: adminNote ?? l.adminNote }
          : l,
      ),
    }));
    setDirty(true);
  }

  function exportCsv() {
    if (!store) return;
    const header = "name,phone,address,need,note,source,status,createdAt\n";
    const rows = store.leads
      .map(
        (l) =>
          `"${l.name}","${l.phone}","${l.address}","${l.needType}","${l.note}","${l.sourcePage}","${l.status}","${l.createdAt}"`,
      )
      .join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "leads.csv";
    a.click();
  }

  return (
    <AdminShell title="Leads" subtitle="Form đăng ký tư vấn">
      <AdminToast message={toast} />
      <AdminError message={error} />

      <div className="mb-4 flex flex-wrap gap-3">
        <select
          className={inputClass + " max-w-[180px]"}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">Tất cả</option>
          <option value="new">new</option>
          <option value="contacted">contacted</option>
          <option value="converted">converted</option>
          <option value="lost">lost</option>
        </select>
        <button
          type="button"
          onClick={exportCsv}
          className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold"
        >
          Export CSV
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3">Khách</th>
              <th className="px-4 py-3">Nhu cầu</th>
              <th className="px-4 py-3">Nguồn</th>
              <th className="px-4 py-3">Trạng thái</th>
              <th className="px-4 py-3">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {leads.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-slate-500">
                  Chưa có lead
                </td>
              </tr>
            ) : (
              leads.map((l) => (
                <tr key={l.id} className="border-t border-slate-100">
                  <td className="px-4 py-3">
                    <p className="font-semibold">{l.name}</p>
                    <p>{l.phone}</p>
                    <p className="text-xs text-slate-500">{l.address}</p>
                  </td>
                  <td className="px-4 py-3">{l.needType}</td>
                  <td className="px-4 py-3">{l.sourcePage}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={l.status} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      <a
                        href={`tel:${l.phone.replace(/\D/g, "")}`}
                        className="text-[#2563eb] hover:underline"
                      >
                        Gọi
                      </a>
                      <button
                        type="button"
                        onClick={() => updateLead(l.id, "contacted")}
                        className="text-xs font-semibold text-slate-600"
                      >
                        Contacted
                      </button>
                      <button
                        type="button"
                        onClick={() => updateLead(l.id, "converted")}
                        className="text-xs font-semibold text-emerald-700"
                      >
                        Converted
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
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
