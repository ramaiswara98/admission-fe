import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { GoogleOAuthProvider } from '@react-oauth/google';

import Home from "./pages/Home/Home"
import Auth from "./pages/Auth/Auth"
import FindSchool from "./pages/FindSchool/FindSchool"
import Dashboard from "./pages/Dashboard/Dashboard"
import Users from "./pages/Admin/Users/Users"
import CreateUser from "./pages/Admin/Users/CreateUser"
import EditUser from "./pages/Admin/Users/EditUser"
import Schools from "./pages/Admin/Schools/Schools";
import CreateSchools from "./pages/Admin/Schools/CreateSchools";
import EditSchools from "./pages/Admin/Schools/EditSchools";
import SchoolDetails from "./pages/SchoolDetails/SchoolDetails";
import Profile from './pages/Profile/Profile'
import BookConsultation from "./pages/BookConsultation/BookConsultation";
import AdminBookConsultation from "./pages/Admin/BookConsultation/BookConsultation";
import Tuition from "./pages/Tuition/Tuition";
import MyTuition from "./pages/MyTuition/MyTuition";
import AdminTuition from "./pages/Admin/AdminTuition/AdminTuition";
import Settings from "./pages/Admin/Settings/Settings";


function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/auth" element={<Auth/>} />
      <Route path="/find-school" element={<FindSchool/>} />
      <Route path="/schools/:type/:id" element={<SchoolDetails/>} />
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/profile" element={<Profile/>} />
      <Route path="/bookconsultation/:id" element={<BookConsultation/>} />
      <Route path="/user/book-consultation" element={<AdminBookConsultation type={"user"}/>}/>
      <Route path="/create-tuition" element={<Tuition/>} />
      <Route path="/my-tuition" element={<MyTuition/>} />

      <Route path="/admin/users" element={<Users/>}/>
      <Route path="/admin/create-users" element={<CreateUser/>}/>
      <Route path="/admin/edit-users/:id" element={<EditUser/>}/>
      <Route path="/admin/book-consultation" element={<AdminBookConsultation type={"admin"}/>}/>
      <Route path="/admin/tuition" element={<AdminTuition/>}/>
      <Route path="/admin/settings" element={<Settings/>}/>

      <Route path="/admin/schools" element={<Schools/>}/>
      <Route path="/admin/create-schools" element={<CreateSchools/>}/>
      <Route path="/admin/edit-schools/:id" element={<EditSchools/>}/>
    </Routes>
  </BrowserRouter>
  </GoogleOAuthProvider>
  )
}

export default App
