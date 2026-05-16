"use client";

import { useRef, useState } from "react";

export function OrgApplicationForm() {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleSubmit() {
    setLoading(true);
    setError(null);
    try {
      // 1. Подаём заявку
      const res = await fetch("/api/apply/org-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          organizationName: name,
          organizationCode: code,
          contactEmail: contactEmail || undefined,
          contactPhone: contactPhone || undefined,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message ?? data.detail ?? "Ошибка подачи заявки");

      // 2. Загружаем документы если выбраны
      if (files.length > 0) {
        const appId: string = data.id;
        for (const file of files) {
          const fd = new FormData();
          fd.append("file", file);
          const uploadRes = await fetch(`/api/apply/org-application/${appId}/documents`, {
            method: "POST",
            body: fd,
          });
          if (!uploadRes.ok) {
            const upBody = await uploadRes.json().catch(() => ({}));
            throw new Error(upBody.message ?? `Ошибка загрузки документа ${file.name}`);
          }
        }
      }

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
        <label className="text-sm font-medium">Название организации *</label>
        <input
          type="text"
          placeholder="ООО Ромашка"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div className="space-y-1">
        <label className="text-sm font-medium">Код организации *</label>
        <input
          type="text"
          placeholder="romashka"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
        />
        <p className="text-xs text-muted-foreground">Латинские буквы и цифры, без пробелов</p>
      </div>
      <div className="space-y-1">
        <label className="text-sm font-medium">Контактный email</label>
        <input
          type="email"
          placeholder="info@romashka.ru"
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
          className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div className="space-y-1">
        <label className="text-sm font-medium">Контактный телефон</label>
        <input
          type="tel"
          placeholder="+79001234567"
          value={contactPhone}
          onChange={(e) => setContactPhone(e.target.value)}
          className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div className="space-y-1">
        <label className="text-sm font-medium">
          Подтверждающие документы{" "}
          <span className="text-muted-foreground font-normal">(необязательно, до 10 файлов)</span>
        </label>
        <input
          ref={fileRef}
          type="file"
          multiple
          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
          className="hidden"
          onChange={(e) => setFiles(Array.from(e.target.files ?? []).slice(0, 10))}
        />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="w-full border border-dashed rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted/50 transition-colors text-left"
        >
          {files.length === 0
            ? "Выбрать файлы…"
            : files.map((f) => f.name).join(", ")}
        </button>
        {files.length > 0 && (
          <button
            type="button"
            onClick={() => setFiles([])}
            className="text-xs text-muted-foreground hover:text-destructive"
          >
            Очистить
          </button>
        )}
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
