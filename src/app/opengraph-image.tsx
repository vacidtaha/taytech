import { ImageResponse } from "next/og";
import * as fs from "fs";
import * as path from "path";

export const alt = "Taytech - Motor Kontrol Panoları & Isı İstasyonları";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logoPath = path.join(process.cwd(), "public", "taytechlogo-og.png");
  const logoData = fs.readFileSync(logoPath);
  const logoSrc = `data:image/png;base64,${logoData.toString("base64")}`;

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
          background: "linear-gradient(135deg, #f5f5f7 0%, #e8e8ed 50%, #f5f5f7 100%)",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoSrc}
          width={400}
          height={283}
          style={{ marginBottom: 36 }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
          }}
        >
          <span style={{ fontSize: 28, color: "#1d1d1f", fontWeight: 500 }}>
            Motor Kontrol Panoları & Isı İstasyonları
          </span>
          <span style={{ fontSize: 18, color: "#6e6e73" }}>
            Endüstriyel Otomasyon Çözümleri | ISO Sertifikalı Türk Üretici
          </span>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 40,
            display: "flex",
            gap: 32,
            color: "#6e6e73",
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
