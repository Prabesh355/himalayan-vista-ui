# Himalayan Vista - Travel & Tour Management System

![Himalayan Vista Cover](https://via.placeholder.com/1200x400.png?text=Himalayan+Vista+CMS)

Himalayan Vista is a full-stack web application designed for comprehensive travel and tour management. It offers a professional **MERN-stack** foundation utilizing a modernized 3-tier architecture, scalable infrastructure, and a stunning React-based Administrator Dashboard.

---

## 🚀 Project Overview

This platform empowers administrators to manage tour packages, process bookings, oversee blog content, and handle customer inquiries, while providing a seamless API service layer for public-facing frontends or mobile applications to consume.

### ✨ Key Features
- **Admin Dashboard:** Modern, intuitive UI built with React 19, Tailwind CSS v4, and Shadcn UI.
- **Package Management:** Complete CRUD operations for dynamic travel modules.
- **Booking Engine:** Secure reservation handling with status tracking.
- **Customer CRM:** Manage travel inquiries and user-generated package reviews.
- **Content Management:** Create and publish promotional blogs.
- **Security:** JWT-based authentication with robust Role-Based Access Control (RBAC).

---

## 🛠 Tech Stack

### Frontend (Client-Side)
- **Framework:** React 19 + TypeScript
- **Tooling:** Vite
- **Styling:** Tailwind CSS v4 + Framer Motion
- **Icons & UI:** Lucide React, Recharts (Data Visualization)
- **API Fetching:** Axios with Interceptor Authentication
- **Routing:** Tanstack Router (or React Router)

### Backend (Server-Side)
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose ORM)
- **Authentication:** JSON Web Tokens (JWT) & bcrypt.js
- **Validation:** Express Validator / Custom Middlewares

---

## 🏗 Sub-System: 3-Tier Architecture Explanation

This application adheres to strict separation of concerns within a classical **3-Tier Architecture**:

1. **Presentation Tier (Frontend):** 
   Located in `himalayan-vista-ui/`. Exclusively handles user interactions, route-based rendering, and state management. Communicates strictly with the backend via centralized Axios API wrappers.
   
2. **Logic / Application Tier (Backend):** 
   Located in `backend/`. This Node.js & Express API coordinates business rules (e.g., authorizing users, calculating availability). Routes forward validated datasets to designated controller functions, isolating business logic from network delivery.
   
3. **Data Tier (Database):** 
   Handled by **MongoDB**. Accessed strictly by Mongoose models defined in `backend/models`. The data layer is decoupled—meaning the database schema could theoretically be migrated with zero changes to the presentation tier.

---

## 📁 Folder Structure

```text
E:/Nomade_Project/
├── backend/                  # Node.js Application Tier
│   ├── config/              # Environment & DB configurations 
│   ├── controllers/         # Core business logic processing
│   ├── middleware/          # JWT, Error Handling, and Logging guards
│   ├── models/              # Mongoose Data Schemas (User, Booking, Package)
│   ├── routes/              # Express API Endpoint definitions
│   ├── server.js            # Entry Point Backend (Port 5000)
│   └── package.json
└── himalayan-vista-ui/       # React Presentation Tier
    ├── src/
    │   ├── assets/          # Static files and images
    │   ├── components/      # Reusable UI elements (Admin panels, Tables)
    │   ├── services/        # Centralized Axios API instances (`api.ts`)
    │   ├── routes/          # Page views & Screen layouts
    │   └── main.tsx         # Entry Point Frontend
    ├── vite.config.ts
    └── package.json
```

---

## 🔌 API Endpoints
All API routes are prefixed with `/api`.

| HTTP | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/auth/register` | Register new user account | Public |
| POST | `/auth/login` | Authenticate and retrieve JWT token | Public |
| GET | `/packages` | Retrieve travel packages | Public |
| POST | `/packages` | Create a new travel package | Admin |
| GET | `/bookings` | Retrieve all platform bookings | Admin |
| POST | `/bookings` | Book a package slot | User |

---

## 💻 Installation & Setup

**1. Clone the repository:**
```bash
git clone https://github.com/your-username/nomade-project
cd nomade-project
```

**2. Setup Backend:**
```bash
cd backend
npm install

# Create localized .env file
echo "PORT=5000" > .env
echo "NODE_ENV=development" >> .env
echo "MONGODB_URI=mongodb://127.0.0.1:27017/nomade_project" >> .env
echo "JWT_SECRET=yoursupersecretjwt" >> .env

# Run server
npm run dev
```

**3. Setup Frontend:**
```bash
cd ../himalayan-vista-ui
npm install

# Run app
npm run dev
```

---

## ☁️ Deployment Instructions

### Vercel (Frontend - Custom Domain: nomadsnavigatenepal.com)
1. Import the repository into your Vercel dashboard.
2. Select the `himalayan-vista-ui` as root directory.
3. Vercel will automatically detect `Vite`. Build Command: `npm run build`.
4. Define your production API base URL: `VITE_API_URL=https://api.nomadsnavigatenepal.com/api`.
5. Go to **Settings > Domains** in Vercel and add `nomadsnavigatenepal.com` and `www.nomadsnavigatenepal.com`.
6. Configure your DNS provider with Vercel's nameservers or A/CNAME records.

### Railway / Render (Backend)
1. Create a distinct Web Service mapping directly to `./backend`.
2. Configure Node start command: `node server.js`.
3. Apply all required deployment environment variables (`MONGODB_URI`, `JWT_SECRET`, `NODE_ENV=production`, `FRONTEND_URL=https://nomadsnavigatenepal.com`).
4. Set up a custom domain for the backend such as `api.nomadsnavigatenepal.com` via Railway/Render settings.

---

## 🔮 Future Improvements
1. **Caching Layer:** Integrate Redis for high-throughput package lookups.
2. **Payment Integrations:** Implement Stripe or eSewa webhooks to authorize booking transactions.
3. **Advanced Analytics:** Map multi-dimensional Booking revenue timelines in the Admin Recharts overview. 
4. **Cloud Storage Attachments:** Fully decouple multer implementations directly to AWS S3 / Azure Blob Storage for package gallery imagery.
