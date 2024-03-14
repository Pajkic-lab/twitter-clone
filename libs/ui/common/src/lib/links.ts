/**
 * Links being used:
 * pages.ts
 * sidebar-data.ts
 * and in navigation functions
 */

type Path = string | ((...params: string[]) => string);

type Links = {
  [key: string]: Links | Path;
};

export const linksRecords = {
  landingPage: '/',
  testingPage: '/test',
  homePage: '/home',
  profilePage: {
    base: '/profile',
    followers: '/profile/followers',
    following: '/profile/following',
  },
  publicProfilePage: {
    base: '/public-profile/:userId',
    baseById: (id: string | number) => `/public-profile/${id}`,
    followers: '/public-profile/:userId/followers',
    followersById: (id: string | number) => `/public-profile/${id}/followers`,
    following: '/public-profile/:userId/following',
    followingById: (id: string | number) => `/public-profile/${id}/following`,
  },
} as const satisfies Links;
