# Deployment Guide - Neon PostgreSQL + Node.js Backend

This project now uses Neon PostgreSQL for the backend data layer.

## Required environment variables

```bash
PORT=5000
NODE_ENV=production
DATABASE_URL=postgresql://USER:PASSWORD@HOST/DBNAME?sslmode=require&channel_binding=require
JWT_SECRET=replace-with-a-long-random-secret
JWT_EXPIRE=30d
ADMIN_EMAIL=nomadsnavigatenepal5@gmail.com
ADMIN_PASSWORD=change-this-password
FRONTEND_URL=https://nomadsnavigatenepal.com
LOG_LEVEL=info
```

## Backend deployment options

### Option A: Render
1. Create a new Web Service.
2. Root directory: `backend/`.
3. Build command: `npm install`.
4. Start command: `npm start`.
5. Add the environment variables above.
6. Deploy, then attach `api.nomadsnavigatenepal.com` as a custom domain.

### Option B: Docker on a VPS
1. Build the image from `backend/Dockerfile`.
2. Run it with `-p 5000:5000` and the `DATABASE_URL` env var.
3. Put Nginx in front of it and terminate TLS with Let’s Encrypt.

## Frontend deployment

1. Deploy `himalayan-vista-ui/` to Vercel or Netlify.
2. Set the frontend API base URL to your backend domain.
3. Point `nomadsnavigatenepal.com` to the frontend host.

## DNS checklist

- `nomadsnavigatenepal.com` → frontend host
- `www.nomadsnavigatenepal.com` → frontend host or redirect
- `api.nomadsnavigatenepal.com` → backend host

## Verification

After deploy, verify:

```bash
curl -i https://api.nomadsnavigatenepal.com/health
curl -i https://nomadsnavigatenepal.com/
```
