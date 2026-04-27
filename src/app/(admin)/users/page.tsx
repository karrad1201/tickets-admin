import { getAuthContext } from "@/lib/auth";
import { listUsers } from "@/lib/api/users";
import { StatusBadge } from "@/components/status-badge";
import Link from "next/link";

export default async function UsersPage() {
  const ctx = await getAuthContext();
  const users = await listUsers(ctx);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Пользователи</h1>
      {users.length === 0 ? (
        <p className="text-muted-foreground">Пользователей нет.</p>
      ) : (
        <div className="rounded-md border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left px-4 py-3 font-medium">Имя</th>
                <th className="text-left px-4 py-3 font-medium">Телефон</th>
                <th className="text-left px-4 py-3 font-medium">Роль</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-t hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3">
                    <Link href={`/users/${u.id}`} className="font-medium hover:underline">
                      {u.fullName}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{u.phone ?? "—"}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={u.role} />
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
