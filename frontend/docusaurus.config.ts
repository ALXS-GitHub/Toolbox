import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import redirects from './redirects.json';
import {sidebarItemsGenerator} from './sidebarItems';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Toolbox',
  tagline: 'My setup, my tools and my projects — how I use them, and why.',
  favicon: 'img/favicon.png',

  future: {
    v4: true,
  },

  url: 'https://alxs-github.github.io',
  baseUrl: '/Toolbox/',
  staticDirectories: ['../assets', 'static'],

  organizationName: 'ALXS-GitHub',
  projectName: 'Toolbox',
  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenAnchors: 'warn',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'throw',
    },
  },

  // English is the default locale (unprefixed URLs); French lives under /fr/.
  // A client module sends first-time visitors to the version that matches their browser language.
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr'],
    path: '../i18n',
    localeConfigs: {
      en: {label: 'English', htmlLang: 'en'},
      fr: {label: 'Français', htmlLang: 'fr'},
    },
  },

  clientModules: ['./src/clientModules/localeRedirect.ts'],

  presets: [
    [
      'classic',
      {
        docs: {
          path: '../docs',
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          sidebarItemsGenerator,
          showLastUpdateTime: true,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.scss',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    'docusaurus-plugin-sass',
    ['@docusaurus/plugin-client-redirects', {redirects}],
  ],

  themes: [
    [
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
        language: ['en', 'fr'],
        docsRouteBasePath: '/',
        docsDir: '../docs',
        indexBlog: false,
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
      },
    ],
  ],

  themeConfig: {
    image: 'img/social-card.png',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
      },
    },
    navbar: {
      title: 'Toolbox',
      hideOnScroll: true,
      logo: {
        alt: 'Toolbox',
        src: 'img/logo.svg',
      },
      items: [
        {type: 'docSidebar', sidebarId: 'setup', position: 'left', label: 'Setup'},
        {type: 'docSidebar', sidebarId: 'tools', position: 'left', label: 'Tools'},
        {type: 'docSidebar', sidebarId: 'projects', position: 'left', label: 'Projects'},
        {type: 'docSidebar', sidebarId: 'hardware', position: 'left', label: 'Hardware'},
        {type: 'docSidebar', sidebarId: 'games', position: 'left', label: 'Games'},
        {type: 'docSidebar', sidebarId: 'archive', position: 'left', label: 'Archive'},
        {type: 'search', position: 'right'},
        {type: 'localeDropdown', position: 'right'},
        {
          href: 'https://github.com/ALXS-GitHub/Toolbox',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Toolbox',
          items: [
            {label: 'Setup', to: '/setup'},
            {label: 'Tools', to: '/tools'},
            {label: 'Projects', to: '/projects'},
          ],
        },
        {
          title: 'More',
          items: [
            {label: 'Hardware', to: '/hardware'},
            {label: 'Games', to: '/games'},
            {label: 'Archive', to: '/archive'},
          ],
        },
        {
          title: 'Links',
          items: [
            {label: 'GitHub', href: 'https://github.com/ALXS-GitHub'},
            {label: 'Source of this site', href: 'https://github.com/ALXS-GitHub/Toolbox'},
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} ALXS · Built with Docusaurus`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'powershell', 'json', 'toml', 'lua', 'rust', 'python', 'go'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
