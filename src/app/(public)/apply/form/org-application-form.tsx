"use client";

import { useState } from "react";

export function OrgApplicationForm() {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/apply/org-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ organizationName: name, organizationCode: code }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message ?? data.detail ?? "Ошибка подачи заявки");
      setSuccess(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Ошибка");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="rounded-md border border-green-200 bg-green-50 px-4 py-3">
        <p className="text-sm text-green-800 font-medium">Заявка отправлена!</p>
        <p className="text-sm text-green-700 mt-1">
          Мы рассмотрим вашу заявку и свяжемся с вами.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <label className="text-sm font-medium">Название организации</label>
        <input
          type="text"
          placeholder="ООО Ромашка"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div className="space-y-1">
        <label className="text-sm font-medium">Код организации</label>
        <input
          type="text"
          placeholder="romashka"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
        />
        <p className="text-xs text-muted-foreground">Латинские буквы и цифры, без пробелов</p>
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
      <button
        onClick={handleSubmit}
        disabled={!name || !code || loading}
        className="w-full bg-primary text-primary-foreground rounded-md py-2 text-sm font-medium disabled:opacity-50"
      >
        {loading ? "Отправка…" : "Отправить заявку"}
      </button>
    </div>
  );
}
