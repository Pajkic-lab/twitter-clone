import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { PublicProfile } from 'pages/PublicProfile'
import { LandingPage } from 'pages/LandingPage'
import { Profile } from 'pages/Profile'
import { Home } from 'pages/Home'
import { Filter } from './Filter'
import { AuthType } from 'types'
import React from 'react'
import { ContactList } from 'pages/ContactList'
import { PublicProfileContactList } from 'pages/PublicProfileContactList'

export const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
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
  )
}

const routesData = [
  {
    path: '/',
    authType: AuthType.Guest,
    component: <LandingPage />,
  },
  {
    path: '/home',
    authType: AuthType.Protected,
    component: <Home />,
  },
  {
    path: '/porfilie',
    authType: AuthType.Protected,
    component: <Profile />,
  },
  {
    path: '/porfilie/option?:option',
    authType: AuthType.Protected,
    component: <ContactList />,
  },
  // {
  //   path: '/porfilie',
  //   authType: AuthType.Protected,
  //   component: <ContactList />,
  // },
]
