"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const BASE = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8080";

export default function LoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"phone" | "code">("phone");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function sendCode() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BASE}/auth/send-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });
      if (!res.ok) throw new Error(await res.text());
      setStep("code");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Ошибка отправки кода");
    } finally {
      setLoading(false);
    }
  }

  async function verifyCode() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, code }),
      });
      if (!res.ok) throw new Error(await res.text());
      const { accessToken, refreshToken, user } = await res.json();

      const saveRes = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accessToken, refreshToken, userId: user.id }),
      });
      if (!saveRes.ok) throw new Error("Не удалось сохранить сессию");
      router.push("/dashboard");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Неверный код");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-sm px-4">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center shadow-md mb-3">
            <span className="text-primary-foreground text-2xl font-bold">T</span>
          </div>
          <div className="text-xl font-semibold">Tickets</div>
          <div className="text-sm text-muted-foreground">Admin Panel</div>
        </div>

        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">
              {step === "phone" ? "Вход в систему" : "Введите код"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {step === "phone" ? (
              <>
                <div className="space-y-1.5">
                  <Label htmlFor="phone">Номер телефона</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+79001234567"
                    value={phone}
                    autoFocus
                    onChange={(e) => setPhone(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendCode()}
                  />
                </div>
                <Button className="w-full" onClick={sendCode} disabled={loading || !phone}>
                  {loading ? "Отправка…" : "Получить код"}
                </Button>
              </>
            ) : (
              <>
                <p className="text-sm text-muted-foreground">
                  SMS-код отправлен на <span className="font-medium text-foreground">{phone}</span>
                </p>
                <div className="space-y-1.5">
                  <Label htmlFor="code">SMS-код</Label>
                  <Input
                    id="code"
                    type="text"
                    inputMode="numeric"
                    placeholder="123456"
                    maxLength={6}
                    value={code}
                    autoFocus
                    onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                    onKeyDown={(e) => e.key === "Enter" && verifyCode()}
                  />
                </div>
                <Button className="w-full" onClick={verifyCode} disabled={loading || code.length < 4}>
                  {loading ? "Проверка…" : "Войти"}
                </Button>
                <Button variant="ghost" className="w-full text-muted-foreground" onClick={() => { setStep("phone"); setCode(""); setError(null); }}>
                  Изменить номер
                </Button>
              </>
            )}
            {error && (
              <div className="rounded-md bg-destructive/10 border border-destructive/20 px-3 py-2">
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
