"use client";

import { Button } from "@/components/ui/button";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ reset }: Props) {
  return (
    <main className="flex min-h-[100svh] flex-col items-center justify-center gap-space-md px-5 text-center">
      <h1 className="text-display-lg">Something went wrong</h1>
      <p className="max-w-prose text-ink-muted">
        Please try again. If it keeps happening, call us.
      </p>
      <Button onClick={reset}>Try again</Button>
    </main>
  );
}
