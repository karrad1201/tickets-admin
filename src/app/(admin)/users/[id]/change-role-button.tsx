"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function ChangeRoleButton({ userId, currentRole }: { userId: string; currentRole: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const targetRole = currentRole === "ADMIN" ? "USER" : "ADMIN";
  const label = currentRole === "ADMIN" ? "Снять права админа" : "Сделать администратором";

  async function handleClick() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/users/${userId}/role`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: targetRole }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? `Ошибка ${res.status}`);
      }
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Ошибка");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-1">
      <button
        onClick={handleClick}
        disabled={loading}
        className={`text-sm px-3 py-1.5 rounded-md border transition-colors disabled:opacity-50 ${
          targetRole === "ADMIN"
            ? "border-amber-500 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950"
            : "border-muted-foreground text-muted-foreground hover:bg-muted"
        }`}
      >
        {loading ? "..." : label}
      </button>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
