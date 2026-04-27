import { getAuthContext } from "@/lib/auth";
import { listVenues } from "@/lib/api/venues";
import Link from "next/link";

export default async function VenuesPage() {
  const ctx = await getAuthContext();
  const venues = await listVenues(ctx);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Площадки</h1>
      {venues.length === 0 ? (
        <p className="text-muted-foreground">Площадок нет.</p>
      ) : (
        <div className="rounded-md border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left px-4 py-3 font-medium">Название</th>
                <th className="text-left px-4 py-3 font-medium">Адрес</th>
                <th className="text-left px-4 py-3 font-medium">Организация</th>
              </tr>
            </thead>
            <tbody>
              {venues.map((v) => (
                <tr key={v.id} className="border-t hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3">
                    <Link href={`/venues/${v.id}`} className="font-medium hover:underline">
                      {v.label}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{v.address ?? "—"}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{v.organizationId ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
