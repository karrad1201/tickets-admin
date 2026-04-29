import { getAuthContext } from "@/lib/auth";
import { getEvent } from "@/lib/api/events";
import { getVenue } from "@/lib/api/venues";
import { CloseEventSalesButton } from "./close-sales-button";
import Link from "next/link";

export default async function EventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const ctx = await getAuthContext();
  const event = await getEvent(ctx, id);

  const venue = await getVenue(ctx, event.venueId).catch(() => null);

  return (
    <div className="max-w-2xl">
      <div className="mb-4">
        <Link href="/events" className="text-sm text-muted-foreground hover:underline">
          ← События
        </Link>
      </div>
      <h1 className="text-2xl font-semibold mb-6">{event.title}</h1>
      <div className="rounded-md border divide-y text-sm mb-6">
        <Row label="ID" value={event.id} mono />
        <div className="flex px-4 py-3 gap-4">
          <span className="w-32 shrink-0 text-muted-foreground">Площадка</span>
          {venue ? (
            <Link href={`/venues/${venue.id}`} className="hover:underline font-medium">
              {venue.label}
            </Link>
          ) : (
            <span className="font-mono text-xs text-muted-foreground">{event.venueId}</span>
          )}
        </div>
        <Row label="Начало" value={event.startsAt.slice(0, 16).replace("T", " ")} />
        <Row
          label="Продажи"
          value={event.salesClosedAt ? `Закрыты ${event.salesClosedAt.slice(0, 10)}` : "Открыты"}
        />
      </div>
      {!event.salesClosedAt && <CloseEventSalesButton id={event.id} />}
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
