# ADR 0004: Route Groups — (auth) и (admin)

## Status

Accepted

## Context

В приложении два типа страниц с принципиально разными требованиями:

- `/login` — публичная, свой layout (центрированная форма), без проверки cookie.
- Все остальные страницы — защищённые, общий sidebar + header layout, требуют cookie.

Нужно разделить layout без влияния на URL.

## Decision

Использовать App Router Route Groups:

```
app/
  (auth)/
    login/
      page.tsx          # layout: центрированная форма
  (admin)/
    layout.tsx          # sidebar + header, проверяет cookie через middleware
    dashboard/page.tsx
    org-applications/page.tsx
    ...
```

- `(auth)` — группа без layout.tsx, страницы рендерятся в `app/layout.tsx` (только `<html><body>`).
- `(admin)` — группа с собственным `layout.tsx`, который рендерит sidebar и header.
  Дополнительную проверку авторизации здесь не делаем — это ответственность `middleware.ts`.

Корень `/` — `app/page.tsx` делает `redirect('/dashboard')`.

## Consequences

Плюсы:

- Чистое разделение публичных и защищённых страниц без дублирования кода.
- Sidebar и header определены один раз в `(admin)/layout.tsx`.
- URL не содержит `(auth)` или `(admin)` — только `/login`, `/dashboard` и т.д.

Минусы:

- Нет. Route Groups — стандартный паттерн App Router для этой задачи.
