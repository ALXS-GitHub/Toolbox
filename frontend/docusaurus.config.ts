import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Toolbox',
  tagline: 'Dinosaurs are cool',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://your-docusaurus-site.example.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/Toolbox/',
  staticDirectories: ['../assets', 'static'],

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'ALXS-GitHub', // Usually your GitHub org/user name.
  projectName: 'Toolbox', // Usually your repo name.
  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  
  presets: [
    [
      'classic',
      {
        docs: {
          path: '../docs/docs',
          routeBasePath: 'docs',
          sidebarPath: './sidebars.ts',
        },
        // blog: {
        //   showReadingTime: true,
        //   feedOptions: {
          //     type: ['rss', 'atom'],
          //     xslt: true,
          //   },
          //   // Useful options to enforce blogging best practices
          //   onInlineTags: 'warn',
          //   onInlineAuthors: 'warn',
          //   onUntruncatedBlogPosts: 'warn',
          // },
          theme: {
            customCss: './src/css/custom.scss',
          },
        } satisfies Preset.Options,
      ],
    ],

    plugins: [
      'docusaurus-plugin-sass',
      [
        '@docusaurus/plugin-content-docs',
        {
          id: 'hardware',
          path: '../docs/hardware',
          routeBasePath: 'hardware',
          sidebarPath: './hardwareSidebars.ts',
        },
      ],
      [
        '@docusaurus/plugin-content-docs',
        {
          id: 'games',
          path: '../docs/games',
          routeBasePath: 'games',
          sidebarPath: './gamesSidebars.ts',
        },
      ],
    ],
    
    themeConfig: {
      // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Toolbox',
      logo: {
        alt: 'Toolbox Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'toolboxSidebar',
          position: 'left',
          label: 'Docs',
        },
        {to: '/hardware/intro', label: 'Hardware', position: 'left'},
        {to: '/games/intro', label: 'Games', position: 'left'},
        // {to: '../docs/tools/scoop', label: 'Tools', position: 'left'},
        // {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/ALXS-GitHub/Toolbox',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Apps',
              to: '/docs/category/apps',
            },
            {
              label: 'Dev',
              to: '/docs/category/dev',
            },
            {
              label: 'Games',
              to: '/docs/category/games',
            },
            {
              label: 'Projects',
              to: '/docs/category/projects',
            },
            {
              label: 'Websites',
              to: '/docs/category/websites',
            }
          ],
        },
        {
          title: 'Hardware',
          items: []
        },
        {
          title: 'Games',
          items: []
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/facebook/docusaurus',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
