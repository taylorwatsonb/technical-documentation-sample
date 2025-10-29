# Basic Usage Examples

This page demonstrates basic usage patterns and common scenarios with TechDocs Pro. These examples will help you understand how to implement common features in your documentation.

## Code Examples with Tabs

Show code examples in multiple programming languages:

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="js" label="JavaScript" default>
    ```javascript
    // Initialize TechDocs Pro client
    const client = new TechDocs({
      apiKey: 'your-api-key',
      baseUrl: 'https://api.techdocs-pro.com/v1'
    });

    // Create a new document
    const document = await client.documents.create({
      title: 'My Document',
      content: '# Hello World',
      status: 'draft'
    });

    console.log('Document created:', document.id);
    ```
  </TabItem>
  <TabItem value="py" label="Python">
    ```python
    from techdocs_pro import TechDocs

    # Initialize client
    client = TechDocs(
        api_key='your-api-key',
        base_url='https://api.techdocs-pro.com/v1'
    )

    # Create a new document
    document = client.documents.create(
        title='My Document',
        content='# Hello World',
        status='draft'
    )

    print(f'Document created: {document.id}')
    ```
  </TabItem>
  <TabItem value="curl" label="cURL">
    ```bash
    curl -X POST https://api.techdocs-pro.com/v1/documents \
      -H "Authorization: Bearer your-api-key" \
      -H "Content-Type: application/json" \
      -d '{
        "title": "My Document",
        "content": "# Hello World",
        "status": "draft"
      }'
    ```
  </TabItem>
</Tabs>

## Interactive Code Blocks

Here's a runnable example you can try:

```javascript
// Calculate the sum of two numbers
function calculateSum(a, b) {
  return a + b;
}

// Example usage
const result = calculateSum(5, 3);
console.log(`The sum of 5 and 3 is: ${result}`);
```

:::tip Try It Yourself

Copy the code above and run it in your browser's console or Node.js environment.

:::

## API Response Examples

### Success Response

```json
{
  "success": true,
  "data": {
    "id": "doc_123456789",
    "title": "My Document",
    "content": "# Hello World",
    "status": "draft",
    "created_at": "2023-12-01T12:00:00Z",
    "updated_at": "2023-12-01T12:00:00Z"
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

## Configuration Examples

### Basic Configuration

```javascript
const config = {
  title: 'My Documentation',
  tagline: 'The best documentation platform',
  url: 'https://my-docs.example.com',
  baseUrl: '/',
  organizationName: 'my-org',
  projectName: 'my-docs',
  
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: './sidebars.js',
        },
        blog: {
          showReadingTime: true,
        },
      },
    ],
  ],
};
```

### Advanced Configuration

```javascript
const config = {
  title: 'My Documentation',
  tagline: 'The best documentation platform',
  url: 'https://my-docs.example.com',
  baseUrl: '/',
  
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr', 'es'],
  },
  
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/my-org/my-docs/edit/main/',
          showLastUpdateTime: true,
          showLastUpdateAuthor: true,
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: 'all',
            title: 'My Blog',
            description: 'The official blog of My Documentation',
          },
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  
  themeConfig: {
    navbar: {
      title: 'My Documentation',
      logo: {
        alt: 'My Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          type: 'localeDropdown',
          position: 'right',
        },
        {
          href: 'https://github.com/my-org/my-docs',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `Copyright © ${new Date().getFullYear()} My Organization.`,
    },
    prism: {
      theme: require('prism-react-renderer/themes/github'),
      darkTheme: require('prism-react-renderer/themes/dracula'),
    },
  },
};
```

## Common Patterns

### Error Handling

```javascript
try {
  const document = await client.documents.create({
    title: 'My Document',
    content: '# Hello World'
  });
  console.log('Document created successfully:', document.id);
} catch (error) {
  if (error.code === 'VALIDATION_ERROR') {
    console.error('Validation error:', error.message);
  } else if (error.code === 'RATE_LIMITED') {
    console.error('Rate limited. Please try again later.');
  } else {
    console.error('Unexpected error:', error.message);
  }
}
```

### Pagination

```javascript
// Get documents with pagination
const documents = await client.documents.list({
  page: 1,
  limit: 20,
  sort: 'created_at',
  order: 'desc'
});

console.log(`Found ${documents.meta.pagination.total} documents`);
console.log(`Page ${documents.meta.pagination.page} of ${documents.meta.pagination.pages}`);
```

### Filtering and Search

```javascript
// Search for documents
const searchResults = await client.documents.search({
  q: 'API documentation',
  filter: {
    status: 'published',
    created_at: {
      gte: '2023-01-01'
    }
  }
});

console.log(`Found ${searchResults.data.length} matching documents`);
```

## Real-World Scenarios

### Scenario 1: Setting Up a New Project

```bash
# 1. Initialize a new project
techdocs init my-project
cd my-project

# 2. Install additional dependencies
npm install @docusaurus/plugin-google-analytics

# 3. Configure the project
# Edit docusaurus.config.js with your settings

# 4. Start development server
npm start

# 5. Build for production
npm run build
```

### Scenario 2: Adding Custom Components

```jsx
// src/components/CustomComponent.jsx
import React from 'react';

export default function CustomComponent({ title, children }) {
  return (
    <div className="custom-component">
      <h3>{title}</h3>
      <div className="content">
        {children}
      </div>
    </div>
  );
}
```

```css
/* src/css/custom.css */
.custom-component {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 16px;
  margin: 16px 0;
  background-color: #f9f9f9;
}

.custom-component h3 {
  margin-top: 0;
  color: #2e8555;
}
```

### Scenario 3: Deploying to Multiple Environments

```yaml
# .github/workflows/deploy.yml
name: Deploy Documentation

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./build
```

## Testing Your Examples

Always test your code examples before publishing:

1. **Copy the code** from your documentation
2. **Paste it** into a test environment
3. **Run it** to ensure it works as expected
4. **Update** if you find any issues

:::warning Testing Checklist

- [ ] All code examples run without errors
- [ ] Expected output matches what's documented
- [ ] All links are working
- [ ] Screenshots are up-to-date
- [ ] Examples are relevant and helpful

:::

## Next Steps

- 🚀 [Advanced Integration](advanced-integration) - Learn advanced integration patterns
- 📚 [API Reference](api/overview) - Explore the complete API
- 🎯 [Best Practices](guides/best-practices) - Learn documentation best practices
- 🔧 [Troubleshooting](guides/troubleshooting) - Common issues and solutions

---

:::tip Contributing Examples

Have a great example to share? We'd love to include it! Submit a pull request or reach out to us on [GitHub](https://github.com/techdocs-pro/sample-docs).

:::
