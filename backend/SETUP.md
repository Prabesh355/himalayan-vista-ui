# Backend Setup Guide - Himalayan Vista Travel & Tour Management System

## Prerequisites

- Node.js v14+ installed
- MongoDB Atlas account with cluster created
- npm or yarn package manager

## Installation Steps

### 1. Install Dependencies

```bash
cd backend
npm install
```

This will install all required packages:
- **express** - Web framework
- **mongoose** - MongoDB ODM
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment variable management
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **multer** - File upload handling
- **cookie-parser** - Cookie parsing
- **helmet** - HTTP security headers
- **morgan** - HTTP request logging
- **express-rate-limit** - Rate limiting
- **express-validator** - Input validation
- **joi** - Schema validation

### 2. Configure Environment Variables

Copy `.env.example` to `.env` and update with your values:

```bash
cp .env.example .env
```

Update these critical values:

```
PORT=5000
NODE_ENV=development

# MongoDB Atlas Connection String
MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/himalayan_tours?retryWrites=true&w=majority

# JWT Configuration  
JWT_SECRET=your_super_secret_key_min_32_chars_change_in_production
JWT_EXPIRE=30d
JWT_COOKIE_EXPIRE=7
```

### 3. Start the Server

```bash
# Development mode with nodemon
npm run dev

# Production mode
npm start
```

Server will run on `http://localhost:5000`

## Project Structure

```
backend/
├── config/              # Configuration files
│   └── db.js           # MongoDB connection
├── controllers/         # Business logic
│   ├── authController.js
│   ├── packageController.js
│   ├── bookingController.js
│   ├── blogController.js
│   ├── reviewController.js
│   └── inquiryController.js
├── middleware/          # Express middleware
│   ├── auth.js         # JWT authentication & authorization
│   ├── validation.js   # Input validation
│   └── multer.js       # File upload handling
├── models/              # MongoDB schemas
│   ├── User.js
│   ├── Package.js
│   ├── Booking.js
│   ├── Blog.js
│   ├── Review.js
│   └── Inquiry.js
├── routes/              # API endpoints
│   ├── authRoutes.js
│   ├── userRoutes.js
│   ├── packageRoutes.js
│   ├── bookingRoutes.js
│   ├── blogRoutes.js
│   ├── reviewRoutes.js
│   ├── inquiryRoutes.js
│   └── adminRoutes.js
├── utils/               # Utility functions
│   ├── logger.js       # Logging system
│   └── errorHandler.js # Centralized error handling
├── uploads/             # File upload directory
├── app.js              # Express app configuration
├── server.js           # Server entry point
└── package.json        # Dependencies
```

## API Endpoints

### Authentication (/api/auth)
- `POST /register` - Register new user
- `POST /login` - User login
- `GET /me` - Get current user (Protected)
- `POST /logout` - Logout (Protected)
- `PUT /profile` - Update profile (Protected)
- `PUT /change-password` - Change password (Protected)
- `POST /forgot-password` - Request password reset
- `POST /reset-password/:token` - Reset password

### Packages (/api/packages)
- `GET /` - Get all packages (paginated, filterable)
- `GET /:id` - Get single package
- `GET /featured` - Get featured packages
- `GET /destination/:destination` - Get packages by destination
- `POST /` - Create package (Admin/Vendor only)
- `PUT /:id` - Update package (Admin/Vendor only)
- `DELETE /:id` - Delete package (Admin/Vendor only)

### Bookings (/api/bookings)
- `GET /` - Get user's bookings (Protected)
- `GET /:id` - Get booking details (Protected)
- `POST /` - Create booking (Protected)
- `PUT /:id` - Update booking (Protected)
- `DELETE /:id` - Cancel booking (Protected)
- `PUT /:id/status` - Update status (Admin only)

### Blogs (/api/blogs)
- `GET /` - Get all blogs (paginated, filterable)
- `GET /category/:category` - Get blogs by category
- `GET /:slug` - Get single blog
- `POST /` - Create blog (Admin only)
- `PUT /:id` - Update blog (Admin only)
- `DELETE /:id` - Delete blog (Admin only)
- `POST /:id/like` - Like blog (Protected)

### Reviews (/api/reviews)
- `GET /` - Get all reviews
- `GET /package/:packageId` - Get package reviews
- `POST /` - Create review (Protected)
- `PUT /:id` - Update review (Protected)
- `DELETE /:id` - Delete review (Protected)
- `PUT /:id/approve` - Approve review (Admin only)

### Inquiries (/api/inquiries)
- `POST /` - Submit inquiry
- `GET /` - Get all inquiries (Admin only)
- `GET /:id` - Get inquiry details (Admin only)
- `PUT /:id` - Update inquiry (Admin only)
- `POST /:id/respond` - Respond to inquiry (Admin only)
- `DELETE /:id` - Delete inquiry (Admin only)
- `GET /stats` - Get inquiry statistics (Admin only)

### Admin (/api/admin)
- `GET /dashboard/stats` - Dashboard statistics
- `GET /users` - Get all users
- `PUT /users/:id/role` - Update user role

### Users (/api/users)
- `GET /` - Get all users (Admin only)
- `GET /:id` - Get user details
- `PUT /:id` - Update user (Admin only)
- `DELETE /:id` - Delete user (Admin only)

## Authentication & Authorization

### JWT Token Flow
1. User registers/logs in
2. Server returns JWT token and sets HTTP-only cookie
3. Client sends token in `Authorization: Bearer <token>` header or via cookie
4. Server verifies token and attached user info to request

### Role-Based Access Control (RBAC)
Three roles available:
- **user** - Regular user, can make bookings and reviews
- **admin** - Full system access, can manage everything
- **vendor** - Can create and manage packages

### Protected Routes Usage
```javascript
router.get('/protected', protect, (req, res) => {
  // req.user is now available
});

router.delete('/admin-only', protect, authorize('admin'), (req, res) => {
  // Only admins can access
});

router.post('/vendor-action', protect, authorize('admin', 'vendor'), (req, res) => {
  // Admins or vendors can access
});
```

## Security Features

✅ **Helmet.js** - Sets secure HTTP headers
✅ **CORS** - Configured for frontend URL
✅ **Rate Limiting** - Prevents abuse (100 req/15min per IP)
✅ **Password Hashing** - bcryptjs with salt rounds
✅ **JWT Authentication** - Secure token-based auth
✅ **Input Validation** - express-validator & Joi
✅ **Error Handling** - Centralized error handler
✅ **Logging** - Request/response logging with Morgan
✅ **SQL Injection Protection** - Mongoose prevents injections
✅ **XSS Protection** - Helmet + input validation

## Error Handling

All errors return structured JSON responses:

```json
{
  "success": false,
  "message": "Error description",
  "stack": "Stack trace in development only"
}
```

### Error Status Codes
- `400` - Bad Request (validation, duplicate entries)
- `401` - Unauthorized (invalid credentials)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `500` - Internal Server Error

## Logging

Logs are saved to:
- `/logs/info.log` - General information
- `/logs/error.log` - Error logs
- `/logs/warn.log` - Warning logs
- `/logs/debug.log` - Debug info (if enabled)

Console output also displays with color coding.

## Testing the API

### Using cURL

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "password": "password123",
    "passwordConfirm": "password123"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'

# Get packages
curl http://localhost:5000/api/packages

# Protected route (with token)
curl -H "Authorization: Bearer <your_token>" \
  http://localhost:5000/api/auth/me
```

### Using Postman

1. Import the included Postman collection (create one with the endpoints above)
2. Set token in Authorization tab (Bearer token)
3. Test each endpoint

## Database Models

### User
- firstName, lastName, email (unique), password (hashed)
- phone, address (street, city, state, country)
- role (user, admin, vendor)
- profileImage, isActive, lastLogin
- preferences (newsletter, notifications)

### Package
- title (unique), description, destination
- price, discountPrice, duration (days/nights)
- images, highlights, itinerary, inclusions, exclusions
- groupSize (min/max), difficulty, bestSeason
- rating, reviewCount, availability
- createdBy (user ref), isActive

### Booking
- bookingNumber (auto-generated), package, user
- travelers array, startDate, endDate
- numberOfTravelers, totalPrice, pricePerPerson
- status (pending, confirmed, cancelled, completed)
- paymentStatus, paymentMethod, insurance, notes

### Blog
- title (unique), slug (auto-generated), excerpt, content
- author, featuredImage, gallery, category, tags
- status (draft, published, archived), publishedDate
- views, likes, comments, seoTitle, seoDescription

### Review
- package, user (unique combo), booking
- rating (1-5), title, comment
- ratingBreakdown (guide, accommodation, food, transport, value)
- verifiedPurchase, helpful, images, status

### Inquiry
- firstName, lastName, email, phone
- subject, inquiryType, message, preferredContact
- package (optional), status, priority
- assignedTo, response (message, respondedBy, respondedAt)

## Performance Optimization

- Database indexes on frequently queried fields
- Pagination for list endpoints (default 10 items/page)
- Population limits to avoid N+1 queries
- Geospatial indexing for location-based queries

## Deployment Checklist

Before going to production:

- [ ] Update JWT_SECRET to strong random string
- [ ] Set NODE_ENV to 'production'
- [ ] Configure MONGODB_URI with production database
- [ ] Set up email service for password resets
- [ ] Configure AWS S3 or alternative file storage
- [ ] Enable HTTPS
- [ ] Set up database backups
- [ ] Configure monitoring/alerts
- [ ] Run security audit
- [ ] Load test the API

## Troubleshooting

### MongoDB Connection Error
- Verify MONGODB_URI in .env
- Check MongoDB Atlas IP whitelist
- Confirm database credentials

### JWT Errors
- Ensure JWT_SECRET is set
- Check token expiry
- Verify token format: `Bearer <token>`

### CORS Issues
- Ensure frontend URL matches FRONTEND_URL in .env
- Check browser console for specific error

### Rate Limiting
- Default: 100 requests per 15 minutes per IP
- Adjust in app.js as needed

## Support & Documentation

- MongoDB: https://docs.mongodb.com/
- Express: https://expressjs.com/
- Mongoose: https://mongoosejs.com/
- JWT: https://jwt.io/

---

**Created**: 2026
**Version**: 1.0.0
**Status**: Production Ready
