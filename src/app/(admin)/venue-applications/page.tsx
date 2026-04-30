import { getAuthContext } from "@/lib/auth";
import { listVenueApplications } from "@/lib/api/venue-applications";
import { StatusBadge } from "@/components/status-badge";
import Link from "next/link";

export default async function VenueApplicationsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const ctx = await getAuthContext();
  let apps: Awaited<ReturnType<typeof listVenueApplications>> = [];
  let error: string | null = null;
  try {
    apps = await listVenueApplications(ctx, status);
  } catch (e) {
    error = e instanceof Error ? e.message : "Ошибка загрузки";
  }

  const filters = [
    { label: "Все", value: undefined },
    { label: "Ожидают", value: "PENDING" },
    { label: "Одобрены", value: "APPROVED" },
    { label: "Отклонены", value: "REJECTED" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Заявки на площадки</h1>

      <div className="flex gap-2 mb-4">
        {filters.map((f) => (
          <Link
            key={f.label}
            href={f.value ? `/venue-applications?status=${f.value}` : "/venue-applications"}
            className={`text-sm px-3 py-1 rounded-full border transition-colors ${
              status === f.value || (!status && !f.value)
                ? "bg-foreground text-background border-foreground"
                : "hover:bg-muted"
            }`}
          >
            {f.label}
          </Link>
        ))}
      </div>

      {error ? (
        <p className="text-destructive">{error}</p>
      ) : apps.length === 0 ? (
        <p className="text-muted-foreground">Заявок нет.</p>
      ) : (
        <div className="rounded-md border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left px-4 py-3 font-medium">Площадка</th>
                <th className="text-left px-4 py-3 font-medium">Город</th>
                <th className="text-left px-4 py-3 font-medium">Документов</th>
                <th className="text-left px-4 py-3 font-medium">Дата</th>
                <th className="text-left px-4 py-3 font-medium">Статус</th>
              </tr>
            </thead>
            <tbody>
              {apps.map((app) => (
                <tr key={app.id} className="border-t hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3">
                    <Link href={`/venue-applications/${app.id}`} className="font-medium hover:underline">
                      {app.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{app.cityLabel}</td>
                  <td className="px-4 py-3 text-muted-foreground">{app.documentUrls.length}</td>
                  <td className="px-4 py-3 text-muted-foreground">{app.createdAt.slice(0, 10)}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={app.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
