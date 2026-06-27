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
import {
  defaultCopyrightText,
  defaultDesignByText,
  defaultDesignByUrl,
  defaultFooterColumns,
  defaultHeaderSlogan,
} from "@/lib/cms-store/footer-defaults";
import type { FooterColumn } from "@/lib/cms-store/types";

export default function AdminSiteSettingsPage() {
  const { store, loading, error, toast, saving, save, patch } = useCmsStore();
  const [dirty, setDirty] = useState(false);

  if (loading || !store) {
    return (
      <AdminShell title="Cài đặt website" subtitle="Thông tin liên hệ, header & footer">
        {loading ? <AdminLoading /> : <AdminError message={error} />}
      </AdminShell>
    );
  }

  const s = store.siteSettings;

  function updateSettings(field: keyof typeof s, value: string) {
    patch((prev) => ({
      ...prev,
      siteSettings: { ...prev.siteSettings, [field]: value },
    }));
    setDirty(true);
  }

  function updateFooterColumns(columns: FooterColumn[]) {
    patch((prev) => ({
      ...prev,
      siteSettings: { ...prev.siteSettings, footerColumns: columns },
    }));
    setDirty(true);
  }

  const footerColumns = s.footerColumns ?? defaultFooterColumns;

  function handleSave() {
    if (!store) return;
    save(store);
    setDirty(false);
  }

  return (
    <AdminShell title="Cài đặt website" subtitle="Cài đặt website và liên hệ">
      <AdminToast message={toast} />
      <AdminError message={error} />

      <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid gap-4 md:grid-cols-2">
          <AdminField label="Site name *">
            <input
              className={inputClass}
              value={s.siteName}
              onChange={(e) => updateSettings("siteName", e.target.value)}
              required
            />
          </AdminField>
          <AdminField label="Consultant name">
            <input
              className={inputClass}
              value={s.consultantName}
              onChange={(e) => updateSettings("consultantName", e.target.value)}
            />
          </AdminField>
          <AdminField label="Phone *">
            <input
              className={inputClass}
              value={s.phone}
              onChange={(e) => updateSettings("phone", e.target.value)}
              required
            />
          </AdminField>
          <AdminField label="Zalo URL">
            <input
              className={inputClass}
              value={s.zaloUrl}
              onChange={(e) => updateSettings("zaloUrl", e.target.value)}
              placeholder="https://zalo.me/..."
            />
          </AdminField>
          <AdminField label="Messenger URL">
            <input
              className={inputClass}
              value={s.messengerUrl}
              onChange={(e) => updateSettings("messengerUrl", e.target.value)}
            />
          </AdminField>
          <AdminField label="Email">
            <input
              className={inputClass}
              value={s.email ?? ""}
              onChange={(e) => updateSettings("email", e.target.value)}
            />
          </AdminField>
        </div>

        <AdminField label="Tagline">
          <textarea
            className={textareaClass}
            rows={2}
            value={s.tagline}
            onChange={(e) => updateSettings("tagline", e.target.value)}
          />
        </AdminField>
        <AdminField label="Service area text">
          <input
            className={inputClass}
            value={s.serviceAreaText}
            onChange={(e) => updateSettings("serviceAreaText", e.target.value)}
          />
        </AdminField>
        <AdminField label="Address">
          <input
            className={inputClass}
            value={s.addressText ?? ""}
            onChange={(e) => updateSettings("addressText", e.target.value)}
          />
        </AdminField>
        <AdminField label="Disclaimer">
          <textarea
            className={textareaClass}
            rows={2}
            value={s.disclaimer}
            onChange={(e) => updateSettings("disclaimer", e.target.value)}
          />
        </AdminField>
        <AdminField label="Primary CTA text">
          <input
            className={inputClass}
            value={s.primaryCtaText}
            onChange={(e) => updateSettings("primaryCtaText", e.target.value)}
          />
        </AdminField>
        <AdminField label="Secondary CTA text">
          <input
            className={inputClass}
            value={s.secondaryCtaText}
            onChange={(e) => updateSettings("secondaryCtaText", e.target.value)}
          />
        </AdminField>
        <AdminField label="Footer content">
          <textarea
            className={textareaClass}
            rows={2}
            value={s.footerContent}
            onChange={(e) => updateSettings("footerContent", e.target.value)}
          />
        </AdminField>

        <div className="border-t border-slate-100 pt-4">
          <p className="mb-3 text-sm font-bold text-slate-800">Header & Footer SEO</p>
          <AdminField label="Header slogan">
            <input
              className={inputClass}
              value={s.headerSlogan ?? defaultHeaderSlogan}
              onChange={(e) => updateSettings("headerSlogan", e.target.value)}
            />
          </AdminField>
          <AdminField label="Copyright text">
            <input
              className={inputClass}
              value={s.copyrightText ?? defaultCopyrightText}
              onChange={(e) => updateSettings("copyrightText", e.target.value)}
            />
          </AdminField>
          <div className="grid gap-4 md:grid-cols-2">
            <AdminField label="Design By text">
              <input
                className={inputClass}
                value={s.designByText ?? defaultDesignByText}
                onChange={(e) => updateSettings("designByText", e.target.value)}
              />
            </AdminField>
            <AdminField label="Design By URL">
              <input
                className={inputClass}
                value={s.designByUrl ?? defaultDesignByUrl}
                onChange={(e) => updateSettings("designByUrl", e.target.value)}
              />
            </AdminField>
          </div>
          <AdminField label="Footer columns (JSON)">
            <textarea
              className={textareaClass}
              rows={8}
              value={JSON.stringify(footerColumns, null, 2)}
              onChange={(e) => {
                try {
                  const parsed = JSON.parse(e.target.value) as FooterColumn[];
                  updateFooterColumns(parsed);
                } catch {
                  // ignore invalid JSON while typing
                }
              }}
            />
          </AdminField>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <AdminField label="Google Analytics ID">
            <input
              className={inputClass}
              value={s.googleAnalyticsId ?? ""}
              onChange={(e) => updateSettings("googleAnalyticsId", e.target.value)}
            />
          </AdminField>
          <AdminField label="Facebook Pixel ID">
            <input
              className={inputClass}
              value={s.facebookPixelId ?? ""}
              onChange={(e) => updateSettings("facebookPixelId", e.target.value)}
            />
          </AdminField>
          <AdminField label="GSC verification">
            <input
              className={inputClass}
              value={s.googleSiteVerification ?? ""}
              onChange={(e) =>
                updateSettings("googleSiteVerification", e.target.value)
              }
            />
          </AdminField>
        </div>
      </div>

      <SaveBar saving={saving} dirty={dirty} onSave={handleSave} />
    </AdminShell>
  );
}
