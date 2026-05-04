import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { OrgApplicationForm } from "./org-application-form";
import { VenueApplicationForm } from "./venue-application-form";

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8080";

async function getMembership(token: string): Promise<string | null> {
  const res = await fetch(`${BACKEND}/api/v1/my/organization/membership`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (res.status === 404) return null;
  if (!res.ok) return null;
  const data = await res.json().catch(() => null);
  return data?.role ?? null;
}

export default async function ApplyFormPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("apply_token")?.value;
  if (!token) redirect("/apply");

  const role = await getMembership(token);

  if (role === "OWNER") {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">Заявка на площадку</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Заполните данные площадки для рассмотрения
          </p>
        </div>
        <VenueApplicationForm />
      </div>
    );
  }

  if (role !== null) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">Вы уже состоите в организации</h1>
        <p className="text-sm text-muted-foreground">
          Ваша текущая роль: <strong>{role}</strong>. Для подачи заявки обратитесь к владельцу организации.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Заявка на организацию</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Заполните данные для регистрации вашей организации
        </p>
      </div>
      <OrgApplicationForm />
    </div>
  );
}
