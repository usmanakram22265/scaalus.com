// Starts the Next.js dev server on http://localhost:3000.
// If something is already listening on the port, exits without starting a second instance.
import net from "node:net";
import { spawn } from "node:child_process";

const PORT = Number(process.env.PORT ?? 3000);

const inUse = await new Promise((resolve) => {
  const socket = net.connect({ port: PORT, host: "127.0.0.1" });
  socket.once("connect", () => {
    socket.destroy();
    resolve(true);
  });
  socket.once("error", () => resolve(false));
});

if (inUse) {
  console.log(
    `Server already running at http://localhost:${PORT} — not starting another.`,
  );
  process.exit(0);
}

const child = spawn("npx", ["next", "dev", "--port", String(PORT)], {
  stdio: "inherit",
  shell: process.platform === "win32",
});

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => child.kill(signal));
}
child.on("exit", (code) => process.exit(code ?? 0));
