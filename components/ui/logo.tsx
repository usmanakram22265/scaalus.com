import Image from "next/image";

type Props = {
  variant?: "wordmark" | "mark";
  tone?: "color" | "white";
  /** Rendered height in px; width follows the asset's aspect ratio. */
  height?: number;
  priority?: boolean;
  className?: string;
};

// Trimmed brand PNGs in public/brand (originals in brand_assets/).
const assets = {
  wordmark: { width: 1484, height: 486 },
  mark: { width: 494, height: 796 },
} as const;

export function Logo({
  variant = "wordmark",
  tone = "color",
  height = 28,
  priority,
  className,
}: Props) {
  const asset = assets[variant];
  const width = Math.round((asset.width / asset.height) * height);
  const src = `/brand/logo-${variant}${tone === "white" ? "-white" : ""}.png`;

  return (
    <Image
      src={src}
      alt="Scaalus"
      width={width}
      height={height}
      priority={priority}
      className={className}
      sizes={`${width}px`}
    />
  );
}
