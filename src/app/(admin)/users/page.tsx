import { getAuthContext } from "@/lib/auth";
import { listUsers } from "@/lib/api/users";
import { CreateUserForm } from "./create-user-form";
import { UsersTable } from "./users-table";

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
        <UsersTable users={users} />
      )}
    </div>
  );
}
