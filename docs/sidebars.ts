import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  aboutSidebar: [
    'intro',
    'run-the-app',
    'getting-involved',
    {
      type: 'category',
      label: 'Contributing',
      items: ['contributing/contributing', 'contributing/CODE_OF_CONDUCT'],
    },
    {
      type: 'category',
      label: 'Design Decisions',
      items: ['design-decisions/place-holder'],
    },
    {
      type: 'category',
      label: 'RFCs',
      items: ['rfc/rfc1', 'rfc/rfc2'],
    },
  ],
};

export default sidebars;
