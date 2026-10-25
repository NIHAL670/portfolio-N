import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name}, ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "#fafaf8",
          color: "#18181b",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 28, color: "#6b6b70" }}>
          <div style={{ width: 14, height: 14, borderRadius: 7, background: "#1e6b52" }} />
          {site.availability}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 88, fontWeight: 700, letterSpacing: -3 }}>{site.name}</div>
          <div style={{ fontSize: 40, color: "#6b6b70" }}>
            Machine learning systems and the backends that serve them
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#a1a1a6" }}>
          {site.url.replace("https://", "")}
        </div>
      </div>
    ),
    size,
  );
}
