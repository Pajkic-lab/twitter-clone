import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ContactList } from '../pages/ContactList';
import { Home } from '../pages/Home';
import { LandingPage } from '../pages/LandingPage';
import { Profile } from '../pages/Profile';
import { PublicProfile } from '../pages/PublicProfile';
import { PublicProfileContactList } from '../pages/PublicProfileContactList';
import { TestingPage } from '../pages/Testing';
import { PageWrapper } from './PageWrapper';

// maybe this should be function that recives isLoading from navigate, useNavigate hook should be used to switch between pages and to use
// following object as source of thru for hardcode routes and to inject in them isPage being loaded...
// should not swithc pages automaticly when auth, because that is just one case, App needs more comperhansive solution
// it would be ideal to use useNavigate hook to toggle betwen pages and to inject in it loading opitions,
export const routes = [
  {
    path: '/test',
    element: <PageWrapper children={<TestingPage />} />,
  },
  {
    path: '/',
    element: <PageWrapper children={<LandingPage />} />,
  },
  {
    path: '/home',
    element: <PageWrapper children={<Home />} />,
  },
  {
    path: '/profile',
    element: <PageWrapper children={<Profile />} />,
  },
  {
    path: '/profile/social/:option',
    element: <PageWrapper children={<ContactList />} />,
  },
  {
    path: '/user/:id/unique-name/:name',
    element: <PageWrapper children={<PublicProfile />} />,
  },
  {
    path: '/user/:id/social/:option',
    element: <PageWrapper children={<PublicProfileContactList />} />,
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
