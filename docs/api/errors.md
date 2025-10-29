# Error Handling

This guide explains how to handle errors when working with the TechDocs Pro API. All errors follow a consistent format and include helpful information for debugging.

## Error Response Format

All API errors return a consistent JSON response:

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
  },
  "meta": {
    "timestamp": "2023-12-01T12:00:00Z",
    "request_id": "req_123456789"
  }
}
```

## HTTP Status Codes

| Code | Description | When It Occurs |
|------|-------------|----------------|
| 200 | OK | Request successful |
| 201 | Created | Resource created successfully |
| 400 | Bad Request | Invalid request parameters |
| 401 | Unauthorized | Invalid or missing API key |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource doesn't exist |
| 409 | Conflict | Resource already exists |
| 422 | Unprocessable Entity | Validation error |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Server error |
| 502 | Bad Gateway | Upstream server error |
| 503 | Service Unavailable | Service temporarily unavailable |

## Error Codes

### Authentication Errors

#### `INVALID_API_KEY`
The provided API key is invalid or malformed.

```json
{
  "success": false,
  "error": {
    "code": "INVALID_API_KEY",
    "message": "The provided API key is invalid"
  }
}
```

**Solution**: Verify your API key is correct and properly formatted.

#### `API_KEY_EXPIRED`
The API key has expired.

```json
{
  "success": false,
  "error": {
    "code": "API_KEY_EXPIRED",
    "message": "This API key has expired"
  }
}
```

**Solution**: Generate a new API key from your account settings.

#### `INSUFFICIENT_PERMISSIONS`
The API key doesn't have permission to perform this action.

```json
{
  "success": false,
  "error": {
    "code": "INSUFFICIENT_PERMISSIONS",
    "message": "This API key does not have permission to perform this action",
    "details": {
      "required_permission": "documents:write",
      "key_permissions": ["documents:read"]
    }
  }
}
```

**Solution**: Update your API key permissions or use a key with the required permissions.

### Validation Errors

#### `VALIDATION_ERROR`
Request parameters failed validation.

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request parameters",
    "details": {
      "field": "title",
      "reason": "Title is required and must be at least 3 characters long"
    }
  }
}
```

**Solution**: Fix the validation errors and retry the request.

#### `MISSING_REQUIRED_FIELD`
A required field is missing from the request.

```json
{
  "success": false,
  "error": {
    "code": "MISSING_REQUIRED_FIELD",
    "message": "Required field is missing",
    "details": {
      "field": "content",
      "reason": "Content is required for document creation"
    }
  }
}
```

**Solution**: Include all required fields in your request.

### Resource Errors

#### `RESOURCE_NOT_FOUND`
The requested resource doesn't exist.

```json
{
  "success": false,
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "The requested resource was not found",
    "details": {
      "resource_type": "document",
      "resource_id": "doc_123456789"
    }
  }
}
```

**Solution**: Verify the resource ID is correct and the resource exists.

#### `RESOURCE_ALREADY_EXISTS`
A resource with the same identifier already exists.

```json
{
  "success": false,
  "error": {
    "code": "RESOURCE_ALREADY_EXISTS",
    "message": "A resource with this identifier already exists",
    "details": {
      "resource_type": "document",
      "conflicting_field": "slug"
    }
  }
}
```

**Solution**: Use a different identifier or update the existing resource.

### Rate Limiting

#### `RATE_LIMIT_EXCEEDED`
Too many requests have been made.

```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Rate limit exceeded. Please try again later",
    "details": {
      "limit": 1000,
      "remaining": 0,
      "reset_time": "2023-12-01T13:00:00Z"
    }
  }
}
```

**Solution**: Wait for the rate limit to reset or upgrade your plan.

### Server Errors

#### `INTERNAL_SERVER_ERROR`
An unexpected server error occurred.

```json
{
  "success": false,
  "error": {
    "code": "INTERNAL_SERVER_ERROR",
    "message": "An internal server error occurred",
    "details": {
      "request_id": "req_123456789"
    }
  }
}
```

**Solution**: Retry the request. If the error persists, contact support.

#### `SERVICE_UNAVAILABLE`
The service is temporarily unavailable.

```json
{
  "success": false,
  "error": {
    "code": "SERVICE_UNAVAILABLE",
    "message": "The service is temporarily unavailable",
    "details": {
      "retry_after": 60
    }
  }
}
```

**Solution**: Wait for the specified time and retry the request.

## Error Handling Best Practices

### 1. Always Check the Response

```javascript
try {
  const response = await fetch('/api/v1/documents', {
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY'
    }
  });
  
  const data = await response.json();
  
  if (!data.success) {
    console.error('API Error:', data.error.message);
    // Handle the error
  }
} catch (error) {
  console.error('Network Error:', error);
}
```

### 2. Handle Different Error Types

```javascript
function handleApiError(error) {
  switch (error.code) {
    case 'INVALID_API_KEY':
      // Redirect to login or show API key input
      break;
    case 'RATE_LIMIT_EXCEEDED':
      // Show rate limit message and retry after delay
      break;
    case 'VALIDATION_ERROR':
      // Show field-specific validation errors
      break;
    default:
      // Show generic error message
      break;
  }
}
```

### 3. Implement Retry Logic

```javascript
async function makeRequestWithRetry(url, options, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      
      if (data.success) {
        return data;
      }
      
      // Don't retry on client errors
      if (response.status >= 400 && response.status < 500) {
        throw new Error(data.error.message);
      }
      
      // Retry on server errors
      if (i === maxRetries - 1) {
        throw new Error(data.error.message);
      }
      
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    } catch (error) {
      if (i === maxRetries - 1) {
        throw error;
      }
    }
  }
}
```

### 4. Log Errors for Debugging

```javascript
function logError(error, context) {
  console.error('API Error:', {
    code: error.code,
    message: error.message,
    details: error.details,
    context: context,
    timestamp: new Date().toISOString()
  });
  
  // Send to error tracking service
  if (window.errorTracker) {
    window.errorTracker.captureException(error, {
      extra: context
    });
  }
}
```

## SDK Error Handling

### JavaScript SDK

```javascript
const client = new TechDocs({
  apiKey: 'your-api-key'
});

try {
  const document = await client.documents.create({
    title: 'My Document',
    content: '# Hello World'
  });
} catch (error) {
  if (error.code === 'VALIDATION_ERROR') {
    console.error('Validation failed:', error.details);
  } else if (error.code === 'RATE_LIMIT_EXCEEDED') {
    console.error('Rate limited. Retry after:', error.details.reset_time);
  } else {
    console.error('Unexpected error:', error.message);
  }
}
```

### Python SDK

```python
from techdocs_pro import TechDocs, APIError

client = TechDocs(api_key='your-api-key')

try:
    document = client.documents.create(
        title='My Document',
        content='# Hello World'
    )
except APIError as e:
    if e.code == 'VALIDATION_ERROR':
        print(f'Validation failed: {e.details}')
    elif e.code == 'RATE_LIMIT_EXCEEDED':
        print(f'Rate limited. Retry after: {e.details["reset_time"]}')
    else:
        print(f'Unexpected error: {e.message}')
```

## Common Error Scenarios

### 1. Invalid API Key

**Problem**: Getting 401 Unauthorized errors

**Solution**: 
- Verify the API key is correct
- Check that the key hasn't expired
- Ensure the key has the required permissions

### 2. Rate Limiting

**Problem**: Getting 429 Too Many Requests errors

**Solution**:
- Implement exponential backoff
- Consider upgrading your plan
- Distribute requests across multiple keys

### 3. Validation Errors

**Problem**: Getting 422 Unprocessable Entity errors

**Solution**:
- Check the error details for specific field issues
- Ensure all required fields are provided
- Validate data before sending requests

### 4. Network Errors

**Problem**: Connection timeouts or network failures

**Solution**:
- Implement retry logic with exponential backoff
- Check network connectivity
- Consider using a different region endpoint

## Getting Help

If you're experiencing errors that aren't covered in this guide:

- 📖 [API Documentation](overview) - Complete API reference
- 💬 [Discord Community](https://discord.gg/techdocs-pro) - Get help from the community
- 🐛 [Report Issues](https://github.com/techdocs-pro/sample-docs/issues) - Report bugs
- 📧 [Support](mailto:support@techdocs-pro.com) - Contact our support team

---

:::tip Debugging Tips

- Always include the `request_id` when reporting errors
- Check the error details for specific field information
- Use our SDKs for better error handling
- Implement proper logging for production applications

:::
