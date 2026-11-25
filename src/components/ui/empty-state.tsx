import { cn } from "@/lib/utils";

export function EmptyState({
  icon,
  title,
  children,
  className,
}: {
  icon?: React.ReactNode;
  title: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col items-center px-6 py-16 text-center", className)}>
      {icon && (
        <div className="mb-5 flex size-16 items-center justify-center rounded-full bg-muted text-muted-foreground [&_svg]:size-7">
          {icon}
        </div>
      )}
      <h2 className="text-lg font-medium">{title}</h2>
      {children && <div className="mt-2 max-w-xs text-muted-foreground">{children}</div>}
    </div>
  );
}
