# Quick Start

Get up and running with TechDocs Pro in just a few minutes. This guide will walk you through creating your first documentation project and publishing it online.

## Create Your First Project

### Step 1: Initialize a New Project

```bash
techdocs init my-awesome-docs
cd my-awesome-docs
```

This creates a new directory with all the necessary files and dependencies.

### Step 2: Explore the Project Structure

Your new project includes:

```
my-awesome-docs/
├── docs/                 # Documentation files
│   ├── intro.md         # Introduction page
│   └── ...              # Other documentation
├── blog/                # Blog posts
├── src/                 # Source code
├── static/              # Static assets
├── docusaurus.config.js # Configuration
└── package.json         # Dependencies
```

### Step 3: Start the Development Server

```bash
npm start
```

Open your browser and go to `http://localhost:3000` to see your documentation site.

## Create Your First Page

### Add a New Documentation Page

1. Create a new file in the `docs/` directory:

```bash
touch docs/my-first-page.md
```

2. Add some content:

```markdown
# My First Page

Welcome to my documentation! This is my first page created with TechDocs Pro.

## Features

- Easy to use
- Beautiful design
- Fast performance

## Code Example

Here's a simple code example:

```javascript
function greet(name) {
  return `Hello, ${name}!`;
}

console.log(greet('World'));
```

## Next Steps

- Learn more about [markdown syntax](https://docusaurus.io/docs/markdown-features)
- Explore [advanced features](guides/advanced-features)
- Customize your [theme and styling](configuration)
```

### Update the Sidebar

Edit `sidebars.js` to include your new page:

```javascript
const sidebars = {
  tutorialSidebar: [
    'intro',
    'my-first-page',  // Add this line
    // ... other pages
  ],
};
```

## Customize Your Site

### Update Site Information

Edit `docusaurus.config.js`:

```javascript
const config = {
  title: 'My Awesome Documentation',
  tagline: 'The best documentation platform ever',
  url: 'https://my-awesome-docs.example.com',
  baseUrl: '/',
  // ... rest of config
};
```

### Add Your Logo

1. Place your logo in `static/img/logo.png`
2. Update the config:

```javascript
navbar: {
  logo: {
    alt: 'My Logo',
    src: 'img/logo.png',
  },
  // ... rest of navbar config
},
```

## Add Interactive Features

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

### Callouts and Admonitions

Highlight important information:

```markdown
:::tip Pro Tip
This is a helpful tip for your users.
:::

:::warning Important
This is a warning message.
:::

:::danger Caution
This is a danger message.
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

## Deploy Your Documentation

### Deploy to GitHub Pages

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/username/my-awesome-docs.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**:
   - Go to your repository settings
   - Navigate to "Pages" section
   - Select "GitHub Actions" as source

3. **Deploy**:
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

## What's Next?

Now that you have a basic documentation site:

- 📖 [Configuration Guide](configuration) - Customize your setup
- 🎨 [Theming Guide](guides/advanced-features) - Customize appearance
- 📚 [API Reference](api/overview) - Explore all features
- 🚀 [Best Practices](guides/best-practices) - Learn documentation best practices

## Need Help?

- 💬 [Discord Community](https://discordapp.com/invite/techdocs-pro)
- 📖 [Full Documentation](intro)
- 🐛 [Report Issues](https://github.com/techdocs-pro/sample-docs/issues)

---

:::success Congratulations!

You've successfully created your first TechDocs Pro documentation site! 🎉

:::
