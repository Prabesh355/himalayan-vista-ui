# API Documentation - Himalayan Vista Backend

## Base URL
`http://localhost:5000/api`

## Authentication
All protected endpoints require a JWT token in the `Authorization` header:
```
Authorization: Bearer <your_jwt_token>
```

Or via HTTP-only cookie automatically set during login.

---

## Auth Endpoints

### 1. Register User
**POST** `/auth/register`
- **Access**: Public
- **Body**:
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123",
  "passwordConfirm": "password123"
}
```
- **Response**: JWT token + user object

### 2. Login User
**POST** `/auth/login`
- **Access**: Public
- **Body**:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
- **Response**: JWT token + user object + sets cookie

### 3. Get Current User
**GET** `/auth/me`
- **Access**: Protected
- **Response**: Current user object (without password)

### 4. Update Profile
**PUT** `/auth/profile`
- **Access**: Protected
- **Body**:
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "phone": "1234567890",
  "address": {
    "street": "123 Main St",
    "city": "Kathmandu",
    "state": "Bagmati",
    "postalCode": "44600",
    "country": "Nepal"
  }
}
```

### 5. Change Password
**PUT** `/auth/change-password`
- **Access**: Protected
- **Body**:
```json
{
  "currentPassword": "oldpassword123",
  "newPassword": "newpassword123",
  "confirmPassword": "newpassword123"
}
```

### 6. Forgot Password
**POST** `/auth/forgot-password`
- **Access**: Public
- **Body**: `{ "email": "user@example.com" }`
- **Response**: Reset token (send via email in production)

### 7. Reset Password
**POST** `/auth/reset-password/:token`
- **Access**: Public
- **Body**:
```json
{
  "password": "newpassword123",
  "passwordConfirm": "newpassword123"
}
```

### 8. Logout
**POST** `/auth/logout`
- **Access**: Protected
- **Response**: Clears authentication cookie

---

## Package Endpoints

### 1. Get All Packages
**GET** `/packages`
- **Access**: Public
- **Query Parameters**:
  - `page` (default: 1)
  - `limit` (default: 10)
  - `destination` - Filter by destination (regex search)
  - `minPrice` - Minimum price filter
  - `maxPrice` - Maximum price filter
  - `difficulty` - Filter by difficulty (easy, moderate, difficult, expert)
  - `category` - Filter by category (trekking, cultural, adventure, luxury, wildlife)
- **Example**: `/packages?destination=Everest&minPrice=500&difficulty=difficult&page=1`

### 2. Get Single Package
**GET** `/packages/:id`
- **Access**: Public
- **Response**: Package details with creator info

### 3. Get Featured Packages
**GET** `/packages/featured`
- **Access**: Public
- **Response**: Top-rated packages (rating >= 4)

### 4. Get Packages by Destination
**GET** `/packages/destination/:destination`
- **Access**: Public
- **Response**: Array of packages for that destination

### 5. Create Package
**POST** `/packages`
- **Access**: Protected (Admin/Vendor only)
- **Body**:
```json
{
  "title": "Everest Base Camp Trek",
  "description": "5-day trek to EBC",
  "destination": "Mount Everest",
  "price": 1500,
  "discountPrice": 1200,
  "duration": { "days": 5, "nights": 4 },
  "images": ["url1", "url2"],
  "highlights": ["scenic views", "local culture"],
  "difficulty": "difficult",
  "category": "trekking",
  "groupSize": { "min": 2, "max": 12 },
  "bestSeason": ["Mar-May", "Sep-Nov"]
}
```

### 6. Update Package
**PUT** `/packages/:id`
- **Access**: Protected (Creator or Admin only)
- **Body**: Any package fields to update

### 7. Delete Package
**DELETE** `/packages/:id`
- **Access**: Protected (Creator or Admin only)

---

## Booking Endpoints

### 1. Get All Bookings
**GET** `/bookings`
- **Access**: Protected
- **Note**: Users see own bookings, admins see all
- **Query**: `page`, `limit`

### 2. Get Single Booking
**GET** `/bookings/:id`
- **Access**: Protected (Owner or Admin only)
- **Response**: Full booking details with package and user info

### 3. Create Booking
**POST** `/bookings`
- **Access**: Protected
- **Body**:
```json
{
  "packageId": "package_id_here",
  "travelers": [
    {
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "phone": "1234567890",
      "dateOfBirth": "1990-01-15",
      "nationality": "USA",
      "idNumber": "ABC123456"
    }
  ],
  "startDate": "2024-05-15",
  "endDate": "2024-05-20",
  "numberOfTravelers": 1,
  "specialRequests": "Vegetarian meals needed"
}
```

### 4. Update Booking
**PUT** `/bookings/:id`
- **Access**: Protected (Owner or Admin only)
- **Note**: Can only update if status is 'pending'

### 5. Cancel Booking
**DELETE** `/bookings/:id`
- **Access**: Protected (Owner or Admin only)

### 6. Update Booking Status (Admin)
**PUT** `/bookings/:id/status`
- **Access**: Protected (Admin only)
- **Body**:
```json
{
  "status": "confirmed",
  "paymentStatus": "paid"
}
```

---

## Blog Endpoints

### 1. Get All Blogs
**GET** `/blogs`
- **Access**: Public
- **Query**:
  - `page`, `limit`
  - `category` - Filter by category
  - `tag` - Filter by tag
  - `status` - Default: 'published'
  - `search` - Text search

### 2. Get Blog by Slug
**GET** `/blogs/:slug`
- **Access**: Public
- **Note**: Auto-increments view count

### 3. Get Blogs by Category
**GET** `/blogs/category/:category`
- **Access**: Public
- **Response**: Latest blogs in that category

### 4. Create Blog
**POST** `/blogs`
- **Access**: Protected (Admin only)
- **Body**:
```json
{
  "title": "Top 10 Trekking Trails",
  "excerpt": "Best trekking destinations in Nepal",
  "content": "Long form content...",
  "featuredImage": "image_url",
  "category": "guides",
  "tags": ["trekking", "nepal", "adventure"],
  "seoTitle": "Best Trekking Trails",
  "seoDescription": "Discover the best trekking trails..."
}
```

### 5. Update Blog
**PUT** `/blogs/:id`
- **Access**: Protected (Creator or Admin only)
- **Body**: Any blog fields to update

### 6. Delete Blog
**DELETE** `/blogs/:id`
- **Access**: Protected (Creator or Admin only)

### 7. Like Blog
**POST** `/blogs/:id/like`
- **Access**: Protected
- **Response**: Updated like count

---

## Review Endpoints

### 1. Get All Reviews
**GET** `/reviews`
- **Access**: Public
- **Query**:
  - `page`, `limit`
  - `status` - Default: 'approved'
  - `minRating` - Filter by minimum rating

### 2. Get Package Reviews
**GET** `/reviews/package/:packageId`
- **Access**: Public
- **Response**: Package reviews + average rating + statistics

### 3. Create Review
**POST** `/reviews`
- **Access**: Protected
- **Body**:
```json
{
  "package": "package_id",
  "rating": 5,
  "title": "Amazing Experience",
  "comment": "Best trek ever! Highly recommended.",
  "ratingBreakdown": {
    "guide": 5,
    "accommodation": 4,
    "food": 4,
    "transport": 5,
    "value": 5
  }
}
```

### 4. Update Review
**PUT** `/reviews/:id`
- **Access**: Protected (Author or Admin only)

### 5. Delete Review
**DELETE** `/reviews/:id`
- **Access**: Protected (Author or Admin only)

### 6. Approve Review (Admin)
**PUT** `/reviews/:id/approve`
- **Access**: Protected (Admin only)

---

## Inquiry Endpoints

### 1. Submit Inquiry
**POST** `/inquiries`
- **Access**: Public
- **Body**:
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "+977-1-1234567",
  "subject": "Package Custom Request",
  "inquiryType": "booking",
  "package": "package_id_optional",
  "message": "Can you modify this package for our group?",
  "preferredContact": "email"
}
```

### 2. Get All Inquiries (Admin)
**GET** `/inquiries`
- **Access**: Protected (Admin only)
- **Query**:
  - `page`, `limit`
  - `status` - Filter by status
  - `priority` - Filter by priority

### 3. Get Single Inquiry (Admin)
**GET** `/inquiries/:id`
- **Access**: Protected (Admin only)

### 4. Update Inquiry (Admin)
**PUT** `/inquiries/:id`
- **Access**: Protected (Admin only)
- **Body**:
```json
{
  "status": "in-progress",
  "priority": "high",
  "assignedTo": "admin_user_id",
  "notes": "Customer needs group discount"
}
```

### 5. Respond to Inquiry (Admin)
**POST** `/inquiries/:id/respond`
- **Access**: Protected (Admin only)
- **Body**:
```json
{
  "message": "We can definitely customize this package for your group..."
}
```

### 6. Get Inquiry Statistics (Admin)
**GET** `/inquiries/stats`
- **Access**: Protected (Admin only)
- **Response**: Count by status and priority

### 7. Delete Inquiry (Admin)
**DELETE** `/inquiries/:id`
- **Access**: Protected (Admin only)

---

## User Endpoints (Admin)

### 1. Get All Users
**GET** `/users`
- **Access**: Protected (Admin only)

### 2. Get Single User
**GET** `/users/:id`
- **Access**: Protected (Owner or Admin)

### 3. Update User (Admin)
**PUT** `/users/:id`
- **Access**: Protected (Admin only)

### 4. Delete User (Admin)
**DELETE** `/users/:id`
- **Access**: Protected (Admin only)

---

## Admin Endpoints

### 1. Get Dashboard Statistics
**GET** `/admin/dashboard/stats`
- **Access**: Protected (Admin only)
- **Response**: Total users, packages, bookings, inquiries, reviews

### 2. Get All Users
**GET** `/admin/users`
- **Access**: Protected (Admin only)

### 3. Update User Role
**PUT** `/admin/users/:id/role`
- **Access**: Protected (Admin only)
- **Body**: `{ "role": "admin" | "vendor" | "user" }`

---

## Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "stack": "Stack trace (development only)"
}
```

### Paginated Response
```json
{
  "success": true,
  "count": 10,
  "total": 45,
  "pages": 5,
  "currentPage": 1,
  "data": []
}
```

---

## Rate Limits

- **General**: 100 requests per 15 minutes per IP
- **Authentication**: Not rate limited (adjust in production)

---

## Status Codes

- **200** - OK
- **201** - Created
- **204** - No Content
- **400** - Bad Request
- **401** - Unauthorized
- **403** - Forbidden  
- **404** - Not Found
- **409** - Conflict (duplicate entry)
- **500** - Internal Server Error

---

## Common Errors

| Code | Message | Solution |
|------|---------|----------|
| 400 | Invalid email format | Provide valid email |
| 400 | Email already exists | Use different email or login |
| 400 | Passwords do not match | Confirm passwords match |
| 401 | Invalid credentials | Check email/password |
| 401 | Token expired | Login again to get new token |
| 403 | Not authorized | User lacks required role/ownership |
| 404 | Not found | ID doesn't exist or has been deleted |
| 409 | Duplicate entry | Email/unique field already in use |

---

**Last Updated**: 2026
**API Version**: 1.0.0
