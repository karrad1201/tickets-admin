import { getAuthContext } from "@/lib/auth";
import { listOrganizations } from "@/lib/api/organizations";
import Link from "next/link";

export default async function OrganizationsPage() {
  const ctx = await getAuthContext();
  const orgs = await listOrganizations(ctx);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Организации</h1>
      {orgs.length === 0 ? (
        <p className="text-muted-foreground">Организаций нет.</p>
      ) : (
        <div className="rounded-md border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left px-4 py-3 font-medium">Название</th>
                <th className="text-left px-4 py-3 font-medium">Дата создания</th>
              </tr>
            </thead>
            <tbody>
              {orgs.map((org) => (
                <tr key={org.id} className="border-t hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3">
                    <Link href={`/organizations/${org.id}`} className="font-medium hover:underline">
                      {org.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{org.createdAt.slice(0, 10)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
