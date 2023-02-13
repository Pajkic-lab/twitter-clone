import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LandingPage } from 'pages/LandingPage'
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
      </Routes>
    </BrowserRouter>
  )
}
