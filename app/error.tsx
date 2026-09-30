"use client";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ reset }: Props) {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-space-md px-space-md text-center">
      <h1 className="text-4xl text-brand-900">Something went wrong</h1>
      <button
        type="button"
        onClick={reset}
        className="rounded-full bg-brand-700 px-space-md py-space-xs text-white shadow-elevated transition-transform duration-300 ease-spring hover:-translate-y-0.5 hover:bg-brand-800 active:translate-y-0 active:scale-[0.98]"
      >
        Try again
      </button>
    </main>
  );
}
