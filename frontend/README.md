# Himalayan Vista

Full-stack travel and tour management system.

## Stack

- Frontend: React + Vite + TypeScript
- Backend: Node.js + Express
- Database: PostgreSQL on Neon
- Auth: JWT + bcrypt

## What changed

The backend now uses a PostgreSQL-backed runtime instead of MongoDB/Mongoose. Use `DATABASE_URL` in production and development.

## Local development

### Backend

```bash
cd backend
npm install
cp .env.example .env
```

Set `DATABASE_URL` in `.env`:

```bash
DATABASE_URL=postgresql://user:password@host:5432/dbname?sslmode=require&channel_binding=require
```

Start the server:

```bash
npm run dev
```

### Frontend

```bash
cd himalayan-vista-ui
npm install
npm run dev
```

## Production checklist

1. Set `DATABASE_URL`, `JWT_SECRET`, `JWT_EXPIRE`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and `FRONTEND_URL`.
2. Deploy the backend using Docker, Render, or a VPS.
3. Deploy the frontend to Vercel or Netlify.
4. Point `nomadsnavigatenepal.com` to the frontend host.
5. Point `api.nomadsnavigatenepal.com` to the backend host.

See `DEPLOYMENT_POSTGRES.md` for the deployment flow.
