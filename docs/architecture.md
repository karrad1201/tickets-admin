# Architecture

## Обзор

`tickets-admin` — Next.js 15 App Router SPA, которое потребляет REST API бэкенда напрямую.
Никакой отдельной базы данных, никакого дополнительн��го backend-for-frontend нет:
весь state живёт либо в fetch-кэше Next.js, либо в React state на клиенте.

```
Browser
  └─ Next.js App (Vercel / Docker)
       ├─ middleware.ts          ← проверяет httpOnly cookie, редирект на /login
       ├─ Server Components      ← fetch напрямую к ticketsbackend, данные при рендере
       ├─ Client Components      ← интерактивные таблицы, формы, диалоги
       └─ Route Handlers         ← /api/auth/login → устанавливает httpOnly cookie
            │
            ▼
       ticketsbackend REST API
         Authorization: Bearer <token>
         X-User-Id: <adminUserId>
```

---

## Auth Flow

1. Администратор вводит телефон на `/login`.
2. Клиент делает `POST /auth/send-code` на бэкенд.
3. Администратор вводит SMS-код.
4. Клиент делает `POST /auth/verify-code` → получает `{ token, userId }`.
5. Next.js Route Handler `/api/auth/login` устанавливает два httpOnly cookie:
   - `auth_token` — Bearer токен для авторизации
   - `user_id` — UUID администратора
6. `middleware.ts` проверяет наличие `auth_token` на каждом защищённом маршруте.
   При отсутствии — редирект на `/login`.
7. Server Components читают cookie через `cookies()` и проставляют заголовки в fetch:
   - `Authorization: Bearer <token>`
   - `X-User-Id: <userId>`

Токен не хранится в `localStorage` и не доступен из JS — только httpOnly cookie.

---

## Слои приложения

### `middleware.ts`

Работает на Edge Runtime. Единственная ответственность — проверить наличие `auth_token` cookie.
Не делает запросов к API и не валидирует токен на бэкенде (слишком дорого на каждый запрос).
Невалидный токен даст 401 при первом же API-запросе внутри страницы.

### Server Components (`app/(admin)/*/page.tsx`)

- Рендерятся на сервере.
- Делают fetch к бэкенду с заголовками из cookie.
- Передают данные в Client Components как props.
- Ошибки (401, 403) обрабатываются через `error.tsx` или редирект.

### Client Components

- Интерактивность: фильтры, пагинация, диалоги подтверждения, формы.
- Мутации (approve / reject / close-sales) — через `fetch` из клиента с теми же заголовками.
- Состояние `loading` / `error` — локальный `useState` или React Query (если добавим).

### `lib/api/`

Тонкие fetch-обёртки. Каждый модуль соответствует одному разделу API бэкенда:

```
lib/api/
  org-applications.ts   # GET /api/v1/organization-applications, POST .../approve, .../reject
  venue-applications.ts  # GET /api/v1/venue-applications, POST .../approve, .../reject
  organizations.ts       # GET /api/v1/organizations
  venues.ts              # GET /api/v1/venues
  events.ts              # GET /api/v1/events, POST .../close-sales
  users.ts               # GET /api/v1/users
  operations.ts          # POST /api/v1/operations/close-started-event-sales, .../process-stale-payments
```

Каждая функция принимает `{ token, userId }` и возвращает типизированный результат.
Никакого глобального HTTP-клиента — только нативный `fetch` с `next: { revalidate }`.

### Route Handlers (`app/api/`)

Только для операций, которые нельзя сделать напрямую из клиента:

- `POST /api/auth/login` — принимает `{ token, userId }`, устанавливает httpOnly cookie
- `POST /api/auth/logout` — сбрасывает cookie

---

## Маршруты (Route Groups)

```
/                        → redirect → /dashboard
/login                   → (auth) group, без middleware
/dashboard               → (admin) group, protected
/org-applications        → список + просмотр заявок на организации
/org-applications/[id]   → детальная карточка, кнопки Одобрить / Отклонить
/venue-applications      → список заявок на площадки, фильтр по статусу
/venue-applications/[id] → детальная карточка + документы
/organizations           → список организаций
/organizations/[id]      → профиль: участники, площадки
/venues                  → список площадок
/venues/[id]             → детали площадки
/events                  → список событий, фильтр по статусу продаж
/events/[id]             → дета��и + кнопка «Закрыть продажи»
/users                   → список с поиском по телефону / имени
/users/[id]              → профиль пользователя
/operations              → ручные batch-операции
```

---

## UI Kit

shadcn/ui поверх Radix UI. Компоненты копируются в `src/components/ui/` и редактируются при необходимости.

Кастомные переиспользуемые компоненты:

| Компонент | Описание |
|-----------|----------|
| `DataTable` | Таблица с колонками, сортировкой, пагинацией (TanStack Table) |
| `StatusBadge` | Цветной badge: PENDING → жёлтый, APPROVED → зелёный, REJECTED → красный |
| `ConfirmDialog` | AlertDialog с кнопками Подтвердить / Отмена, принимает `onConfirm` |
| `PageHeader` | Заголовок страницы + breadcrumbs |

---

## Кэширование и ревалидация

- Страницы-списки используют `fetch(..., { next: { revalidate: 30 } })` — свежие данные каждые 30 сек.
- После мутации (approve / reject) вызывается `revalidatePath(...)` из Server Action или Route Handler.
- Детальные страницы — `{ cache: 'no-store' }`, данные всегда свежие.

---

## Что намеренно не включено

- **Собственная БД** — нет нужды, всё хранит бэкенд.
- **NextAuth** — auth-flow простой (Bearer token), лишняя зависимость.
- **Redux / Zustand** — глобальный state не нужен, страницы независимы.
- **GraphQL** — бэкенд REST, нет смысла добавлять прослойку.
