import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ContactList } from '../pages/ContactList';
import { Home } from '../pages/Home';
import { Profile } from '../pages/Profile';
import { PublicProfile } from '../pages/PublicProfile';
import { PublicProfileContactList } from '../pages/PublicProfileContactList';
import { TestingPage } from '../pages/Testing';
import { HomePage } from '../pages/new/HomePage';
import { LandingPage } from '../pages/new/LandingPage';
import { PageWrapper } from './PageWrapper';
import { AccessType } from './access.type';

export const routes = [
  {
    path: '/test',
    element: (
      <PageWrapper accessType={AccessType.Private} children={<TestingPage />} />
    ),
  },
  {
    path: '/',
    element: (
      <PageWrapper accessType={AccessType.Public} children={<LandingPage />} />
    ),
  },
  ////////////////////////////////////////
  {
    path: '/home',
    element: (
      <PageWrapper accessType={AccessType.Private} children={<Home />} />
    ),
  },
  {
    path: '/home-page',
    element: (
      <PageWrapper accessType={AccessType.Private} children={<HomePage />} />
    ),
  },
  /////////////////////////////////////////////////////
  {
    path: '/profile',
    element: (
      <PageWrapper accessType={AccessType.Private} children={<Profile />} />
    ),
  },
  {
    path: '/profile/social/:option',
    element: (
      <PageWrapper accessType={AccessType.Private} children={<ContactList />} />
    ),
  },
  {
    path: '/user/:id/unique-name/:name',
    element: (
      <PageWrapper
        accessType={AccessType.Private}
        children={<PublicProfile />}
      />
    ),
  },
  {
    path: '/user/:id/social/:option',
    element: (
      <PageWrapper
        accessType={AccessType.Private}
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
        {routes.map((route, i) => (
          <Route key={i} path={route.path} element={route.element} />
        ))}
      </Routes>
    </BrowserRouter>
  );
};
