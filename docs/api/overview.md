# API Overview

TechDocs Pro provides a comprehensive REST API for programmatic access to all platform features. This API allows you to integrate documentation management into your existing workflows and build custom tools.

## Base URL

All API requests should be made to:

```
https://api.techdocs-pro.com/v1
```

## Authentication

TechDocs Pro uses API keys for authentication. Include your API key in the request header:

```http
Authorization: Bearer YOUR_API_KEY
```

:::info Getting an API Key

You can generate API keys in your [account settings](https://app.techdocs-pro.com/settings/api-keys).

:::

## Rate Limits

API requests are rate limited to ensure fair usage:

- **Free Plan**: 1,000 requests per hour
- **Pro Plan**: 10,000 requests per hour
- **Enterprise Plan**: 100,000 requests per hour

Rate limit headers are included in all responses:

```http
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1640995200
```

## Response Format

All API responses follow a consistent JSON format:

### Success Response

```json
{
  "success": true,
  "data": {
    // Response data here
  },
  "meta": {
    "timestamp": "2023-12-01T12:00:00Z",
    "request_id": "req_123456789"
  }
}
```

### Error Response

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request parameters",
    "details": {
      "field": "title",
      "reason": "Title is required"
    }
  },
  "meta": {
    "timestamp": "2023-12-01T12:00:00Z",
    "request_id": "req_123456789"
  }
}
```

## HTTP Status Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 422 | Validation Error |
| 429 | Rate Limited |
| 500 | Internal Server Error |

## Pagination

List endpoints support pagination using query parameters:

- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20, max: 100)
- `sort`: Sort field (default: created_at)
- `order`: Sort order (`asc` or `desc`, default: desc)

Example:

```http
GET /api/v1/documents?page=2&limit=50&sort=title&order=asc
```

Response includes pagination metadata:

```json
{
  "success": true,
  "data": [...],
  "meta": {
    "pagination": {
      "page": 2,
      "limit": 50,
      "total": 150,
      "pages": 3,
      "has_next": true,
      "has_prev": true
    }
  }
}
```

## Filtering and Search

Many endpoints support filtering and search:

### Query Parameters

- `q`: Search query (searches across relevant fields)
- `filter[field]`: Filter by specific field value
- `filter[field][gte]`: Filter by field greater than or equal to value
- `filter[field][lte]`: Filter by field less than or equal to value
- `filter[field][in]`: Filter by field value in array
- `filter[field][contains]`: Filter by field containing value

### Examples

```http
# Search for documents containing "API"
GET /api/v1/documents?q=API

# Filter documents by status
GET /api/v1/documents?filter[status]=published

# Filter documents created after a date
GET /api/v1/documents?filter[created_at][gte]=2023-01-01

# Filter documents by multiple tags
GET /api/v1/documents?filter[tags][in]=api,documentation
```

## Webhooks

TechDocs Pro supports webhooks for real-time notifications. Configure webhooks in your [account settings](https://app.techdocs-pro.com/settings/webhooks).

### Webhook Events

- `document.created`
- `document.updated`
- `document.published`
- `document.deleted`
- `comment.created`
- `comment.updated`

### Webhook Payload

```json
{
  "event": "document.updated",
  "data": {
    "id": "doc_123456789",
    "title": "Updated Document",
    "status": "published",
    "updated_at": "2023-12-01T12:00:00Z"
  },
  "meta": {
    "timestamp": "2023-12-01T12:00:00Z",
    "webhook_id": "webhook_123456789"
  }
}
```

## SDKs and Libraries

Official SDKs are available for popular programming languages:

- **JavaScript/Node.js**: `npm install techdocs-pro-sdk`
- **Python**: `pip install techdocs-pro-sdk`
- **Go**: `go get github.com/techdocs-pro/sdk-go`
- **PHP**: `composer require techdocs-pro/sdk-php`
- **Ruby**: `gem install techdocs-pro-sdk`

### Example Usage (JavaScript)

```javascript
const TechDocs = require('techdocs-pro-sdk');

const client = new TechDocs({
  apiKey: 'your-api-key',
  baseUrl: 'https://api.techdocs-pro.com/v1'
});

// Create a document
const document = await client.documents.create({
  title: 'My Document',
  content: '# Hello World',
  status: 'draft'
});

console.log(document);
```

## API Endpoints

### Documents

- `GET /documents` - List documents
- `POST /documents` - Create document
- `GET /documents/{id}` - Get document
- `PUT /documents/{id}` - Update document
- `DELETE /documents/{id}` - Delete document

### Comments

- `GET /documents/{id}/comments` - List document comments
- `POST /documents/{id}/comments` - Create comment
- `PUT /comments/{id}` - Update comment
- `DELETE /comments/{id}` - Delete comment

### Users

- `GET /users` - List users
- `GET /users/{id}` - Get user
- `PUT /users/{id}` - Update user

### Teams

- `GET /teams` - List teams
- `POST /teams` - Create team
- `GET /teams/{id}` - Get team
- `PUT /teams/{id}` - Update team
- `DELETE /teams/{id}` - Delete team

## Next Steps

- 🔐 [Authentication](authentication) - Learn about API authentication
- 📚 [Endpoints](endpoints) - Explore all available endpoints
- ❌ [Error Handling](errors) - Understand error responses
- 🛠️ [SDKs](guides/quick-start) - Use our official SDKs

---

:::tip API Best Practices

- Always include the `Authorization` header
- Use appropriate HTTP methods for each operation
- Handle rate limits gracefully
- Implement proper error handling
- Use pagination for large datasets

:::
