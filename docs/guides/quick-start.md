# Quick Start Guide

This comprehensive guide will help you get up and running with TechDocs Pro quickly. Follow these steps to create your first documentation project and deploy it online.

## Prerequisites

Before starting, ensure you have:

- Node.js 18+ installed
- A code editor (VS Code recommended)
- Basic knowledge of Markdown
- A GitHub account (for deployment)

## Step 1: Installation

Install TechDocs Pro globally:

```bash
npm install -g techdocs-pro
```

Verify the installation:

```bash
techdocs --version
```

## Step 2: Create Your Project

Initialize a new documentation project:

```bash
techdocs init my-documentation
cd my-documentation
```

This creates a new directory with the following structure:

```
my-documentation/
├── docs/                    # Your documentation files
│   ├── intro.md            # Introduction page
│   └── getting-started/    # Getting started section
├── blog/                   # Blog posts
├── src/                    # Source code
│   ├── components/         # React components
│   ├── css/               # Custom styles
│   └── pages/             # Custom pages
├── static/                 # Static assets
├── docusaurus.config.js   # Configuration file
└── package.json           # Dependencies
```

## Step 3: Start Development Server

Start the local development server:

```bash
npm start
```

Open your browser and navigate to `http://localhost:3000`. You should see your documentation site with sample content.

## Step 4: Customize Your Site

### Update Site Information

Edit `docusaurus.config.js`:

```javascript
const config = {
  title: 'My Awesome Documentation',
  tagline: 'The best documentation platform',
  url: 'https://my-docs.example.com',
  baseUrl: '/',
  organizationName: 'my-org',
  projectName: 'my-docs',
  
  themeConfig: {
    navbar: {
      title: 'My Docs',
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
      ],
    },
  },
};
```

### Add Your Logo

1. Place your logo in `static/img/logo.svg`
2. The logo will automatically appear in the navbar

### Update Colors and Branding

Edit `src/css/custom.css`:

```css
:root {
  --ifm-color-primary: #2e8555;
  --ifm-color-primary-dark: #29784c;
  --ifm-color-primary-darker: #277148;
  --ifm-color-primary-darkest: #205d3b;
  --ifm-color-primary-light: #33925d;
  --ifm-color-primary-lighter: #359962;
  --ifm-color-primary-lightest: #3cad6e;
  --ifm-code-font-size: 95%;
  --docusaurus-highlighted-code-line-bg: rgba(0, 0, 0, 0.1);
}

[data-theme='dark'] {
  --ifm-color-primary: #4fc1ff;
  --ifm-color-primary-dark: #21af90;
  --ifm-color-primary-darker: #1fa588;
  --ifm-color-primary-darkest: #1a8870;
  --ifm-color-primary-light: #29d5b0;
  --ifm-color-primary-lighter: #32d8b4;
  --ifm-color-primary-lightest: #4fddbf;
  --docusaurus-highlighted-code-line-bg: rgba(0, 0, 0, 0.3);
}
```

## Step 5: Create Your First Page

### Add a New Documentation Page

1. Create a new file in the `docs/` directory:

```bash
touch docs/my-first-page.md
```

2. Add content to the file:

```markdown
# My First Page

Welcome to my documentation! This is my first page created with TechDocs Pro.

## What You'll Learn

- How to create documentation pages
- How to use Markdown effectively
- How to add interactive elements

## Getting Started

Here's a simple example:

```javascript
function greet(name) {
  return `Hello, ${name}!`;
}

console.log(greet('World'));
```

## Next Steps

- Learn more about [Markdown syntax](https://docusaurus.io/docs/markdown-features)
- Explore [advanced features](advanced-features)
- Customize your [theme and styling](configuration)
```

### Update the Sidebar

Edit `sidebars.js` to include your new page:

```javascript
const sidebars = {
  tutorialSidebar: [
    'intro',
    'my-first-page',  // Add this line
    {
      type: 'category',
      label: 'Getting Started',
      items: ['getting-started/installation'],
    },
  ],
};
```

## Step 6: Add Interactive Features

### Code Tabs

Show code examples in multiple languages:

### JavaScript

```javascript
function hello() {
  console.log('Hello, World!');
}
```

### Python

```python
def hello():
    print("Hello, World!")
```

### Java

```java
public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
```

### Callouts and Admonitions

Highlight important information:

```markdown
:::tip Pro Tip
This is a helpful tip for your users.
:::

:::warning Important
This is a warning message that users should pay attention to.
:::

:::danger Caution
This is a danger message for critical information.
:::

:::info Information
This is general information that might be useful.
:::
```

### Interactive Code Examples

Create runnable code examples:

```jsx
import CodeBlock from '@theme/CodeBlock';

<CodeBlock language="javascript">
{`function calculateSum(a, b) {
  return a + b;
}

console.log(calculateSum(5, 3)); // Output: 8`}
</CodeBlock>
```

## Step 7: Add a Blog

### Create Your First Blog Post

1. Create a new file in the `blog/` directory:

```bash
touch blog/2023-12-01-welcome.md
```

2. Add frontmatter and content:

```markdown
---
slug: welcome
title: Welcome to Our Blog
authors: [john-doe]
tags: [announcement, welcome]
---

# Welcome to Our Blog

This is our first blog post! We're excited to share updates, tips, and insights about technical documentation.

## What to Expect

- Regular updates about new features
- Best practices for technical writing
- Community highlights and success stories
- Tips and tricks for better documentation

## Stay Connected

Follow us on social media and join our community to stay updated with the latest news.

---

*Happy documenting!*
```

### Configure Blog Authors

Edit `blog/authors.yml`:

```yaml
john-doe:
  name: John Doe
  title: Technical Writer
  url: https://github.com/john-doe
  image_url: https://github.com/john-doe.png

jane-smith:
  name: Jane Smith
  title: Developer Advocate
  url: https://github.com/jane-smith
  image_url: https://github.com/jane-smith.png
```

## Step 8: Deploy Your Documentation

### Deploy to GitHub Pages

1. **Initialize Git repository**:

```bash
git init
git add .
git commit -m "Initial commit"
```

2. **Create GitHub repository** and push:

```bash
git remote add origin https://github.com/your-username/my-documentation.git
git push -u origin main
```

3. **Enable GitHub Pages**:
   - Go to repository settings
   - Navigate to "Pages" section
   - Select "GitHub Actions" as source

4. **Deploy**:

```bash
npm run deploy
```

### Deploy to Netlify

1. **Build your site**:

```bash
npm run build
```

2. **Deploy to Netlify**:
   - Connect your GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `build`

### Deploy to Vercel

1. **Install Vercel CLI**:

```bash
npm i -g vercel
```

2. **Deploy**:

```bash
vercel
```

## Step 9: Customize Further

### Add Search

Install the search plugin:

```bash
npm install --save @docusaurus/theme-search-algolia
```

Configure in `docusaurus.config.js`:

```javascript
const config = {
  themeConfig: {
    algolia: {
      apiKey: 'your-api-key',
      indexName: 'your-index-name',
      appId: 'your-app-id',
    },
  },
};
```

### Add Analytics

Install Google Analytics:

```bash
npm install --save @docusaurus/plugin-google-analytics
```

Configure in `docusaurus.config.js`:

```javascript
const config = {
  plugins: [
    [
      '@docusaurus/plugin-google-analytics',
      {
        trackingID: 'GA_TRACKING_ID',
      },
    ],
  ],
};
```

### Add Comments

Install the comments plugin:

```bash
npm install --save @docusaurus/theme-live-codeblock
```

## Step 10: Go Live!

Your documentation is now ready! Here's what you've accomplished:

✅ Created a professional documentation site  
✅ Added custom branding and styling  
✅ Created your first documentation pages  
✅ Added interactive features  
✅ Set up a blog  
✅ Deployed to the web  

## Next Steps

- 📖 [Advanced Features](advanced-features) - Explore more capabilities
- 🎨 [Theming Guide](theming) - Customize appearance further
- 🔌 [Plugin Development](plugin-development) - Create custom plugins
- 📚 [API Reference](api/overview) - Integrate with our API

## Need Help?

- 💬 [Discord Community](https://discordapp.com/invite/techdocs-pro)
- 📖 [Full Documentation](intro)
- 🐛 [Report Issues](https://github.com/techdocs-pro/sample-docs/issues)

---

:::success Congratulations!

You've successfully created and deployed your first TechDocs Pro documentation site! 🎉

:::
