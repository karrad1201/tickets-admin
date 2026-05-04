"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function DeleteMemberButton({ memberId, isSelf }: { memberId: string; isSelf: boolean }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  if (isSelf) {
    return (
      <span className="text-xs text-muted-foreground opacity-40" title="Нельзя удалить себя">
        Удалить
      </span>
    );
  }

  async function handleDelete() {
    if (!confirm("Удалить участника из организации?")) return;
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(`/api/organization-members/${memberId}`, { method: "DELETE" });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setError(body.error ?? `Ошибка ${res.status}`);
        return;
      }
      router.refresh();
    } catch {
      setError("Ошибка сети");
    } finally {
      setLoading(false);
    }
  }

  return (
    <span className="inline-flex flex-col items-end gap-1">
      {error && <span className="text-xs text-destructive">{error}</span>}
      <button
        onClick={handleDelete}
        disabled={loading}
        className="text-xs text-muted-foreground hover:text-destructive transition-colors disabled:opacity-50"
      >
        {loading ? "…" : "Удалить"}
      </button>
    </span>
  );
}
