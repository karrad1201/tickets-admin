"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/confirm-dialog";

export function CloseEventSalesButton({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function close() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/events/${id}/close-sales`, { method: "POST" });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.detail ?? body.error ?? `Ошибка ${res.status}`);
      }
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Ошибка");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-2">
      {error && <p className="text-sm text-destructive">{error}</p>}
      <ConfirmDialog
        trigger={<Button variant="destructive" disabled={loading}>Закрыть продажи</Button>}
        title="Закрыть продажи?"
        description="Все pending-попытки оплаты будут отменены. Действие необратимо."
        confirmLabel="Закрыть"
        destructive
        onConfirm={close}
      />
    </div>
  );
}
