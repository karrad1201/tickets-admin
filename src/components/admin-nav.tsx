"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/dashboard", label: "Главная", icon: "⬛" },
  { href: "/org-applications", label: "Заявки на орг.", icon: "📋" },
  { href: "/venue-applications", label: "Заявки на площадки", icon: "🏛" },
  { href: "/organizations", label: "Организации", icon: "🏢" },
  { href: "/venues", label: "Площадки", icon: "📍" },
  { href: "/events", label: "События", icon: "🎭" },
  { href: "/categories", label: "Категории", icon: "🏷" },
  { href: "/users", label: "Пользователи", icon: "👤" },
  { href: "/operations", label: "Операции", icon: "⚙️" },
  { href: "/analytics", label: "Аналитика", icon: "📊" },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="flex-1 px-2 py-3 space-y-0.5">
      {NAV.map((item) => {
        const active = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors",
              active
                ? "bg-primary text-primary-foreground font-medium"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
            )}
          >
            <span className="text-base leading-none">{item.icon}</span>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
