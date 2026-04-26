# Backend API Reference

Справочник по endpoints бэкенда, которые использует админка.
Полная OpenAPI-документация доступна на бэкенде по `/swagger-ui.html` (только в dev-профиле).

Все запросы требуют заголовков:
```
Authorization: Bearer <token>
X-User-Id: <adminUserId>
```

---

## Заявки на организации

| Метод | URL | Описание |
|-------|-----|---------|
| `GET` | `/api/v1/organization-applications` | Список всех заявок |
| `GET` | `/api/v1/organization-applications/{id}` | Детали заявки |
| `POST` | `/api/v1/organization-applications/{id}/approve` | Одобрить → создаётся Organization |
| `POST` | `/api/v1/organization-applications/{id}/reject` | Отклонить |

Статусы: `PENDING` · `APPROVED` · `REJECTED`

---

## Заявки на площадки

| Метод | URL | Описание |
|-------|-----|---------|
| `GET` | `/api/v1/venue-applications` | Список всех заявок (`?status=PENDING`) |
| `GET` | `/api/v1/venue-applications/{id}` | Детали заявки + список documentUrls |
| `POST` | `/api/v1/venue-applications/{id}/approve` | Одобрить → создаётся Venue |
| `POST` | `/api/v1/venue-applications/{id}/reject` | Отклонить |

Статусы: `PENDING` · `APPROVED` · `REJECTED`

---

## Организации

| Метод | URL | Описание |
|-------|-----|---------|
| `GET` | `/api/v1/organizations` | Список всех организаций |
| `GET` | `/api/v1/organizations/{id}` | Детали организации |

Состав участников организации:

| Метод | URL | Описание |
|-------|-----|---------|
| `GET` | `/api/v1/organizations/{orgId}/members` | Список членов |

---

## Площадки

| Метод | URL | Описание |
|-------|-----|---------|
| `GET` | `/api/v1/venues` | Список всех площадок |
| `GET` | `/api/v1/venues/{id}` | Детали площадки |

---

## События

| Метод | URL | Описание |
|-------|-----|---------|
| `GET` | `/api/v1/events` | Список событий (`?venueId=`, `?status=`) |
| `GET` | `/api/v1/events/{id}` | Детали события |
| `POST` | `/api/v1/events/{id}/close-sales` | Закрыть продажи |

---

## Пользователи

| Метод | URL | Описание |
|-------|-----|---------|
| `GET` | `/api/v1/users` | Список пользователей |
| `GET` | `/api/v1/users/{id}` | Профиль пользователя |

---

## Auth

| Метод | URL | Описание |
|-------|-----|---------|
| `POST` | `/auth/send-code` | Отправить SMS-код `{ phone }` |
| `POST` | `/auth/verify-code` | Проверить код `{ phone, code }` → `{ token, userId }` |

---

## Операции (batch)

| Метод | URL | Описание |
|-------|-----|---------|
| `POST` | `/api/v1/operations/close-started-event-sales` | Закрыть продажи начавшихся событий |
| `POST` | `/api/v1/operations/process-stale-payments` | Обработать зависшие платежи |

---

## Формат ошибок

Бэкенд использует [RFC 7807 Problem Details](https://www.rfc-editor.org/rfc/rfc7807):

```json
{
  "type": "about:blank",
  "title": "Not Found",
  "status": 404,
  "detail": "Organization application not found: <id>",
  "instance": "/api/v1/organization-applications/<id>"
}
```

Обрабатывать `status` из тела ответа или HTTP-статус код.
