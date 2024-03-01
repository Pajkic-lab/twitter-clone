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
import { linksRecords } from '@tw/ui/common';

// Maybe to import path from pages.ts file, to have single source of truth ???
export const sidebarData = [
  {
    ComponentBase: HomeBaseIcon,
    ComponentActive: HomeActiveIcon,
    text: 'Home',
    path: linksRecords.homePage,
  },
  {
    ComponentBase: HashTagBaseIcon,
    ComponentActive: HashTagActiveIcon,
    text: 'Explore',
    path: linksRecords.testingPage,
  },
  {
    ComponentBase: NotificationsBaseIcon,
    ComponentActive: NotificationsActiveIcon,
    text: 'Notifications',
    path: '/',
  },
  {
    ComponentBase: MessageBaseIcon,
    ComponentActive: MessageActiveIcon,
    text: 'Messages',
    path: '/',
  },
  {
    ComponentBase: BookmarkBaseIcon,
    ComponentActive: BookmarkActiveIcon,
    text: 'Bookmarks',
    path: '/',
  },
  {
    ComponentBase: listBaseIcon,
    ComponentActive: listActiveIcon,
    text: 'Lists',
    path: '/',
  },
  {
    ComponentBase: ProfileBaseIcon,
    ComponentActive: ProfileActiveIcon,
    text: 'Profile',
    path: '/',
  },
  {
    ComponentBase: MoreBaseIcon,
    ComponentActive: MoreBaseIcon,
    text: 'More',
    path: '/',
  },
];