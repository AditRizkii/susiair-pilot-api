# Susi Air Pilot API

NestJS REST API for the Susi Air Pilot App technical test.

## Requirements

- Node.js 22+
- `npm install`

## Run locally

```bash
copy .env.example .env
npm run start:dev
```

The API starts on `http://localhost:3001` by default. Fixture data is loaded from `data/` at startup.

## Commands

```bash
npm test
npm run build
npm run start
```

## Demo login

```text
username: johndoe
password: susiairtest
```

## Environment variables

| Name | Required | Description |
| --- | --- | --- |
| `PORT` | No | API port; defaults to `3001`. |
| `JWT_SECRET` | Yes in production | Secret for signed login tokens. |
| `FRONTEND_ORIGIN` | Yes in production | Public Nuxt application URL allowed by CORS. |

## Main technical choices

- **JSON fixtures loaded at startup:** the brief does not require persistence, so the API keeps the supplied mock data in memory and avoids an unnecessary database.
- **JWT with a global guard:** every route is protected by default; only `POST /auth/login` is marked public. This makes accidental exposure of a future endpoint less likely.
- **DTO validation and one exception filter:** request validation happens at the HTTP boundary and every failure has the same response shape.
- **Server-side rolling windows:** `rollingWindowBluffing()` calculates each chart point in NestJS, so the client only renders trusted summary data.

## With more time

- Add HTTP integration tests for each authenticated endpoint and error response.
- Replace the hardcoded demo user with a user store and refresh-token flow.
- Add structured logging, health checks, rate limiting, and API documentation for production operations.

## Deploy with Dokploy

1. Create an Application service from this repository.
2. Use the included `Dockerfile`; expose container port `3001`.
3. Set `NODE_ENV=production`, `JWT_SECRET`, and `FRONTEND_ORIGIN`.
4. Attach a public domain and use its HTTPS URL as `NUXT_PUBLIC_API_BASE` in the web deployment.

The final deployed URL will be recorded here before submission.
