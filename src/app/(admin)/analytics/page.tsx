import { getAuthContext } from "@/lib/auth";
import { listEvents } from "@/lib/api/events";
import { listUsers } from "@/lib/api/users";
import { listOrganizations } from "@/lib/api/organizations";
import { listVenues } from "@/lib/api/venues";
import { listOrgApplications } from "@/lib/api/org-applications";
import { listVenueApplications } from "@/lib/api/venue-applications";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

async function safe<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch {
    return fallback;
  }
}

export default async function AnalyticsPage() {
  const ctx = await getAuthContext();
  const now = new Date().toISOString();

  const [events, users, orgs, venues, orgApps, venueApps] = await Promise.all([
    safe(() => listEvents(ctx), []),
    safe(() => listUsers(ctx), []),
    safe(() => listOrganizations(ctx), []),
    safe(() => listVenues(ctx), []),
    safe(() => listOrgApplications(ctx), []),
    safe(() => listVenueApplications(ctx), []),
  ]);

  const eventsOpenSales = events.filter((e) => !e.salesClosedAt).length;
  const eventsClosedSales = events.filter((e) => !!e.salesClosedAt).length;
  const eventsUpcoming = events.filter((e) => e.startsAt > now).length;
  const eventsPast = events.filter((e) => e.startsAt <= now).length;

  const usersAdmin = users.filter((u) => u.role === "ADMIN").length;
  const usersRegular = users.length - usersAdmin;

  const orgAppsPending = orgApps.filter((a) => a.status === "PENDING").length;
  const orgAppsApproved = orgApps.filter((a) => a.status === "APPROVED").length;
  const orgAppsRejected = orgApps.filter((a) => a.status === "REJECTED").length;

  const venueAppsPending = venueApps.filter((a) => a.status === "PENDING").length;
  const venueAppsApproved = venueApps.filter((a) => a.status === "APPROVED").length;
  const venueAppsRejected = venueApps.filter((a) => a.status === "REJECTED").length;

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Аналитика</h1>

      <Section title="События">
        <StatCard label="Всего" value={events.length} />
        <StatCard label="Продажи открыты" value={eventsOpenSales} accent="green" />
        <StatCard label="Продажи закрыты" value={eventsClosedSales} />
        <StatCard label="Предстоящие" value={eventsUpcoming} accent="blue" />
        <StatCard label="Прошедшие" value={eventsPast} />
      </Section>

      <Section title="Пользователи">
        <StatCard label="Всего" value={users.length} />
        <StatCard label="Администраторы" value={usersAdmin} accent="blue" />
        <StatCard label="Обычные" value={usersRegular} />
      </Section>

      <Section title="Организации и площадки">
        <StatCard label="Организации" value={orgs.length} />
        <StatCard label="Площадки" value={venues.length} />
      </Section>

      <Section title="Заявки на организации">
        <StatCard label="Всего" value={orgApps.length} />
        <StatCard label="На рассмотрении" value={orgAppsPending} accent="yellow" />
        <StatCard label="Одобрены" value={orgAppsApproved} accent="green" />
        <StatCard label="Отклонены" value={orgAppsRejected} accent="red" />
      </Section>

      <Section title="Заявки на площадки">
        <StatCard label="Всего" value={venueApps.length} />
        <StatCard label="На рассмотрении" value={venueAppsPending} accent="yellow" />
        <StatCard label="Одобрены" value={venueAppsApproved} accent="green" />
        <StatCard label="Отклонены" value={venueAppsRejected} accent="red" />
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h2 className="text-base font-medium text-muted-foreground mb-3">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">{children}</div>
    </div>
  );
}

type Accent = "green" | "blue" | "yellow" | "red";

const accentClass: Record<Accent, string> = {
  green: "text-emerald-600",
  blue: "text-blue-600",
  yellow: "text-amber-600",
  red: "text-red-600",
};

function StatCard({ label, value, accent }: { label: string; value: number; accent?: Accent }) {
  return (
    <Card>
      <CardHeader className="pb-1 pt-4 px-4">
        <CardTitle className="text-xs font-medium text-muted-foreground">{label}</CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        <div className={`text-2xl font-bold ${accent ? accentClass[accent] : ""}`}>{value}</div>
      </CardContent>
    </Card>
  );
}
