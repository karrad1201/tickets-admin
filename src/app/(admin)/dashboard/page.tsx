import { getAuthContext } from "@/lib/auth";
import { listOrgApplications } from "@/lib/api/org-applications";
import { listVenueApplications } from "@/lib/api/venue-applications";
import { listOrganizations } from "@/lib/api/organizations";
import { listUsers } from "@/lib/api/users";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

async function stat(fn: () => Promise<unknown[]>) {
  try {
    return (await fn()).length;
  } catch {
    return "—";
  }
}

export default async function DashboardPage() {
  const ctx = await getAuthContext();

  const [orgApps, venueApps, orgs, users] = await Promise.all([
    stat(() => listOrgApplications(ctx).then((r) => r.filter((a) => a.status === "PENDING"))),
    stat(() => listVenueApplications(ctx, "PENDING")),
    stat(() => listOrganizations(ctx)),
    stat(() => listUsers(ctx)),
  ]);

  const cards = [
    { title: "Заявки на организации", value: orgApps, href: "/org-applications", sub: "ожидают рассмотрения" },
    { title: "Заявки на площадки", value: venueApps, href: "/venue-applications", sub: "ожидают рассмотрения" },
    { title: "Организации", value: orgs, href: "/organizations", sub: "всего" },
    { title: "Пользователи", value: users, href: "/users", sub: "всего" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Главная</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c) => (
          <Link key={c.href} href={c.href}>
            <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{c.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{c.value}</div>
                <p className="text-xs text-muted-foreground mt-1">{c.sub}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
