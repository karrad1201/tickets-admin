# tickets-admin

Веб-админка платформы продажи билетов на мероприятия.

**Стек:** Next.js 15 (App Router) · TypeScript · Tailwind CSS · shadcn/ui
**Backend API:** [ticketsbackend](https://github.com/karrad1201/ticketsbackend)
**Mobile client:** [tickets-client](https://github.com/karrad1201/tickets-client)

---

## Что это

Инструмент для платформенного администратора (`UserRole.ADMIN`). Через него:

- рассматриваются заявки на создание организаций и площадок;
- ведётся надзор за пользователями, организациями, площадками и событиями;
- запускаются операционные batch-процессы (закрытие продаж, обработка зависших платежей).

---

## Быстрый старт

```bash
npm install
cp .env.local.example .env.local   # заполнить NEXT_PUBLIC_BACKEND_URL и AUTH_SECRET
npm run dev
```

Открыть [http://localhost:3000](http://localhost:3000).

---

## Структура проекта

```
src/
  app/
    (auth)/
      login/              # страница входа (вне защищённого layout)
    (admin)/
      layout.tsx          # protected layout — проверяет cookie, пробрасывает X-User-Id
      dashboard/          # главная страница с ключевыми метриками
      org-applications/   # заявки на организации: список, одобрить / отклонить
      venue-applications/ # заявки на площадки: список, про��мотр документов, одобрить / отклонить
      organizations/      # список организаций и состав участников
      venues/             # площадки по организациям
      events/             # события: просмотр, снятие с публикации
      users/              # пользователи: список, поиск, профиль
      operations/         # ручные batch-операции (close-sales, stale-payments)
  lib/
    api/                  # fetch-обёртки над backend REST endpoints
    auth.ts               # чтение токена из httpOnly cookie → X-User-Id header
  components/
    ui/                   # shadcn/ui компоненты
    data-table.tsx        # переиспользуемая таблица с сортировкой и пагинацией
    status-badge.tsx      # цветной badge: PENDING / APPROVED / REJECTED / …
  middleware.ts           # проверка cookie → редирект на /login если нет токена
```

Подробнее — в [docs/architecture.md](docs/architecture.md).

---

## Разработка

Процесс, ветки и PR — в [docs/contributors.md](docs/contributors.md).
Деплой и переменные окружения — в [docs/deployment.md](docs/deployment.md).
Архитектурные решения — в [docs/adr/](docs/adr/).

---

## Связанные репозитории

| Репо | Описание |
|------|----------|
| [ticketsbackend](https://github.com/karrad1201/ticketsbackend) | Spring Boot backend, REST API |
| [tickets-client](https://github.com/karrad1201/tickets-client) | KMP мобильный клиент (Android + iOS) |
