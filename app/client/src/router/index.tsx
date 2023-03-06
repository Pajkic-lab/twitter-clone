import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { PublicProfile } from 'pages/PublicProfile'
import { LandingPage } from 'pages/LandingPage'
import { Profile } from 'pages/Profile'
import { Home } from 'pages/Home'
import { Filter } from './Filter'
import { AuthType } from 'types'
import React from 'react'

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
          path="/user/:id/unique-name/:name"
          element={
            // http://localhost:3000/user/2/unique-name/marko
            <Filter authType={AuthType.Public}>
              <PublicProfile />
            </Filter>
          }
        />
        <Route path="/*" element={<Navigate to="/home" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
