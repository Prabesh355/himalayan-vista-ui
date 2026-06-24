# Travel Package Management System Documentation

## Overview

Complete travel package management module with advanced search, filtering, pagination, and admin protection.

---

## Features Implemented

### ✅ Core Operations
- **Add Package** (Admin/Vendor only)
- **Edit Package** (Owner/Admin only)
- **Delete Package** (Owner/Admin only)
- **Get All Packages** (Public with pagination)
- **Get Single Package** (Public)
- **Search Packages** (Full-text search)
- **Get Featured Packages** (Curated packages)
- **Get Packages by Destination** (Filtered list)

### ✅ Advanced Filtering
- **Filter by Destination** (Case-insensitive regex)
- **Filter by Price** (Min/Max range)
- **Filter by Duration** (Days/Nights)
- **Filter by Category** (trekking, cultural, adventure, luxury, wildlife)
- **Filter by Difficulty** (easy, moderate, difficult, expert)
- **Filter Featured** (Curated packages)
- **Sort By** (Multiple field sorting)

### ✅ Features
- **Full-Text Search** (Title, description, destination)
- **Pagination** (Default 10 per page, max 100)
- **Auto-Slug Generation** (From title)
- **Featured Packages** (Highlighted with ratings >= 4)
- **Admin Protection** (Role-based access)
- **Ownership Verification** (Creator/Admin only updates)
- **Availability Tracking** (Slots management)
- **Rating System** (0-5 star ratings)
- **Comprehensive Validation** (Input validation)

---

## Package Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | String | Yes | Unique package name (5-100 chars) |
| `slug` | String | Auto | URL-friendly name (auto-generated from title) |
| `description` | String | Yes | Detailed description (min 20 chars) |
| `destination` | String | Yes | Travel destination |
| `price` | Number | Yes | Package price (> 0) |
| `discountPrice` | Number | No | Discounted price (< price) |
| `duration` | Object | Yes | {days, nights} |
| `images` | Array | Yes | At least 1 image URL |
| `highlights` | Array | No | Key highlights of package |
| `itinerary` | Array | No | Day-by-day itinerary |
| `inclusions` | Array | No | What's included |
| `exclusions` | Array | No | What's not included |
| `groupSize` | Object | Yes | {min, max} group sizes |
| `difficulty` | String | No | easy/moderate/difficult/expert |
| `category` | String | No | trekking/cultural/adventure/luxury/wildlife |
| `bestSeason` | Array | No | Best months to visit |
| `location` | GeoJSON | No | Geographic coordinates |
| `rating` | Number | Auto | Average rating (0-5) |
| `reviewCount` | Number | Auto | Total number of reviews |
| `availability` | Object | No | {startDate, endDate, slots, bookedSlots} |
| `featured` | Boolean | No | Is this a featured package |
| `isActive` | Boolean | No | Package visibility (default: true) |
| `createdBy` | ObjectId | Auto | Package creator (User ref) |
| `createdAt` | Date | Auto | Creation timestamp |
| `updatedAt` | Date | Auto | Last update timestamp |

---

## API Endpoints

### 1. Get All Packages (with Search & Filtering)
```bash
GET /api/packages
```

**Query Parameters:**
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10, max: 100)
- `search` - Search query (title, description, destination)
- `destination` - Filter by destination
- `minPrice` - Minimum price filter
- `maxPrice` - Maximum price filter
- `difficulty` - Filter by difficulty level
- `category` - Filter by category
- `featured` - Get featured packages only (true/false)
- `sort` - Sort by fields (e.g., "price,-rating")

**Examples:**
```bash
# Get first 10 packages
GET /api/packages

# Get packages with filters
GET /api/packages?destination=Everest&minPrice=500&maxPrice=2000

# Get featured packages
GET /api/packages?featured=true&limit=6

# Search packages
GET /api/packages?search=trekking&page=1

# Get expensive adventure packages
GET /api/packages?category=adventure&minPrice=1500

# Sort by price (ascending)
GET /api/packages?sort=price

# Sort by price descending, then rating descending
GET /api/packages?sort=-price,-rating
```

**Response:**
```json
{
  "success": true,
  "count": 10,
  "total": 45,
  "pages": 5,
  "currentPage": 1,
  "data": [
    {
      "_id": "60d5ec49c1234567890abc",
      "title": "Everest Base Camp Trek",
      "slug": "everest-base-camp-trek",
      "destination": "Mount Everest",
      "price": 1500,
      "duration": { "days": 5, "nights": 4 },
      "difficulty": "difficult",
      "category": "trekking",
      "rating": 4.5,
      "featured": true
    }
  ]
}
```

---

### 2. Search Packages
```bash
GET /api/packages/search?q=Nepal&page=1&limit=10
```

**Features:**
- Full-text search across title, description, destination
- Sorted by relevance score
- Paginated results

**Query Parameters:**
- `q` - Search query (required)
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10, max: 100)

**Example:**
```bash
GET /api/packages/search?q=mountain%20trek&limit=5
```

---

### 3. Get Featured Packages
```bash
GET /api/packages/featured?limit=6
```

**Features:**
- Only returns active packages with rating >= 4
- Sorted by rating (highest first)
- Perfect for homepage display

**Response:**
```json
{
  "success": true,
  "count": 6,
  "data": [...]
}
```

---

### 4. Get Packages by Destination
```bash
GET /api/packages/destination/Everest?page=1&limit=10
```

**Features:**
- Case-insensitive destination search
- Paginated results
- Sorted by creation date (newest first)

---

### 5. Get Single Package
```bash
GET /api/packages/:id
```

**Example:**
```bash
GET /api/packages/60d5ec49c1234567890abc
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "60d5ec49c1234567890abc",
    "title": "Everest Base Camp Trek",
    "description": "5-day trek to EBC...",
    "destination": "Mount Everest",
    "price": 1500,
    "images": ["url1", "url2"],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrival in Kathmandu",
        "description": "Meet guide and get briefing"
      }
    ],
    "createdBy": {
      "_id": "user_id",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com"
    }
  }
}
```

---

### 6. Create Package
```bash
POST /api/packages
Authorization: Bearer <token>
Content-Type: application/json
```

**Access:** Admin/Vendor only

**Request Body:**
```json
{
  "title": "Everest Base Camp Trek",
  "description": "5-day trek to EBC with experienced guides",
  "destination": "Mount Everest",
  "price": 1500,
  "discountPrice": 1200,
  "duration": {
    "days": 5,
    "nights": 4
  },
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
  "inclusions": ["Accommodation", "Meals", "Guide"],
  "exclusions": ["Flights", "Travel insurance"],
  "groupSize": {
    "min": 2,
    "max": 12
  },
  "difficulty": "difficult",
  "category": "trekking",
  "featured": true,
  "bestSeason": ["Mar-May", "Sep-Nov"]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Package created successfully",
  "data": { /* created package object */ }
}
```

---

### 7. Update Package
```bash
PUT /api/packages/:id
Authorization: Bearer <token>
Content-Type: application/json
```

**Access:** Creator/Admin only

**Features:**
- Ownership verification
- Optional fields (all fields are optional)
- Slug auto-regenerated if title changes
- CreatedBy cannot be changed

**Request Body:** (Any combination of package fields)
```json
{
  "price": 1600,
  "featured": false
}
```

---

### 8. Delete Package
```bash
DELETE /api/packages/:id
Authorization: Bearer <token>
```

**Access:** Creator/Admin only

**Response:**
```json
{
  "success": true,
  "message": "Package deleted successfully",
  "data": {}
}
```

---

## Validation Rules

### Create Package Validation

| Field | Rules |
|-------|-------|
| title | Required, 5-100 chars, unique |
| description | Required, min 20 chars |
| destination | Required, min 2 chars |
| price | Required, number, > 0 |
| discountPrice | Optional, number, < price |
| duration.days | Required, integer >= 1 |
| duration.nights | Required, integer >= 0 |
| images | Required, array, min 1 item |
| groupSize.min | Required, integer >= 1 |
| groupSize.max | Required, integer >= 1, >= min |
| difficulty | Optional, one of: easy/moderate/difficult/expert |
| category | Optional, one of: trekking/cultural/adventure/luxury/wildlife |
| featured | Optional, boolean |

---

## Error Handling

### Common Errors

| Status | Error | Cause |
|--------|-------|-------|
| 400 | Validation failed | Invalid input data |
| 400 | Minimum group size cannot be greater than maximum | Invalid group size |
| 401 | Not authorized to access this route | Missing/invalid token |
| 403 | Not authorized to update/delete this package | Not owner/admin |
| 404 | Package not found | ID doesn't exist |
| 409 | Duplicate entry | Title already exists |
| 500 | Internal Server Error | Server error |

---

## Usage Examples

### JavaScript/Axios

```javascript
// Get all packages with filters
async function getPackages() {
  try {
    const res = await axios.get('/api/packages', {
      params: {
        destination: 'Everest',
        minPrice: 500,
        maxPrice: 2000,
        category: 'trekking',
        page: 1,
        limit: 10
      }
    });
    console.log(res.data.data);
  } catch (error) {
    console.error(error.response.data.message);
  }
}

// Create a package
async function createPackage() {
  try {
    const token = localStorage.getItem('token');
    const res = await axios.post('/api/packages', {
      title: "Everest Base Camp Trek",
      description: "5-day trek to EBC...",
      destination: "Mount Everest",
      price: 1500,
      duration: { days: 5, nights: 4 },
      images: ["url1"],
      groupSize: { min: 2, max: 12 },
      category: "trekking",
      difficulty: "difficult"
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log(res.data.data);
  } catch (error) {
    console.error(error.response.data.message);
  }
}

// Update package
async function updatePackage(id) {
  try {
    const token = localStorage.getItem('token');
    const res = await axios.put(`/api/packages/${id}`, {
      price: 1600,
      featured: true
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log(res.data.data);
  } catch (error) {
    console.error(error.response.data.message);
  }
}

// Delete package
async function deletePackage(id) {
  try {
    const token = localStorage.getItem('token');
    const res = await axios.delete(`/api/packages/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log(res.data.message);
  } catch (error) {
    console.error(error.response.data.message);
  }
}
```

### cURL

```bash
# Get packages with filters
curl "http://localhost:5000/api/packages?destination=Everest&minPrice=500&maxPrice=2000"

# Search packages
curl "http://localhost:5000/api/packages/search?q=trekking"

# Get single package
curl http://localhost:5000/api/packages/60d5ec49c1234567890abc

# Create package (with token)
curl -X POST http://localhost:5000/api/packages \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Everest Trek",
    "description": "5-day trek to EBC",
    "destination": "Mount Everest",
    "price": 1500,
    "duration": {"days": 5, "nights": 4},
    "images": ["url1"],
    "groupSize": {"min": 2, "max": 12},
    "category": "trekking"
  }'

# Update package
curl -X PUT http://localhost:5000/api/packages/60d5ec49c1234567890abc \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"price": 1600}'

# Delete package
curl -X DELETE http://localhost:5000/api/packages/60d5ec49c1234567890abc \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Security Features

✅ **Role-Based Access Control**
- Admin/Vendor can create packages
- Only creator/admin can edit/delete
- Public can view all packages

✅ **Input Validation**
- All fields validated with express-validator
- Type checking
- Range validation
- Unique constraints

✅ **Error Handling**
- Centralized error handler
- No sensitive info leaked
- Proper HTTP status codes

✅ **Logging**
- All operations logged
- Error logging with stack traces

✅ **Authentication**
- JWT token required for create/update/delete
- Token verification middleware

---

## Database Indexing

Created indexes for:
- `destination` - Fast filtering
- `price` - Price range queries
- `difficulty` - Category filtering
- `category` - Type filtering
- `featured` - Featured packages filter
- `isActive` - Active packages filter
- `location` - Geospatial queries (2dsphere)
- `title, description, destination` - Full-text search

---

## Performance Considerations

- **Pagination** limits results to 100 max per page
- **Indexes** optimize filtering and searching
- **Full-text search** uses MongoDB text index
- **Population** limits to avoid N+1 queries
- **Sorting** optimized with indexes

---

## Future Enhancements

- [ ] Geospatial distance queries
- [ ] Advanced availability calendar
- [ ] Price history tracking
- [ ] Bulk operations
- [ ] Package cloning
- [ ] Weather/season info integration
- [ ] Similar package recommendations
- [ ] View tracking per package

---

## Summary

**Complete Package Management System with:**
- ✅ 8 comprehensive endpoints
- ✅ Advanced search & filtering
- ✅ Pagination support
- ✅ Role-based protection
- ✅ Input validation
- ✅ Ownership verification
- ✅ Full-text search
- ✅ Auto-slug generation
- ✅ Featured packages
- ✅ Error handling & logging

**Production-Ready & Scalable!** 🚀
