# ADR 0003: API Layer — нативный fetch без HTTP-клиента

## Status

Accepted

## Context

Нужно решить, как организовать запросы к бэкенду.

Варианты:

| Вариант | Плюсы | Минусы |
|---------|-------|--------|
| Axios | Знакомый API | Не работает с Next.js fetch cache, лишняя зависимость |
| SWR / React Query | Автоматическая ревалидация | Только клиентские компоненты, усложняет Server Components |
| tRPC | Type-safe end-to-end | Требует адаптера на бэкенде (Spring не поддерживает) |
| Нативный `fetch` | Встроен в Next.js, поддерживает `next: { revalidate }`, нет зависимостей | Нет автоматической ревалидации на клиенте |

## Decision

Использовать нативный `fetch` с тонкими типизированными обёртками в `lib/api/`.

Каждый модуль `lib/api/<section>.ts`:

```ts
export async function listOrgApplications(
  token: string,
  userId: string
): Promise<OrgApplication[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/organization-applications`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'X-User-Id': userId,
    },
    next: { revalidate: 30 },
  });
  if (!res.ok) throw new ApiError(res.status, await res.text());
  return res.json();
}
```

Для мутаций (approve/reject/close-sales) — `{ cache: 'no-store' }` и вызов `revalidatePath` после.

Если в будущем понадобится автоматическая фоновая ревалидация на клиенте — добавить React Query
только для конкретных страниц с polling (например, `/operations`), не заменяя весь API layer.

## Consequences

Плюсы:

- Полная совместимость с Next.js fetch cache и `revalidatePath`.
- Нет лишних зависимостей.
- Каждая функция — простой типизированный fetch, легко читать и тестировать.

Минусы:

- Нет автоматической ревалидации при фокусе окна / reconnect — приемлемо для инструмента администратора.
- Обработка ошибок — ручная в каждой обёртке.
