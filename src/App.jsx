import React from 'react'
import Login from './Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signup from './SignUp'
import Home from './Home'
import CompanyForm from './CompanyForm'
import Userdashboard from './Userdashboard'
import Admindashboard from './Admindashboard'
const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={<Home />} />
      <Route path="/companyform" element={<CompanyForm />} />
      <Route path="/userdashboard" element={<Userdashboard />} />
      <Route path="/admindashboard" element={<Admindashboard />} />
      <Route path="/companyform/:id" element={<CompanyForm />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
