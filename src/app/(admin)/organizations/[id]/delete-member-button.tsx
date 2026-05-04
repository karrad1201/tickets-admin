"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function DeleteMemberButton({ memberId, isSelf }: { memberId: string; isSelf: boolean }) {
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    try {
      await fetch(`/api/organization-members/${memberId}`, { method: "DELETE" });
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="text-xs text-muted-foreground hover:text-destructive transition-colors disabled:opacity-50"
    >
      {loading ? "…" : "Удалить"}
    </button>
  );
}
