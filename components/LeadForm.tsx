"use client";

import { useState } from "react";
import { useCms } from "@/components/cms/CmsProvider";
import { contactFromSite } from "@/lib/data";
import { trackLeadEvent } from "@/lib/tracking";

const needOptions = [
  "WiFi",
  "SIM 5G",
  "Camera",
  "Internet + Di động",
  "Chưa rõ",
] as const;

type LeadFormProps = {
  defaultNeed?: string;
  className?: string;
};

export default function LeadForm({
  defaultNeed = "Chưa rõ",
  className = "",
}: LeadFormProps) {
  const { cms } = useCms();
  const contact = contactFromSite(cms.site);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [need, setNeed] = useState(defaultNeed);
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const payload = { name, phone, address, need, note, at: new Date().toISOString() };

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          address,
          needType: need,
          note,
          sourcePage: typeof window !== "undefined" ? window.location.pathname : "/",
        }),
      });
      if (!res.ok) throw new Error("Lead API failed");
      console.info("[LeadForm]", payload);
      trackLeadEvent("landing_cta_click", {
        label: "Lead form submit",
        destination: need,
      });
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    const zaloPrefill = contact.zalo
      ? `${contact.zalo}?text=${encodeURIComponent(
          `Xin chào, tôi vừa gửi form tư vấn.\nHọ tên: ${name}\nSĐT: ${phone}\nĐịa chỉ: ${address}\nNhu cầu: ${need}${note ? `\nGhi chú: ${note}` : ""}`,
        )}`
      : "";

    return (
      <div
        className={`rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center ${className}`}
      >
        <p className="text-lg font-bold text-emerald-800">
          Đã gửi thông tin thành công!
        </p>
        <p className="mt-2 text-sm text-emerald-700">
          Tôi sẽ liên hệ lại sớm. Bạn cũng có thể nhắn Zalo ngay để được phản hồi nhanh hơn.
        </p>
        {zaloPrefill ? (
          <a
            href={zaloPrefill}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex rounded-full bg-[#2563eb] px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-700"
          >
            Nhắn Zalo ngay
          </a>
        ) : null}
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 ${className}`}
    >
      <div>
        <label htmlFor="lead-name" className="mb-1 block text-sm font-semibold text-slate-700">
          Họ tên
        </label>
        <input
          id="lead-name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-blue-100"
          placeholder="Nguyễn Văn A"
        />
      </div>
      <div>
        <label htmlFor="lead-phone" className="mb-1 block text-sm font-semibold text-slate-700">
          Số điện thoại
        </label>
        <input
          id="lead-phone"
          required
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-blue-100"
          placeholder="09xx xxx xxx"
        />
      </div>
      <div>
        <label htmlFor="lead-address" className="mb-1 block text-sm font-semibold text-slate-700">
          Địa chỉ lắp đặt
        </label>
        <input
          id="lead-address"
          required
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-blue-100"
          placeholder="Quận 12, TP.HCM"
        />
      </div>
      <div>
        <label htmlFor="lead-need" className="mb-1 block text-sm font-semibold text-slate-700">
          Nhu cầu
        </label>
        <select
          id="lead-need"
          value={need}
          onChange={(e) => setNeed(e.target.value)}
          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-blue-100"
        >
          {needOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="lead-note" className="mb-1 block text-sm font-semibold text-slate-700">
          Ghi chú
        </label>
        <textarea
          id="lead-note"
          rows={3}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-blue-100"
          placeholder="Số thiết bị, mục đích sử dụng..."
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-[#2563eb] px-6 py-3.5 text-sm font-bold text-white shadow-sm hover:bg-blue-700 disabled:opacity-60"
      >
        {loading ? "Đang gửi..." : "Gửi thông tin tư vấn"}
      </button>
    </form>
  );
}
