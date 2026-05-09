export function SourceBadge({ label, description }: { label: string; description?: string }) {
  return (
    <span className="badge" title={description}>
      {label}
    </span>
  );
}
