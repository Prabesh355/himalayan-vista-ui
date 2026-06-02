# 3-Tier Architecture Deployment Guide

This document outlines the professional deployment strategy for the Nomade project. The project is designed as a classic **3-Tier Architecture**, ensuring clear separation of concerns, scalability, and security. It avoids serverless backend structures by relying on a dedicated background process (Express.js server).

## Overview

- **Tier 1 (Presentation/Frontend):** React + Vite UI deployed on **Vercel**.
- **Tier 2 (Logic/Backend):** Dedicated Express.js Server deployed on **Railway** or **Render**.
- **Tier 3 (Data/Database):** PostgreSQL managed on **Neon**.

---

## 1. Database Tier: Neon PostgreSQL configuration

### Step 1: Create a Production Cluster
1. Log in to [Neon](https://neon.tech/).
2. Create a new project and database.
3. Copy the connection string for the `DATABASE_URL` environment variable.

### Step 2: Get the Connection String
1. Copy the Neon connection string from the dashboard.
2. Use it as `DATABASE_URL`.
3. Ensure `sslmode=require` is enabled.

---

## 2. Logic Tier: Express.js Backend (Render / Railway)

The backend runs as a continuous, standalone Node.js process.

### Environment Variables (`.env.production`)
You will need to input these variables into the dashboard of your chosen provider.

```env
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://himalayan-vista.vercel.app  # Replace with actual Vercel URL
DATABASE_URL=postgresql://<user>:<password>@<host>/<db>?sslmode=require&channel_binding=require
JWT_SECRET=your_hyper_secure_jwt_secret_here
JWT_EXPIRE=30d
```

### Security & CORS configuration (Already in `app.js`)
The backend relies on the following configurations for security:
- **Helmet**: Adds essential HTTP headers to block common vulnerabilities.
- **CORS**: Strictly permits origins mapped to `process.env.FRONTEND_URL`. Prevents cross-origin requests from malicious domains.
- **Express-Rate-Limit**: Guards the REST API against brute-force/DDoS attacks.

### Option A: Deployment on Render
Render treats this as a **Web Service**.
1. Connect your GitHub repository to Render.
2. Select the `backend` directory as the Root Directory (if it's a monorepo).
3. **Build Command:** `npm install`
4. **Start Command:** `npm start` (Make sure `package.json` maps `"start": "node server.js"`).
5. Add the Environment Variables under the **Environment** tab.

### Option B: Deployment on Railway
1. Inside your Railway dashboard, create a **New Project** -> **Deploy from GitHub repo**.
2. If this is a monorepo, set the **Root Directory** to `/backend`.
3. Add the exact environment variables from above to the Railway Variables panel.
4. Railway will automatically detect Node.js and run `npm start`.

---

## 3. Presentation Tier: React + Vite Frontend (Vercel)

The frontend communicates with the backend exclusively through HTTP REST calls to the backend's provided URL. The frontend never touches the database directly.

### Environment Variables (`.env.production`)
```env
# The public URL of the Railway/Render backend deployment
VITE_API_BASE_URL=https://nomade-backend-production.up.railway.app/api
```

### Deployment Steps on Vercel
1. Log in to [Vercel](https://vercel.com/) and click **Add New** -> **Project**.
2. Import your GitHub repository.
3. Because Vercel might detect it as a standard repo, configure the following:
   - **Framework Preset:** Vite
   - **Root Directory:** `himalayan-vista-ui` (or whatever the frontend folder is named)
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Expand **Environment Variables** and add `VITE_API_BASE_URL` pointing to your deployed Tier 2 Backend.
5. Click **Deploy**.

## Workflow Validation

To ensure the 3-tier architecture is preserved:
1. **Client Browser** loads static JS/CSS from Vercel CDN.
2. **React App** triggers `axios.get(VITE_API_BASE_URL + '/packages')`.
3. The request hits the **Dedicated Render/Railway Node.js Server**.
4. The Node.js server authenticates the JWT, applies rate limits, and uses `pg` to hit **Neon PostgreSQL**.
5. Neon replies with data to the backend.
6. The backend formats it as JSON and responds to the Vercel-hosted client. 

## Important Production Reminders
- Verify you do NOT commit any `.env` files to git.
- Periodically rotate your `JWT_SECRET`.
- When shifting to production, verify cookie settings inside the backend (e.g. `secure: true`, `sameSite: 'none'`) if the domains differ between Vercel and Railway/Render.