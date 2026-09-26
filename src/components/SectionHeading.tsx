export default function SectionHeading({
  label,
  accent = "text-cream",
}: {
  label: string;
  accent?: string;
}) {
  return (
    <div className="mb-12 flex items-baseline gap-5">
      <h2
        className={`font-[family-name:var(--font-jost)] text-4xl font-light lowercase tracking-wide md:text-5xl ${accent}`}
      >
        {label}
      </h2>
      <span className="h-px flex-1 bg-ink-line" />
    </div>
  );
}
