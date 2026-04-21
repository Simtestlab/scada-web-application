interface SectionCardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export default function SectionCard({ title, children, className = '' }: SectionCardProps) {
  return (
    <div className={`bg-card rounded-xl border border-border p-5 ${className}`}>
      {title && (
        <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-4">
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}
