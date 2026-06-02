# Production Backend - Himalayan Vista

This backend powers the Himalayan Vista travel and tour management system.

## Current stack

- Node.js + Express
- PostgreSQL on Neon
- JWT authentication
- bcrypt password hashing

## Setup

1. `npm install`
2. Copy `.env.example` to `.env`
3. Set `DATABASE_URL`
4. Run `npm run dev`

## Health

```bash
curl http://localhost:5000/health
```

## Deployment

Use `../DEPLOYMENT_POSTGRES.md` as the production checklist.
