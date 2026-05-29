# Booking System API Documentation

**Status:** ✅ Production Ready  
**Version:** 1.0.0  
**Last Updated:** May 29, 2026

---

## 📌 Overview

Complete booking management system for travel packages with:
- ✅ Create bookings
- ✅ View booking history
- ✅ Cancel bookings with refund policies
- ✅ Admin booking management
- ✅ Payment status tracking
- ✅ Booking status workflows
- ✅ Traveler information management

---

## 🔑 Booking Statuses

| Status | Description | Allowed Transitions |
|--------|-------------|-------------------|
| `pending` | Initial state after booking creation | → confirmed, cancelled |
| `confirmed` | Admin confirmed the booking | → completed, cancelled |
| `cancelled` | User or admin cancelled the booking | (terminal) |
| `completed` | Trip completed successfully | (terminal) |

---

## 💳 Payment Statuses

| Status | Description |
|--------|-------------|
| `pending` | Payment not yet received |
| `partial` | Partial payment received |
| `paid` | Full payment received |
| `refunded` | Refund processed |

---

## 📋 Booking Fields Reference

| Field | Type | Required | Validation |
|-------|------|----------|-----------|
| bookingNumber | String | Auto | Unique, generated |
| user | ObjectId | ✅ | User reference |
| package | ObjectId | ✅ | Package reference |
| travelDate | Date | ✅ | Must be future date |
| endDate | Date | ✅ | Must be after travelDate |
| numberOfTravelers | Number | ✅ | 1-100 travelers |
| travelers | Array | ✅ | Min 1 traveler object |
| pricePerPerson | Number | ✅ | Calculated from package |
| totalPrice | Number | ✅ | Auto-calculated |
| discount | Number | ❌ | Default 0 |
| discountCode | String | ❌ | Optional code |
| taxes | Number | Auto | 10% of totalPrice |
| insurance | Object | ❌ | Optional insurance info |
| bookingStatus | String | Auto | Default: pending |
| paymentStatus | String | Auto | Default: pending |
| paymentMethod | String | ❌ | credit_card, debit_card, etc. |
| specialRequests | String | ❌ | Max 500 chars |
| cancellationDate | Date | Auto | Set on cancellation |
| refundAmount | Number | Auto | Calculated on cancel |

---

## 🔐 Authentication

All booking endpoints require JWT token in header:

```bash
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## 📚 API Endpoints

### 1. Create Booking
```http
POST /api/bookings
Authorization: Bearer TOKEN
Content-Type: application/json
```

**Request Body:**
```json
{
  "packageId": "60d5ec49c1234567890abc",
  "travelDate": "2026-07-15T00:00:00Z",
  "endDate": "2026-07-20T00:00:00Z",
  "numberOfTravelers": 3,
  "travelers": [
    {
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "phone": "+977981234567",
      "dateOfBirth": "1990-05-15",
      "nationality": "American",
      "idNumber": "ID123456",
      "passportNumber": "PA123456",
      "specialRequests": "Need vegetarian meals"
    },
    {
      "firstName": "Jane",
      "lastName": "Doe",
      "email": "jane@example.com"
    },
    {
      "firstName": "Jack",
      "lastName": "Smith",
      "phone": "+977982345678"
    }
  ],
  "paymentMethod": "credit_card",
  "specialRequests": "Prefer early morning departures"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Booking created successfully",
  "data": {
    "_id": "60d5ec49c1234567890def",
    "bookingNumber": "BK260529000001",
    "user": {
      "_id": "user_id",
      "firstName": "User",
      "lastName": "Name",
      "email": "user@example.com",
      "phone": "+977981234567"
    },
    "package": {
      "_id": "60d5ec49c1234567890abc",
      "title": "Everest Base Camp Trek",
      "destination": "Mount Everest",
      "price": 1500,
      "duration": {
        "days": 5,
        "nights": 4
      },
      "difficulty": "difficult"
    },
    "travelDate": "2026-07-15T00:00:00Z",
    "endDate": "2026-07-20T00:00:00Z",
    "numberOfTravelers": 3,
    "travelers": [
      {
        "firstName": "John",
        "lastName": "Doe",
        "email": "john@example.com",
        "phone": "+977981234567",
        "dateOfBirth": "1990-05-15",
        "nationality": "American",
        "idNumber": "ID123456",
        "passportNumber": "PA123456",
        "specialRequests": "Need vegetarian meals"
      }
    ],
    "pricePerPerson": 1500,
    "totalPrice": 4500,
    "discount": 0,
    "taxes": 450,
    "bookingStatus": "pending",
    "paymentStatus": "pending",
    "paymentMethod": "credit_card",
    "specialRequests": "Prefer early morning departures",
    "createdAt": "2026-05-29T10:00:00Z",
    "updatedAt": "2026-05-29T10:00:00Z"
  }
}
```

**Error Responses:**

400 - Validation Failed:
```json
{
  "success": false,
  "message": "Validation failed: Travel date must be in the future"
}
```

404 - Package Not Found:
```json
{
  "success": false,
  "message": "Package not found"
}
```

---

### 2. Get User's Bookings
```http
GET /api/bookings?page=1&limit=10&status=pending&paymentStatus=pending&sort=-createdAt
Authorization: Bearer TOKEN
```

**Query Parameters:**
| Parameter | Type | Values | Default | Example |
|-----------|------|--------|---------|---------|
| page | number | >= 1 | 1 | `page=2` |
| limit | number | 1-100 | 10 | `limit=20` |
| status | string | pending, confirmed, cancelled, completed | - | `status=confirmed` |
| paymentStatus | string | pending, partial, paid, refunded | - | `paymentStatus=paid` |
| sort | string | Field names | -createdAt | `sort=-travelDate` |

**Response (200):**
```json
{
  "success": true,
  "count": 5,
  "total": 15,
  "pages": 2,
  "currentPage": 1,
  "data": [
    {
      "_id": "60d5ec49c1234567890def",
      "bookingNumber": "BK260529000001",
      "user": {...},
      "package": {...},
      "travelDate": "2026-07-15T00:00:00Z",
      "endDate": "2026-07-20T00:00:00Z",
      "numberOfTravelers": 3,
      "totalPrice": 4500,
      "bookingStatus": "confirmed",
      "paymentStatus": "paid",
      "createdAt": "2026-05-29T10:00:00Z"
    }
  ]
}
```

---

### 3. Get Single Booking
```http
GET /api/bookings/:id
Authorization: Bearer TOKEN
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "60d5ec49c1234567890def",
    "bookingNumber": "BK260529000001",
    "user": {...},
    "package": {...},
    "travelers": [...],
    "travelDate": "2026-07-15T00:00:00Z",
    "endDate": "2026-07-20T00:00:00Z",
    "numberOfTravelers": 3,
    "pricePerPerson": 1500,
    "totalPrice": 4500,
    "discount": 0,
    "taxes": 450,
    "bookingStatus": "confirmed",
    "paymentStatus": "paid",
    "paymentMethod": "credit_card",
    "specialRequests": "Prefer early morning departures",
    "insurance": {
      "included": true,
      "insurancePrice": 100,
      "insuranceType": "travel_insurance"
    },
    "createdAt": "2026-05-29T10:00:00Z",
    "updatedAt": "2026-05-29T10:00:00Z"
  }
}
```

**Error Responses:**

403 - Not Authorized:
```json
{
  "success": false,
  "message": "Not authorized to view this booking"
}
```

404 - Not Found:
```json
{
  "success": false,
  "message": "Booking not found"
}
```

---

### 4. Update Booking
```http
PUT /api/bookings/:id
Authorization: Bearer TOKEN
Content-Type: application/json
```

**Request Body (All optional):**
```json
{
  "travelers": [
    {
      "firstName": "John",
      "lastName": "Doe",
      "email": "newemail@example.com",
      "phone": "+977981234567",
      "specialRequests": "Updated request"
    }
  ],
  "numberOfTravelers": 4,
  "specialRequests": "New special requests",
  "paymentMethod": "debit_card"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Booking updated successfully",
  "data": {
    "bookingNumber": "BK260529000001",
    "numberOfTravelers": 4,
    "totalPrice": 6000,
    "specialRequests": "New special requests",
    "paymentMethod": "debit_card",
    "bookingStatus": "pending"
  }
}
```

**Constraints:**
- Cannot update cancelled or completed bookings
- Only booking creator or admin can update
- Travelers array length must match numberOfTravelers
- Updated numberOfTravelers must be within package group size limits

---

### 5. Cancel Booking
```http
PUT /api/bookings/:id/cancel
Authorization: Bearer TOKEN
Content-Type: application/json
```

**Request Body:**
```json
{
  "cancellationReason": "Flight got cancelled"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Booking cancelled successfully",
  "data": {
    "bookingNumber": "BK260529000001",
    "bookingStatus": "cancelled",
    "cancellationDate": "2026-05-29T10:30:00Z",
    "cancellationReason": "Flight got cancelled",
    "refundAmount": 2250,
    "refundStatus": "pending",
    "daysUntilTravel": 47
  }
}
```

**Cancellation Policy:**
- Cannot cancel completed or already cancelled bookings
- Minimum 14 days before travel date required
- Refund calculation:
  - ✅ **30+ days before travel:** 100% refund
  - ✅ **14-30 days before travel:** 50% refund
  - ❌ **< 14 days:** Cannot cancel

**Error Response:**

400 - Cancellation Not Allowed:
```json
{
  "success": false,
  "message": "Cancellation must be done at least 14 days before travel. You have 7 days."
}
```

---

### 6. Get All Bookings (Admin)
```http
GET /api/bookings/admin/all?page=1&limit=10&status=pending&paymentStatus=pending&userId=user_id&sort=-createdAt
Authorization: Bearer ADMIN_TOKEN
```

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| page | number | Page number (default: 1) |
| limit | number | Results per page, max 100 (default: 10) |
| status | string | Filter by booking status |
| paymentStatus | string | Filter by payment status |
| userId | string | Filter by specific user |
| sort | string | Sort by field (e.g., -createdAt, travelDate) |

**Response (200):**
```json
{
  "success": true,
  "count": 10,
  "total": 125,
  "pages": 13,
  "currentPage": 1,
  "data": [
    {
      "bookingNumber": "BK260529000001",
      "user": {...},
      "package": {...},
      "numberOfTravelers": 3,
      "totalPrice": 4500,
      "bookingStatus": "pending",
      "paymentStatus": "paid",
      "travelDate": "2026-07-15",
      "createdAt": "2026-05-29T10:00:00Z"
    }
  ]
}
```

---

### 7. Update Booking Status (Admin)
```http
PUT /api/bookings/:id/status
Authorization: Bearer ADMIN_TOKEN
Content-Type: application/json
```

**Request Body:**
```json
{
  "bookingStatus": "confirmed",
  "paymentStatus": "paid",
  "notes": "Payment confirmed via Stripe"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Booking status updated successfully",
  "data": {
    "bookingNumber": "BK260529000001",
    "bookingStatus": "confirmed",
    "paymentStatus": "paid",
    "notes": "Payment confirmed via Stripe",
    "user": {...}
  }
}
```

---

### 8. Get Booking History & Analytics (Admin)
```http
GET /api/bookings/history/analytics?startDate=2026-01-01&endDate=2026-12-31&userId=user_id
Authorization: Bearer ADMIN_TOKEN
```

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| startDate | date | Start date for range (YYYY-MM-DD) |
| endDate | date | End date for range (YYYY-MM-DD) |
| userId | string | Filter by specific user |

**Response (200):**
```json
{
  "success": true,
  "analytics": {
    "totalBookings": 125,
    "totalRevenue": 562500,
    "completedBookings": 89,
    "cancelledBookings": 12,
    "confirmedBookings": 18,
    "pendingBookings": 6,
    "paidBookings": 95,
    "averageBookingValue": 4500
  },
  "data": [
    {
      "bookingNumber": "BK260529000001",
      "user": {...},
      "package": {...},
      "travelDate": "2026-07-15",
      "totalPrice": 4500,
      "bookingStatus": "completed"
    }
  ]
}
```

---

### 9. Get Booking Statistics (Admin)
```http
GET /api/bookings/stats/overview
Authorization: Bearer ADMIN_TOKEN
```

**Response (200):**
```json
{
  "success": true,
  "bookingStats": [
    {
      "_id": "completed",
      "count": 89,
      "totalRevenue": 400500
    },
    {
      "_id": "confirmed",
      "count": 18,
      "totalRevenue": 81000
    },
    {
      "_id": "pending",
      "count": 6,
      "totalRevenue": 27000
    },
    {
      "_id": "cancelled",
      "count": 12,
      "totalRevenue": 54000
    }
  ],
  "paymentStats": [
    {
      "_id": "paid",
      "count": 95
    },
    {
      "_id": "pending",
      "count": 20
    },
    {
      "_id": "partial",
      "count": 10
    }
  ]
}
```

---

## 🧪 Testing Examples

### JavaScript (Axios)
```javascript
// Create booking
const bookingData = {
  packageId: '60d5ec49c1234567890abc',
  travelDate: '2026-07-15',
  endDate: '2026-07-20',
  numberOfTravelers: 3,
  travelers: [
    {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phone: '+977981234567'
    }
  ],
  paymentMethod: 'credit_card'
};

const res = await axios.post('/api/bookings', bookingData, {
  headers: {
    Authorization: `Bearer ${token}`
  }
});
```

### cURL
```bash
# Create booking
curl -X POST http://localhost:5000/api/bookings \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "packageId": "60d5ec49c1234567890abc",
    "travelDate": "2026-07-15",
    "endDate": "2026-07-20",
    "numberOfTravelers": 3,
    "travelers": [{"firstName": "John", "lastName": "Doe"}],
    "paymentMethod": "credit_card"
  }'

# Get user bookings
curl -X GET "http://localhost:5000/api/bookings?page=1&limit=10" \
  -H "Authorization: Bearer TOKEN"

# Cancel booking
curl -X PUT http://localhost:5000/api/bookings/BOOKING_ID/cancel \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"cancellationReason": "Change of plans"}'

# Get all bookings (admin)
curl -X GET "http://localhost:5000/api/bookings/admin/all?status=confirmed" \
  -H "Authorization: Bearer ADMIN_TOKEN"
```

---

## ⚠️ Error Responses

### 400 - Bad Request
```json
{
  "success": false,
  "message": "Validation failed: Travel date must be in the future"
}
```

### 401 - Unauthorized
```json
{
  "success": false,
  "message": "Not authorized to access this route"
}
```

### 403 - Forbidden
```json
{
  "success": false,
  "message": "Not authorized to view this booking"
}
```

### 404 - Not Found
```json
{
  "success": false,
  "message": "Booking not found"
}
```

---

## 🔒 Security Features

✅ **Authentication:** JWT token required  
✅ **Authorization:** Role-based access (user, admin)  
✅ **Ownership Verification:** Users can only view/edit own bookings  
✅ **Input Validation:** Comprehensive validation with express-validator  
✅ **Rate Limiting:** Applied via parent middleware  
✅ **Logging:** All operations logged for audit trail  

---

## 📊 Database Indexes

```javascript
// Performance indexes
- user: 1, createdAt: -1
- bookingStatus: 1, paymentStatus: 1
- travelDate: 1
- bookingNumber: (unique)
- createdAt: -1
```

---

## 🎯 Common Workflows

### Complete Booking Flow
```
1. User creates booking (status: pending, paymentStatus: pending)
2. User pays (admin updates paymentStatus: paid)
3. Admin confirms (status: confirmed)
4. Travel date arrives (status: completed via admin)
```

### Cancellation Flow
```
1. User cancels booking within policy window
2. cancellationDate set, refund calculated
3. status: cancelled, refundStatus: pending
4. Admin processes refund (refundStatus: processed)
5. paymentStatus updated to refunded
```

---

## 📈 Performance Notes

- **Pagination:** Recommended page size 10-20 for list endpoints
- **Filtering:** Use status filters for faster queries
- **Sorting:** Indexed fields (createdAt, travelDate, bookingStatus) perform best
- **Large datasets:** Use date range filters to limit results

---

## ✅ Validation Rules

### Traveler Information
- ✅ First/Last name: 2-50 characters, required
- ✅ Email: Valid format, optional
- ✅ Phone: Valid format, optional
- ✅ DOB: Valid ISO date, age 0-150
- ✅ Nationality: Min 2 characters, optional
- ✅ ID/Passport: Min 5 characters, optional

### Booking Details
- ✅ Travel date: Future date required
- ✅ End date: Must be after travel date
- ✅ Travelers: Length must match numberOfTravelers
- ✅ Group size: Must match package limits
- ✅ Payment method: Valid enum value

---

**See [BOOKING_SYSTEM_SUMMARY.md](./BOOKING_SYSTEM_SUMMARY.md) for implementation checklist.**
