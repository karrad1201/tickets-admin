import { getAuthContext } from "@/lib/auth";
import { getOrganization, listOrgMembers } from "@/lib/api/organizations";
import { StatusBadge } from "@/components/status-badge";
import Link from "next/link";

export default async function OrganizationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const ctx = await getAuthContext();
  const [org, members] = await Promise.all([getOrganization(ctx, id), listOrgMembers(ctx, id)]);

  return (
    <div className="max-w-2xl">
      <div className="mb-4">
        <Link href="/organizations" className="text-sm text-muted-foreground hover:underline">
          ← Организации
        </Link>
      </div>
      <h1 className="text-2xl font-semibold mb-6">{org.name}</h1>

      <div className="rounded-md border divide-y text-sm mb-6">
        <div className="flex px-4 py-3 gap-4">
          <span className="w-32 shrink-0 text-muted-foreground">ID</span>
          <span className="font-mono text-xs break-all">{org.id}</span>
        </div>
        <div className="flex px-4 py-3 gap-4">
          <span className="w-32 shrink-0 text-muted-foreground">Создана</span>
          <span>{org.createdAt.slice(0, 10)}</span>
        </div>
      </div>

      <h2 className="text-base font-medium mb-3">Участники ({members.length})</h2>
      {members.length === 0 ? (
        <p className="text-muted-foreground text-sm">Нет участников.</p>
      ) : (
        <div className="rounded-md border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left px-4 py-3 font-medium">Пользователь</th>
                <th className="text-left px-4 py-3 font-medium">Роль</th>
                <th className="text-left px-4 py-3 font-medium">Площадка</th>
              </tr>
            </thead>
            <tbody>
              {members.map((m) => (
                <tr key={m.id} className="border-t">
                  <td className="px-4 py-3 font-mono text-xs">{m.userId}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={m.role} />
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{m.venueId ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
