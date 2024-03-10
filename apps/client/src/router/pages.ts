import { linksRecords } from '@tw/ui/common';
import { HomePage } from '../pages/HomePage';
import { LandingPage } from '../pages/LandingPage';
import { TestingPage } from '../pages/Testing';
import { PublicProfile } from '../pages/legacy-pages/PublicProfile';
import { PublicProfileContactList } from '../pages/legacy-pages/PublicProfileContactList';
import { ProfileFollowersPage } from '../pages/profile/ProfileFollowersPage';
import { ProfilePage } from '../pages/profile/ProfilePage';
import { AccessRole } from './accessRole.type';

export type Page = {
  path: string;
  Component: () => JSX.Element;
  accessRole: AccessRole;
};

/**
 * WIP
 */
export const pages = {
  test: {
    path: linksRecords.testingPage,
    Component: TestingPage,
    accessRole: AccessRole.Private,
  },
  landingPage: {
    path: linksRecords.landingPage,
    Component: LandingPage,
    accessRole: AccessRole.Public,
  },
  homePage: {
    path: linksRecords.homePage,
    Component: HomePage,
    accessRole: AccessRole.Private,
  },
  profile: {
    path: linksRecords.profilePage.base,
    Component: ProfilePage,
    accessRole: AccessRole.Private,
  },
  profileFollowers: {
    path: linksRecords.profilePage.followers,
    Component: ProfileFollowersPage,
    accessRole: AccessRole.Private,
  },
  //
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
