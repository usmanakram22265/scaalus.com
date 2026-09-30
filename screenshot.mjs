// Usage: node screenshot.mjs <url> [label]
// Saves full-page screenshots to "./temporary screenshots/screenshot-N[-label].png",
// auto-incrementing N so nothing is ever overwritten.
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";

const [url, label] = process.argv.slice(2);
if (!url) {
  console.error("Usage: node screenshot.mjs <url> [label]");
  process.exit(1);
}
if (url.startsWith("file:")) {
  console.error(
    "Screenshot from localhost, never a file:// URL. Start the server with `node serve.mjs`.",
  );
  process.exit(1);
}

// Prefer a full `puppeteer` install (local project, then the machine-wide temp install);
// fall back to the project's `puppeteer-core` plus an installed Chrome/Chromium.
async function loadPuppeteer() {
  const candidates = [
    process.cwd(),
    "C:/Users/nateh/AppData/Local/Temp/puppeteer-test",
  ];
  for (const base of candidates) {
    try {
      const require = createRequire(path.join(base, "noop.js"));
      return {
        puppeteer: (
          await import(pathToFileURL(require.resolve("puppeteer")).href)
        ).default,
        bundled: true,
      };
    } catch {
      // try next
    }
  }
  return {
    puppeteer: (await import("puppeteer-core")).default,
    bundled: false,
  };
}

function findChrome() {
  if (process.env.CHROME_PATH) return process.env.CHROME_PATH;
  const cacheDir = path.join(os.homedir(), ".cache", "puppeteer", "chrome");
  const found = [];
  if (fs.existsSync(cacheDir)) {
    for (const version of fs.readdirSync(cacheDir).sort().reverse()) {
      for (const sub of [
        "chrome-win64/chrome.exe",
        "chrome-linux64/chrome",
        "chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing",
        "chrome-mac-x64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing",
      ]) {
        found.push(path.join(cacheDir, version, sub));
      }
    }
  }
  found.push(
    "/opt/pw-browsers/chromium",
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
  );
  return found.find((p) => fs.existsSync(p));
}

const outDir = path.resolve("temporary screenshots");
fs.mkdirSync(outDir, { recursive: true });
const used = fs
  .readdirSync(outDir)
  .map((f) => /^screenshot-(\d+)/.exec(f)?.[1])
  .filter(Boolean)
  .map(Number);
const n = (used.length ? Math.max(...used) : 0) + 1;
const file = path.join(
  outDir,
  `screenshot-${n}${label ? `-${label}` : ""}.png`,
);

const { puppeteer, bundled } = await loadPuppeteer();
const executablePath = bundled ? undefined : findChrome();
if (!bundled && !executablePath) {
  console.error("No Chrome found. Set CHROME_PATH or install puppeteer.");
  process.exit(1);
}

const browser = await puppeteer.launch({
  executablePath,
  args: ["--no-sandbox"],
});
try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.goto(url, { waitUntil: "networkidle0", timeout: 60_000 });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: file, fullPage: true });
  console.log(`Saved ${path.relative(process.cwd(), file)}`);
} finally {
  await browser.close();
}
