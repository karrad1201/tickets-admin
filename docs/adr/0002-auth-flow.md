# ADR 0002: Auth Flow — Bearer Token в httpOnly Cookie

## Status

Accepted

## Context

Бэкенд использует `Bearer <token>` в заголовке `Authorization` и `X-User-Id` для идентификации текущего пользователя.
Токен выдаётся при `POST /auth/verify-code` и не имеет механизма refresh.

Нужно решить: где хранить токен в браузере.

| Вариант | Проблема |
|---------|---------|
| `localStorage` | Доступен из JS → уязвим к XSS |
| `sessionStorage` | То же + теряется при закрытии вкладки |
| httpOnly cookie | Недоступен из JS, автоматически отправляется браузером |

Отдельная проблема: бэкенд не принимает cookie, он ждёт `Authorization` header.
Значит нужна прослойка, которая читает cookie и проставляет header.

## Decision

1. **Хранение:** два httpOnly cookie — `auth_token` и `user_id`.
   Устанавливаются через Next.js Route Handler `/api/auth/login` после успешного `verify-code`.

2. **Прослойка для бэкенда:** Server Components и Route Handlers читают cookie через `cookies()`
   и сами проставляют `Authorization` и `X-User-Id` headers при fetch к бэкенду.
   Браузер никогда не отправляет токен напрямую на бэкенд.

3. **Защита маршрутов:** `middleware.ts` (Edge Runtime) проверяет наличие `auth_token` cookie.
   Отсутствие → редирект на `/login`. Валидность токена не проверяется в middleware (нет запроса к API).
   Невалидный токен даст 401 при первом реальном запросе.

4. **Logout:** Route Handler `/api/auth/logout` сбрасывает оба cookie (`maxAge: 0`).

5. **NextAuth не используется** — auth-flow простой, добавлять тяжёлую зависимость нецелесообразно.

## Consequences

Плюсы:

- Токен недоступен из JS — XSS не украдёт его напрямую.
- Нет необходимости в BFF или proxy-сервере.
- Server Components получают данные сразу при рендере без клиентского round-trip.

Минусы:

- Нет refresh токена на стороне бэкенда → при истечении сессии пользователь получит 401
  и будет перенаправлен на `/login` через `error.tsx`.
- CSRF теоретически возможен, но снижается за счёт `SameSite=Lax` на cookie и того,
  что бэкенд проверяет `X-User-Id`, который злоумышленник не знает.
