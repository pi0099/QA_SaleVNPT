"use client";

import { useState } from "react";
import type { ServiceFaq } from "@/lib/content/types";

type FaqAccordionProps = {
  items: ServiceFaq[];
  /** Show "Mở tất cả" control */
  allowExpandAll?: boolean;
};

export default function FaqAccordion({
  items,
  allowExpandAll = true,
}: FaqAccordionProps) {
  const [openSet, setOpenSet] = useState<Set<number>>(() => new Set([0]));

  const allOpen = openSet.size === items.length;

  const toggle = (index: number) => {
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const toggleAll = () => {
    if (allOpen) {
      setOpenSet(new Set());
    } else {
      setOpenSet(new Set(items.map((_, i) => i)));
    }
  };

  return (
    <div>
      {allowExpandAll && items.length > 1 ? (
        <div className="mb-4 flex justify-end">
          <button
            type="button"
            onClick={toggleAll}
            className="text-sm font-semibold text-[#2563eb] hover:underline"
          >
            {allOpen ? "Thu gọn tất cả" : "Mở tất cả"}
          </button>
        </div>
      ) : null}
      <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white shadow-sm">
        {items.map((item, index) => {
          const open = openSet.has(index);
          return (
            <div key={item.question}>
              <button
                type="button"
                onClick={() => toggle(index)}
                className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-slate-50/80"
                aria-expanded={open}
              >
                <span className="font-semibold text-slate-900">{item.question}</span>
                <span
                  className={`mt-0.5 shrink-0 text-[#2563eb] transition-transform ${open ? "rotate-180" : ""}`}
                  aria-hidden
                >
                  ▼
                </span>
              </button>
              {open ? (
                <div className="border-t border-slate-100 px-5 pb-4 pt-1">
                  <p className="text-sm leading-relaxed text-slate-600">{item.answer}</p>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
