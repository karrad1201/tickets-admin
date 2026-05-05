"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AGE_RATINGS = ["0+", "6+", "12+", "16+", "18+"];

const selectCls =
  "h-8 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";

interface Venue { id: string; label: string; }
interface Category { id: string; label: string; }

export function CreateEventForm({ venues, categories }: { venues: Venue[]; categories: Category[] }) {
  const router = useRouter();
  const [label, setLabel] = useState("");
  const [description, setDescription] = useState("");
  const [venueId, setVenueId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [ageRating, setAgeRating] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit =
    label.trim() &&
    description.trim() &&
    venueId &&
    categoryId &&
    ageRating &&
    /^\d{4}-\d{2}-\d{2}$/.test(date) &&
    /^\d{2}:\d{2}$/.test(time) &&
    !loading;

  async function submit() {
    if (!canSubmit) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          label: label.trim(),
          description: description.trim(),
          venueId,
          categoryId,
          ageRating,
          time: `${date}T${time}:00Z`,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? `Ошибка ${res.status}`);
      }
      const event = await res.json();
      router.push(`/events/${event.id}`);
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
        <CardTitle className="text-base">Новое мероприятие</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1.5">
          <Label>Название</Label>
          <Input value={label} onChange={(e) => setLabel(e.target.value)} placeholder="Концерт группы…" />
        </div>

        <div className="space-y-1.5">
          <Label>Описание</Label>
          <Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
        </div>

        <div className="space-y-1.5">
          <Label>Площадка</Label>
          <select className={selectCls} value={venueId} onChange={(e) => setVenueId(e.target.value)}>
            <option value="">Выберите площадку</option>
            {venues.map((v) => <option key={v.id} value={v.id}>{v.label}</option>)}
          </select>
        </div>

        <div className="space-y-1.5">
          <Label>Категория</Label>
          <select className={selectCls} value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
            <option value="">Выберите категорию</option>
            {categories.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
          </select>
        </div>

        <div className="space-y-1.5">
          <Label>Возрастное ограничение *</Label>
          <select className={selectCls} value={ageRating} onChange={(e) => setAgeRating(e.target.value)}>
            <option value="">Выберите ограничение</option>
            {AGE_RATINGS.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label>Дата</Label>
            <Input value={date} onChange={(e) => setDate(e.target.value)} placeholder="2025-12-31" />
          </div>
          <div className="space-y-1.5">
            <Label>Время (UTC)</Label>
            <Input value={time} onChange={(e) => setTime(e.target.value)} placeholder="18:00" />
          </div>
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}

        <Button className="w-full" onClick={submit} disabled={!canSubmit}>
          {loading ? "Создание…" : "Создать мероприятие"}
        </Button>
      </CardContent>
    </Card>
  );
}
