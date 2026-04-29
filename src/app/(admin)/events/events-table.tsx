"use client";

import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Event } from "@/lib/api/types";

export function EventsTable({ events }: { events: Event[] }) {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const filtered = q
    ? events.filter((e) => e.label.toLowerCase().includes(q))
    : events;

  return (
    <div>
      <div className="mb-4">
        <Input
          placeholder="Поиск по названию…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="max-w-xs"
        />
      </div>
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
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-4 py-6 text-center text-muted-foreground">
                  Ничего не найдено
                </td>
              </tr>
            ) : (
              filtered.map((e) => (
                <tr key={e.id} className="border-t hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3">
                    <Link href={`/events/${e.id}`} className="font-medium hover:underline">
                      {e.label}
                    </Link>
                    {e.ageRating && (
                      <span className="ml-2 text-xs text-muted-foreground">{e.ageRating}</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{e.time.slice(0, 10)}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {e.salesClosedAt ? `Закрыты ${e.salesClosedAt.slice(0, 10)}` : "Открыты"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
