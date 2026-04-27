"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/confirm-dialog";

export function VenueApplicationActions({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function act(action: "approve" | "reject") {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/venue-applications/${id}/${action}`, { method: "POST" });
      if (!res.ok) throw new Error(await res.text());
      router.push("/venue-applications");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Ошибка");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-3">
      {error && <p className="text-sm text-destructive">{error}</p>}
      <div className="flex gap-3">
        <ConfirmDialog
          trigger={<Button disabled={loading}>Одобрить</Button>}
          title="Одобрить заявку?"
          description="Будет создана площадка. Действие необратимо."
          confirmLabel="Одобрить"
          onConfirm={() => act("approve")}
        />
        <ConfirmDialog
          trigger={<Button variant="destructive" disabled={loading}>Отклонить</Button>}
          title="Отклонить заявку?"
          confirmLabel="Отклонить"
          destructive
          onConfirm={() => act("reject")}
        />
      </div>
    </div>
  );
}
