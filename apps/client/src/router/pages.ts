import { linksRecords } from '@tw/ui/common';
import { HomePage } from '../pages/HomePage';
import { LandingPage } from '../pages/LandingPage';
import { TestingPage } from '../pages/Testing';
import { PublicProfileContactList } from '../pages/legacy-pages/PublicProfileContactList';
import { ProfileFollowersPage } from '../pages/profile/ProfileFollowersPage';
import { ProfileFollowingPage } from '../pages/profile/ProfileFollowingPage';
import { ProfilePage } from '../pages/profile/ProfilePage';
import { PublicProfileFollowersPage } from '../pages/public-profile/PublicProfileFollowersPage';
import { PublicProfileFollowingPage } from '../pages/public-profile/PublicProfileFollowingPage';
import { PublicProfilePage } from '../pages/public-profile/PublicProfilePage';
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
  profileFollowing: {
    path: linksRecords.profilePage.following,
    Component: ProfileFollowingPage,
    accessRole: AccessRole.Private,
  },
  publicProfile: {
    path: linksRecords.publicProfilePage.base,
    Component: PublicProfilePage,
    accessRole: AccessRole.Private,
  },
  publicProfileFollowers: {
    path: linksRecords.publicProfilePage.followers,
    Component: PublicProfileFollowersPage,
    accessRole: AccessRole.Private,
  },
  publicProfileFollowing: {
    path: linksRecords.publicProfilePage.following,
    Component: PublicProfileFollowingPage,
    accessRole: AccessRole.Private,
  },
  //
  publicProfileContactList: {
    path: '/user/:id/social/:option',
    Component: PublicProfileContactList,
    accessRole: AccessRole.Private,
  },
} as const satisfies Record<string, Page>;
