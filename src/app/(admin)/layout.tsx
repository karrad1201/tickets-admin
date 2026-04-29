import Link from "next/link";
import { LogoutButton } from "@/components/logout-button";
import { Separator } from "@/components/ui/separator";

const NAV = [
  { href: "/dashboard", label: "Главная" },
  { href: "/org-applications", label: "Заявки на орг." },
  { href: "/venue-applications", label: "Заявки на площадки" },
  { href: "/organizations", label: "Организации" },
  { href: "/venues", label: "Площадки" },
  { href: "/events", label: "События" },
  { href: "/users", label: "Пользователи" },
  { href: "/operations", label: "Операции" },
  { href: "/analytics", label: "Аналитика" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-56 shrink-0 border-r bg-muted/30 flex flex-col">
        <div className="px-4 py-4 font-semibold text-sm tracking-tight">Tickets Admin</div>
        <Separator />
        <nav className="flex-1 px-2 py-3 space-y-0.5">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Separator />
        <div className="px-3 py-3">
          <LogoutButton />
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0">
        <div className="flex-1 p-6">{children}</div>
      </main>
    </div>
  );
}
