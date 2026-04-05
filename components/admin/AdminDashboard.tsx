"use client";

import {
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  notifyCmsUpdated,
  useCms,
} from "@/components/cms/CmsProvider";
import {
  createCardId,
  createSectionId,
  getCmsPayload,
  saveCmsToStorage,
  type CmsPayload,
} from "@/lib/cms-storage";
import type { PackageCard, PackageSection } from "@/lib/data";

const ADMIN_USER = "admin";
const ADMIN_PASS = "123456";

function GripIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden
    >
      <circle cx="6" cy="5" r="1.5" />
      <circle cx="14" cy="5" r="1.5" />
      <circle cx="6" cy="10" r="1.5" />
      <circle cx="14" cy="10" r="1.5" />
      <circle cx="6" cy="15" r="1.5" />
      <circle cx="14" cy="15" r="1.5" />
    </svg>
  );
}

function emptyCard(): PackageCard {
  return {
    id: createCardId(),
    title: "Gói mới",
    price: "0",
    speed: "",
    features: [],
    promotion: "",
    variant: "blue",
  };
}

function emptySection(): PackageSection {
  return {
    id: createSectionId(),
    title: "Mục mới",
    cards: [emptyCard()],
  };
}

function SortableSectionBlock({
  section,
  onChangeSection,
  onDeleteSection,
  onCardDragEnd,
  updateCard,
  addCard,
  deleteCard,
}: {
  section: PackageSection;
  onChangeSection: (s: PackageSection) => void;
  onDeleteSection: () => void;
  onCardDragEnd: (e: DragEndEvent) => void;
  updateCard: (cardId: string, patch: Partial<PackageCard>) => void;
  addCard: () => void;
  deleteCard: (cardId: string) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.92 : 1,
  };

  const cardSensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="mb-6 overflow-hidden rounded-xl border-2 border-gray-300 bg-white shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="border-b border-gray-200 bg-gray-100 p-3">
        <div className="flex flex-wrap items-start gap-3">
          <button
            type="button"
            className="mt-1 shrink-0 cursor-grab rounded-md border border-gray-300 bg-gray-200 p-2 text-gray-600 shadow-sm hover:bg-gray-300 active:cursor-grabbing"
            {...attributes}
            {...listeners}
            aria-label="Kéo để sắp xếp mục"
          >
            <GripIcon className="text-gray-700" />
          </button>
          <div className="min-w-0 flex-1 space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600">
              Tiêu đề mục
            </label>
            <input
              type="text"
              value={section.title}
              onChange={(e) =>
                onChangeSection({ ...section, title: e.target.value })
              }
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-gray-900 shadow-sm outline-none ring-blue-500 focus:ring-2"
            />
            <p className="text-xs text-gray-500">ID định vị: #{section.id}</p>
          </div>
          <button
            type="button"
            onClick={onDeleteSection}
            className="shrink-0 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-100"
          >
            Xóa mục
          </button>
        </div>
      </div>

      <div className="space-y-4 p-6">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-sm font-semibold text-gray-800">Thẻ gói</h3>
          <button
            type="button"
            onClick={addCard}
            className="rounded-lg border border-gray-200 bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-800 hover:bg-gray-200"
          >
            + Thêm thẻ
          </button>
        </div>

        <DndContext
          id={`cards-${section.id}`}
          sensors={cardSensors}
          collisionDetection={closestCenter}
          onDragEnd={onCardDragEnd}
        >
          <SortableContext
            items={section.cards.map((c) => c.id)}
            strategy={verticalListSortingStrategy}
          >
            {section.cards.map((card) => (
              <SortableCardEditor
                key={card.id}
                card={card}
                onChange={(patch) => updateCard(card.id, patch)}
                onDelete={() => deleteCard(card.id)}
              />
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}

function SortableCardEditor({
  card,
  onChange,
  onDelete,
}: {
  card: PackageCard;
  onChange: (patch: Partial<PackageCard>) => void;
  onDelete: () => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: card.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.92 : 1,
  };

  const featuresText = card.features.join("\n");

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="mb-4 rounded-lg border border-gray-300 bg-gray-50 p-4 transition-colors hover:border-blue-400"
    >
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          className="cursor-grab rounded-md border border-gray-300 bg-gray-200 p-2 text-gray-600 shadow-sm hover:bg-gray-300 active:cursor-grabbing"
          {...attributes}
          {...listeners}
          aria-label="Kéo để sắp xếp thẻ"
        >
          <GripIcon className="h-4 w-4 text-gray-700" />
        </button>
        <span className="text-xs font-medium uppercase text-slate-400">
          Thẻ
        </span>
        <button
          type="button"
          onClick={onDelete}
          className="ml-auto rounded border border-red-100 bg-white px-2 py-1 text-xs font-semibold text-red-600 hover:bg-red-50"
        >
          Xóa thẻ
        </button>
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <label className="block sm:col-span-2">
          <span className="text-xs font-medium text-slate-600">Tiêu đề</span>
          <input
            type="text"
            value={card.title}
            onChange={(e) => onChange({ title: e.target.value })}
            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#2563eb]"
          />
        </label>
        <label>
          <span className="text-xs font-medium text-slate-600">Giá (số)</span>
          <input
            type="text"
            value={card.price}
            onChange={(e) => onChange({ price: e.target.value })}
            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#2563eb]"
          />
        </label>
        <label>
          <span className="text-xs font-medium text-slate-600">Tốc độ</span>
          <input
            type="text"
            value={card.speed}
            onChange={(e) => onChange({ speed: e.target.value })}
            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#2563eb]"
            placeholder="VD: 300 Mbps / 300 Mbps"
          />
        </label>
        <label className="sm:col-span-2">
          <span className="text-xs font-medium text-slate-600">Tính năng</span>
          <textarea
            value={featuresText}
            onChange={(e) =>
              onChange({ features: e.target.value.split("\n") })
            }
            placeholder="Nhập mỗi tính năng trên một dòng"
            spellCheck={false}
            className="mt-1 min-h-[120px] w-full resize-y rounded border border-gray-300 bg-white p-2 text-sm outline-none focus:ring-2 focus:ring-[#2563eb]"
          />
        </label>
        <label className="sm:col-span-2">
          <span className="text-xs font-medium text-slate-600">Khuyến mãi</span>
          <input
            type="text"
            value={card.promotion}
            onChange={(e) => onChange({ promotion: e.target.value })}
            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#2563eb]"
          />
        </label>
        <label className="sm:col-span-2">
          <span className="text-xs font-medium text-slate-600">Màu nền tiêu đề</span>
          <select
            value={card.variant}
            onChange={(e) =>
              onChange({
                variant: e.target.value === "orange" ? "orange" : "blue",
              })
            }
            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#2563eb]"
          >
            <option value="blue">Xanh dương</option>
            <option value="orange">Cam</option>
          </select>
        </label>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const { reload } = useCms();
  const [authed, setAuthed] = useState(false);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [tab, setTab] = useState<"sections" | "settings">("sections");
  const [draft, setDraft] = useState<CmsPayload>(() => getCmsPayload());
  const [isSaving, setIsSaving] = useState(false);
  const saveToastIdRef = useRef(0);
  const [saveToast, setSaveToast] = useState<{
    id: number;
    kind: "success" | "error";
    exiting: boolean;
  } | null>(null);

  const sectionSensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const hydrateDraft = useCallback(() => {
    setDraft(getCmsPayload());
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (user === ADMIN_USER && pass === ADMIN_PASS) {
      setLoginError(false);
      setAuthed(true);
      hydrateDraft();
    } else {
      setLoginError(true);
    }
  };

  const handleSave = async () => {
    setSaveToast(null);
    setIsSaving(true);
    try {
      await new Promise<void>((resolve) => {
        requestAnimationFrame(() => resolve());
      });
      saveCmsToStorage(draft);
      notifyCmsUpdated();
      reload();
      saveToastIdRef.current += 1;
      setSaveToast({
        id: saveToastIdRef.current,
        kind: "success",
        exiting: false,
      });
    } catch {
      saveToastIdRef.current += 1;
      setSaveToast({
        id: saveToastIdRef.current,
        kind: "error",
        exiting: false,
      });
    } finally {
      setIsSaving(false);
    }
  };

  /* Toast auto-hide: new `id` starts timers; do not depend on full `saveToast` (exiting). */
  useEffect(() => {
    if (!saveToast) return;
    const toastId = saveToast.id;
    const hide = setTimeout(() => {
      setSaveToast((t) =>
        t && t.id === toastId ? { ...t, exiting: true } : t,
      );
    }, 2000);
    const remove = setTimeout(() => {
      setSaveToast((t) => (t && t.id === toastId ? null : t));
    }, 2280);
    return () => {
      clearTimeout(hide);
      clearTimeout(remove);
    };
  }, [saveToast?.id]); // eslint-disable-line react-hooks/exhaustive-deps -- toast id only; not `exiting`

  const handleSectionDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setDraft((d) => {
      const ids = d.sections.map((s) => s.id);
      const oldIndex = ids.indexOf(String(active.id));
      const newIndex = ids.indexOf(String(over.id));
      if (oldIndex < 0 || newIndex < 0) return d;
      return { ...d, sections: arrayMove(d.sections, oldIndex, newIndex) };
    });
  };

  const makeCardDragEnd = (sectionId: string) => (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setDraft((d) => {
      const si = d.sections.findIndex((s) => s.id === sectionId);
      if (si < 0) return d;
      const sec = d.sections[si];
      const ids = sec.cards.map((c) => c.id);
      const oldIndex = ids.indexOf(String(active.id));
      const newIndex = ids.indexOf(String(over.id));
      if (oldIndex < 0 || newIndex < 0) return d;
      const next = [...d.sections];
      next[si] = {
        ...sec,
        cards: arrayMove(sec.cards, oldIndex, newIndex),
      };
      return { ...d, sections: next };
    });
  };

  const updateSection = (index: number, s: PackageSection) => {
    setDraft((d) => {
      const next = [...d.sections];
      next[index] = s;
      return { ...d, sections: next };
    });
  };

  const deleteSection = (index: number) => {
    setDraft((d) => ({
      ...d,
      sections: d.sections.filter((_, i) => i !== index),
    }));
  };

  const addSection = () => {
    setDraft((d) => ({ ...d, sections: [...d.sections, emptySection()] }));
  };

  const updateCardInSection = (
    sectionId: string,
    cardId: string,
    patch: Partial<PackageCard>,
  ) => {
    setDraft((d) => ({
      ...d,
      sections: d.sections.map((s) => {
        if (s.id !== sectionId) return s;
        return {
          ...s,
          cards: s.cards.map((c) =>
            c.id === cardId ? { ...c, ...patch } : c,
          ),
        };
      }),
    }));
  };

  const addCardToSection = (sectionId: string) => {
    setDraft((d) => ({
      ...d,
      sections: d.sections.map((s) =>
        s.id === sectionId
          ? { ...s, cards: [...s.cards, emptyCard()] }
          : s,
      ),
    }));
  };

  const deleteCardInSection = (sectionId: string, cardId: string) => {
    setDraft((d) => ({
      ...d,
      sections: d.sections.map((s) => {
        if (s.id !== sectionId) return s;
        const cards = s.cards.filter((c) => c.id !== cardId);
        return { ...s, cards: cards.length ? cards : [emptyCard()] };
      }),
    }));
  };

  if (!authed) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-slate-100 px-4 py-16">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 shadow-md"
        >
          <h1 className="text-center text-xl font-bold text-slate-900">
            Đăng nhập CMS
          </h1>
          <p className="mt-2 text-center text-sm text-slate-500">
            Quản lý nội dung trang chủ
          </p>
          <div className="mt-6 space-y-4">
            <div>
              <label className="text-xs font-medium text-slate-600">
                Tên đăng nhập
              </label>
              <input
                autoComplete="username"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 outline-none focus:ring-2 focus:ring-[#2563eb]"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-600">
                Mật khẩu
              </label>
              <input
                type="password"
                autoComplete="current-password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 outline-none focus:ring-2 focus:ring-[#2563eb]"
              />
            </div>
            {loginError ? (
              <p className="text-sm text-red-600">Sai tài khoản hoặc mật khẩu.</p>
            ) : null}
          </div>
          <button
            type="submit"
            className="mt-6 w-full rounded-xl bg-[#2563eb] py-3 font-semibold text-white hover:bg-blue-700"
          >
            Đăng nhập
          </button>
          <Link
            href="/"
            className="mt-4 block text-center text-sm font-medium text-[#2563eb] hover:underline"
          >
            ← Về trang chủ
          </Link>
        </form>
      </div>
    );
  }

  return (
    <>
      {saveToast ? (
        <div
          role="status"
          aria-live="polite"
          className={`fixed top-4 right-4 z-[100] max-w-[min(100vw-2rem,22rem)] rounded-lg px-4 py-3 text-sm font-semibold text-white shadow-lg ${
            saveToast.kind === "success" ? "bg-green-600" : "bg-red-600"
          } ${saveToast.exiting ? "cms-save-toast-exit" : "cms-save-toast-enter"}`}
        >
          {saveToast.kind === "success"
            ? "Lưu thành công!"
            : "Lưu thất bại"}
        </div>
      ) : null}

      <div className="min-h-screen bg-slate-100">
      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-8 lg:px-8">
        <aside className="hidden w-56 shrink-0 flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm lg:flex">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Menu
          </p>
          <nav className="mt-4 flex flex-col gap-1">
            <button
              type="button"
              onClick={() => setTab("sections")}
              className={`rounded-lg px-3 py-2 text-left text-sm font-medium ${
                tab === "sections"
                  ? "bg-[#2563eb]/10 text-[#2563eb]"
                  : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              Sections
            </button>
            <button
              type="button"
              onClick={() => setTab("settings")}
              className={`rounded-lg px-3 py-2 text-left text-sm font-medium ${
                tab === "settings"
                  ? "bg-[#2563eb]/10 text-[#2563eb]"
                  : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              Settings
            </button>
          </nav>
          <div className="mt-auto pt-8">
            <button
              type="button"
              onClick={() => setAuthed(false)}
              className="w-full rounded-lg border border-slate-200 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
            >
              Đăng xuất
            </button>
            <Link
              href="/"
              className="mt-2 block text-center text-sm text-[#2563eb] hover:underline"
            >
              Xem trang chủ
            </Link>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <div>
              <h1 className="text-lg font-bold text-slate-900">CMS</h1>
              <p className="text-sm text-slate-500">
                {tab === "sections" ? "Mục & thẻ gói" : "Cài đặt trang"}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/"
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Trang chủ
              </Link>
              <button
                type="button"
                onClick={handleSave}
                disabled={isSaving}
                className="rounded-lg bg-[#2563eb] px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSaving ? "Đang lưu..." : "Lưu"}
              </button>
            </div>
          </div>

          <div className="flex gap-2 border-b border-slate-200 pb-4 lg:hidden">
            <button
              type="button"
              onClick={() => setTab("sections")}
              className={`rounded-lg px-3 py-2 text-sm font-medium ${
                tab === "sections" ? "bg-[#2563eb] text-white" : "bg-white"
              }`}
            >
              Sections
            </button>
            <button
              type="button"
              onClick={() => setTab("settings")}
              className={`rounded-lg px-3 py-2 text-sm font-medium ${
                tab === "settings" ? "bg-[#2563eb] text-white" : "bg-white"
              }`}
            >
              Settings
            </button>
          </div>

          {tab === "settings" ? (
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-base font-semibold text-slate-900">
                Cài đặt chung
              </h2>
              <div className="mt-4 max-w-lg space-y-4">
                <label className="block">
                  <span className="text-sm font-medium text-slate-700">
                    Tên thương hiệu (header)
                  </span>
                  <input
                    type="text"
                    value={draft.site.name}
                    onChange={(e) =>
                      setDraft((d) => ({
                        ...d,
                        site: { ...d.site, name: e.target.value },
                      }))
                    }
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 outline-none focus:ring-2 focus:ring-[#2563eb]"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-slate-700">
                    Tiêu đề hero
                  </span>
                  <input
                    type="text"
                    value={draft.site.heroTitle}
                    onChange={(e) =>
                      setDraft((d) => ({
                        ...d,
                        site: { ...d.site, heroTitle: e.target.value },
                      }))
                    }
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 outline-none focus:ring-2 focus:ring-[#2563eb]"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-slate-700">
                    Phụ đề hero
                  </span>
                  <input
                    type="text"
                    value={draft.site.heroSubtitle}
                    onChange={(e) =>
                      setDraft((d) => ({
                        ...d,
                        site: { ...d.site, heroSubtitle: e.target.value },
                      }))
                    }
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 outline-none focus:ring-2 focus:ring-[#2563eb]"
                  />
                </label>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm text-slate-600">
                  Kéo biểu tượng ⋮⋮ để sắp xếp mục hoặc thẻ.
                </p>
                <button
                  type="button"
                  onClick={addSection}
                  className="rounded-lg border border-dashed border-[#2563eb] bg-[#2563eb]/5 px-4 py-2 text-sm font-semibold text-[#2563eb] hover:bg-[#2563eb]/10"
                >
                  + Thêm mục
                </button>
              </div>

              <DndContext
                id="sections-dnd"
                sensors={sectionSensors}
                collisionDetection={closestCenter}
                onDragEnd={handleSectionDragEnd}
              >
                <SortableContext
                  items={draft.sections.map((s) => s.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {draft.sections.map((section, index) => (
                    <div key={section.id}>
                      <SortableSectionBlock
                        section={section}
                        onChangeSection={(s) => updateSection(index, s)}
                        onDeleteSection={() => deleteSection(index)}
                        onCardDragEnd={makeCardDragEnd(section.id)}
                        updateCard={(cardId, patch) =>
                          updateCardInSection(section.id, cardId, patch)
                        }
                        addCard={() => addCardToSection(section.id)}
                        deleteCard={(cardId) =>
                          deleteCardInSection(section.id, cardId)
                        }
                      />
                    </div>
                  ))}
                </SortableContext>
              </DndContext>

              {draft.sections.length === 0 ? (
                <p className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
                  Chưa có mục nào. Nhấn &quot;Thêm mục&quot; để bắt đầu.
                </p>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
}
