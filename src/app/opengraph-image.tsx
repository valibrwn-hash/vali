import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const runtime = "edge";
export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
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
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#f7f5f2",
          color: "#1a1a18",
        }}
      >
        <div
          style={{
            fontSize: 24,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#949490",
            marginBottom: 24,
          }}
        >
          Product Architect · Full-Stack Engineer
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 400,
            lineHeight: 1.05,
            marginBottom: 32,
            fontFamily: "Georgia, serif",
          }}
        >
          {site.name}
        </div>
        <div
          style={{
            fontSize: 28,
            lineHeight: 1.4,
            color: "#5c5c58",
            maxWidth: 800,
          }}
        >
          {site.tagline}
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 80,
            left: 80,
            width: 64,
            height: 4,
            backgroundColor: "#2a5c5a",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
