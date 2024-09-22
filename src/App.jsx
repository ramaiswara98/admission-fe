import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home/Home"
import Auth from "./pages/Auth/Auth"
import FindSchool from "./pages/FindSchool/FindSchool"


function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/auth" element={<Auth/>} />
      <Route path="/find-school" element={<FindSchool/>} />
    </Routes>
  </BrowserRouter>
  )
}

export default App
