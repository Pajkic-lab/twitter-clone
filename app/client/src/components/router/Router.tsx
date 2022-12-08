import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import { Counter } from "features/counter/Counter"
import { LandingPage } from 'pages/LandingPage'
import React from 'react'

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/*
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="*" element={<h1>Redirect to '/'</h1>} />
        */}
        <Route path="/" element={<LandingPage />} />
        {/* <Route path="/counter" element={<Counter />} /> */}
      </Routes>
    </BrowserRouter>
  )
}
