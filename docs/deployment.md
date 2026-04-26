# Deployment Guide

## Prerequisites

- Node.js 20+
- npm 10+
- Запущенный [ticketsbackend](https://github.com/karrad1201/ticketsbackend)

---

## Переменные окружения

Создать `.env.local` (локально) или задать в Vercel / Docker:

| Переменная | Обязательна | Описание |
|------------|:-----------:|---------|
| `NEXT_PUBLIC_BACKEND_URL` | да | Базовый URL бэкенда, например `http://localhost:8080` |
| `AUTH_SECRET` | да | Случайная строка ≥ 32 символа для подписи cookie (генерировать: `openssl rand -base64 32`) |
| `AUTH_COOKIE_SECURE` | нет | `true` в prod (cookie только по HTTPS). Default: `false` |
| `AUTH_COOKIE_MAX_AGE` | нет | Время жизни cookie в секундах. Default: `86400` (24 ч) |

Пример `.env.local`:
```
NEXT_PUBLIC_BACKEND_URL=http://localhost:8080
AUTH_SECRET=super-secret-random-string-at-least-32-chars
```

---

## Локальный запуск

```bash
npm install
cp .env.local.example .env.local   # заполнить переменные
npm run dev
```

Приложение будет доступно на [http://localhost:3000](http://localhost:3000).

---

## Production Build

```bash
npm run build
npm start
```

---

## Docker

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
```

`docker-compose.yml`:
```yaml
services:
  admin:
    build: .
    ports:
      - "3000:3000"
    environment:
      NEXT_PUBLIC_BACKEND_URL: https://api.yourdomain.com
      AUTH_SECRET: your-secret
      AUTH_COOKIE_SECURE: "true"
    restart: unless-stopped
```

Для standalone output добавить в `next.config.ts`:
```ts
output: 'standalone'
```

---

## Vercel

1. Импортировать репозиторий в Vercel.
2. В Project Settings → Environment Variables задать все переменные из таблицы выше.
3. Framework Preset: **Next.js** (определяется автоматически).
4. Deploy.

Каждый push в `main` деплоится автоматически. PR-ы получают preview-деплой.

---

## CI/CD

Pipeline описан в `.github/workflows/ci.yml`.

- **CI** (`ci` job): lint + build на каждый push и PR.
- **CD**: деплой на Vercel происходит через Vercel Git Integration автоматически после merge в `main`.
  Если используется self-hosted Docker — добавить отдельный `cd` job с SSH-деплоем.

---

## Health Check

После деплоя проверить:

```
GET /api/health   → { "status": "ok" }
```

Route Handler в `app/api/health/route.ts` — отвечает 200 независимо от состояния бэкенда.
Для проверки связи с бэкендом используется страница `/dashboard`, которая делает реальный API-запрос.
