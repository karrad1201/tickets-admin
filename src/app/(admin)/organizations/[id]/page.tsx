import { getAuthContext } from "@/lib/auth";
import { getOrganization, listOrgMembers } from "@/lib/api/organizations";
import { getUser } from "@/lib/api/users";
import { listVenues } from "@/lib/api/venues";
import { StatusBadge } from "@/components/status-badge";
import { AddMemberForm } from "./add-member-form";
import { DeleteMemberButton } from "./delete-member-button";
import Link from "next/link";
import { OrgMember, Organization, User, Venue } from "@/lib/api/types";

export default async function OrganizationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const ctx = await getAuthContext();

  let org: Organization;
  let members: OrgMember[] = [];
  try {
    [org, members] = await Promise.all([getOrganization(ctx, id), listOrgMembers(ctx, id)]);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Ошибка загрузки";
    return (
      <div className="max-w-2xl">
        <div className="mb-4">
          <Link href="/organizations" className="text-sm text-muted-foreground hover:underline">
            ← Организации
          </Link>
        </div>
        <p className="text-destructive">{msg}</p>
      </div>
    );
  }

  // Загружаем имена пользователей и площадки параллельно, fallback при ошибке
  const userMap = new Map<string, User>();
  const allVenues = await listVenues(ctx).catch(() => [] as Venue[]);
  const venues = allVenues.filter((v) => v.organizationId === id);
  await Promise.all(
    members.map((m) =>
      getUser(ctx, m.userId)
        .then((u) => userMap.set(m.userId, u))
        .catch(() => {}),
    ),
  );

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
          <span>{org.createdAt?.slice(0, 10) ?? "—"}</span>
        </div>
      </div>

      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-medium">Участники ({members.length})</h2>
        <AddMemberForm organizationId={id} venues={venues} />
      </div>
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
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {members.map((m) => {
                const user = userMap.get(m.userId);
                return (
                  <tr key={m.id} className="border-t hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3">
                      {user ? (
                        <Link href={`/users/${m.userId}`} className="font-medium hover:underline">
                          {user.fullName}
                        </Link>
                      ) : (
                        <span className="font-mono text-xs text-muted-foreground">{m.userId}</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={m.role} />
                    </td>
                    <td className="px-4 py-3">
                      {m.venueId ? (
                        <Link href={`/venues/${m.venueId}`} className="font-mono text-xs hover:underline text-muted-foreground">
                          {m.venueId.slice(0, 8)}…
                        </Link>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <DeleteMemberButton memberId={m.id} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
