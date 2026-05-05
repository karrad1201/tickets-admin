"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function InventoryForm({ eventId }: { eventId: string }) {
  const router = useRouter();
  const [ticketLabel, setTicketLabel] = useState("");
  const [price, setPrice] = useState("");
  const [quota, setQuota] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const priceNum = Number(price);
  const priceValid = price !== "" && Number.isInteger(priceNum) && priceNum > 0;
  const canSubmit = ticketLabel.trim() && priceValid && !loading;

  async function submit() {
    if (!canSubmit) return;
    setLoading(true);
    setError(null);
    try {
      const body: Record<string, unknown> = {
        label: ticketLabel.trim(),
        price: priceNum,
      };
      if (quota !== "") body.quota = Number(quota);

      const res = await fetch(`/api/events/${eventId}/inventory`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? `Ошибка ${res.status}`);
      }
      setTicketLabel("");
      setPrice("");
      setQuota("");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Ошибка создания");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Добавить тип билета</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1.5">
          <Label>Название типа</Label>
          <Input
            value={ticketLabel}
            onChange={(e) => setTicketLabel(e.target.value)}
            placeholder="Входной билет"
          />
        </div>

        <div className="space-y-1.5">
          <Label>Цена (₽) *</Label>
          <Input
            type="number"
            min={1}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="500"
          />
          {price !== "" && !priceValid && (
            <p className="text-xs text-destructive">Цена должна быть больше 0</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label>Квота (необязательно)</Label>
          <Input
            type="number"
            min={0}
            value={quota}
            onChange={(e) => setQuota(e.target.value)}
            placeholder="100"
          />
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}

        <Button className="w-full" onClick={submit} disabled={!canSubmit}>
          {loading ? "Добавление…" : "Добавить тип билета"}
        </Button>
      </CardContent>
    </Card>
  );
}
