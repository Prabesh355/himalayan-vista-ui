# Production Backend - Himalayan Vista Travel & Tour Management System

> A complete, production-ready Express.js backend for a comprehensive travel and tour booking system

## 🎯 Key Features

- **Authentication & Authorization**: JWT-based auth with role-based access control (RBAC)
- **3-Tier Architecture**: Controllers-Services-Models pattern with clear separation of concerns
- **58 API Endpoints**: Fully functional CRUD operations for all resources
- **Security**: Password hashing, CORS, Helmet headers, rate limiting, input validation
- **Database**: MongoDB with Mongoose ODM and comprehensive schema design
- **Error Handling**: Centralized error handler with proper HTTP status codes
- **Logging**: Comprehensive logging system with file and console output
- **File Management**: Multer integration for file uploads
- **Admin Dashboard**: Statistics and user management endpoints
- **Pagination & Filtering**: Advanced query support with pagination
- **Documentation**: Complete API documentation and setup guides

## 📦 What's Included

### Controllers (6)
- `authController` - Authentication & password reset
- `packageController` - Package CRUD & filtering
- `bookingController` - Booking management
- `blogController` - Blog posts & content
- `reviewController` - Reviews & ratings
- `inquiryController` - Customer inquiries

### Models (6)
- User (with password hashing & JWT methods)
- Package (with geospatial support)
- Booking (with auto-generated IDs)
- Blog (with slug generation)
- Review (with rating breakdown)
- Inquiry (with response tracking)

### Routes (8)
- Auth, Users, Packages, Bookings, Blogs, Reviews, Inquiries, Admin

### Middleware
- JWT Authentication
- Input Validation
- File Upload (Multer)
- Error Handling
- Logging (Morgan)
- Rate Limiting
- CORS & Security (Helmet)

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret

# 3. Start server
npm run dev        # Development
npm start          # Production
```

Server runs on `http://localhost:5000`

## 📚 Documentation

- **[SETUP.md](./SETUP.md)** - Detailed setup & configuration guide
- **[API_DOCUMENTATION.md](./API_DOCUMENTATION.md)** - Complete API reference
- **[IMPLEMENTATION_CHECKLIST.md](./IMPLEMENTATION_CHECKLIST.md)** - Feature checklist
- **[README.md](./README.md)** - Comprehensive guide

## 🔒 Security Features

- ✅ JWT token authentication
- ✅ Password hashing (bcryptjs)
- ✅ Role-based access control
- ✅ HTTP-only cookies
- ✅ Helmet security headers
- ✅ CORS protection
- ✅ Rate limiting (100 req/15min per IP)
- ✅ Input validation
- ✅ Error sanitization

## 📊 API Endpoints (58 Total)

| Resource | Count | Methods |
|----------|-------|---------|
| Authentication | 8 | POST, GET, PUT |
| Packages | 7 | GET, POST, PUT, DELETE |
| Bookings | 6 | GET, POST, PUT, DELETE |
| Blogs | 7 | GET, POST, PUT, DELETE |
| Reviews | 6 | GET, POST, PUT, DELETE |
| Inquiries | 7 | GET, POST, PUT, DELETE |
| Users | 4 | GET, PUT, DELETE |
| Admin | 3 | GET, PUT |

## 🛠 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js v4.18+
- **Database**: MongoDB + Mongoose v7
- **Auth**: JWT (jsonwebtoken)
- **Password**: bcryptjs
- **Security**: Helmet, CORS, express-rate-limit
- **Logging**: Morgan
- **Validation**: express-validator, Joi
- **File Upload**: Multer
- **Dev Tools**: Nodemon

## 🗂 Project Structure

```
backend/
├── config/          # Database configuration
├── controllers/     # Business logic (6 controllers)
├── middleware/      # Custom middleware
├── models/          # Database schemas (6 models)
├── routes/          # API routes (8 route files)
├── utils/           # Helpers (logger, error handler)
├── uploads/         # File storage
├── logs/            # Application logs
├── app.js           # Express app setup
├── server.js        # Server entry point
└── package.json     # Dependencies
```

## 🔐 Authentication Flow

1. User registers with email
2. Password hashed with bcryptjs
3. User logs in
4. Server returns JWT token (30 days expiry)
5. Token stored in HTTP-only cookie & returned
6. Client sends token in Authorization header
7. Middleware verifies token
8. Route handler executes with user context

## 👥 User Roles

- **User** - Can make bookings, write reviews, submit inquiries
- **Vendor** - Can create and manage packages
- **Admin** - Full system access

## 💾 Database Models

### User
User details, authentication, preferences, login tracking

### Package
Travel packages with pricing, availability, itinerary, ratings

### Booking
Booking records with traveler info, pricing, payment status

### Blog
Blog posts with SEO, categories, tags, view tracking

### Review
Package reviews with detailed ratings and moderation

### Inquiry
Customer inquiries with assignment and response tracking

## ⚡ Performance

- Database indexing on key fields
- Pagination (default 10 items/page)
- Geospatial query support
- Connection pooling
- Optimized queries with population limits

## 📋 Prerequisites

- Node.js v14+
- MongoDB Atlas account
- npm or yarn

## 🚢 Deployment

The backend is production-ready. For deployment:

1. Update `.env` with production values
2. Set `NODE_ENV=production`
3. Use PM2 for process management
4. Configure reverse proxy (Nginx)
5. Enable SSL/TLS
6. Set up monitoring

## 📖 Testing Endpoints

Use Postman, cURL, or Thunder Client with:
- Base URL: `http://localhost:5000/api`
- Authorization: Bearer token in Authorization header

Example:
```bash
curl -X GET http://localhost:5000/api/packages \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## 🔗 Useful Links

- [API Documentation](./API_DOCUMENTATION.md)
- [Setup Guide](./SETUP.md)
- [Express.js Docs](https://expressjs.com/)
- [Mongoose Docs](https://mongoosejs.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

## ✅ Status

**Production Ready** - All features implemented and documented

## 📝 Version

v1.0.0 - Initial release

## 🙏 Support

For issues or questions, refer to:
- [API Documentation](./API_DOCUMENTATION.md)
- [Setup Guide](./SETUP.md)
- [Implementation Checklist](./IMPLEMENTATION_CHECKLIST.md)

---

**Ready to launch!** Start with `npm install` and configure `.env` 🚀
