import {
  BookmarkActiveIcon,
  BookmarkBaseIcon,
  HashTagActiveIcon,
  HashTagBaseIcon,
  HomeActiveIcon,
  HomeBaseIcon,
  MessageActiveIcon,
  MessageBaseIcon,
  MoreBaseIcon,
  NotificationsActiveIcon,
  NotificationsBaseIcon,
  ProfileActiveIcon,
  ProfileBaseIcon,
  listActiveIcon,
  listBaseIcon,
} from '@tw/ui/assets';

// Maybe to import path from pages.ts file, to have single source of truth ???
export const sidebarData = [
  {
    ComponentBase: HomeBaseIcon,
    ComponentActive: HomeActiveIcon,
    text: 'Home',
    path: '/home',
  },
  {
    ComponentBase: HashTagBaseIcon,
    ComponentActive: HashTagActiveIcon,
    text: 'Explore',
    path: '/explore',
  },
  {
    ComponentBase: NotificationsBaseIcon,
    ComponentActive: NotificationsActiveIcon,
    text: 'Notifications',
    path: '/notifications',
  },
  {
    ComponentBase: MessageBaseIcon,
    ComponentActive: MessageActiveIcon,
    text: 'Messages',
    path: '/messages',
  },
  {
    ComponentBase: BookmarkBaseIcon,
    ComponentActive: BookmarkActiveIcon,
    text: 'Bookmarks',
    path: '/bookmarks',
  },
  {
    ComponentBase: listBaseIcon,
    ComponentActive: listActiveIcon,
    text: 'Lists',
    path: '/lists',
  },
  {
    ComponentBase: ProfileBaseIcon,
    ComponentActive: ProfileActiveIcon,
    text: 'Profile',
    path: '/profile',
  },
  {
    ComponentBase: MoreBaseIcon,
    ComponentActive: MoreBaseIcon,
    text: 'More',
    path: '/more',
  },
];
