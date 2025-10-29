# Configuration

Learn how to configure TechDocs Pro to match your project's needs. This guide covers all the essential configuration options and customization possibilities.

## Configuration File

TechDocs Pro uses a `docusaurus.config.js` file for configuration. This file is located in your project root and contains all the settings for your documentation site.

## Basic Configuration

### Site Metadata

```javascript
const config = {
  title: 'My Documentation',
  tagline: 'The best documentation platform',
  url: 'https://my-docs.example.com',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'my-org',
  projectName: 'my-docs',
};
```

### Internationalization

Configure multiple languages:

```javascript
const config = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr', 'es'],
    localeConfigs: {
      en: {
        label: 'English',
        direction: 'ltr',
      },
      fr: {
        label: 'Français',
        direction: 'ltr',
      },
    },
  },
};
```

## Navigation Configuration

### Navbar

Customize the navigation bar:

```javascript
const config = {
  themeConfig: {
    navbar: {
      title: 'My Documentation',
      logo: {
        alt: 'My Logo',
        src: 'img/logo.svg',
        srcDark: 'img/logo-dark.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          to: '/blog',
          label: 'Blog',
          position: 'left',
        },
        {
          type: 'docsVersionDropdown',
          position: 'right',
        },
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
  },
};
```

### Footer

Configure the footer:

```javascript
const config = {
  themeConfig: {
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/intro',
            },
            {
              label: 'API Reference',
              to: '/docs/api/overview',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/my-community',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/my-org',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} My Organization. Built with Docusaurus.`,
    },
  },
};
```

## Content Configuration

### Documentation

Configure documentation settings:

```javascript
const config = {
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/my-org/my-docs/edit/main/',
          showLastUpdateTime: true,
          showLastUpdateAuthor: true,
          remarkPlugins: [
            [require('@docusaurus/remark-plugin-npm2yarn'), {sync: true}],
          ],
        },
      },
    ],
  ],
};
```

### Blog

Configure blog settings:

```javascript
const config = {
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        blog: {
          showReadingTime: true,
          readingTime: ({content, frontMatter, defaultReadingTime}) =>
            defaultReadingTime({content, options: {wordsPerMinute: 300}}),
          feedOptions: {
            type: 'all',
            title: 'My Blog',
            description: 'The official blog of My Documentation',
            copyright: `Copyright © ${new Date().getFullYear()} My Organization.`,
          },
        },
      },
    ],
  ],
};
```

## Theme Configuration

### Color Scheme

```javascript
const config = {
  themeConfig: {
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
  },
};
```

### Code Highlighting

```javascript
const config = {
  themeConfig: {
    prism: {
      theme: require('prism-react-renderer/themes/github'),
      darkTheme: require('prism-react-renderer/themes/dracula'),
      additionalLanguages: ['java', 'php', 'rust', 'kotlin'],
    },
  },
};
```

### Search

Add search functionality:

```javascript
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

## Advanced Configuration

### Custom CSS

Add custom styles:

```javascript
const config = {
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
```

### Plugins

Add custom plugins:

```javascript
const config = {
  plugins: [
    [
      '@docusaurus/plugin-google-analytics',
      {
        trackingID: 'GA_TRACKING_ID',
        anonymizeIP: true,
      },
    ],
    [
      '@docusaurus/plugin-google-tag-manager',
      {
        containerId: 'GTM_CONTAINER_ID',
      },
    ],
  ],
};
```

### Webpack Configuration

Customize webpack:

```javascript
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

## Environment Variables

Use environment variables for sensitive data:

```javascript
const config = {
  themeConfig: {
    algolia: {
      apiKey: process.env.ALGOLIA_API_KEY,
      indexName: process.env.ALGOLIA_INDEX_NAME,
      appId: process.env.ALGOLIA_APP_ID,
    },
  },
};
```

## Validation

Validate your configuration:

```bash
npm run build
```

This will check for configuration errors and provide helpful messages.

## Configuration Examples

### Minimal Configuration

```javascript
const config = {
  title: 'My Docs',
  tagline: 'Documentation',
  url: 'https://my-docs.com',
  baseUrl: '/',
  organizationName: 'my-org',
  projectName: 'my-docs',
  presets: [['@docusaurus/preset-classic', {}]],
};
```

### Full-Featured Configuration

```javascript
const config = {
  title: 'My Documentation',
  tagline: 'The best documentation platform',
  url: 'https://my-docs.example.com',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'my-org',
  projectName: 'my-docs',
  
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr'],
  },
  
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/my-org/my-docs/edit/main/',
        },
        blog: {
          showReadingTime: true,
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

## Next Steps

- 🎨 [Theming Guide](guides/advanced-features) - Customize appearance
- 🔌 [Plugin Development](guides/plugin-development) - Create custom plugins
- 🚀 [Deployment Guide](guides/deployment) - Deploy your documentation

---

:::tip Configuration Tips

- Always test your configuration with `npm run build`
- Use environment variables for sensitive data
- Keep your configuration file organized and commented
- Consider using TypeScript for better type safety

:::
