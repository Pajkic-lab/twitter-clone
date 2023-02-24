import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { LandingPage } from 'pages/LandingPage'
import { Profile } from 'pages/Profile'
import { Home } from 'pages/Home'
import { Filter } from './Filter'
import React from 'react'

export const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Filter authType="guest">
              <LandingPage />
            </Filter>
          }
        />
        <Route
          path="/home"
          element={
            <Filter authType="protected">
              <Home />
            </Filter>
          }
        />
        <Route
          path="/profile"
          element={
            <Filter authType="protected">
              <Profile />
            </Filter>
          }
        />
        <Route path="/*" element={<Navigate to="/home" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
