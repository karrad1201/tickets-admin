import { getAuthContext } from "@/lib/auth";
import { getVenue } from "@/lib/api/venues";
import { getOrganization } from "@/lib/api/organizations";
import Link from "next/link";

export default async function VenuePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const ctx = await getAuthContext();
  const venue = await getVenue(ctx, id);

  const org = venue.organizationId
    ? await getOrganization(ctx, venue.organizationId).catch(() => null)
    : null;

  return (
    <div className="max-w-2xl">
      <div className="mb-4">
        <Link href="/venues" className="text-sm text-muted-foreground hover:underline">
          ← Площадки
        </Link>
      </div>
      <h1 className="text-2xl font-semibold mb-6">{venue.label}</h1>
      <div className="rounded-md border divide-y text-sm">
        <Row label="ID" value={venue.id} mono />
        <Row label="Адрес" value={venue.address ?? "—"} />
        <div className="flex px-4 py-3 gap-4">
          <span className="w-32 shrink-0 text-muted-foreground">Организация</span>
          {org ? (
            <Link href={`/organizations/${org.id}`} className="hover:underline font-medium">
              {org.name}
            </Link>
          ) : venue.organizationId ? (
            <span className="font-mono text-xs text-muted-foreground">{venue.organizationId}</span>
          ) : (
            <span className="text-muted-foreground">—</span>
          )}
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
