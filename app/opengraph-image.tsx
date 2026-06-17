import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Dang ky WiFi VNPT, SIM 5G va Camera online";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #071a44 0%, #2563eb 58%, #f97316 100%)",
          color: "white",
          padding: "72px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: "30px",
            fontWeight: 700,
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "18px",
              background: "rgba(255,255,255,0.18)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid rgba(255,255,255,0.35)",
            }}
          >
            VN
          </div>
          Ket Noi Mang HCM
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          <div
            style={{
              display: "flex",
              width: "fit-content",
              borderRadius: "999px",
              background: "rgba(255,255,255,0.16)",
              padding: "12px 22px",
              fontSize: "26px",
              fontWeight: 700,
            }}
          >
            Tu van online - Lap dat nhanh
          </div>
          <div
            style={{
              fontSize: "72px",
              lineHeight: 1.04,
              fontWeight: 900,
              letterSpacing: "-3px",
              maxWidth: "980px",
            }}
          >
            WiFi VNPT, SIM 5G va Camera cho khach hang TP.HCM
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "18px",
            fontSize: "28px",
            fontWeight: 700,
          }}
        >
          <span>Dang ky online</span>
          <span>-</span>
          <span>Tu van mien phi</span>
          <span>-</span>
          <span>Ho tro qua Zalo / Phone</span>
        </div>
      </div>
    ),
    size,
  );
}
