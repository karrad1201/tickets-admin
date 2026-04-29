"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function logout() {
    setLoading(true);
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={logout}
      disabled={loading}
      className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10"
    >
      <span className="mr-2">↩</span>
      {loading ? "Выход…" : "Выйти"}
    </Button>
  );
}
