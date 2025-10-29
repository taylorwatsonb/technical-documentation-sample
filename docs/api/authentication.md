# Authentication

TechDocs Pro API uses API keys for authentication. This guide explains how to obtain, use, and manage API keys for secure access to our platform.

## API Keys

API keys are the primary method of authentication for the TechDocs Pro API. Each API key is associated with a specific user account and has configurable permissions.

### Types of API Keys

#### Personal API Keys
- Tied to your personal account
- Full access to your resources
- Ideal for personal projects and testing

#### Team API Keys
- Associated with a team
- Limited to team resources
- Managed by team administrators
- Perfect for team integrations

#### Service API Keys
- Designed for server-to-server communication
- Long-lived and stable
- Restricted permissions for security
- Best for production applications

## Obtaining API Keys

### Create a Personal API Key

1. Log in to your [TechDocs Pro account](https://app.techdocs-pro.com)
2. Navigate to **Settings** → **API Keys**
3. Click **Create New Key**
4. Enter a descriptive name for your key
5. Select the required permissions
6. Click **Generate Key**
7. **Copy and save the key immediately** (it won't be shown again)

### Create a Team API Key

:::info Team Admin Required

Only team administrators can create team API keys.

:::

1. Go to your team settings
2. Navigate to **API Keys** section
3. Click **Create Team Key**
4. Configure permissions and expiration
5. Generate and securely store the key

## Using API Keys

### HTTP Header (Recommended)

Include your API key in the `Authorization` header:

```http
Authorization: Bearer YOUR_API_KEY
```

Example request:

```bash
curl -H "Authorization: Bearer sk_1234567890abcdef" \
     https://api.techdocs-pro.com/v1/documents
```

### Query Parameter (Alternative)

For cases where headers aren't feasible:

```http
GET /api/v1/documents?api_key=YOUR_API_KEY
```

:::warning Security Note

Query parameters may be logged in server logs. Use headers when possible.

:::

## Key Permissions

API keys can be configured with specific permissions to follow the principle of least privilege:

### Document Permissions

- `documents:read` - Read documents
- `documents:write` - Create and update documents
- `documents:delete` - Delete documents
- `documents:publish` - Publish documents

### Comment Permissions

- `comments:read` - Read comments
- `comments:write` - Create and update comments
- `comments:delete` - Delete comments

### User Permissions

- `users:read` - Read user information
- `users:write` - Update user information

### Team Permissions

- `teams:read` - Read team information
- `teams:write` - Update team settings
- `teams:manage` - Manage team members

### Admin Permissions

- `admin:all` - Full administrative access
- `admin:users` - Manage users
- `admin:teams` - Manage teams
- `admin:system` - System administration

## Key Management

### Viewing Keys

List all your API keys:

```http
GET /api/v1/api-keys
```

Response:

```json
{
  "success": true,
  "data": [
    {
      "id": "key_123456789",
      "name": "My Integration",
      "type": "personal",
      "permissions": ["documents:read", "documents:write"],
      "created_at": "2023-12-01T12:00:00Z",
      "last_used": "2023-12-01T15:30:00Z",
      "expires_at": null
    }
  ]
}
```

### Updating Keys

Update key permissions or metadata:

```http
PUT /api/v1/api-keys/{key_id}
Content-Type: application/json

{
  "name": "Updated Integration Name",
  "permissions": ["documents:read", "documents:write", "comments:read"]
}
```

### Revoking Keys

Immediately revoke a key:

```http
DELETE /api/v1/api-keys/{key_id}
```

### Key Rotation

For enhanced security, regularly rotate your API keys:

1. Create a new key with the same permissions
2. Update your applications to use the new key
3. Revoke the old key once migration is complete

## Security Best Practices

### Key Storage

- **Never commit keys to version control**
- Store keys in environment variables
- Use secure key management services
- Encrypt keys at rest

### Key Usage

- Use different keys for different environments
- Implement key rotation policies
- Monitor key usage regularly
- Revoke unused keys immediately

### Access Control

- Grant minimal required permissions
- Use team keys for team resources
- Implement proper access controls in your applications
- Regularly audit key permissions

## Error Handling

### Invalid Key

```json
{
  "success": false,
  "error": {
    "code": "INVALID_API_KEY",
    "message": "The provided API key is invalid"
  }
}
```

### Insufficient Permissions

```json
{
  "success": false,
  "error": {
    "code": "INSUFFICIENT_PERMISSIONS",
    "message": "This API key does not have permission to perform this action",
    "details": {
      "required_permission": "documents:delete",
      "key_permissions": ["documents:read", "documents:write"]
    }
  }
}
```

### Expired Key

```json
{
  "success": false,
  "error": {
    "code": "API_KEY_EXPIRED",
    "message": "This API key has expired"
  }
}
```

## Rate Limiting

API keys are subject to rate limiting based on your plan:

| Plan | Requests per Hour | Burst Limit |
|------|------------------|-------------|
| Free | 1,000 | 100 |
| Pro | 10,000 | 1,000 |
| Enterprise | 100,000 | 10,000 |

Rate limit headers:

```http
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1640995200
```

## Testing Authentication

### Validate Your Key

```http
GET /api/v1/auth/validate
```

Response:

```json
{
  "success": true,
  "data": {
    "key_id": "key_123456789",
    "user_id": "user_123456789",
    "permissions": ["documents:read", "documents:write"],
    "expires_at": null
  }
}
```

### Test with cURL

```bash
# Test authentication
curl -H "Authorization: Bearer YOUR_API_KEY" \
     https://api.techdocs-pro.com/v1/auth/validate

# Test with a simple API call
curl -H "Authorization: Bearer YOUR_API_KEY" \
     https://api.techdocs-pro.com/v1/documents?limit=1
```

## Troubleshooting

### Common Issues

#### Key Not Working
- Verify the key is correct and complete
- Check if the key has expired
- Ensure the key has required permissions

#### Permission Denied
- Review key permissions
- Check if the resource belongs to your account/team
- Verify the API endpoint requires the permission

#### Rate Limited
- Implement exponential backoff
- Consider upgrading your plan
- Distribute requests across multiple keys

### Getting Help

- 📖 [API Documentation](overview) - Complete API reference
- 💬 [Discord Community](https://discordapp.com/invite/techdocs-pro) - Get help from the community
- 🐛 [Report Issues](https://github.com/techdocs-pro/sample-docs/issues) - Report bugs or request features

---

:::tip Security Reminder

- Never share your API keys
- Use environment variables for key storage
- Regularly rotate your keys
- Monitor key usage for suspicious activity

:::
