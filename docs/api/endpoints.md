# API Endpoints

Complete reference for all TechDocs Pro API endpoints. Each endpoint includes request/response examples, parameters, and error handling.

## Base URL

All API requests should be made to:

```
https://api.techdocs-pro.com/v1
```

## Authentication

All endpoints require authentication via API key in the Authorization header:

```http
Authorization: Bearer YOUR_API_KEY
```

## Documents

### List Documents

Retrieve a paginated list of documents.

```http
GET /documents
```

#### Query Parameters

| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| `page` | integer | Page number | 1 |
| `limit` | integer | Items per page (max 100) | 20 |
| `sort` | string | Sort field | created_at |
| `order` | string | Sort order (asc/desc) | desc |
| `q` | string | Search query | - |
| `filter[status]` | string | Filter by status | - |
| `filter[created_at][gte]` | string | Filter by creation date | - |

#### Example Request

```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
     "https://api.techdocs-pro.com/v1/documents?page=1&limit=10&sort=title&order=asc"
```

#### Example Response

```json
{
  "success": true,
  "data": [
    {
      "id": "doc_123456789",
      "title": "API Documentation",
      "content": "# API Documentation\n\nWelcome to our API...",
      "status": "published",
      "created_at": "2023-12-01T12:00:00Z",
      "updated_at": "2023-12-01T12:00:00Z",
      "author": {
        "id": "user_123456789",
        "name": "John Doe",
        "email": "john@example.com"
      }
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 25,
      "pages": 3,
      "has_next": true,
      "has_prev": false
    }
  }
}
```

### Get Document

Retrieve a specific document by ID.

```http
GET /documents/{id}
```

#### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Document ID |

#### Example Request

```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
     "https://api.techdocs-pro.com/v1/documents/doc_123456789"
```

#### Example Response

```json
{
  "success": true,
  "data": {
    "id": "doc_123456789",
    "title": "API Documentation",
    "content": "# API Documentation\n\nWelcome to our API...",
    "status": "published",
    "created_at": "2023-12-01T12:00:00Z",
    "updated_at": "2023-12-01T12:00:00Z",
    "author": {
      "id": "user_123456789",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "tags": ["api", "documentation"],
    "word_count": 1250,
    "reading_time": 5
  }
}
```

### Create Document

Create a new document.

```http
POST /documents
```

#### Request Body

```json
{
  "title": "My New Document",
  "content": "# My New Document\n\nThis is the content...",
  "status": "draft",
  "tags": ["example", "tutorial"]
}
```

#### Example Request

```bash
curl -X POST "https://api.techdocs-pro.com/v1/documents" \
     -H "Authorization: Bearer YOUR_API_KEY" \
     -H "Content-Type: application/json" \
     -d '{
       "title": "My New Document",
       "content": "# My New Document\n\nThis is the content...",
       "status": "draft"
     }'
```

#### Example Response

```json
{
  "success": true,
  "data": {
    "id": "doc_987654321",
    "title": "My New Document",
    "content": "# My New Document\n\nThis is the content...",
    "status": "draft",
    "created_at": "2023-12-01T12:00:00Z",
    "updated_at": "2023-12-01T12:00:00Z"
  }
}
```

### Update Document

Update an existing document.

```http
PUT /documents/{id}
```

#### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Document ID |

#### Request Body

```json
{
  "title": "Updated Document Title",
  "content": "# Updated Content\n\nNew content here...",
  "status": "published"
}
```

### Delete Document

Delete a document permanently.

```http
DELETE /documents/{id}
```

#### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Document ID |

## Comments

### List Document Comments

Get all comments for a specific document.

```http
GET /documents/{id}/comments
```

### Create Comment

Add a comment to a document.

```http
POST /documents/{id}/comments
```

#### Request Body

```json
{
  "content": "This is a helpful comment",
  "parent_id": null
}
```

### Update Comment

Update an existing comment.

```http
PUT /comments/{id}
```

### Delete Comment

Delete a comment.

```http
DELETE /comments/{id}
```

## Users

### List Users

Get a list of users in your organization.

```http
GET /users
```

### Get User

Get details for a specific user.

```http
GET /users/{id}
```

### Update User

Update user information.

```http
PUT /users/{id}
```

## Teams

### List Teams

Get all teams in your organization.

```http
GET /teams
```

### Create Team

Create a new team.

```http
POST /teams
```

#### Request Body

```json
{
  "name": "Engineering Team",
  "description": "The engineering team",
  "members": ["user_123456789", "user_987654321"]
}
```

### Get Team

Get team details.

```http
GET /teams/{id}
```

### Update Team

Update team information.

```http
PUT /teams/{id}
```

### Delete Team

Delete a team.

```http
DELETE /teams/{id}
```

## Search

### Search Documents

Search across all documents.

```http
GET /search
```

#### Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `q` | string | Search query (required) |
| `type` | string | Content type filter |
| `author` | string | Author filter |
| `date_from` | string | Start date filter |
| `date_to` | string | End date filter |

#### Example Request

```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
     "https://api.techdocs-pro.com/v1/search?q=API&type=document"
```

#### Example Response

```json
{
  "success": true,
  "data": {
    "query": "API",
    "results": [
      {
        "id": "doc_123456789",
        "title": "API Documentation",
        "excerpt": "Welcome to our API documentation...",
        "score": 0.95,
        "type": "document"
      }
    ],
    "total": 1,
    "took": 15
  }
}
```

## Rate Limits

All endpoints are subject to rate limiting:

| Plan | Requests per Hour | Burst Limit |
|------|------------------|-------------|
| Free | 1,000 | 100 |
| Pro | 10,000 | 1,000 |
| Enterprise | 100,000 | 10,000 |

Rate limit headers are included in all responses:

```http
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1640995200
```

## Error Responses

All endpoints return consistent error responses:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": {
      "field": "specific_field",
      "reason": "Why the error occurred"
    }
  }
}
```

## SDK Examples

### JavaScript

```javascript
const client = new TechDocs({
  apiKey: 'your-api-key',
  baseUrl: 'https://api.techdocs-pro.com/v1'
});

// List documents
const documents = await client.documents.list({
  page: 1,
  limit: 10
});

// Create document
const document = await client.documents.create({
  title: 'My Document',
  content: '# Hello World',
  status: 'draft'
});
```

### Python

```python
from techdocs_pro import TechDocs

client = TechDocs(
    api_key='your-api-key',
    base_url='https://api.techdocs-pro.com/v1'
)

# List documents
documents = client.documents.list(page=1, limit=10)

# Create document
document = client.documents.create(
    title='My Document',
    content='# Hello World',
    status='draft'
)
```

---

:::tip Pro Tip

Use our official SDKs for easier integration. They handle authentication, error handling, and provide type safety.

:::
