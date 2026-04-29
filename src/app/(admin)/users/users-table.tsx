"use client";

import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/status-badge";
import { User } from "@/lib/api/types";

export function UsersTable({ users }: { users: User[] }) {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const filtered = q
    ? users.filter((u) => u.fullName.toLowerCase().includes(q) || (u.phone ?? "").includes(q))
    : users;

  return (
    <div>
      <div className="mb-4">
        <Input
          placeholder="Поиск по имени или телефону…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="max-w-xs"
        />
      </div>
      <div className="rounded-md border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left px-4 py-3 font-medium">Имя</th>
              <th className="text-left px-4 py-3 font-medium">Телефон</th>
              <th className="text-left px-4 py-3 font-medium">Роль</th>
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
              filtered.map((u) => (
                <tr key={u.id} className="border-t hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3">
                    <Link href={`/users/${u.id}`} className="font-medium hover:underline">
                      {u.fullName}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{u.phone ?? "—"}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={u.role} />
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
