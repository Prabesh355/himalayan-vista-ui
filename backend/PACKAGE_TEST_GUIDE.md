# Package Management - Quick Test Guide

## 🧪 Testing the API Endpoints

### Setup
1. Start backend: `npm run dev`
2. Get admin/vendor token via `/api/auth/login`
3. Use token in requests below

---

## 📋 Test Cases

### 1. Get All Packages (No Filter)
```bash
curl -X GET http://localhost:5000/api/packages
```

**Expected:** List of 10 active packages (paginated)

---

### 2. Get Packages with Pagination
```bash
curl "http://localhost:5000/api/packages?page=1&limit=5"
```

**Expected:** 5 packages with pagination info (total, pages, currentPage)

---

### 3. Filter by Destination
```bash
curl "http://localhost:5000/api/packages?destination=Everest"
```

**Expected:** Only packages with "everest" in destination (case-insensitive)

---

### 4. Filter by Price Range
```bash
curl "http://localhost:5000/api/packages?minPrice=500&maxPrice=2000"
```

**Expected:** Packages between $500-$2000

---

### 5. Filter by Category
```bash
curl "http://localhost:5000/api/packages?category=trekking"
```

**Expected:** Only trekking packages

**Categories available:** trekking, cultural, adventure, luxury, wildlife

---

### 6. Filter by Difficulty
```bash
curl "http://localhost:5000/api/packages?difficulty=difficult"
```

**Expected:** Only difficult packages

**Options:** easy, moderate, difficult, expert

---

### 7. Combined Filters
```bash
curl "http://localhost:5000/api/packages?destination=Everest&minPrice=500&maxPrice=2000&category=trekking&difficulty=difficult&page=1&limit=5"
```

**Expected:** Packages matching ALL criteria

---

### 8. Get Featured Packages
```bash
curl "http://localhost:5000/api/packages/featured?limit=6"
```

**Expected:** Top 6 featured packages (rating >= 4)

---

### 9. Get Packages by Destination
```bash
curl "http://localhost:5000/api/packages/destination/Kathmandu?page=1&limit=10"
```

**Expected:** All packages for Kathmandu with pagination

---

### 10. Search Packages
```bash
curl "http://localhost:5000/api/packages/search?q=trekking&limit=10"
```

**Expected:** Full-text search results sorted by relevance

---

### 11. Get Single Package
```bash
curl http://localhost:5000/api/packages/PACKAGE_ID
```

**Replace PACKAGE_ID** with actual ID from list

**Expected:** Complete package details with creator info

---

### 12. Create Package (Admin/Vendor)
```bash
curl -X POST http://localhost:5000/api/packages \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Trek Package",
    "description": "This is a test package description with minimum 20 characters",
    "destination": "Test Destination",
    "price": 1500,
    "duration": {"days": 5, "nights": 4},
    "images": ["https://example.com/image1.jpg"],
    "groupSize": {"min": 2, "max": 12},
    "category": "trekking",
    "difficulty": "moderate",
    "featured": true
  }'
```

**Expected:** Package created successfully (201)

**Notes:**
- Requires admin or vendor role
- Title must be unique
- Image URL can be any valid URL

---

### 13. Update Package
```bash
curl -X PUT http://localhost:5000/api/packages/PACKAGE_ID \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "price": 1600,
    "featured": false
  }'
```

**Expected:** Package updated (200)

**Notes:**
- Must be creator or admin
- Only creator/admin can update
- Can update any field

---

### 14. Delete Package
```bash
curl -X DELETE http://localhost:5000/api/packages/PACKAGE_ID \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Expected:** Package deleted (200)

**Notes:**
- Must be creator or admin
- Returns empty data object

---

## 🔄 Sorting Examples

### Sort by Price (Ascending)
```bash
curl "http://localhost:5000/api/packages?sort=price"
```

### Sort by Price (Descending)
```bash
curl "http://localhost:5000/api/packages?sort=-price"
```

### Sort by Rating (Highest First)
```bash
curl "http://localhost:5000/api/packages?sort=-rating"
```

### Multiple Sort Fields
```bash
curl "http://localhost:5000/api/packages?sort=-price,-rating"
```

---

## 📊 Response Examples

### List Response
```json
{
  "success": true,
  "count": 5,
  "total": 45,
  "pages": 9,
  "currentPage": 1,
  "data": [
    {
      "_id": "60d5ec49c1234567890abc",
      "title": "Everest Base Camp Trek",
      "slug": "everest-base-camp-trek",
      "destination": "Mount Everest",
      "price": 1500,
      "discountPrice": 1200,
      "duration": {"days": 5, "nights": 4},
      "images": ["url1", "url2"],
      "difficulty": "difficult",
      "category": "trekking",
      "rating": 4.5,
      "reviewCount": 12,
      "featured": true,
      "isActive": true,
      "createdAt": "2026-05-29T10:00:00Z",
      "updatedAt": "2026-05-29T10:00:00Z"
    }
  ]
}
```

### Single Package Response
```json
{
  "success": true,
  "data": {
    "_id": "60d5ec49c1234567890abc",
    "title": "Everest Base Camp Trek",
    "slug": "everest-base-camp-trek",
    "description": "5-day trek to EBC with experienced guides...",
    "destination": "Mount Everest",
    "price": 1500,
    "discountPrice": 1200,
    "duration": {"days": 5, "nights": 4},
    "images": ["url1", "url2"],
    "highlights": ["scenic views", "local culture"],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrival",
        "description": "Meet at hotel",
        "activities": ["Check-in", "Briefing"]
      }
    ],
    "inclusions": ["Accommodation", "Guide"],
    "exclusions": ["Flights"],
    "groupSize": {"min": 2, "max": 12},
    "difficulty": "difficult",
    "category": "trekking",
    "rating": 4.5,
    "reviewCount": 12,
    "featured": true,
    "createdBy": {
      "_id": "user_id",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com"
    },
    "createdAt": "2026-05-29T10:00:00Z",
    "updatedAt": "2026-05-29T10:00:00Z"
  }
}
```

---

## ⚠️ Error Examples

### 400 - Validation Error
```bash
curl -X POST http://localhost:5000/api/packages \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title": "Short"}'
```

**Response:**
```json
{
  "success": false,
  "message": "Validation failed: Title must be between 5 and 100 characters"
}
```

### 404 - Package Not Found
```bash
curl http://localhost:5000/api/packages/invalid_id
```

**Response:**
```json
{
  "success": false,
  "message": "Package not found"
}
```

### 403 - Not Authorized
```bash
curl -X DELETE http://localhost:5000/api/packages/package_id \
  -H "Authorization: Bearer DIFFERENT_USER_TOKEN"
```

**Response:**
```json
{
  "success": false,
  "message": "Not authorized to delete this package"
}
```

---

## 🧬 Test Data - Create Sample Package

```javascript
const samplePackage = {
  title: "Annapurna Circuit Trek",
  description: "32-day trek around Annapurna mountain range with stunning views of Himalayas",
  destination: "Annapurna, Nepal",
  price: 2500,
  discountPrice: 2000,
  duration: {
    days: 32,
    nights: 31
  },
  images: [
    "https://example.com/annapurna1.jpg",
    "https://example.com/annapurna2.jpg"
  ],
  highlights: [
    "Scenic mountain views",
    "Local village culture",
    "Adventure experience",
    "Professional guides"
  ],
  itinerary: [
    {
      day: 1,
      title: "Arrival in Pokhara",
      description: "Meet guide and brief introduction",
      activities: ["Hotel check-in", "Trek planning"]
    },
    {
      day: 2,
      title: "Pokhara to Nayapul",
      description: "Start of Annapurna Circuit",
      activities: ["Hiking", "Local market visit"]
    }
  ],
  inclusions: [
    "Professional guide",
    "All meals",
    "Basic accommodation",
    "Emergency medical kit"
  ],
  exclusions: [
    "International flights",
    "Travel insurance",
    "Alcoholic drinks",
    "Personal expenses"
  ],
  groupSize: {
    min: 2,
    max: 15
  },
  difficulty: "difficult",
  category: "trekking",
  featured: true,
  bestSeason: ["Mar-May", "Sep-Nov"]
};
```

---

## 🚀 Testing in Postman

1. **Create Collection** → Name: "Package Management"
2. **Add Environment Variables:**
   - `base_url` = `http://localhost:5000`
   - `token` = Your JWT token
3. **Create Requests:**
   - GET {{base_url}}/api/packages
   - GET {{base_url}}/api/packages?destination=Everest&minPrice=500
   - GET {{base_url}}/api/packages/search?q=trekking
   - POST {{base_url}}/api/packages (with body)
   - PUT {{base_url}}/api/packages/:id (with body)
   - DELETE {{base_url}}/api/packages/:id

---

## 📝 Notes

- Always include `Authorization: Bearer TOKEN` for create/update/delete
- Search is case-insensitive and full-text
- Filters can be combined
- Pagination: max 100 items per page
- Featured packages show only rating >= 4
- Slug auto-generates from title on create
- CreatedBy cannot be changed after creation

---

## ✅ Test Checklist

- [ ] Get all packages works
- [ ] Pagination works (page/limit)
- [ ] Destination filter works
- [ ] Price filter works (min/max)
- [ ] Category filter works
- [ ] Difficulty filter works
- [ ] Featured packages works
- [ ] Search functionality works
- [ ] Single package retrieval works
- [ ] Create package works (with auth)
- [ ] Update package works (ownership check)
- [ ] Delete package works (ownership check)
- [ ] Error handling works
- [ ] Validation works
- [ ] Logging works

---

**Happy Testing!** 🎉
