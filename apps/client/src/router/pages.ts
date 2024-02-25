import { ContactList } from '../pages/ContactList';
import { Home } from '../pages/Home';
import { Profile } from '../pages/Profile';
import { PublicProfile } from '../pages/PublicProfile';
import { PublicProfileContactList } from '../pages/PublicProfileContactList';
import { TestingPage } from '../pages/Testing';
import { HomePage } from '../pages/new/HomePage';
import { LandingPage } from '../pages/new/LandingPage';
import { AccessRole } from './accessRole.type';

export type Page = {
  Component: () => JSX.Element;
  /**
   * Raw path to be passed to router.
   * @example `/home`
   * @example `/users/:userId`
   */
  path: string;
  accessRole: AccessRole;
};

export const pages = {
  test: {
    path: '/test',
    Component: TestingPage,
    accessRole: AccessRole.Private,
  },
  landingPage: {
    path: '/',
    Component: LandingPage,
    accessRole: AccessRole.Public,
  },
  home: {
    path: '/home',
    Component: Home,
    accessRole: AccessRole.Private,
  },
  homePage: {
    path: '/home-page',
    Component: HomePage,
    accessRole: AccessRole.Private,
  },
  profile: {
    path: '/profile',
    Component: Profile,
    accessRole: AccessRole.Private,
  },
  contactList: {
    path: '/profile/social/:option',
    Component: ContactList,
    accessRole: AccessRole.Private,
  },
  publicProfile: {
    path: '/user/:id/unique-name/:name',
    Component: PublicProfile,
    accessRole: AccessRole.Private,
  },
  publicProfileContactList: {
    path: '/user/:id/social/:option',
    Component: PublicProfileContactList,
    accessRole: AccessRole.Private,
  },
} as const satisfies Record<string, Page>;
