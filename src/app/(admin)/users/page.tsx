import { getAuthContext } from "@/lib/auth";
import { listUsers } from "@/lib/api/users";
import { SearchFilter } from "@/components/search-filter";
import { StatusBadge } from "@/components/status-badge";
import { User } from "@/lib/api/types";
import Link from "next/link";
import { CreateUserForm } from "./create-user-form";

export default async function UsersPage() {
  const ctx = await getAuthContext();
  const users = await listUsers(ctx);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Пользователи</h1>
        <CreateUserForm />
      </div>
      {users.length === 0 ? (
        <p className="text-muted-foreground">Пользователей нет.</p>
      ) : (
        <SearchFilter
          items={users}
          placeholder="Поиск по имени или телефону…"
          filterFn={(u: User, q) =>
            u.fullName.toLowerCase().includes(q) || (u.phone ?? "").includes(q)
          }
        >
          {(filtered) => (
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
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="px-4 py-6 text-center text-muted-foreground">
                        Ничего не найдено
                      </td>
                    </tr>
                  ) : (
                    filtered.map((u) => (
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
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </SearchFilter>
      )}
    </div>
  );
}
