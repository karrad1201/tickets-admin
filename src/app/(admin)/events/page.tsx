import { getAuthContext } from "@/lib/auth";
import { listEvents } from "@/lib/api/events";
import { EventsTable } from "./events-table";

export default async function EventsPage() {
  const ctx = await getAuthContext();
  const events = await listEvents(ctx);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">События</h1>
      {events.length === 0 ? (
        <p className="text-muted-foreground">Событий нет.</p>
      ) : (
        <EventsTable events={events} />
      )}
    </div>
  );
}
