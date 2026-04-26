# Contributors Guide

## Development Flow

Работаем короткими feature-ветками, не пушим напрямую в `main`.

Базовый цикл:

1. Обновить локальный `main`.
2. Создать ветку вида `feat/<issue-number>-<short-name>` или `fix/<issue-number>-<short-name>`.
3. Реализовать фичу. Для неочевидных решений — добавить ADR в `docs/adr/`.
4. Перед пушем прогнать:
   - `npm run lint`
   - `npm run build`
5. Запушить ветку, открыть PR в `main`.
6. Мержить только после зелёного CI.
7. После merge удалить ветку.

---

## Branch Policy

- `main` всегда должен успешно билдиться и проходить lint.
- Одна ветка — одна задача. Смешивать независимые изменения в одном PR нельзя.
- Если работа большая, режем на несколько последовательных PR.

---

## Коммиты

Формат: `<type>(<scope>): <description>`

| Type | Когда использовать |
|------|--------------------|
| `feat` | новая страница или функциональность |
| `fix` | исправление бага |
| `refactor` | рефакторинг без изменения поведения |
| `style` | правки вёрстки, CSS |
| `chore` | обновление зависимостей, конфиги |
| `docs` | только документация |

Примеры:
```
feat(org-applications): страница списка заявок на организации
fix(auth): редирект после logout не сбрасывал cookie
docs(adr): добавить ADR-0003 про API layer
```

---

## Добавление нового раздела

Стандартная последовательность для нового раздела админки:

1. Добавить fetch-функцию в `lib/api/<section>.ts`.
2. Создать `app/(admin)/<section>/page.tsx` — Server Component, загружает данные.
3. Создать `app/(admin)/<section>/columns.tsx` — описание колонок DataTable.
4. Если нужна детальная страница — `app/(admin)/<section>/[id]/page.tsx`.
5. Если нужны мутации — Client Component с `useState` + `fetch`.
6. Добавить пункт в sidebar навигацию.
7. Написать хотя бы один e2e-тест для happy path (если настроен Playwright).

---

## Code Style

- TypeScript strict mode. Никакого `any` без явного обоснования.
- Компоненты — функциональные, `const Foo: React.FC<Props> = ...`.
- Server Components по умолчанию. `"use client"` только когда нужна интерактивность.
- Импорты — абсолютные через `@/` (настроено в `tsconfig.json`).
- Форматирование — Prettier, конфиг в `.prettierrc`.
- Lint — ESLint с Next.js preset. `npm run lint` должен проходить без warnings.

---

## CI

Pipeline в `.github/workflows/ci.yml`:

- Запускается на `push` в `main` и `feat/**`, `fix/**`, на PR в `main`.
- Шаги: `npm ci` → `npm run lint` → `npm run build`.
- Мержить PR без зелёного CI нельзя.

---

## ADR

Неочевидные архитектурные решения фиксируем в `docs/adr/`.
Формат файла: `NNNN-<slug>.md`, нумерация сквозная.
Структура: **Status** · **Context** · **Decision** · **Consequences**.
Уже принятые решения — в [docs/adr/](adr/).
