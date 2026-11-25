export function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <header className="flex items-end justify-between gap-4 px-5 pb-4 pt-[calc(env(safe-area-inset-top)+1.5rem)]">
      <div>
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        <h1 className="text-3xl font-medium">{title}</h1>
      </div>
      {action}
    </header>
  );
}
