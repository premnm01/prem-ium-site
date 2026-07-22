export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="eyebrow inline-block rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[11px]">
      {children}
    </span>
  );
}
