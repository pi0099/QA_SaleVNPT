"use client";

import { useLayoutEffect } from "react";

export default function CameraVnptLandingPage() {
  useLayoutEffect(() => {
    window.location.replace("/#camera");
  }, []);

  return (
    <main className="flex min-h-[50vh] flex-col items-center justify-center gap-2 px-4 text-center text-slate-600">
      <p className="text-sm font-medium">Đang chuyển đến gói Camera…</p>
      <p className="text-xs text-slate-500">
        Nếu không tự chuyển,{" "}
        <a href="/#camera" className="font-semibold text-[#2563eb] underline">
          bấm vào đây
        </a>
        .
      </p>
    </main>
  );
}
