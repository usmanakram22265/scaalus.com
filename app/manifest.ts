import type { MetadataRoute } from "next";
import { site } from "@/lib/content";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.name,
    description: site.description,
    start_url: "/",
    display: "browser",
    background_color: "#FAF9F6",
    theme_color: "#FAF9F6",
    icons: [{ src: "/icon.png", sizes: "256x256", type: "image/png" }],
  };
}
