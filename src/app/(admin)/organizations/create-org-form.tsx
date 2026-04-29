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

export function CreateOrganizationForm() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCreate() {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/organizations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, code }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.detail ?? body.error ?? "Ошибка создания организации");
      }
      const org = await res.json();
      setOpen(false);
      setName("");
      setCode("");
      router.push(`/organizations/${org.id}`);
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Ошибка");
    } finally {
      setLoading(false);
    }
  }

  function autoCode(value: string) {
    setName(value);
    if (!code) {
      setCode(value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""));
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button size="sm">+ Создать организацию</Button>} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Новая организация</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <Label htmlFor="name">Название *</Label>
            <Input
              id="name"
              placeholder="ООО Ромашка"
              value={name}
              autoFocus
              onChange={(e) => autoCode(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="code">Код (уникальный slug) *</Label>
            <Input
              id="code"
              placeholder="romashka"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCreate()}
            />
          </div>
          {error && (
            <div className="rounded-md bg-destructive/10 border border-destructive/20 px-3 py-2">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}
          <Button
            className="w-full"
            onClick={handleCreate}
            disabled={loading || !name.trim() || !code.trim()}
          >
            {loading ? "Создание…" : "Создать"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
