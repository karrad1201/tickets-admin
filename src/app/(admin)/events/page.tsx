import { getAuthContext } from "@/lib/auth";
import { listEvents } from "@/lib/api/events";
import { listVenues } from "@/lib/api/venues";
import { listCategories } from "@/lib/api/categories";
import { EventsTable } from "./events-table";
import { CreateEventForm } from "./create-form";

export default async function EventsPage() {
  const ctx = await getAuthContext();
  const [events, venues, categories] = await Promise.all([
    listEvents(ctx),
    listVenues(ctx).catch(() => []),
    listCategories(ctx).catch(() => []),
  ]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <h1 className="text-2xl font-semibold mb-6">События</h1>
        {events.length === 0 ? (
          <p className="text-muted-foreground">Событий нет.</p>
        ) : (
          <EventsTable events={events} />
        )}
      </div>
      <div>
        <CreateEventForm venues={venues} categories={categories} />
      </div>
    </div>
  );
}
