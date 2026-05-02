"use client";

import { useLayoutEffect } from "react";

export default function WifiVnptLandingPage() {
  useLayoutEffect(() => {
    window.location.replace("/#wifi");
  }, []);

  return (
    <main className="flex min-h-[50vh] flex-col items-center justify-center gap-2 px-4 text-center text-slate-600">
      <p className="text-sm font-medium">Đang chuyển đến gói WiFi VNPT…</p>
      <p className="text-xs text-slate-500">
        Nếu không tự chuyển,{" "}
        <a href="/#wifi" className="font-semibold text-[#2563eb] underline">
          bấm vào đây
        </a>
        .
      </p>
    </main>
  );
}
