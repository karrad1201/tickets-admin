"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit() {
    setError(null);
    setSuccess(false);
    if (newPassword !== confirmPassword) {
      setError("Новые пароли не совпадают");
      return;
    }
    if (newPassword.length < 6) {
      setError("Новый пароль должен быть не менее 6 символов");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? body.detail ?? "Ошибка смены пароля");
      }
      setSuccess(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Ошибка смены пароля");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">Сменить пароль</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="currentPassword">Текущий пароль</Label>
          <Input
            id="currentPassword"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="newPassword">Новый пароль</Label>
          <Input
            id="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="confirmPassword">Повторите новый пароль</Label>
          <Input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          />
        </div>
        <Button
          className="w-full"
          onClick={handleSubmit}
          disabled={loading || !currentPassword || !newPassword || !confirmPassword}
        >
          {loading ? "Сохранение…" : "Сменить пароль"}
        </Button>
        {error && (
          <div className="rounded-md bg-destructive/10 border border-destructive/20 px-3 py-2">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}
        {success && (
          <div className="rounded-md bg-green-500/10 border border-green-500/20 px-3 py-2">
            <p className="text-sm text-green-700 dark:text-green-400">Пароль успешно изменён</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
