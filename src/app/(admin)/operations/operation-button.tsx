"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/confirm-dialog";

interface Props {
  endpoint: string;
  label: string;
  confirmTitle: string;
}

export function OperationButton({ endpoint, label, confirmTitle }: Props) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function run() {
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const res = await fetch(endpoint, { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? res.statusText);
      setResult(
        typeof data.processed === "number" ? `Обработано: ${data.processed}` : "Выполнено"
      );
    } catch (e) {
      setError(e instanceof Error ? e.message : "Ошибка");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-2">
      <ConfirmDialog
        trigger={<Button variant="outline" disabled={loading}>{loading ? "Выполнение…" : label}</Button>}
        title={confirmTitle}
        confirmLabel="Запустить"
        onConfirm={run}
      />
      {result && <p className="text-sm text-green-600">{result}</p>}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
