import type * as Preset from '@docusaurus/preset-classic';
import type { Config } from '@docusaurus/types';
import { themes as prismThemes } from 'prism-react-renderer';

const config: Config = {
  title: 'TWC',
  tagline: 'Grow your skills, grow the community.',
  favicon: 'img/favicon.ico',

  url: 'https://Pajkic-lab.github.io',
  baseUrl: '/twitter-clone/',

  organizationName: 'Pajkic-lab',
  projectName: 'twitter-clone',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/Pajkic-lab/twitter-clone/edit/main/docs/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'TWC',
      logo: {
        alt: 'My Site Logo',
        src: 'img/twitterLogo.svg',
      },
      items: [
        {
          type: 'doc',
          docId: 'intro',
          position: 'right',
          label: 'Getting started',
          sidebarId: 'gettingStartedSidebar',
        },
      ],
    },
    colorMode: {
      defaultMode: 'dark',
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Tutorial',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Github discussions',
              href: 'https://github.com/Pajkic-lab/twitter-clone/discussions',
            },
            {
              label: 'TWC',
              href: 'https://twitter-clone-j82h.onrender.com/',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/Pajkic-lab/twitter-clone',
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

  plugins: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        indexDocs: true,
        indexBlog: false,
        indexPages: true,
        language: ['en'],
      },
    ],
  ],
};

export default config;
