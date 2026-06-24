Render environment variables for `nomade-backend`

Copy the following key/value pairs into your Render Web Service (Dashboard) under Environment -> Environment Variables.

- DATABASE_URL
  - Example format (Neon/Postgres):
    postgresql://<user>:<password>@<host>/<db>?sslmode=require
  - Description: PostgreSQL connection string. Required for server to connect to Neon.

- JWT_SECRET
  - Example: a long random hex string (generate with `openssl rand -hex 32`)
  - Description: Used to sign JWTs. Keep secret.

- ADMIN_EMAIL
  - Example: admin@example.com
  - Description: Email for seeded admin user on first run.

- ADMIN_PASSWORD
  - Example: A strong temporary password (server will hash on seed)
  - Description: Initial admin password. Change after first login.

- ADMIN_EMAILS (optional)
  - Example: admin1@example.com,admin2@example.com
  - Description: Comma-separated list of admin emails. When provided, the server will create or grant admin role to each address on startup.

- ADMIN_PASSWORDS (optional)
  - Example: pass1,pass2
  - Description: Comma-separated passwords matching ADMIN_EMAILS order. If fewer passwords than emails are provided, the first password will be reused for remaining emails.

- FRONTEND_URL
  - Example: https://www.nomadsnavigatenepal.com
  - Description: Used in email links and CORS config.

- NODE_ENV
  - Value: production

- PORT (optional)
  - Value: 5000 (Render will assign a port automatically if omitted)

Notes & steps
1. In Render: New -> Web Service -> Connect your GitHub repo -> select branch.
   - Root Directory: backend
   - Environment: Node
   - Build Command: npm install
   - Start Command: npm start
2. Add the env vars above in the Render service's Environment section.
3. Deploy and open Logs. Look for:
   - "info: PostgreSQL connected"
   - "info: 🚀 Server running on port 5000"
4. Test the health endpoint (replace with your Render service URL or custom domain):

```bash
curl -i https://<your-render-service>.onrender.com/health
```

Expected response: HTTP 200 with JSON {"success":true,"message":"Server is healthy"}

Security reminder: Never commit real secret values (DATABASE_URL, JWT_SECRET, ADMIN_PASSWORD) to source control. Use Render's dashboard to store secrets.
