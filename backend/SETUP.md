# Backend Setup Guide

## Prerequisites

- Node.js v14+
- A Neon PostgreSQL database

## Install

```bash
cd backend
npm install
cp .env.example .env
```

## Environment variables

```bash
PORT=5000
NODE_ENV=development
DATABASE_URL=postgresql://username:password@host/dbname?sslmode=require&channel_binding=require
JWT_SECRET=your_super_secret_key_min_32_chars_change_in_production
JWT_EXPIRE=30d
JWT_COOKIE_EXPIRE=7
FRONTEND_URL=http://localhost:5173
```

## Start

```bash
npm run dev
```

## Health check

```bash
curl http://localhost:5000/health
```

## Troubleshooting

- Check `DATABASE_URL` format.
- Make sure Neon allows the connection.
- Verify `JWT_SECRET` is set.
