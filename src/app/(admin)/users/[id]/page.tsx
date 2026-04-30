import { getAuthContext } from "@/lib/auth";
import { getUser, listUserMemberships } from "@/lib/api/users";
import { getOrganization } from "@/lib/api/organizations";
import { StatusBadge } from "@/components/status-badge";
import { ChangeRoleButton } from "./change-role-button";
import Link from "next/link";

export default async function UserPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const ctx = await getAuthContext();

  let user: Awaited<ReturnType<typeof getUser>>;
  let memberships: Awaited<ReturnType<typeof listUserMemberships>> = [];
  try {
    [user, memberships] = await Promise.all([
      getUser(ctx, id),
      listUserMemberships(ctx, id).catch(() => []),
    ]);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Ошибка загрузки";
    return (
      <div className="max-w-2xl">
        <div className="mb-4">
          <Link href="/users" className="text-sm text-muted-foreground hover:underline">
            ← Пользователи
          </Link>
        </div>
        <p className="text-destructive">{msg}</p>
      </div>
    );
  }

  const orgsById = Object.fromEntries(
    await Promise.all(
      memberships.map((m) =>
        getOrganization(ctx, m.organizationId)
          .then((o) => [m.organizationId, o] as const)
          .catch(() => [m.organizationId, null] as const),
      ),
    ),
  );

  return (
    <div className="max-w-2xl">
      <div className="mb-4">
        <Link href="/users" className="text-sm text-muted-foreground hover:underline">
          ← Пользователи
        </Link>
      </div>
      <h1 className="text-2xl font-semibold mb-6">{user.fullName}</h1>
      <div className="rounded-md border divide-y text-sm mb-6">
        <Row label="ID" value={user.id} mono />
        <Row label="Телефон" value={user.phone ?? "—"} />
        <Row label="Email" value={user.email ?? "—"} />
        <div className="flex px-4 py-3 gap-4 items-center">
          <span className="w-32 shrink-0 text-muted-foreground">Роль</span>
          <div className="flex items-center gap-3">
            <StatusBadge status={user.role} />
            <ChangeRoleButton userId={user.id} currentRole={user.role} />
          </div>
        </div>
      </div>

      <h2 className="text-base font-medium mb-3">
        Членство в организациях ({memberships.length})
      </h2>
      {memberships.length === 0 ? (
        <p className="text-sm text-muted-foreground">Не состоит ни в одной организации.</p>
      ) : (
        <div className="rounded-md border overflow-hidden text-sm">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left px-4 py-3 font-medium">Организация</th>
                <th className="text-left px-4 py-3 font-medium">Роль</th>
              </tr>
            </thead>
            <tbody>
              {memberships.map((m) => {
                const org = orgsById[m.organizationId];
                return (
                  <tr key={m.id} className="border-t hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3">
                      {org ? (
                        <Link
                          href={`/organizations/${m.organizationId}`}
                          className="font-medium hover:underline"
                        >
                          {org.name}
                        </Link>
                      ) : (
                        <span className="font-mono text-xs text-muted-foreground">
                          {m.organizationId.slice(0, 8)}…
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={m.role} />
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

function Row({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex px-4 py-3 gap-4">
      <span className="w-32 shrink-0 text-muted-foreground">{label}</span>
      <span className={mono ? "font-mono text-xs break-all" : ""}>{value}</span>
    </div>
  );
}
