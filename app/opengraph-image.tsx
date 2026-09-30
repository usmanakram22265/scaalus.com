import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { hero, site } from "@/lib/content";

export const alt =
  "Scaalus: a calendar full of booked jobs, not a phone full of missed calls.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The four rising bars from the logo mark, as a faint growth chart.
const BARS = [38, 58, 78, 100];

export default async function Image() {
  const logo = await readFile(
    join(process.cwd(), "public/brand/logo-wordmark-white.png"),
  );
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 80,
        backgroundColor: "#0D1726",
        backgroundImage:
          "radial-gradient(60% 60% at 90% 0%, rgba(110,147,240,0.30), transparent 70%), radial-gradient(60% 70% at 0% 100%, rgba(18,52,153,0.6), transparent 72%)",
      }}
    >
      <div
        style={{
          position: "absolute",
          right: 70,
          bottom: 0,
          width: 380,
          height: 430,
          display: "flex",
          alignItems: "flex-end",
          gap: 22,
        }}
      >
        {BARS.map((h) => (
          <div
            key={h}
            style={{
              flex: 1,
              height: `${h}%`,
              borderRadius: "999px 999px 0 0",
              backgroundImage:
                "linear-gradient(180deg, rgba(110,147,240,0.22), rgba(110,147,240,0.02))",
            }}
          />
        ))}
      </div>
      <img src={logoSrc} width={244} height={80} alt="" />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            fontSize: 70,
            fontWeight: 700,
            lineHeight: 1.04,
            letterSpacing: "-0.04em",
            color: "#FFFFFF",
          }}
        >
          {hero.titleStart}
          <span style={{ color: "#6E93F0", marginLeft: 18 }}>
            {hero.titleHighlight}
          </span>
        </div>
        <div
          style={{
            fontSize: 70,
            fontWeight: 700,
            lineHeight: 1.04,
            letterSpacing: "-0.04em",
            color: "rgba(255,255,255,0.55)",
          }}
        >
          {hero.titleEnd.trim()}
        </div>
        <div
          style={{
            marginTop: 30,
            fontSize: 28,
            color: "rgba(255,255,255,0.75)",
          }}
        >
          {site.ogTagline}
        </div>
      </div>
    </div>,
    size,
  );
}
