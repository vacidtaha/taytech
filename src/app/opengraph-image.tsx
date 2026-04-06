import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Taytech - Akıllı Kontrol Panoları & Isı İstasyonları";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1d1d1f 0%, #2d2d2f 50%, #1d1d1f 100%)",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 40,
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: 20,
              background: "#e30613",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: 24,
            }}
          >
            <span style={{ fontSize: 44, fontWeight: 800, color: "white" }}>T</span>
          </div>
          <span style={{ fontSize: 56, fontWeight: 700, color: "white", letterSpacing: -1 }}>
            Taytech
          </span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
          }}
        >
          <span style={{ fontSize: 28, color: "#e5e5ea", fontWeight: 500 }}>
            Akıllı Kontrol Panoları & Isı İstasyonları
          </span>
          <span style={{ fontSize: 18, color: "#86868b" }}>
            Endüstriyel Otomasyon Çözümleri | ISO Sertifikalı Türk Üretici
          </span>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 40,
            display: "flex",
            gap: 32,
            color: "#86868b",
            fontSize: 16,
          }}
        >
          <span>taytech.com.tr</span>
          <span>•</span>
          <span>Gebze, Kocaeli</span>
          <span>•</span>
          <span>+90 262 644 05 61</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
