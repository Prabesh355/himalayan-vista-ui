# CORS Patches & How-to

This document contains ready-to-apply CORS configuration snippets for common backends (Express, Fastify) and a note for Nginx. Use these to allow both `https://nomadsnavigatenepal.com` and `https://www.nomadsnavigatenepal.com`, and to support credentialed requests.

## Principles
- When using credentials (cookies), `Access-Control-Allow-Origin` must echo the requesting `Origin` (cannot be `*`).
- `Access-Control-Allow-Credentials: true` must be set.
- Ensure the server responds to OPTIONS preflight with the appropriate headers.

---

## Express (JavaScript) — patch example
Install the `cors` package:

```
npm install cors
```

Usage (insert near your server setup):

```js
const cors = require('cors');

const allowedOrigins = new Set([
  'https://nomadsnavigatenepal.com',
  'https://www.nomadsnavigatenepal.com',
  'http://localhost:5173'
]);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // allow server-to-server or curl
    if (allowedOrigins.has(origin)) return callback(null, true);
    return callback(new Error('CORS origin not allowed'));
  },
  credentials: true,
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization']
}));

// Ensure OPTIONS is handled (if not automatically)
app.options('*', cors());
```

---

## Fastify (JavaScript)

```js
fastify.register(require('@fastify/cors'), {
  origin: (origin, cb) => {
    if (!origin) return cb(null, true);
    const allowed = ['https://nomadsnavigatenepal.com','https://www.nomadsnavigatenepal.com'];
    if (allowed.includes(origin)) return cb(null, true);
    cb(new Error('Not allowed'));
  },
  credentials: true
});
```

---

## Nginx (if proxying)

If Nginx sits in front of your backend and you cannot change backend code, add headers at the Nginx layer. Example (inside server/location block):

```
if ($http_origin ~* "^(https?://(www\.)?nomadsnavigatenepal\.com)$") {
  add_header 'Access-Control-Allow-Origin' "$http_origin" always;
  add_header 'Access-Control-Allow-Credentials' 'true' always;
  add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS' always;
  add_header 'Access-Control-Allow-Headers' 'Content-Type, Authorization' always;
}

# handle OPTIONS
if ($request_method = 'OPTIONS') {
  add_header 'Access-Control-Allow-Origin' "$http_origin" always;
  add_header 'Access-Control-Allow-Credentials' 'true' always;
  add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS' always;
  add_header 'Access-Control-Allow-Headers' 'Content-Type, Authorization' always;
  return 204;
}
```

---

## Testing
Use the curl commands from the repo root to simulate browser preflight and POST with Origin header; verify `Access-Control-Allow-Origin` echoes the origin and `Access-Control-Allow-Credentials: true` is present.

---

If you want, I can prepare a PR/patch for your backend repo (Express/Fastify) with these changes applied — tell me which backend repo/branch to target.
