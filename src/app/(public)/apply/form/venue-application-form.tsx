"use client";

import { useRef, useState } from "react";

export function VenueApplicationForm() {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [subject, setSubject] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
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
      const res = await fetch("/api/apply/venue-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          cityLabel: city,
          subjectLabel: subject,
          address,
          description: description || undefined,
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
          const uploadRes = await fetch(`/api/apply/venue-application/${appId}/documents`, {
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
          Администратор рассмотрит вашу заявку в ближайшее время.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {(
        [
          { label: "Название площадки", value: name, onChange: setName, placeholder: "Концертный зал «Ромашка»" },
          { label: "Город", value: city, onChange: setCity, placeholder: "Элиста" },
          { label: "Регион", value: subject, onChange: setSubject, placeholder: "Республика Калмыкия" },
          { label: "Адрес", value: address, onChange: setAddress, placeholder: "ул. Ленина, 1" },
        ] as const
      ).map(({ label, value, onChange, placeholder }) => (
        <div key={label} className="space-y-1">
          <label className="text-sm font-medium">{label} *</label>
          <input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      ))}
      <div className="space-y-1">
        <label className="text-sm font-medium">
          Описание <span className="text-muted-foreground font-normal">(необязательно)</span>
        </label>
        <textarea
          placeholder="Краткое описание площадки…"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary resize-none"
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
        disabled={!name || !city || !subject || !address || loading}
        className="w-full bg-primary text-primary-foreground rounded-md py-2 text-sm font-medium disabled:opacity-50"
      >
        {loading ? "Отправка…" : "Отправить заявку"}
      </button>
    </div>
  );
}
