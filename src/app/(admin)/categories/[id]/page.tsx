import { getAuthContext } from "@/lib/auth";
import { getCategory } from "@/lib/api/categories";
import { listEvents } from "@/lib/api/events";
import Link from "next/link";

export default async function CategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const ctx = await getAuthContext();

  const [category, allEvents] = await Promise.all([
    getCategory(ctx, id),
    listEvents(ctx).catch(() => [] as Awaited<ReturnType<typeof listEvents>>),
  ]);

  const events = allEvents.filter((e) => e.categoryId === id);

  return (
    <div className="max-w-2xl">
      <div className="mb-4">
        <Link href="/categories" className="text-sm text-muted-foreground hover:underline">
          ← Категории
        </Link>
      </div>
      <h1 className="text-2xl font-semibold mb-6">{category.label}</h1>
      <div className="rounded-md border divide-y text-sm mb-6">
        <div className="flex px-4 py-3 gap-4">
          <span className="w-32 shrink-0 text-muted-foreground">ID</span>
          <span className="font-mono text-xs break-all">{category.id}</span>
        </div>
        <div className="flex px-4 py-3 gap-4">
          <span className="w-32 shrink-0 text-muted-foreground">Код</span>
          <span className="font-mono">{category.code}</span>
        </div>
      </div>

      <h2 className="text-base font-medium mb-3">События в категории ({events.length})</h2>
      {events.length === 0 ? (
        <p className="text-muted-foreground text-sm">Нет событий.</p>
      ) : (
        <div className="rounded-md border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left px-4 py-3 font-medium">Название</th>
                <th className="text-left px-4 py-3 font-medium">Дата</th>
              </tr>
            </thead>
            <tbody>
              {events.map((e) => (
                <tr key={e.id} className="border-t hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3">
                    <Link href={`/events/${e.id}`} className="font-medium hover:underline">
                      {e.label}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{e.time.slice(0, 10)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
