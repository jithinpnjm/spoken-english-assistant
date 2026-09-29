import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Language Portal',
  tagline: 'Structured German and English lessons with an AI practice coach',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://your-docusaurus-site.example.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  // Read by the AI practice components. Empty = same origin (the production Node server serves both the
  // site and /api). For local development against `npm run dev:server`, start Docusaurus with
  // PRACTICE_API_BASE=http://localhost:8080 and run the server with ALLOWED_ORIGINS=http://localhost:3000.
  customFields: {
    practiceApiBase: process.env.PRACTICE_API_BASE || '',
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Language Portal',
      logo: {
        alt: 'Language Portal Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'germanSidebar',
          position: 'left',
          label: 'German (A0-A1; A2 & B1 in progress)',
        },
        {
          type: 'docSidebar',
          sidebarId: 'englishSidebar',
          position: 'left',
          label: 'English (A1-C1)',
        },
        {
          href: 'https://github.com/jithinpjoseph/spoken-english-assistant',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'German',
          items: [
            {
              label: 'German: Start Here',
              to: '/docs/german/course-guide/how-this-course-works',
            },
          ],
        },
        {
          title: 'English',
          items: [
            {
              label: 'How the English course works',
              to: '/docs/english/overview',
            },
            {
              label: 'A1-A2 Foundations',
              to: '/docs/english/a1-a2-foundations/b01-sound-pronunciation-core',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/jithinpjoseph/spoken-english-assistant',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Language Portal. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
