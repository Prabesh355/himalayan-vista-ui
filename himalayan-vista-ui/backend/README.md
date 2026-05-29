# Himalayan Vista Backend

Express.js API for the Himalayan Vista travel system.

## Database

This backend uses PostgreSQL on Neon. Configure `DATABASE_URL` in `.env`.

## Setup

```bash
npm install
cp .env.example .env
npm run dev
```

## Required env vars

- `DATABASE_URL`
- `JWT_SECRET`
- `JWT_EXPIRE`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `FRONTEND_URL`

## Health check

```bash
curl http://localhost:5000/health
```

## Deployment

See `../DEPLOYMENT_POSTGRES.md` for the deployment path.
