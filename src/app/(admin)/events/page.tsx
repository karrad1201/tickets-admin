import { getAuthContext } from "@/lib/auth";
import { listEvents } from "@/lib/api/events";
import Link from "next/link";

export default async function EventsPage() {
  const ctx = await getAuthContext();
  const events = await listEvents(ctx);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">События</h1>
      {events.length === 0 ? (
        <p className="text-muted-foreground">Событий нет.</p>
      ) : (
        <div className="rounded-md border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left px-4 py-3 font-medium">Название</th>
                <th className="text-left px-4 py-3 font-medium">Начало</th>
                <th className="text-left px-4 py-3 font-medium">Продажи</th>
              </tr>
            </thead>
            <tbody>
              {events.map((e) => (
                <tr key={e.id} className="border-t hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3">
                    <Link href={`/events/${e.id}`} className="font-medium hover:underline">
                      {e.title}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{e.startsAt.slice(0, 10)}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {e.salesClosedAt ? `Закрыты ${e.salesClosedAt.slice(0, 10)}` : "Открыты"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
