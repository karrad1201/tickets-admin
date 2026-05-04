"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const ROLES = ["OWNER", "MANAGER", "STAFF"] as const;

type Venue = { id: string; label: string };

export function AddMemberForm({
  organizationId,
  venues,
}: {
  organizationId: string;
  venues: Venue[];
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [role, setRole] = useState<(typeof ROLES)[number]>("STAFF");
  const [venueId, setVenueId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const needsVenue = role === "MANAGER" || role === "STAFF";

  async function handleAdd() {
    setError(null);
    setLoading(true);
    try {
      const body: Record<string, string> = { organizationId, userId: userId.trim(), role };
      if (needsVenue && venueId) body.venueId = venueId;
      const res = await fetch("/api/organization-members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.detail ?? body.error ?? `Ошибка ${res.status}`);
      }
      setOpen(false);
      setUserId("");
      setRole("STAFF");
      setVenueId("");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Ошибка");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button size="sm" variant="outline">+ Добавить участника</Button>} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Добавить участника</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <Label htmlFor="userId">ID пользователя</Label>
            <Input
              id="userId"
              placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
              value={userId}
              autoFocus
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label>Роль</Label>
            <div className="flex gap-2">
              {ROLES.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`px-3 py-1.5 rounded-md border text-sm transition-colors ${
                    role === r
                      ? "bg-foreground text-background border-foreground"
                      : "hover:bg-muted"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
          {needsVenue && (
            <div className="space-y-1.5">
              <Label htmlFor="venueId">Площадка</Label>
              {venues.length > 0 ? (
                <select
                  id="venueId"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={venueId}
                  onChange={(e) => setVenueId(e.target.value)}
                >
                  <option value="">— выберите площадку —</option>
                  {venues.map((v) => (
                    <option key={v.id} value={v.id}>{v.label}</option>
                  ))}
                </select>
              ) : (
                <Input
                  id="venueId"
                  placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                  value={venueId}
                  onChange={(e) => setVenueId(e.target.value)}
                />
              )}
            </div>
          )}
          {error && (
            <div className="rounded-md bg-destructive/10 border border-destructive/20 px-3 py-2">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}
          <Button
            className="w-full"
            onClick={handleAdd}
            disabled={loading || !userId.trim() || (needsVenue && !venueId)}
          >
            {loading ? "Добавление…" : "Добавить"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
