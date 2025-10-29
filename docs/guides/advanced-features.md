# Advanced Features

Explore the advanced features and capabilities of TechDocs Pro that can help you create more sophisticated and powerful documentation.

## Custom Components

### Creating Custom Components

TechDocs Pro allows you to create custom React components for enhanced functionality:

```jsx
// src/components/CodeExample.jsx
import React, { useState } from 'react';
import CodeBlock from '@theme/CodeBlock';

export default function CodeExample({ 
  title, 
  code, 
  language = 'javascript',
  showOutput = false 
}) {
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const runCode = async () => {
    setIsRunning(true);
    try {
      // Simulate code execution
      const result = await new Promise(resolve => 
        setTimeout(() => resolve('Code executed successfully!'), 1000)
      );
      setOutput(result);
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="code-example">
      <h4>{title}</h4>
      <CodeBlock language={language}>
        {code}
      </CodeBlock>
      {showOutput && (
        <div className="code-example-actions">
          <button 
            onClick={runCode} 
            disabled={isRunning}
            className="button button--primary"
          >
            {isRunning ? 'Running...' : 'Run Code'}
          </button>
          {output && (
            <div className="code-example-output">
              <strong>Output:</strong>
              <pre>{output}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
```

### Using Custom Components

```jsx
import CodeExample from '@site/src/components/CodeExample';

<CodeExample
  title="JavaScript Example"
  code={`function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet('World'));`}
  language="javascript"
  showOutput={true}
/>
```

## Advanced Styling

### CSS Custom Properties

Define custom CSS properties for consistent theming:

```css
/* src/css/custom.css */
:root {
  /* Custom color palette */
  --techdocs-primary: #2563eb;
  --techdocs-secondary: #64748b;
  --techdocs-success: #10b981;
  --techdocs-warning: #f59e0b;
  --techdocs-danger: #ef4444;
  
  /* Custom spacing */
  --techdocs-spacing-xs: 0.25rem;
  --techdocs-spacing-sm: 0.5rem;
  --techdocs-spacing-md: 1rem;
  --techdocs-spacing-lg: 1.5rem;
  --techdocs-spacing-xl: 2rem;
  
  /* Custom typography */
  --techdocs-font-mono: 'JetBrains Mono', monospace;
  --techdocs-font-sans: 'Inter', sans-serif;
}

/* Custom component styles */
.custom-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  padding: var(--techdocs-spacing-lg);
  margin: var(--techdocs-spacing-md) 0;
  border: 1px solid var(--techdocs-secondary);
}

.custom-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
}
```

### Dark Mode Support

```css
[data-theme='dark'] {
  --techdocs-primary: #60a5fa;
  --techdocs-secondary: #94a3b8;
  --techdocs-success: #34d399;
  --techdocs-warning: #fbbf24;
  --techdocs-danger: #f87171;
  
  .custom-card {
    background: #1e293b;
    border-color: #475569;
    color: #f1f5f9;
  }
}
```

## Plugin System

### Creating Custom Plugins

```javascript
// plugins/custom-plugin.js
module.exports = function (context, options) {
  return {
    name: 'custom-plugin',
    configureWebpack(config, isServer) {
      return {
        resolve: {
          alias: {
            '@custom': path.resolve(__dirname, 'src/custom'),
          },
        },
      };
    },
    contentLoaded({ content, actions }) {
      // Custom content processing
    },
  };
};
```

### Using Plugins

```javascript
// docusaurus.config.js
const config = {
  plugins: [
    './plugins/custom-plugin',
    [
      '@docusaurus/plugin-google-analytics',
      {
        trackingID: 'GA_TRACKING_ID',
      },
    ],
  ],
};
```

## Advanced Markdown Features

### MDX Components

Create reusable MDX components:

```jsx
// src/components/InfoBox.jsx
import React from 'react';

export default function InfoBox({ 
  type = 'info', 
  title, 
  children 
}) {
  const iconMap = {
    info: 'ℹ️',
    warning: '⚠️',
    success: '✅',
    error: '❌'
  };

  return (
    <div className={`info-box info-box--${type}`}>
      <div className="info-box__header">
        <span className="info-box__icon">{iconMap[type]}</span>
        {title && <h4 className="info-box__title">{title}</h4>}
      </div>
      <div className="info-box__content">
        {children}
      </div>
    </div>
  );
}
```

### Using MDX Components

```mdx
import InfoBox from '@site/src/components/InfoBox';

<InfoBox type="warning" title="Important">
  This feature is in beta and may change in future versions.
</InfoBox>
```

## Search Integration

### Algolia Search

```javascript
// docusaurus.config.js
const config = {
  themeConfig: {
    algolia: {
      apiKey: 'YOUR_API_KEY',
      indexName: 'YOUR_INDEX_NAME',
      appId: 'YOUR_APP_ID',
      searchParameters: {
        facetFilters: ['language:en'],
      },
      contextualSearch: true,
      searchPagePath: 'search',
    },
  },
};
```

### Local Search

```bash
npm install --save @easyops-cn/docusaurus-search-local
```

```javascript
// docusaurus.config.js
const config = {
  themes: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        language: ['en', 'zh'],
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
      },
    ],
  ],
};
```

## Analytics and Monitoring

### Google Analytics

```javascript
// docusaurus.config.js
const config = {
  plugins: [
    [
      '@docusaurus/plugin-google-analytics',
      {
        trackingID: 'GA_TRACKING_ID',
        anonymizeIP: true,
      },
    ],
  ],
};
```

### Custom Analytics

```jsx
// src/components/Analytics.jsx
import { useEffect } from 'react';

export default function Analytics() {
  useEffect(() => {
    // Track page views
    const trackPageView = (url) => {
      // Your analytics code here
      console.log('Page view:', url);
    };

    trackPageView(window.location.pathname);
  }, []);

  return null;
}
```

## Internationalization

### Multi-language Support

```javascript
// docusaurus.config.js
const config = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr', 'es', 'de'],
    localeConfigs: {
      en: {
        label: 'English',
        direction: 'ltr',
      },
      fr: {
        label: 'Français',
        direction: 'ltr',
      },
      es: {
        label: 'Español',
        direction: 'ltr',
      },
      de: {
        label: 'Deutsch',
        direction: 'ltr',
      },
    },
  },
};
```

### Translation Management

```bash
# Extract translatable strings
npm run write-translations

# Translate files in i18n/[locale]/docusaurus-plugin-content-docs/current/
```

## Performance Optimization

### Code Splitting

```javascript
// docusaurus.config.js
const config = {
  webpack: {
    jsLoader: (isServer) => ({
      loader: require.resolve('swc-loader'),
      options: {
        jsc: {
          parser: {
            syntax: 'typescript',
            tsx: true,
          },
          transform: {
            react: {
              runtime: 'automatic',
            },
          },
        },
      },
    }),
  },
};
```

### Image Optimization

```jsx
import useBaseUrl from '@docusaurus/useBaseUrl';

function OptimizedImage({ src, alt, ...props }) {
  const imageUrl = useBaseUrl(src);
  
  return (
    <img
      src={imageUrl}
      alt={alt}
      loading="lazy"
      {...props}
    />
  );
}
```

## API Integration

### Custom API Hooks

```jsx
// src/hooks/useApi.js
import { useState, useEffect } from 'react';

export function useApi(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [url]);

  return { data, loading, error };
}
```

### Using API Hooks

```jsx
import { useApi } from '@site/src/hooks/useApi';

function ApiExample() {
  const { data, loading, error } = useApi('/api/status');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h3>API Status</h3>
      <p>Status: {data?.status}</p>
      <p>Version: {data?.version}</p>
    </div>
  );
}
```

## Deployment Strategies

### Multi-environment Deployment

```yaml
# .github/workflows/deploy.yml
name: Deploy Documentation

on:
  push:
    branches: [ main, develop ]

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
      - name: Deploy to Staging
        if: github.ref == 'refs/heads/develop'
        run: npm run deploy:staging
      - name: Deploy to Production
        if: github.ref == 'refs/heads/main'
        run: npm run deploy:production
```

### CDN Configuration

```javascript
// docusaurus.config.js
const config = {
  url: 'https://docs.example.com',
  baseUrl: '/',
  trailingSlash: false,
  staticDirectories: ['static'],
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
};
```

## Testing

### Unit Testing

```javascript
// __tests__/components/CodeExample.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import CodeExample from '@site/src/components/CodeExample';

describe('CodeExample', () => {
  it('renders title and code', () => {
    render(
      <CodeExample
        title="Test Example"
        code="console.log('Hello World');"
        language="javascript"
      />
    );
    
    expect(screen.getByText('Test Example')).toBeInTheDocument();
    expect(screen.getByText("console.log('Hello World');")).toBeInTheDocument();
  });
});
```

### E2E Testing

```javascript
// tests/e2e/navigation.test.js
const { test, expect } = require('@playwright/test');

test('navigation works correctly', async ({ page }) => {
  await page.goto('/');
  
  // Test navigation
  await page.click('text=Documentation');
  await expect(page).toHaveURL('/docs/intro');
  
  // Test search
  await page.fill('[data-testid="search-input"]', 'API');
  await page.press('[data-testid="search-input"]', 'Enter');
  await expect(page.locator('.search-results')).toBeVisible();
});
```

## Next Steps

- 🔧 [Troubleshooting](troubleshooting) - Common issues and solutions
- 📚 [Best Practices](best-practices) - Documentation best practices
- 🚀 [Deployment Guide](deployment) - Deploy your documentation
- 🔌 [Plugin Development](plugin-development) - Create custom plugins

---

:::tip Pro Tips

- Start with basic features and gradually add complexity
- Test thoroughly before deploying to production
- Keep your customizations organized and documented
- Use version control for all custom code

:::
