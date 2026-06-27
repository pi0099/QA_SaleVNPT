"use client";

import { useCallback, useEffect, useState } from "react";
import type { CmsStore } from "@/lib/cms-store/types";
import { notifyCmsUpdated } from "@/components/cms/CmsProvider";

export function useCmsStore() {
  const [store, setStore] = useState<CmsStore | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/store", { cache: "no-store" });
      if (!res.ok) throw new Error("Không tải được dữ liệu CMS");
      const data = (await res.json()) as CmsStore;
      setStore(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Lỗi tải CMS");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const save = useCallback(
    async (next: CmsStore) => {
      setSaving(true);
      setError(null);
      try {
        const res = await fetch("/api/admin/store", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(next),
        });
        const data = (await res.json().catch(() => null)) as
          | { error?: string; store?: CmsStore }
          | null;
        if (!res.ok) {
          throw new Error(data?.error ?? "Lưu thất bại");
        }
        setStore(data?.store ?? next);
        notifyCmsUpdated();
        setToast("Đã lưu thành công");
        setTimeout(() => setToast(null), 3000);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Lỗi lưu");
      } finally {
        setSaving(false);
      }
    },
    [],
  );

  const update = useCallback(
    (updater: (s: CmsStore) => CmsStore) => {
      if (!store) return;
      void save(updater(store));
    },
    [store, save],
  );

  const patch = useCallback(
    (updater: (s: CmsStore) => CmsStore) => {
      if (!store) return;
      setStore(updater(store));
    },
    [store],
  );

  return {
    store,
    setStore,
    loading,
    saving,
    error,
    toast,
    load,
    save,
    update,
    patch,
  };
}
