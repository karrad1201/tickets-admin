"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { normalizePhone } from "@/lib/utils";

export default function ApplyPhonePage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSendCode() {
    setLoading(true);
    setError(null);
    try {
      const normalized = normalizePhone(phone);
      const res = await fetch("/api/apply/send-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: normalized }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message ?? "Не удалось отправить код");
      }
      router.push(`/apply/otp?phone=${encodeURIComponent(normalized)}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Ошибка");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Подача заявки</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Введите номер телефона для входа
        </p>
      </div>

      <div className="space-y-3">
        <input
          type="tel"
          placeholder="+79001234567"
          value={phone}
          onChange={(e) => { setPhone(e.target.value); setError(null); }}
          onKeyDown={(e) => e.key === "Enter" && handleSendCode()}
          className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
          autoFocus
        />
        {error && <p className="text-sm text-destructive">{error}</p>}
        <button
          onClick={handleSendCode}
          disabled={!phone || loading}
          className="w-full bg-primary text-primary-foreground rounded-md py-2 text-sm font-medium disabled:opacity-50"
        >
          {loading ? "Отправка…" : "Получить код"}
        </button>
      </div>
    </div>
  );
}
