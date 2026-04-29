import { AdminNav } from "@/components/admin-nav";
import { LogoutButton } from "@/components/logout-button";
import { Separator } from "@/components/ui/separator";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      <aside className="w-60 shrink-0 border-r bg-card flex flex-col shadow-sm">
        {/* Логотип */}
        <div className="px-4 py-4 flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground text-xs font-bold">T</span>
          </div>
          <div>
            <div className="text-sm font-semibold leading-tight">Tickets</div>
            <div className="text-[10px] text-muted-foreground leading-tight">Admin Panel</div>
          </div>
        </div>
        <Separator />
        <AdminNav />
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
