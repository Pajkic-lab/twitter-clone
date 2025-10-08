import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  aboutSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Getting Started',
      items: ['getting-started/gettingstarted1', 'getting-started/gettingstarted2'],
    },
    {
      type: 'category',
      label: 'Contributing',
      items: ['contributing/cont1', 'contributing/cont2'],
    },
  ],
  technicalSidebar: [
    {
      type: 'category',
      label: 'Design Decisions',
      items: ['technical/design-decisions/dc'],
    },
    {
      type: 'category',
      label: 'RFCs',
      items: ['technical/rfc/rfc1', 'technical/rfc/rfc2'],
    },
  ],
};

export default sidebars;
