import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ContactList } from '../pages/ContactList';
import { Home } from '../pages/Home';
import { LandingPage } from '../pages/LandingPage';
import { Profile } from '../pages/Profile';
import { PublicProfile } from '../pages/PublicProfile';
import { PublicProfileContactList } from '../pages/PublicProfileContactList';
import { TestingPage } from '../pages/Testing';
import { AuthType } from '../types';
import { Filter } from './Filter';

export const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/test"
          element={
            <Filter authType={AuthType.Public}>
              <TestingPage />
            </Filter>
          }
        />
        <Route
          path="/"
          element={
            <Filter authType={AuthType.Guest}>
              <LandingPage />
            </Filter>
          }
        />
        <Route
          path="/home"
          element={
            <Filter authType={AuthType.Protected}>
              <Home />
            </Filter>
          }
        />
        <Route
          path="/profile"
          element={
            <Filter authType={AuthType.Protected}>
              <Profile />
            </Filter>
          }
        />
        <Route
          path="/profile/social/:option"
          element={
            <Filter authType={AuthType.Protected}>
              <ContactList />
            </Filter>
          }
        />
        <Route
          path="/user/:id/unique-name/:name"
          element={
            // http://localhost:3000/user/2/unique-name/marko
            <Filter authType={AuthType.Public}>
              <PublicProfile />
            </Filter>
          }
        />
        <Route
          path="/user/:id/social/:option"
          element={
            <Filter authType={AuthType.Public}>
              <PublicProfileContactList />
            </Filter>
          }
        />
        <Route path="/*" element={<Navigate to="/home" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
