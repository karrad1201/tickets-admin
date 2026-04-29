import { getAuthContext } from "@/lib/auth";
import { listOrgApplications } from "@/lib/api/org-applications";
import { listVenueApplications } from "@/lib/api/venue-applications";
import { listOrganizations } from "@/lib/api/organizations";
import { listUsers } from "@/lib/api/users";
import { listEvents } from "@/lib/api/events";
import { listVenues } from "@/lib/api/venues";
import { listCategories } from "@/lib/api/categories";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

async function stat(fn: () => Promise<unknown[]>) {
  try {
    return (await fn()).length;
  } catch {
    return "—";
  }
}

async function statWith<T>(fn: () => Promise<T[]>, filter?: (item: T) => boolean) {
  try {
    const items = await fn();
    return filter ? items.filter(filter).length : items.length;
  } catch {
    return "—";
  }
}

export default async function DashboardPage() {
  const ctx = await getAuthContext();

  const [orgApps, venueApps, orgs, users, events, venues, categories, openEvents] =
    await Promise.all([
      stat(() => listOrgApplications(ctx).then((r) => r.filter((a) => a.status === "PENDING"))),
      stat(() => listVenueApplications(ctx, "PENDING")),
      stat(() => listOrganizations(ctx)),
      stat(() => listUsers(ctx)),
      stat(() => listEvents(ctx)),
      stat(() => listVenues(ctx)),
      stat(() => listCategories(ctx)),
      statWith(() => listEvents(ctx), (e) => !e.salesClosedAt),
    ]);

  const urgent = [
    { title: "Заявки на организации", value: orgApps, href: "/org-applications", sub: "ожидают рассмотрения", highlight: orgApps !== "—" && (orgApps as number) > 0 },
    { title: "Заявки на площадки", value: venueApps, href: "/venue-applications", sub: "ожидают рассмотрения", highlight: venueApps !== "—" && (venueApps as number) > 0 },
  ];

  const counters = [
    { title: "Пользователи", value: users, href: "/users", sub: "всего" },
    { title: "Организации", value: orgs, href: "/organizations", sub: "всего" },
    { title: "Площадки", value: venues, href: "/venues", sub: "всего" },
    { title: "Категории", value: categories, href: "/categories", sub: "всего" },
    { title: "События", value: events, href: "/events", sub: "всего" },
    { title: "Открытые продажи", value: openEvents, href: "/events", sub: "событий" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Главная</h1>

      <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3">
        Требуют внимания
      </h2>
      <div className="grid grid-cols-2 gap-4 mb-8">
        {urgent.map((c) => (
          <Link key={c.href} href={c.href}>
            <Card className={`hover:bg-accent/50 transition-colors cursor-pointer ${c.highlight ? "border-primary/40 bg-primary/5" : ""}`}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{c.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-3xl font-bold ${c.highlight ? "text-primary" : ""}`}>{c.value}</div>
                <p className="text-xs text-muted-foreground mt-1">{c.sub}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3">
        Статистика
      </h2>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {counters.map((c) => (
          <Link key={c.title} href={c.href}>
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
