/**
 * If link has some vars, we can pass them here
 * @example
 * ```ts
 * const path = (categoryId: string, productId: string) =>
 *   `/categories/${categoryId}/products/${productId}`
 * ```
 */
type Path = string | ((...params: string[]) => string);

/**
 * All links. In Record, we can't use recursive types
 * We can nest freely
 * ```ts
 * const links = {
 *   home: "/",
 *   users: {
 *     all: () => `/users`,
 *     byId: (id: string) => `/users/${id}`,
 *   }
 * }
 * ```
 */
type Links = {
  [key: string]: Links | Path;
};

/**
 * Links being used:
 * pages.ts
 * sidebar-data.ts
 * and in navigation functions
 */
export const linksRecords = {
  //   home: '/',
  //   signIn: '/login',
  //   forgotPassword: {
  //     request: '/auth/password-reset/request',
  //     requested: '/auth/password-reset/requested',
  //     setPassword: '/auth/password-reset/update',
  //     success: '/auth/password-reset/success',
  //   },
  //   changeLog: '/release-notes/change-log',
  //   account: {
  //     settings: '/account-settings',
  //   },
  //   candidates: {
  //     list: '/candidates',
  //     byId: (id: string) => `/candidates/${id}`,
  //   },
  //   releaseNotes: {
  //     all: '/release-notes/all',
  //     byId: (id: string) => `/release-notes/${id}`,
  //   },
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
    baseById: (id: string) => `/public-profile/${id}`,
    followers: '/public-profile/:userId/followers',
    followersById: (id: string | number) => `/public-profile/${id}/followers`,
    following: '/public-profile/:userId/following',
    followingById: (id: string | number) => `/public-profile/${id}/following`,
  },
} as const satisfies Links;
