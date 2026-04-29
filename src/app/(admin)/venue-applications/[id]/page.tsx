import { getAuthContext } from "@/lib/auth";
import { getVenueApplication } from "@/lib/api/venue-applications";
import { StatusBadge } from "@/components/status-badge";
import { VenueApplicationActions } from "./actions";
import Link from "next/link";

export default async function VenueApplicationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const ctx = await getAuthContext();
  const app = await getVenueApplication(ctx, id);

  return (
    <div className="max-w-2xl">
      <div className="mb-4">
        <Link href="/venue-applications" className="text-sm text-muted-foreground hover:underline">
          ← Заявки на площадки
        </Link>
      </div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">{app.name}</h1>
        <StatusBadge status={app.status} />
      </div>

      <div className="rounded-md border divide-y text-sm mb-6">
        <Row label="ID" value={app.id} mono />
        <Row label="Город" value={app.cityLabel} />
        <Row label="Субъект РФ" value={app.subjectLabel} />
        <Row label="Адрес" value={app.address} />
        {app.description && <Row label="Описание" value={app.description} />}
        <Row label="Организация" value={app.organizationId} mono />
        <Row label="Заявитель" value={app.applicantUserId} mono />
        <Row label="Дата подачи" value={app.createdAt.slice(0, 10)} />
        {app.venueId && <Row label="Созданная площадка" value={app.venueId} mono />}
      </div>

      {app.documentUrls.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-medium mb-2">Документы ({app.documentUrls.length})</h2>
          <ul className="space-y-1">
            {app.documentUrls.map((url, i) => {
              const safe = isSafeUrl(url);
              return (
                <li key={i}>
                  {safe ? (
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline break-all"
                    >
                      {url.split("/").pop() ?? `Документ ${i + 1}`}
                    </a>
                  ) : (
                    <span className="text-sm text-muted-foreground break-all" title="Небезопасный URL">
                      {url.split("/").pop() ?? `Документ ${i + 1}`}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {app.status === "PENDING" && <VenueApplicationActions id={app.id} />}
    </div>
  );
}

function isSafeUrl(url: string): boolean {
  try {
    const { protocol } = new URL(url);
    return protocol === "https:" || protocol === "http:";
  } catch {
    return false;
  }
}

function Row({ label, value, mono }: { label: string; value: React.ReactNode; mono?: boolean }) {
  return (
    <div className="flex px-4 py-3 gap-4">
      <span className="w-40 shrink-0 text-muted-foreground">{label}</span>
      <span className={mono ? "font-mono text-xs break-all" : ""}>{value}</span>
    </div>
  );
}
