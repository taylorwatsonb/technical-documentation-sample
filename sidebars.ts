import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro',
    'portfolio-showcase',
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'getting-started/installation',
        'getting-started/quick-start',
        'getting-started/configuration',
      ],
    },
    {
      type: 'category',
      label: 'API Reference',
      items: [
        'api/overview',
        'api/authentication',
        'api/endpoints',
        'api/errors',
      ],
    },
    {
      type: 'category',
      label: 'Guides',
      items: [
        'guides/quick-start',
        'guides/advanced-features',
        'guides/troubleshooting',
        'guides/best-practices',
      ],
    },
        {
          type: 'category',
          label: 'Writing Samples',
          items: [
            'examples/basic-usage',
            'examples/advanced-integration',
            'examples/real-world-scenarios',
            'examples/process-documentation',
            'examples/technical-article',
            'examples/api-design-mindmap',
            'examples/technical-writing-mindmap',
            'examples/interactive-mindmap',
          ],
        },
    'changelog',
  ],
};

export default sidebars;
