import { getAuthContext } from "@/lib/auth";
import { listOrgApplications } from "@/lib/api/org-applications";
import { StatusBadge } from "@/components/status-badge";
import Link from "next/link";

export default async function OrgApplicationsPage() {
  const ctx = await getAuthContext();
  let apps: Awaited<ReturnType<typeof listOrgApplications>> = [];
  let error: string | null = null;
  try {
    apps = await listOrgApplications(ctx);
  } catch (e) {
    error = e instanceof Error ? e.message : "Ошибка загрузки";
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Заявки на организации</h1>
      {error ? (
        <p className="text-destructive">{error}</p>
      ) : apps.length === 0 ? (
        <p className="text-muted-foreground">Заявок нет.</p>
      ) : (
        <div className="rounded-md border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left px-4 py-3 font-medium">Название</th>
                <th className="text-left px-4 py-3 font-medium">Пользователь</th>
                <th className="text-left px-4 py-3 font-medium">Дата</th>
                <th className="text-left px-4 py-3 font-medium">Статус</th>
              </tr>
            </thead>
            <tbody>
              {apps.map((app) => (
                <tr key={app.id} className="border-t hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3">
                    <Link href={`/org-applications/${app.id}`} className="font-medium hover:underline">
                      {app.organizationName}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground font-mono text-xs">{app.applicantUserId}</td>
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
