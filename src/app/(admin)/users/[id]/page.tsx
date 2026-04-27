import { getAuthContext } from "@/lib/auth";
import { getUser } from "@/lib/api/users";
import { StatusBadge } from "@/components/status-badge";
import Link from "next/link";

export default async function UserPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const ctx = await getAuthContext();
  const user = await getUser(ctx, id);

  return (
    <div className="max-w-2xl">
      <div className="mb-4">
        <Link href="/users" className="text-sm text-muted-foreground hover:underline">
          ← Пользователи
        </Link>
      </div>
      <h1 className="text-2xl font-semibold mb-6">{user.fullName}</h1>
      <div className="rounded-md border divide-y text-sm">
        <Row label="ID" value={user.id} mono />
        <Row label="Телефон" value={user.phone ?? "—"} />
        <Row label="Email" value={user.email ?? "—"} />
        <div className="flex px-4 py-3 gap-4">
          <span className="w-32 shrink-0 text-muted-foreground">Роль</span>
          <StatusBadge status={user.role} />
        </div>
      </div>
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
