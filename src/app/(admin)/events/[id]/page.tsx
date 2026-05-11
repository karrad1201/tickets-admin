import { DetailRow } from "@/components/detail-row";
import { getAuthContext } from "@/lib/auth";
import { getEvent, getInventoryPlan } from "@/lib/api/events";
import { getVenue } from "@/lib/api/venues";
import { getCategory } from "@/lib/api/categories";
import { getOrganization } from "@/lib/api/organizations";
import { CloseEventSalesButton } from "./close-sales-button";
import { InventoryForm } from "./inventory-form";
import Link from "next/link";

export default async function EventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const ctx = await getAuthContext();
  const event = await getEvent(ctx, id);

  const [venue, category, organization, plan] = await Promise.all([
    getVenue(ctx, event.venueId).catch(() => null),
    getCategory(ctx, event.categoryId).catch(() => null),
    event.organizationId ? getOrganization(ctx, event.organizationId).catch(() => null) : Promise.resolve(null),
    getInventoryPlan(ctx, id).catch(() => null),
  ]);

  const sold = plan
    ? plan.mode === "GENERAL_ADMISSION"
      ? plan.admissionInventory.reduce((s, t) => s + t.sold, 0)
      : plan.seatInventory.filter((s) => s.status === "SOLD").length
    : null;
  const capacity = plan
    ? plan.mode === "GENERAL_ADMISSION"
      ? plan.admissionInventory.reduce((s, t) => s + t.capacity, 0)
      : plan.seatInventory.length
    : null;

  return (
    <div className="max-w-2xl grid gap-6">
      <div className="mb-4">
        <Link href="/events" className="text-sm text-muted-foreground hover:underline">
          ← События
        </Link>
      </div>
      <h1 className="text-2xl font-semibold mb-6">{event.label}</h1>
      <div className="rounded-md border divide-y text-sm mb-6">
        <DetailRow label="ID" value={event.id} mono />
        <div className="flex px-4 py-3 gap-4">
          <span className="w-40 shrink-0 text-muted-foreground">Площадка</span>
          {venue ? (
            <Link href={`/venues/${venue.id}`} className="hover:underline font-medium">
              {venue.label}
            </Link>
          ) : (
            <span className="font-mono text-xs text-muted-foreground">{event.venueId}</span>
          )}
        </div>
        <div className="flex px-4 py-3 gap-4">
          <span className="w-40 shrink-0 text-muted-foreground">Категория</span>
          {category ? (
            <Link href={`/categories/${category.id}`} className="hover:underline">
              {category.label}
            </Link>
          ) : (
            <span className="font-mono text-xs text-muted-foreground">{event.categoryId}</span>
          )}
        </div>
        {organization && (
          <div className="flex px-4 py-3 gap-4">
            <span className="w-40 shrink-0 text-muted-foreground">Организация</span>
            <Link href={`/organizations/${organization.id}`} className="hover:underline font-medium">
              {organization.name}
            </Link>
          </div>
        )}
        <DetailRow label="Начало" value={event.time.slice(0, 16).replace("T", " ")} />
        <DetailRow
          label="Продажи"
          value={event.salesClosedAt ? `Закрыты ${event.salesClosedAt.slice(0, 10)}` : "Открыты"}
        />
        {event.ageRating && <DetailRow label="Возраст" value={event.ageRating} />}
        {event.minPrice != null && <DetailRow label="Цена от" value={`${event.minPrice} ₽`} />}
        <DetailRow label="Тип мест" value={event.hasSeatMap ? "Схема зала" : "Свободный вход"} />
        {event.description && (
          <div className="flex px-4 py-3 gap-4">
            <span className="w-40 shrink-0 text-muted-foreground">Описание</span>
            <span className="text-sm leading-relaxed">{event.description}</span>
          </div>
        )}
      </div>
      {plan && sold !== null && capacity !== null && (
        <div className="rounded-md border p-4">
          <p className="text-sm font-medium mb-3">Статистика продаж</p>
          <div className="flex items-center gap-4 mb-2">
            <span className="text-2xl font-semibold">{sold}</span>
            <span className="text-muted-foreground text-sm">/ {capacity} билетов продано</span>
            {capacity > 0 && (
              <span className="ml-auto text-sm font-medium text-primary">
                {Math.round((sold / capacity) * 100)}%
              </span>
            )}
          </div>
          {capacity > 0 && (
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all"
                style={{ width: `${Math.min(100, Math.round((sold / capacity) * 100))}%` }}
              />
            </div>
          )}
          {plan.mode === "GENERAL_ADMISSION" && plan.admissionInventory.length > 1 && (
            <div className="mt-3 divide-y text-sm">
              {plan.admissionInventory.map((t) => (
                <div key={t.ticketTypeId} className="flex justify-between py-1.5">
                  <span className="text-muted-foreground">{t.label}</span>
                  <span>{t.sold} / {t.capacity}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      {!event.salesClosedAt && <CloseEventSalesButton id={event.id} />}
      <InventoryForm eventId={event.id} />
    </div>
  );
}

