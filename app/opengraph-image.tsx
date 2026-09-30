import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt =
  "Scaalus: a calendar full of booked jobs, not a phone full of missed calls.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logo = await readFile(
    join(process.cwd(), "public/brand/logo-wordmark.png"),
  );
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 80,
        background:
          "radial-gradient(60% 60% at 0% 0%, rgba(110,147,240,0.28), transparent 70%), radial-gradient(50% 50% at 100% 100%, rgba(43,89,216,0.16), transparent 70%), #FAF9F6",
      }}
    >
      <img src={logoSrc} width={244} height={80} alt="" />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            fontSize: 68,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            color: "#0D2847",
          }}
        >
          A calendar full of booked jobs.
        </div>
        <div
          style={{
            fontSize: 68,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            color: "#2B59D8",
          }}
        >
          Not a phone full of missed calls.
        </div>
        <div style={{ marginTop: 28, fontSize: 30, color: "#5B6573" }}>
          Done-for-you for home service businesses · $297/month · No contract
        </div>
      </div>
    </div>,
    size,
  );
}
