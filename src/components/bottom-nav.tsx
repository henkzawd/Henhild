"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CheckSquare, Gift, Menu, ShoppingBasket, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

const ITEMS = [
  { href: "/", label: "I dag", icon: Sun },
  { href: "/handleliste", label: "Handle", icon: ShoppingBasket },
  { href: "/oppgaver", label: "Oppgaver", icon: CheckSquare },
  { href: "/onsker", label: "Ønsker", icon: Gift },
  { href: "/mer", label: "Mer", icon: Menu },
] as const;

const MORE_PATHS = ["/mer", "/abonnementer", "/innstillinger", "/kom-i-gang"];

export function BottomNav() {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    if (href === "/mer") return MORE_PATHS.some((p) => pathname.startsWith(p));
    return pathname.startsWith(href);
  }

  return (
    <nav
      aria-label="Hovedmeny"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur"
    >
      <ul className="mx-auto flex max-w-xl">
        {ITEMS.map(({ href, label, icon: Icon }) => {
          const active = isActive(href);
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex h-16 flex-col items-center justify-center gap-1 text-xs transition-colors",
                  active ? "text-foreground" : "text-muted-foreground",
                )}
              >
                <Icon className="size-6" strokeWidth={active ? 2 : 1.5} />
                <span className={cn(active && "font-medium")}>{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
