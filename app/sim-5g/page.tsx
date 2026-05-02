"use client";

import { useLayoutEffect } from "react";

export default function Sim5gLandingPage() {
  useLayoutEffect(() => {
    window.location.replace("/#sim-4g");
  }, []);

  return (
    <main className="flex min-h-[50vh] flex-col items-center justify-center gap-2 px-4 text-center text-slate-600">
      <p className="text-sm font-medium">Đang chuyển đến gói SIM…</p>
      <p className="text-xs text-slate-500">
        Nếu không tự chuyển,{" "}
        <a href="/#sim-4g" className="font-semibold text-[#2563eb] underline">
          bấm vào đây
        </a>
        .
      </p>
    </main>
  );
}
