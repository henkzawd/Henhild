import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 active:opacity-80 [&_svg]:size-5 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground",
        secondary: "bg-muted text-foreground",
        outline: "border border-border bg-surface text-foreground",
        ghost: "text-foreground hover:bg-muted",
        accent: "bg-accent-soft text-foreground",
        danger: "bg-danger text-white",
      },
      size: {
        md: "h-12 px-5 text-base rounded-md",
        sm: "h-10 px-4 text-sm rounded-md",
        lg: "h-14 px-6 text-lg rounded-lg",
        icon: "size-12 rounded-full",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export function Button({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants>) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
