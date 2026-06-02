# Booking System - Testing Guide

**Created:** May 29, 2026  
**Version:** 1.0.0

---

## 🧪 Quick Test Checklist

- [ ] Create booking (valid data)
- [ ] Retrieve single booking
- [ ] List user bookings with pagination
- [ ] Filter bookings by status
- [ ] Update booking details
- [ ] Cancel booking within policy
- [ ] Admin: Get all bookings
- [ ] Admin: Update booking status
- [ ] Admin: View booking history
- [ ] Admin: View statistics
- [ ] Error: Invalid package
- [ ] Error: Past travel date
- [ ] Error: Unauthorized access
- [ ] Error: Cancel completed booking

---

## 📋 Test Cases

### 1. Create Valid Booking
<<<<<<< HEAD

=======
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
```bash
curl -X POST http://localhost:5000/api/bookings \
  -H "Authorization: Bearer USER_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "packageId": "PACKAGE_ID",
    "travelDate": "2026-08-15",
    "endDate": "2026-08-20",
    "numberOfTravelers": 2,
    "travelers": [
      {
        "firstName": "John",
        "lastName": "Doe",
        "email": "john@example.com",
        "phone": "+977981234567",
        "dateOfBirth": "1990-05-15",
        "nationality": "American"
      },
      {
        "firstName": "Jane",
        "lastName": "Doe",
        "email": "jane@example.com",
        "phone": "+977982345678"
      }
    ],
    "paymentMethod": "credit_card",
    "specialRequests": "Vegetarian meals needed"
  }'
```

**Expected:** 201 Created with booking details

---

### 2. Get Single Booking
<<<<<<< HEAD

=======
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
```bash
curl -X GET http://localhost:5000/api/bookings/BOOKING_ID \
  -H "Authorization: Bearer USER_TOKEN"
```

**Expected:** 200 OK with complete booking data

---

### 3. List User Bookings
<<<<<<< HEAD

=======
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
```bash
curl -X GET "http://localhost:5000/api/bookings?page=1&limit=10&sort=-createdAt" \
  -H "Authorization: Bearer USER_TOKEN"
```

**Expected:** 200 OK with paginated bookings

---

### 4. Filter by Status
<<<<<<< HEAD

=======
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
```bash
curl -X GET "http://localhost:5000/api/bookings?status=confirmed&paymentStatus=paid" \
  -H "Authorization: Bearer USER_TOKEN"
```

**Expected:** 200 OK with filtered bookings

---

### 5. Update Booking
<<<<<<< HEAD

=======
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
```bash
curl -X PUT http://localhost:5000/api/bookings/BOOKING_ID \
  -H "Authorization: Bearer USER_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "specialRequests": "Early morning departure preferred",
    "numberOfTravelers": 3,
    "travelers": [
      {
        "firstName": "John",
        "lastName": "Doe",
        "email": "john@example.com"
      },
      {
        "firstName": "Jane",
        "lastName": "Doe",
        "email": "jane@example.com"
      },
      {
        "firstName": "Jack",
        "lastName": "Smith",
        "email": "jack@example.com"
      }
    ]
  }'
```

**Expected:** 200 OK with updated booking

<<<<<<< HEAD
**Note:** Total price will be recalculated: 1500 \* 3 = 4500
=======
**Note:** Total price will be recalculated: 1500 * 3 = 4500
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763

---

### 6. Cancel Booking (Valid)
<<<<<<< HEAD

=======
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
```bash
curl -X PUT http://localhost:5000/api/bookings/BOOKING_ID/cancel \
  -H "Authorization: Bearer USER_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "cancellationReason": "Changed my plans"
  }'
```

**Expected:** 200 OK with refund information

**Requirements for success:**
<<<<<<< HEAD

=======
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
- ✅ Travel date > 14 days away
- ✅ Booking not already cancelled/completed
- ✅ User is booking owner or admin

---

### 7. Try Cancel Too Late (Should Fail)
<<<<<<< HEAD

=======
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
```bash
# Create a booking with travel date 7 days away
curl -X POST http://localhost:5000/api/bookings \
  -H "Authorization: Bearer USER_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "packageId": "PACKAGE_ID",
    "travelDate": "2026-06-05",
    "endDate": "2026-06-10",
    "numberOfTravelers": 1,
    "travelers": [{"firstName": "John", "lastName": "Doe"}]
  }'

# Try to cancel (should fail)
curl -X PUT http://localhost:5000/api/bookings/BOOKING_ID/cancel \
  -H "Authorization: Bearer USER_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{}'
```

**Expected:** 400 Bad Request
<<<<<<< HEAD

=======
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
```json
{
  "success": false,
  "message": "Cancellation must be done at least 14 days before travel. You have 7 days."
}
```

---

### 8. Unauthorized Access (Should Fail)
<<<<<<< HEAD

=======
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
```bash
# User A creates booking
# User B tries to access it
curl -X GET http://localhost:5000/api/bookings/OTHER_USER_BOOKING_ID \
  -H "Authorization: Bearer OTHER_USER_TOKEN"
```

**Expected:** 403 Forbidden
<<<<<<< HEAD

=======
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
```json
{
  "success": false,
  "message": "Not authorized to view this booking"
}
```

---

### 9. Admin: Get All Bookings
<<<<<<< HEAD

=======
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
```bash
curl -X GET "http://localhost:5000/api/bookings/admin/all?page=1&limit=20" \
  -H "Authorization: Bearer ADMIN_TOKEN"
```

**Expected:** 200 OK with all bookings (admin only)

---

### 10. Admin: Update Booking Status
<<<<<<< HEAD

=======
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
```bash
curl -X PUT http://localhost:5000/api/bookings/BOOKING_ID/status \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "bookingStatus": "confirmed",
    "paymentStatus": "paid",
    "notes": "Payment received via Stripe"
  }'
```

**Expected:** 200 OK with updated status

---

### 11. Admin: Get Booking History
<<<<<<< HEAD

=======
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
```bash
curl -X GET "http://localhost:5000/api/bookings/history/analytics?startDate=2026-01-01&endDate=2026-12-31" \
  -H "Authorization: Bearer ADMIN_TOKEN"
```

**Expected:** 200 OK with analytics data

---

### 12. Admin: Get Statistics
<<<<<<< HEAD

=======
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
```bash
curl -X GET http://localhost:5000/api/bookings/stats/overview \
  -H "Authorization: Bearer ADMIN_TOKEN"
```

**Expected:** 200 OK with booking statistics

---

## ⚠️ Error Scenarios

### Invalid Package
<<<<<<< HEAD

=======
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
```bash
curl -X POST http://localhost:5000/api/bookings \
  -H "Authorization: Bearer USER_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "packageId": "invalid_id",
    "travelDate": "2026-08-15",
    "endDate": "2026-08-20",
    "numberOfTravelers": 1,
    "travelers": [{"firstName": "John", "lastName": "Doe"}]
  }'
```

**Expected:** 400 Bad Request
<<<<<<< HEAD

=======
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
```json
{
  "success": false,
  "message": "Validation failed: Invalid package ID"
}
```

---

### Past Travel Date
<<<<<<< HEAD

=======
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
```bash
curl -X POST http://localhost:5000/api/bookings \
  -H "Authorization: Bearer USER_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "packageId": "PACKAGE_ID",
    "travelDate": "2020-08-15",
    "endDate": "2020-08-20",
    "numberOfTravelers": 1,
    "travelers": [{"firstName": "John", "lastName": "Doe"}]
  }'
```

**Expected:** 400 Bad Request
<<<<<<< HEAD

=======
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
```json
{
  "success": false,
  "message": "Validation failed: Travel date must be in the future"
}
```

---

### End Date Before Travel Date
<<<<<<< HEAD

=======
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
```bash
curl -X POST http://localhost:5000/api/bookings \
  -H "Authorization: Bearer USER_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "packageId": "PACKAGE_ID",
    "travelDate": "2026-08-20",
    "endDate": "2026-08-15",
    "numberOfTravelers": 1,
    "travelers": [{"firstName": "John", "lastName": "Doe"}]
  }'
```

**Expected:** 400 Bad Request
<<<<<<< HEAD

=======
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
```json
{
  "success": false,
  "message": "Validation failed: End date must be after travel date"
}
```

---

### Mismatched Traveler Count
<<<<<<< HEAD

=======
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
```bash
curl -X POST http://localhost:5000/api/bookings \
  -H "Authorization: Bearer USER_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "packageId": "PACKAGE_ID",
    "travelDate": "2026-08-15",
    "endDate": "2026-08-20",
    "numberOfTravelers": 3,
    "travelers": [
      {"firstName": "John", "lastName": "Doe"}
    ]
  }'
```

**Expected:** 400 Bad Request
<<<<<<< HEAD

=======
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
```json
{
  "success": false,
  "message": "Number of travelers (3) must match travelers array length (1)"
}
```

---

### Invalid Email
<<<<<<< HEAD

=======
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
```bash
curl -X POST http://localhost:5000/api/bookings \
  -H "Authorization: Bearer USER_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "packageId": "PACKAGE_ID",
    "travelDate": "2026-08-15",
    "endDate": "2026-08-20",
    "numberOfTravelers": 1,
    "travelers": [
      {
        "firstName": "John",
        "lastName": "Doe",
        "email": "invalid-email"
      }
    ]
  }'
```

**Expected:** 400 Bad Request
<<<<<<< HEAD

=======
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
```json
{
  "success": false,
  "message": "Validation failed: Invalid email format"
}
```

---

### Group Size Exceeded
<<<<<<< HEAD

=======
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
```bash
# Assuming package allows max 5 travelers
curl -X POST http://localhost:5000/api/bookings \
  -H "Authorization: Bearer USER_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "packageId": "PACKAGE_ID",
    "travelDate": "2026-08-15",
    "endDate": "2026-08-20",
    "numberOfTravelers": 10,
    "travelers": [
      {"firstName": "John", "lastName": "Doe"},
      {"firstName": "Jane", "lastName": "Doe"},
      {"firstName": "Jack", "lastName": "Smith"},
      {"firstName": "Jill", "lastName": "Johnson"},
      {"firstName": "Jim", "lastName": "Brown"},
      {"firstName": "Joe", "lastName": "Davis"},
      {"firstName": "Jen", "lastName": "Wilson"},
      {"firstName": "Jerry", "lastName": "Moore"},
      {"firstName": "Julia", "lastName": "Taylor"},
      {"firstName": "Justin", "lastName": "Anderson"}
    ]
  }'
```

**Expected:** 400 Bad Request
<<<<<<< HEAD

=======
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
```json
{
  "success": false,
  "message": "Group size must be between 2 and 5 travelers"
}
```

---

## 🧬 Sample Test Data

### Complete Booking Request
<<<<<<< HEAD

=======
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
```json
{
  "packageId": "60d5ec49c1234567890abc",
  "travelDate": "2026-07-15",
  "endDate": "2026-07-20",
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
      "passportNumber": "PA987654",
      "specialRequests": "Vegetarian meals"
    },
    {
      "firstName": "Jane",
      "lastName": "Doe",
      "email": "jane@example.com",
      "phone": "+977982345678",
      "dateOfBirth": "1992-03-20",
      "nationality": "British",
      "passportNumber": "PA123789"
    },
    {
      "firstName": "Jack",
      "lastName": "Smith",
      "phone": "+977983456789",
      "dateOfBirth": "1995-07-10",
      "nationality": "Canadian",
      "passportNumber": "PA456123"
    }
  ],
  "paymentMethod": "credit_card",
  "specialRequests": "Early morning starts preferred, window seats when flying"
}
```

### Expected Calculation
<<<<<<< HEAD

=======
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
```
Price per person: $1500 (from package)
Number of travelers: 3
Subtotal: 1500 × 3 = $4500
Taxes (10%): $450
Total: $4950
```

---

## 📊 Test Response Examples

### Successful Creation
<<<<<<< HEAD

=======
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
```json
{
  "success": true,
  "message": "Booking created successfully",
  "data": {
    "_id": "60d5ec49c1234567890def",
    "bookingNumber": "BK260529000001",
    "bookingStatus": "pending",
    "paymentStatus": "pending",
    "numberOfTravelers": 3,
    "totalPrice": 4950,
    "travelDate": "2026-07-15T00:00:00.000Z",
    "createdAt": "2026-05-29T10:00:00.000Z",
    "updatedAt": "2026-05-29T10:00:00.000Z"
  }
}
```

### Successful Cancellation
<<<<<<< HEAD

=======
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
```json
{
  "success": true,
  "message": "Booking cancelled successfully",
  "data": {
    "bookingNumber": "BK260529000001",
    "bookingStatus": "cancelled",
    "cancellationDate": "2026-05-29T10:30:00Z",
    "cancellationReason": "Change of plans",
    "refundAmount": 4950,
    "refundStatus": "pending",
    "daysUntilTravel": 47
  }
}
```

---

## 🔄 Admin Workflow

### 1. View Pending Bookings
<<<<<<< HEAD

=======
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
```bash
curl -X GET "http://localhost:5000/api/bookings/admin/all?status=pending&limit=20" \
  -H "Authorization: Bearer ADMIN_TOKEN"
```

### 2. Update Payment Status
<<<<<<< HEAD

=======
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
```bash
curl -X PUT http://localhost:5000/api/bookings/BOOKING_ID/status \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "paymentStatus": "paid",
    "notes": "Payment verified - Invoice #INV123"
  }'
```

### 3. Confirm Booking
<<<<<<< HEAD

=======
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
```bash
curl -X PUT http://localhost:5000/api/bookings/BOOKING_ID/status \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "bookingStatus": "confirmed",
    "notes": "All documents received and verified"
  }'
```

### 4. Complete Booking (After Trip)
<<<<<<< HEAD

=======
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
```bash
curl -X PUT http://localhost:5000/api/bookings/BOOKING_ID/status \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "bookingStatus": "completed",
    "notes": "Trip completed successfully"
  }'
```

---

## 🚀 Testing in Postman

### Setup Collection

1. **Create Collection:** "Booking System"
2. **Environment Variables:**
<<<<<<< HEAD

=======
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
   ```
   base_url: http://localhost:5000
   user_token: YOUR_USER_JWT_TOKEN
   admin_token: YOUR_ADMIN_JWT_TOKEN
   booking_id: BOOKING_ID_FROM_CREATE
   package_id: PACKAGE_ID
   ```

3. **Requests:**
   - `POST {{base_url}}/api/bookings`
   - `GET {{base_url}}/api/bookings`
   - `GET {{base_url}}/api/bookings/{{booking_id}}`
   - `PUT {{base_url}}/api/bookings/{{booking_id}}`
   - `PUT {{base_url}}/api/bookings/{{booking_id}}/cancel`
   - `GET {{base_url}}/api/bookings/admin/all`
   - `PUT {{base_url}}/api/bookings/{{booking_id}}/status`
   - `GET {{base_url}}/api/bookings/history/analytics`
   - `GET {{base_url}}/api/bookings/stats/overview`

---

## ✅ Verification Checklist

After running tests:

- [ ] Booking created with unique bookingNumber
- [ ] Pricing correctly calculated
- [ ] Status transitions work properly
- [ ] Cancellation policy enforced
- [ ] Refunds calculated correctly
- [ ] Admin features work
- [ ] Pagination works
- [ ] Filtering works
- [ ] Error messages are clear
- [ ] Unauthorized access blocked
- [ ] Validation rules enforced
- [ ] Logs recorded properly

---

**Happy Testing!** 🎉
