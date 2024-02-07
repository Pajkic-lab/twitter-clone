import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ContactList } from '../pages/ContactList';
import { Home } from '../pages/Home';
import { LandingPage } from '../pages/LandingPage';
import { Profile } from '../pages/Profile';
import { PublicProfile } from '../pages/PublicProfile';
import { PublicProfileContactList } from '../pages/PublicProfileContactList';
import { TestingPage } from '../pages/Testing';
import { AccessType } from '../types';
import { LayoutWrapper } from './LayoutWrapper';

const routes = [
  {
    path: '/test',
    element: (
      <LayoutWrapper
        accessType={AccessType.Public}
        children={<TestingPage />}
      />
    ),
  },
  {
    path: '/',
    element: (
      <LayoutWrapper accessType={AccessType.Guest} children={<LandingPage />} />
    ),
  },
  {
    path: '/home',
    element: (
      <LayoutWrapper accessType={AccessType.Private} children={<Home />} />
    ),
  },
  {
    path: '/profile',
    element: (
      <LayoutWrapper accessType={AccessType.Private} children={<Profile />} />
    ),
  },
  {
    path: '/profile/social/:option',
    element: (
      <LayoutWrapper
        accessType={AccessType.Private}
        children={<ContactList />}
      />
    ),
  },
  {
    path: '/user/:id/unique-name/:name',
    accessType: AccessType.Public,
    element: (
      <LayoutWrapper
        accessType={AccessType.Public}
        children={<PublicProfile />}
      />
    ),
  },
  {
    path: '/user/:id/social/:option',
    element: (
      <LayoutWrapper
        accessType={AccessType.Public}
        children={<PublicProfileContactList />}
      />
    ),
  },
  {
    path: '/*',
    element: <Navigate to="/home" replace />,
  },
];

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route, index) => (
          // route.accessType === 'Private' ?
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </BrowserRouter>
  );
};
