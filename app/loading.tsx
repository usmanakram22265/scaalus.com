export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-dvh items-center justify-center"
    >
      <span className="sr-only">Loading…</span>
      <span className="size-8 animate-spin rounded-full border-2 border-brand-200 border-t-brand-600" />
    </div>
  );
}
